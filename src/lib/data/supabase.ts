import type { Database } from '$lib/types/supabase-types'
import { createClient } from '@supabase/supabase-js'

const KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string
const URL = import.meta.env.PUBLIC_SUPABASE_URL as string

export const supabase = createClient<Database>(URL, KEY)
