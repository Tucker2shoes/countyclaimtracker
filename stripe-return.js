import { supabase } from './supabase.js';

async function finalizeOrder() {
  const name = localStorage.getItem("pending_name");
  const email = localStorage.getItem("pending_email");
  const refundId = localStorage.getItem("pending_refund");

  if (!name || !email || !refundId) {
    window.location.href = "error.html";
    return;
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
    window.location.href = "error.html";
    return;
  }

  // Clear temporary data
  localStorage.removeItem("pending_name");
  localStorage.removeItem("pending_email");
  localStorage.removeItem("pending_refund");

  window.location.href = "success.html";
}

finalizeOrder();
