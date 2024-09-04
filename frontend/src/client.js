import { createClient } from "@supabase/supabase-js";

const URL = "https://rjgmicsaqahxddekejrt.supabase.co";

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqZ21pY3NhcWFoeGRkZWtlanJ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxOTgxNTc1OCwiZXhwIjoyMDM1MzkxNzU4fQ.BwI7RmBKDig79KZAwtnhEifq3xq9BNGV9FsG4_Tq9n0";

const supabase = createClient(URL, API_KEY);

export default supabase;