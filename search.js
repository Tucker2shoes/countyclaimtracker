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

  function displayResults(results) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  if (!results || results.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        No matching records found.
      </div>
    `;
    return;
  }

  results.forEach(item => {
    const card = document.createElement("div");
    card.className = "result-card";

    card.innerHTML = `
      <h3>${item.owner_name || "Unknown Name"}</h3>

      <p><strong>County:</strong> ${item.county || "N/A"}</p>
      <p><strong>City:</strong> ${item.city || "N/A"}</p>
      <p><strong>Amount:</strong> $${item.amount_num || "0.00"}</p>
      <p><strong>APN:</strong> ${item.apn || "N/A"}</p>
      <p><strong>Reference #:</strong> ${item.reference_number || "N/A"}</p>

      <button class="unlock-btn" onclick="unlockRecord('${item.record_id}')">
        Unlock Full Record
      </button>
    `;

    container.appendChild(card);
  });
}

}


