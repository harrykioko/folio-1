
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
}
