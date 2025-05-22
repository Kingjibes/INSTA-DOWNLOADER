import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ahigqhjqsnhlxczznvzb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoaWdxaGpxc25obHhjenpudnpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MzIwNzEsImV4cCI6MjA2MzUwODA3MX0.H72u-uCfSkULjYCP5BsGLnGrfNUDDDtLwucB-Q6c78k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);