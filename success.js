const supabaseUrl = "https://cxpjeycpzdyrtatokqyn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4cGpleWNwemR5cnRhdG9rcXluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5MDc5NzgsImV4cCI6MjEwNzQ4Mzk3OH0.xL4QMOowoRq7lwsUcd7xurlRIgcsBfYCYFA7vhbBvuk";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

window.onload = async function () {
  const params = new URLSearchParams(window.location.search);
  const recordId = params.get("record");

  if (!recordId) {
    document.getElementById("recordDetails").innerHTML = "Invalid record ID.";
    return;
  }

  const { data, error } = await supabase
    .from("refunds_master")
    .select("*")
    .eq("record_id", recordId)
    .single();

  if (error || !data) {
    document.getElementById("recordDetails").innerHTML = "Record not found.";
    return;
  }

  document.getElementById("recordDetails").innerHTML = `
    <h3>${data.owner_name}</h3>

    <p><strong>County:</strong> ${data.county}</p>
    <p><strong>City:</strong> ${data.city}</p>
    <p><strong>Amount:</strong> $${data.amount_num}</p>
    <p><strong>APN:</strong> ${data.apn}</p>
    <p><strong>Reference #:</strong> ${data.reference_number}</p>
  `;
};

// PDF button (we will build this next)
document.getElementById("downloadKitBtn").onclick = function () {
  alert("PDF generator coming next!");
};
