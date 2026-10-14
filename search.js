// -------------------------------
// Supabase connection
// -------------------------------
const supabaseUrl = "https://cxpjeycpzdyrtatokqyn.supabase.co";
const supabaseKey = "sb_publishable_E0YGdLypSl4wh-trkbbtCg_KydlRyfU";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// -------------------------------
// Run Search
// -------------------------------
async function runSearch() {
  const input = document.getElementById("searchInput").value.trim();
  const resultsBox = document.getElementById("results");

  if (!input) {
    resultsBox.innerHTML = "<p>Please enter a name.</p>";
    return;
  }

  resultsBox.innerHTML = "<p>Searching...</p>";

  // IMPORTANT: owner_name is the correct column
  const { data, error } = await supabase
    .from("refunds_master")
    .select("*")
    .ilike("owner_name", `%${input}%`)
    .limit(25);

  if (error) {
    resultsBox.innerHTML = "<p>Error searching records.</p>";
    return;
  }

  if (!data || data.length === 0) {
    resultsBox.innerHTML = "<p>No records found.</p>";
    return;
  }

  resultsBox.innerHTML = ""; // clear

  // -------------------------------
  // Build result cards
  // -------------------------------
  data.forEach(refund => {
    const blurredCounty = "••••"; // hide county

    const div = document.createElement("div");
    div.className = "result-item";

    div.innerHTML = `
      <p><strong>Name:</strong> ${refund.owner_name}</p>
      <p><strong>County:</strong> ${blurredCounty}</p>
      <p><strong>Refund Amount:</strong> $${refund.amount_num}</p>

      <button class="unlock-btn" onclick="unlock('${refund.record_id}')">
        Unlock Full Record ($9)
      </button>

      <hr>
    `;

    resultsBox.appendChild(div);
  });
}

// -------------------------------
// Unlock → Checkout
// -------------------------------
function unlock(recordId) {
  window.location.href = `checkout.html?record=${recordId}`;
}




