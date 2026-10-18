// -----------------------------
// Load search results when user submits the form
// -----------------------------
window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("searchForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            performSearch();
        });
    }
});

// -----------------------------
// Perform Search
// -----------------------------
async function performSearch() {
    const query = document.getElementById("searchInput").value.trim();
    const resultsBox = document.getElementById("resultsBox");

    if (!query) {
        resultsBox.innerHTML = "<p>Please enter a last name.</p>";
        return;
    }

    resultsBox.innerHTML = "<p>Searching...</p>";

    const { data, error } = await supabase
        .from("refunds_master")
        .select("*")
        .ilike("owner_name", `%${query}%`)
        .order("owner_name", { ascending: true });

    if (error) {
        console.error(error);
        resultsBox.innerHTML = "<p>Error performing search.</p>";
        return;
    }

    if (!data || data.length === 0) {
        resultsBox.innerHTML = "<p>No matching refunds found.</p>";
        return;
    }

    let html = "";

    data.forEach(record => {
        html += `
            <div class="result-card">
                <p><strong>Name:</strong> ${record.owner_name}</p>
                <p><strong>County:</strong> ${record.county}</p>
                <p><strong>Amount:</strong> $${record.amount}</p>
                <p><strong>Year:</strong> ${record.year}</p>

                <a class="primary-btn small-btn"
                   href="checkout.html?product=essential&refund_id=${record.id}">
                   View Claim Options
                </a>
            </div>
        `;
    });

    resultsBox.innerHTML = html;
}
