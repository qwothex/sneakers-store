// import type { User as SupabaseUser } from '@supabase/supabase-js';

export type User = {
  id: string
  email: string
  avatarUrl?: string
  banner?: string
  description?: string
  achievement?: string[]
  sales: number
  username?: string
  admin: boolean
};