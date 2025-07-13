// import type { User as SupabaseUser } from '@supabase/supabase-js';

export type User = {
  id: string
  email: string
  avatarUrl?: string | null
  bannerUrl?: string | null
  description?: string
  achievements?: string[]
  sales: number
  username?: string
  admin: boolean
};