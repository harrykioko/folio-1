
import { createClient } from '@supabase/supabase-js';
import { type Provider } from '@supabase/supabase-js';
import { supabase as supabaseClient } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

// Use the pre-configured Supabase client from the integrations folder
export const supabase = supabaseClient;

export type AuthUser = {
  id: string;
  email: string;
  fullName?: string;
  role?: string;
  bio?: string;
};

export type OAuthProvider = Provider;

// Define types for the database tables based on the Database type
export type Tables = Database['public']['Tables'];
export type UserRow = Tables['users']['Row'];

// Invitation type definition
export type Invitation = {
  id: string;
  email: string;
  invited_by: string;
  role: string;
  created_at: string;
  accepted: boolean;
  accepted_at: string | null;
};
