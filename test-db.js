import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://yivihomudmpnqkqmxnvn.supabase.co",
  "sb_publishable_vl74VRSVFQNbJXicJlj6ag_tmkuoO7W"
);

async function check() {
  console.log("Checking DB...");
  const { data: profiles, error: pErr } = await supabase.from("profiles").select("*");
  console.log("Profiles (might be empty due to RLS if no anon read policy, but let's check):", profiles, "Error:", pErr);
  
  const { data: courses, error: cErr } = await supabase.from("courses").select("*");
  console.log("Courses:", courses, "Error:", cErr);
}

check();
