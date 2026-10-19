import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://dkkrandimfexcdxswxhb.supabase.co";
const SUPABASE_KEY = "sb_publishable_UoE1g1VOF8eHyzCgakXDSg_WzhbTVU5";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Main search handler
document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const first = document.getElementById("firstName").value.trim();
  const last = document.getElementById("lastName").value.trim();

  const fullName = `${first} ${last}`;

  // Query Supabase
  const { data, error } = await supabase
    .from("claims")
    .select("*")
    .ilike("name", `%${fullName}%`);

  if (error) {
    console.error("Supabase error:", error);
    alert("There was a problem searching the database.");
    return;
  }

  if (!data || data.length === 0) {
    window.location.href = "/no-results.html";
    return;
  }

  // Save results for search-results.html
  localStorage.setItem("searchResults", JSON.stringify(data));

  // Redirect to results page
  window.location.href = "/search-results.html";
});
