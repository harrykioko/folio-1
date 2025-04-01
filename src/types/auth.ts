
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
  signOut: () => Promise<void>;
  loading: boolean;
  isAdmin: boolean;
  inviteUser: (email: string, role?: string) => Promise<{
    error: Error | null;
    data: any;
  }>;
}

export interface InvitationResponse {
  success: boolean;
  user?: User;
  error?: string;
  details?: string;
}
