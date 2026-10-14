const supabaseUrl = "https://cxpjeycpzdyrtatokqyn.supabase.co";
const supabaseKey = "YOUR_ANON_KEY_HERE";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function runSearch() {
  const input = document.getElementById("searchInput").value.trim();
  const resultsDiv = document.getElementById("results");

  if (!input) {
    resultsDiv.innerHTML = "<p>Please enter a name.</p>";
    return;
  }

  resultsDiv.innerHTML = "<p>Searching...</p>";

  const { data, error } = await supabase
    .from("refunds_master")
    .select("*")
    .ilike("owner_name", `%${input}%`)
    .limit(25);

  if (error) {
    resultsDiv.innerHTML = "<p>Error searching records.</p>";
    return;
  }

  if (!data || data.length === 0) {
    resultsDiv.innerHTML = "<p>No records found for that name.</p>";
    return;
  }

  let html = `<div class="results-header">Results (${data.length})</div>`;

  data.forEach(row => {
    html += `
      <div class="record-card">
        <h3>${row.owner_name || "Unknown Name"}</h3>
        <p><strong>County:</strong> ${row.county || "N/A"}</p>
        <p><strong>City:</strong> ${row.city || "N/A"}</p>
        <p><strong>Amount:</strong> $${row.amount_num || "0.00"}</p>
        <p><strong>APN:</strong> ${row.apn || "N/A"}</p>
        <p><strong>Reference #:</strong> ${row.reference_number || "N/A"}</p>
        <button class="unlock-btn" onclick="goToCheckout('${row.record_id}')">
          Unlock This Record ($9)
        </button>
      </div>
    `;
  });

  resultsDiv.innerHTML = html;
}

function goToCheckout(recordId) {
  window.location.href = `checkout.html?record=${encodeURIComponent(recordId)}`;
}




