
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

export const useMFA = () => {
  const setupMFA = async () => {
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "MFA setup failed",
          description: error.message,
        });
        return null;
      }

      return {
        factorId: data.id,
        qrCode: data.totp.qr_code,
      };
    } catch (error) {
      console.error('Error setting up MFA:', error);
      toast({
        variant: "destructive",
        title: "MFA setup failed",
        description: "An unexpected error occurred",
      });
      return null;
    }
  };

  const verifyMFA = async (factorId: string, code: string) => {
    try {
      const { data, error } = await supabase.auth.mfa.challengeAndVerify({
        factorId,
        code,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "MFA verification failed",
          description: error.message,
        });
        return false;
      }

      toast({
        title: "MFA verified",
        description: "Multi-factor authentication has been enabled for your account",
      });
      
      return !!data.id;
    } catch (error) {
      console.error('Error verifying MFA:', error);
      toast({
        variant: "destructive",
        title: "MFA verification failed",
        description: "An unexpected error occurred",
      });
      return false;
    }
  };

  const checkMFA = async () => {
    try {
      const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      
      if (error) {
        console.error('Error checking MFA status:', error);
        return false;
      }

      return data.nextLevel === 'aal2';
    } catch (error) {
      console.error('Error checking MFA:', error);
      return false;
    }
  };

  const getMFAFactors = async () => {
    try {
      const { data, error } = await supabase.auth.mfa.listFactors();
      
      if (error) {
        console.error('Error listing MFA factors:', error);
        return [];
      }

      return data;
    } catch (error) {
      console.error('Error getting MFA factors:', error);
      return [];
    }
  };

  const unenrollMFA = async (factorId: string) => {
    try {
      const { error } = await supabase.auth.mfa.unenroll({ factorId });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "MFA removal failed",
          description: error.message,
        });
        return false;
      }

      toast({
        title: "MFA removed",
        description: "Multi-factor authentication has been disabled for your account",
      });
      return true;
    } catch (error) {
      console.error('Error unenrolling MFA:', error);
      toast({
        variant: "destructive",
        title: "MFA removal failed",
        description: "An unexpected error occurred",
      });
      return false;
    }
  };

  return {
    setupMFA,
    verifyMFA,
    checkMFA,
    getMFAFactors,
    unenrollMFA
  };
};
