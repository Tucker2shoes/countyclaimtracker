// -----------------------------
// Global Utility Functions
// -----------------------------

// Smooth scroll for any anchor links
document.addEventListener("click", (e) => {
    const target = e.target.closest("a[href^='#']");
    if (!target) return;

    const id = target.getAttribute("href").substring(1);
    const el = document.getElementById(id);
    if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
    }
});

// -----------------------------
// Global Loading Indicator
// -----------------------------
function showLoading(message = "Loading...") {
    let box = document.getElementById("globalLoading");
    if (!box) {
        box = document.createElement("div");
        box.id = "globalLoading";
        box.style.position = "fixed";
        box.style.top = "20px";
        box.style.right = "20px";
        box.style.background = "#003366";
        box.style.color = "white";
        box.style.padding = "10px 15px";
        box.style.borderRadius = "6px";
        box.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
        box.style.zIndex = "9999";
        document.body.appendChild(box);
    }
    box.innerText = message;
    box.style.display = "block";
}

function hideLoading() {
    const box = document.getElementById("globalLoading");
    if (box) box.style.display = "none";
}

// -----------------------------
// Global Error Handler
// -----------------------------
window.addEventListener("error", (event) => {
    console.error("Global error:", event.message);
});

// -----------------------------
// Optional: Simple Analytics Ping
// -----------------------------
async function analyticsPing(pageName) {
    try {
        await fetch("https://countyclaimtracker.com/api/ping", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                page: pageName,
                timestamp: new Date().toISOString()
            })
        });
    } catch (err) {
        console.warn("Analytics ping failed:", err);
    }
}

// Auto‑ping on page load
window.addEventListener("DOMContentLoaded", () => {
    const page = window.location.pathname.replace("/", "") || "home";
    analyticsPing(page);
});
