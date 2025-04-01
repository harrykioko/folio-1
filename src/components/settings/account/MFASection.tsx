import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { Loader2, Shield, ShieldCheck, ShieldOff } from "lucide-react";

const MFASection = () => {
  const { setupMFA, verifyMFA, getMFAFactors, unenrollMFA } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [mfaFactors, setMfaFactors] = useState<any[]>([]);
  const [setupOpen, setSetupOpen] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  
  const hasMFA = mfaFactors.some(factor => factor.status === 'verified');

  useEffect(() => {
    fetchMFAStatus();
  }, []);

  const fetchMFAStatus = async () => {
    setIsLoading(true);
    try {
      const data = await getMFAFactors();
      setMfaFactors(data);
    } catch (error) {
      console.error("Error fetching MFA status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetupMFA = async () => {
    setIsLoading(true);
    try {
      const result = await setupMFA();
      if (result) {
        setQrCode(result.qrCode);
        setFactorId(result.factorId);
        setSetupOpen(true);
      }
    } catch (error) {
      console.error("Error setting up MFA:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyMFA = async () => {
    if (!factorId) return;
    
    setIsVerifying(true);
    try {
      const success = await verifyMFA(factorId, verificationCode);
      if (success) {
        setSetupOpen(false);
        await fetchMFAStatus();
      }
    } catch (error) {
      console.error("Error verifying MFA:", error);
    } finally {
      setIsVerifying(false);
      setVerificationCode("");
    }
  };

  const handleDisableMFA = async () => {
    if (!hasMFA) return;
    
    const factor = mfaFactors.find(f => f.status === 'verified');
    if (!factor) return;

    setIsLoading(true);
    try {
      const success = await unenrollMFA(factor.id);
      if (success) {
        await fetchMFAStatus();
      }
    } catch (error) {
      console.error("Error disabling MFA:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Multi-factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              {hasMFA ? (
                <ShieldCheck className="h-10 w-10 text-green-500 mt-1" />
              ) : (
                <Shield className="h-10 w-10 text-amber-500 mt-1" />
              )}
              <div>
                <p className="font-medium">Authenticator app</p>
                <p className="text-sm text-muted-foreground">
                  {hasMFA 
                    ? "Your account is protected with two-factor authentication." 
                    : "Use an authenticator app to get two-factor authentication codes when prompted."}
                </p>
              </div>
            </div>
            
            {isLoading ? (
              <Button variant="outline" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </Button>
            ) : hasMFA ? (
              <Button variant="outline" onClick={handleDisableMFA} className="gap-2">
                <ShieldOff className="h-4 w-4" />
                Disable
              </Button>
            ) : (
              <Button variant="outline" onClick={handleSetupMFA}>Set up</Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={setupOpen} onOpenChange={setSetupOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Set up two-factor authentication</DialogTitle>
            <DialogDescription>
              Scan the QR code with your authenticator app and enter the verification code.
            </DialogDescription>
          </DialogHeader>
          
          {qrCode && (
            <div className="flex justify-center p-4">
              <img 
                src={qrCode} 
                alt="QR Code for authenticator app" 
                className="max-w-full h-auto border rounded-md p-2"
              />
            </div>
          )}
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="verification-code">
                Verification code
              </label>
              <Input
                id="verification-code"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setSetupOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleVerifyMFA} disabled={verificationCode.length !== 6 || isVerifying}>
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MFASection;
