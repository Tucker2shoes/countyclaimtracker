// -----------------------------
// Load all admin data on page load
// -----------------------------
window.addEventListener("DOMContentLoaded", () => {
    loadOrders();
    loadLeads();
    loadRefunds();
});

// -----------------------------
// Load Orders
// -----------------------------
async function loadOrders() {
    const box = document.getElementById("ordersBox");
    box.innerHTML = "<p>Loading orders...</p>";

    const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("id", { ascending: false });

    if (error || !data) {
        box.innerHTML = "<p>Error loading orders.</p>";
        return;
    }

    if (data.length === 0) {
        box.innerHTML = "<p>No orders found.</p>";
        return;
    }

    let html = "";

    data.forEach(order => {
        html += `
            <div class="admin-card">
                <p><strong>Name:</strong> ${order.customer_name}</p>
                <p><strong>Email:</strong> ${order.customer_email}</p>
                <p><strong>Refund ID:</strong> ${order.refund_id || "None"}</p>
                <p><strong>Amount Paid:</strong> $${order.amount_paid}</p>
                <p><strong>Date:</strong> ${order.created_at}</p>
            </div>
        `;
    });

    box.innerHTML = html;
}

// -----------------------------
// Load Leads
// -----------------------------
async function loadLeads() {
    const box = document.getElementById("leadsBox");
    box.innerHTML = "<p>Loading leads...</p>";

    const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("id", { ascending: false });

    if (error || !data) {
        box.innerHTML = "<p>Error loading leads.</p>";
        return;
    }

    if (data.length === 0) {
        box.innerHTML = "<p>No leads found.</p>";
        return;
    }

    let html = "";

    data.forEach(lead => {
        html += `
            <div class="admin-card">
                <p><strong>Name:</strong> ${lead.name}</p>
                <p><strong>County:</strong> ${lead.county}</p>
                <p><strong>Amount:</strong> $${lead.amount}</p>
                <p><strong>Status:</strong> ${lead.status}</p>
                <p><strong>Date:</strong> ${lead.created_at}</p>

                <button class="primary-btn small-btn" onclick="markLeadSold(${lead.id})">
                    Mark as Sold
                </button>
            </div>
        `;
    });

    box.innerHTML = html;
}

// -----------------------------
// Mark Lead as Sold
// -----------------------------
async function markLeadSold(id) {
    const { error } = await supabase
        .from("leads")
        .update({ status: "sold" })
        .eq("id",
