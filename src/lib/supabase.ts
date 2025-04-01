
import { createClient } from '@supabase/supabase-js';
import { type Provider } from '@supabase/supabase-js';

// Environment variables will be injected by Lovable
// These should be set in your Lovable project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Authentication will not work.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type AuthUser = {
  id: string;
  email: string;
  fullName?: string;
  role?: string;
};

export type MFAFactorStatus = 'verified' | 'unverified';

export type MFAFactor = {
  id: string;
  type: string;
  status: MFAFactorStatus;
};

export type OAuthProvider = Provider;
