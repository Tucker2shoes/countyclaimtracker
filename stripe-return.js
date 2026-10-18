// -----------------------------
// Supabase Initialization
// -----------------------------
const supabaseUrl = "https://cxpjeycpzdyrtatokqyn.supabase.co";
const supabaseKey = "sb_publishable_E0YGdLypSl4wh-trkbbtCg_KydlRyfU
";   // Replace with your actual anon key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// -----------------------------
// On page load, verify payment
// -----------------------------
window.addEventListener("DOMContentLoaded", () => {
    processStripeReturn();
});

// -----------------------------
// Main Stripe Return Handler
// -----------------------------
async function processStripeReturn() {
    const statusBox = document.getElementById("returnStatus");

    statusBox.innerHTML = "<p>Verifying payment...</p>";

    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) {
        statusBox.innerHTML = "<p>Missing Stripe session ID.</p>";
        return;
    }

    // -----------------------------
    // STEP 1: Fetch order by session ID
    // -----------------------------
    const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("stripe_session_id", sessionId)
        .single();

    if (orderError || !orderData) {
        statusBox.innerHTML = "<p>Order not found. Please contact support.</p>";
        return;
    }

    // -----------------------------
    // STEP 2: Display order details
    // -----------------------------
    const productNames = {
        essential: "Essential Claim Discovery Report",
        complete: "Complete Claim Kit",
        premium: "Premium Claim Kit + 1‑Year Monitoring",
        monitoring: "CCT Annual Monitoring Service"
    };

    const productName = productNames[orderData.product] || "Claim Kit";

    let html = `
        <h2>Payment Confirmed</h2>
        <p><strong>Product:</strong> ${productName}</p>
        <p><strong>Amount Paid:</strong> $${orderData.amount_paid}</p>
    `;

    // -----------------------------
    // STEP 3: Load refund record (if any)
    // -----------------------------
    if (orderData.refund_id) {
        const { data: recordData } = await supabase
            .from("refunds_master")
            .select("*")
            .eq("id", orderData.refund_id)
            .single();

        if (recordData) {
            html += `
                <h3>Refund Record</h3>
                <p><strong>Name:</strong> ${recordData.owner_name}</p>
                <p><strong>County:</strong> ${recordData.county}</p>
                <p><strong>Amount:</strong> $${recordData.amount}</p>
                <p><strong>Year:</strong> ${recordData.year}</p>
            `;
        }
    }

    statusBox.innerHTML = html;

    // -----------------------------
    // STEP 4: Redirect to success page
    // -----------------------------
    setTimeout(() => {
        window.location.href = "success.html";
    }, 2500);
}

