// -----------------------------
// Supabase Initialization
// -----------------------------
const supabaseUrl = "https://qgdb21em7228bqjmeytms.supabase.co;
const supabaseKey = "sb_publishable_E0YGdLypSl4wh-trkbbtCg_KydlRyfU
";   // Replace with your actual anon key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// -----------------------------
// Load order details on page load
// -----------------------------
window.addEventListener("DOMContentLoaded", () => {
    loadOrderDetails();
});

// -----------------------------
// Load the most recent order
// -----------------------------
async function loadOrderDetails() {
    const container = document.querySelector(".checkout-card");

    container.innerHTML = "<p>Loading your order...</p>";

    // Get the most recent order
    const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("id", { ascending: false })
        .limit(1);

    if (error || !data || data.length === 0) {
        container.innerHTML = "<p>Order details not found.</p>";
        return;
    }

    const order = data[0];

    // Build product name
    const productNames = {
        essential: "Essential Claim Discovery Report",
        complete: "Complete Claim Kit",
        premium: "Premium Claim Kit + 1‑Year Monitoring",
        monitoring: "CCT Annual Monitoring Service"
    };

    const productName = productNames[order.product] || "Claim Kit";

    let html = `
        <h2>Your Claim Kit Is Ready</h2>
        <p><strong>Product:</strong> ${productName}</p>
        <p><strong>Amount Paid:</strong> $${order.amount_paid}</p>
    `;

    // If a refund record was attached, load it
    if (order.refund_id) {
        const { data: recordData } = await supabase
            .from("refunds_master")
            .select("*")
            .eq("id", order.refund_id)
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

    container.innerHTML = html;
}

