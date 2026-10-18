// -----------------------------
// Supabase Initialization
// -----------------------------
const supabaseUrl = "https://cxpjeycpzdyrtatokqyn.supabase.co";
const supabaseKey = "sb_publishable_E0YGdLypSl4wh-trkbbtCg_KydlRyfU
";   // Replace with your actual anon key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// -----------------------------
// Load Product + Record
// -----------------------------
window.addEventListener("DOMContentLoaded", () => {
    loadProduct();
    loadRecord();
});

// -----------------------------
// PRODUCT DEFINITIONS
// -----------------------------
const PRODUCTS = {
    essential: {
        name: "Essential Claim Discovery Report",
        price: 49,
        description: [
            "Full refund lookup",
            "County contact details",
            "DIY filing instructions"
        ]
    },
    complete: {
        name: "Complete Claim Kit",
        price: 149,
        description: [
            "Everything in Essential",
            "All required forms",
            "Pre‑filled templates",
            "Mailing labels"
        ]
    },
    premium: {
        name: "Premium Claim Kit + 1‑Year Monitoring",
        price: 199,
        description: [
            "Everything in Complete",
            "12 months refund monitoring",
            "Priority support"
        ]
    },
    monitoring: {
        name: "CCT Annual Monitoring Service",
        price: 79,
        description: [
            "Continuous refund monitoring",
            "Instant alerts",
            "Works even without a current claim"
        ]
    }
};

// -----------------------------
// LOAD PRODUCT DETAILS
// -----------------------------
function loadProduct() {
    const params = new URLSearchParams(window.location.search);
    const productKey = params.get("product");

    const product = PRODUCTS[productKey];

    const box = document.getElementById("productDetails");

    if (!product) {
        box.innerHTML = "<p>Invalid product selection.</p>";
        return;
    }

    let html = `
        <h2>${product.name}</h2>
        <p><strong>Price:</strong> $${product.price}</p>
        <ul>
            ${product.description.map(item => `<li>${item}</li>`).join("")}
        </ul>
    `;

    box.innerHTML = html;

    // Show checkout button
    document.getElementById("checkoutButton").style.display = "inline-block";

    // Attach product info to button
    document.getElementById("checkoutButton").onclick = () =>
        completeOrder(productKey, product.price);
}

// -----------------------------
// LOAD RECORD DETAILS (if refund_id exists)
// -----------------------------
async function loadRecord() {
    const params = new URLSearchParams(window.location.search);
    const refundId = params.get("refund_id");

    if (!refundId) return;

    const box = document.getElementById("recordDetails");
    box.style.display = "block";
    box.innerHTML = "<p>Loading record...</p>";

    const { data, error } = await supabase
        .from("refunds_master")
        .select("*")
        .eq("id", refundId)
        .single();

    if (error || !data) {
        box.innerHTML = "<p>Record not found.</p>";
        return;
    }

    box.innerHTML = `
        <h2>Refund Record</h2>
        <p><strong>Name:</strong> ${data.owner_name}</p>
        <p><strong>County:</strong> ${data.county}</p>
        <p><strong>Amount:</strong> $${data.amount}</p>
        <p><strong>Year:</strong> ${data.year}</p>
    `;
}

// -----------------------------
// COMPLETE ORDER
// -----------------------------
async function completeOrder(productKey, price) {
    const params = new URLSearchParams(window.location.search);
    const refundId = params.get("refund_id");

    // For now, we use placeholder customer info
    const customerName = "Customer";
    const customerEmail = "customer@example.com";

    const { error } = await supabase
        .from("orders")
        .insert({
            product: productKey,
            amount_paid: price,
            refund_id: refundId || null,
            customer_name: customerName,
            customer_email: customerEmail
        });

    if (error) {
        console.error(error);
        alert("Order failed.");
        return;
    }

    // Redirect to success page
    window.location.href = "success.html";
}
