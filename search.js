// Initialize Supabase client
const supabaseUrl = "https://qgdb21em7228bqjmeytms.supabase.co";
const supabaseKey = "YOUR_ANON_KEY_HERE";  // Replace with your actual anon key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Main search function
async function runSearch() {
    const lastName = document.getElementById("searchInput").value.trim();

    if (!lastName) {
        document.getElementById("results").innerHTML =
            "<p>Please enter a last name.</p>";
        return;
    }

    document.getElementById("results").innerHTML =
        "<p>Searching...</p>";

    // Query Supabase
    const { data, error } = await supabase
        .from("refunds_master")
        .select("*")
        .ilike("owner_name", `%${lastName}%`)
        .limit(25);

    if (error) {
        console.error("Supabase error:", error);
        document.getElementById("results").innerHTML =
            "<p>Error retrieving results.</p>";
        return;
    }

    if (!data || data.length === 0) {
        document.getElementById("results").innerHTML =
            "<p>No matching records found.</p>";
        return;
    }

    // Build results HTML
    let html = "<h2>Results</h2>";

    data.forEach(record => {
        html += `
            <div class="result-card">
                <p><strong>Name:</strong> ${record.owner_name}</p>
                <p><strong>County:</strong> ${record.county}</p>
                <p><strong>Amount:</strong> $${record.amount}</p>
                <p><strong>Year:</strong> ${record.year}</p>
            </div>
        `;
    });

    document.getElementById("results").innerHTML = html;
}
