import { supabase } from './supabase.js';

async function loadRefund() {
  const params = new URLSearchParams(window.location.search);
  const refundId = params.get("refund_id");

  if (!refundId) {
    document.getElementById("refundDetails").innerHTML = "Invalid refund ID.";
    return;
  }

  const { data, error } = await supabase
    .from('refunds')
    .select('*')
    .eq('id', refundId)
    .single();

  if (error || !data) {
    document.getElementById("refundDetails").innerHTML = "Refund not found.";
    return;
  }

  document.getElementById("refundDetails").innerHTML = `
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>County:</strong> ${data.county}</p>
    <p><strong>Refund Amount:</strong> $${data.amount}</p>
  `;
}

window.loadRefund = loadRefund;

async function completeOrder() {
  const params = new URLSearchParams(window.location.search);
  const refundId = params.get("refund_id");

  const name = document.getElementById("customerName").value.trim();
  const email = document.getElementById("customerEmail").value.trim();

  if (!name || !email) {
    alert("Enter your name and email.");
    return;
  }

  // Save customer info temporarily in localStorage
  localStorage.setItem("pending_name", name);
  localStorage.setItem("pending_email", email);
  localStorage.setItem("pending_refund", refundId);

  // Redirect to Stripe Checkout
  window.location.href = import.meta.env.STRIPE_CHECKOUT_URL;
}


  const { error } = await supabase
    .from('orders')
    .insert({
      customer_name: name,
      customer_email: email,
      refund_id: refundId,
      amount_paid: 19.00
    });

  if (error) {
    console.error(error);
    alert("Order failed.");
    return;
  }

  window.location.href = "success.html";
}

window.completeOrder = completeOrder;
