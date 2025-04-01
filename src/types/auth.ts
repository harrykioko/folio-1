
import { Session, User } from '@supabase/supabase-js';
import { AuthUser } from '@/lib/supabase';

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  userMetadata: AuthUser | null;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    data: Session | null;
  }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{
    error: Error | null;
    data: { user: User | null; session: Session | null };
  }>;
  signOut: () => Promise<void>;
  loading: boolean;
  setupMFA: () => Promise<{ factorId: string; qrCode: string } | null>;
  verifyMFA: (factorId: string, code: string) => Promise<boolean>;
  checkMFA: () => Promise<boolean>;
  getMFAFactors: () => Promise<any>;
  unenrollMFA: (factorId: string) => Promise<boolean>;
}

export interface MFAFactorStatus {
  id: string;
  type: string;
  status: 'verified' | 'unverified';
}
