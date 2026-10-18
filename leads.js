// -----------------------------
// Load leads on page load
// -----------------------------
window.addEventListener("DOMContentLoaded", () => {
    loadLeads();
});

// -----------------------------
// Load all leads from Supabase
// -----------------------------
async function loadLeads() {
    const box = document.getElementById("leadsList");

    if (!box) {
        console.error("Missing #leadsList container in admin.html");
        return;
    }

    box.innerHTML = "<p>Loading leads...</p>";

    const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("id", { ascending: false });

    if (error) {
        console.error(error);
        box.innerHTML = "<p>Error loading leads.</p>";
        return;
    }

    if (!data || data.length === 0) {
        box.innerHTML = "<p>No leads found.</p>";
        return;
    }

    let html = "";

    data.forEach(lead => {
        html += `
            <div class="lead-card">
                <p><strong>Name:</strong> ${lead.name}</p>
                <p><strong>County:</strong> ${lead.county}</p>
                <p><strong>Amount:</strong> $${lead.amount}</p>
                <p><strong>Status:</strong> ${lead.status}</p>

                <button onclick="markSold(${lead.id})" class="primary-btn small-btn">
                    Mark as Sold
                </button>
            </div>
        `;
    });

    box.innerHTML = html;
}

// -----------------------------
// Mark a lead as sold
// -----------------------------
async function markSold(id) {
    const { error } = await supabase
        .from("leads")
        .update({ status: "sold" })
        .eq("id", id);

    if (error) {
        alert("Failed to update lead.");
        return;
    }

    alert("Lead marked as sold.");
    loadLeads();
}

