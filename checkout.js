// ⭐ Initialize Supabase
const supabaseUrl = "https://cxpjeycpzdyrtatokqyn.supabase.co";
const supabaseKey = "sb_publishable_E0YGdLypSl4wh-trkbbtCg_KydlRyfU";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);


// ⭐ Load the record when the page opens
window.onload = async function () {
  const params = new URLSearchParams(window.location.search);
  const recordId = params.get("record");

  if (!recordId) {
    document.getElementById("recordDetails").innerHTML = "Invalid record ID.";
    return;
  }

  // Fetch the record from your imported table
  const { data, error } = await supabase
    .from("refunds_master")
    .select("*")
    .eq("record_id", recordId)
    .single();

  if (error || !data) {
    document.getElementById("recordDetails").innerHTML = "Record not found.";
    return;
  }

  // ⭐ Display the record
  document.getElementById("recordDetails").innerHTML = `
    <h3>${data.owner_name || "Unknown Name"}</h3>

    <p><strong>County:</strong> ${data.county || "N/A"}</p>
    <p><strong>City:</strong> ${data.city || "N/A"}</p>
    <p><strong>Amount:</strong> $${data.amount_num || "0.00"}</p>
    <p><strong>APN:</strong> ${data.apn || "N/A"}</p>
    <p><strong>Reference #:</strong> ${data.reference_number || "N/A"}</p>
  `;

  // ⭐ Show the checkout button
  document.getElementById("checkoutButton").style.display = "block";

  // ⭐ Attach Stripe checkout handler
  document.getElementById("checkoutButton").onclick = function () {
    startCheckout(recordId);
  };
};


// ⭐ Stripe Checkout Redirect
function startCheckout(recordId) {
  // Redirect to your Stripe payment page
  window.location.href = 'https://buy.stripe.com/3cI14oaKF5CD5tR4xR6c00x?record=${recordId}';
}
