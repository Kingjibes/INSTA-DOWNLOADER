import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uvnhajwzimeyegynxrws.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2bmhhand6aW1leWVneW54cndzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMDA0ODMsImV4cCI6MjA2NTY3NjQ4M30.jyAPeEQdXN6Kjn8T5c-fNuE55BQUKxDqIp-9-TGXeSE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);