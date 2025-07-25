// @ts-nocheck
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
/*
 * Replace the placeholders below with your Supabase project's URL and public anon key.
 * These values are available in the Supabase dashboard under Project Settings → API.
 */
// Update these constants with your project's unique URL and anon key. These values
// are safe to expose in a client application because Row Level Security (RLS)
// policies protect your data on the server side.
const SUPABASE_URL = 'https://ufcrwemsfqvqvnywricg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmY3J3ZW1zZnF2cXZueXdyaWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0MDUyMjEsImV4cCI6MjA2ODk4MTIyMX0.uuaqSHZQ_akvWILd8MWhnxn9HOJuwxiFB9lj0YnLAj8';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

