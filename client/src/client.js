import { createClient } from '@supabase/supabase-js';

const URL = 'https://bdgblbpuvlwijxznqzcp.supabase.co';

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkZ2JsYnB1dmx3aWp4em5xemNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzOTY2MzEsImV4cCI6MjAyODk3MjYzMX0.ryGS1dixbjzLV2nf9kyKtOi-o8BYjzgny3oQK6gMcco';

export const supabase = createClient(URL, API_KEY);