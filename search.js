async function runSearch() {
  const searchInput = document.getElementById("searchInput").value.trim();

  if (!searchInput) {
    alert("Please enter a name to search.");
    return;
  }

  const { data, error } = await supabase
    .from("refunds_master")   // ← your imported table
    .select("*")
    .ilike("owner_name", `%${searchInput}%`);  // ← your CSV column

  if (error) {
    console.error("Search error:", error);
    alert("There was an error performing the search.");
    return;
  }

  displayResults(data);
}


