
import { createClient } from '@supabase/supabase-js';
import { type Provider } from '@supabase/supabase-js';
import { supabase as supabaseClient } from '@/integrations/supabase/client';

// Use the pre-configured Supabase client from the integrations folder
export const supabase = supabaseClient;

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
