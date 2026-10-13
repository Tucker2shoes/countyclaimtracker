import { supabase } from './supabase.js';

async function loadOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('id', { ascending: false });

  const box = document.getElementById('ordersBox');
  box.innerHTML = "";

  if (error || !data) {
    box.innerHTML = "Error loading orders.";
    return;
  }

  data.forEach(order => {
    box.innerHTML += `
      <p>
        <strong>Name:</strong> ${order.customer_name}<br>
        <strong>Email:</strong> ${order.customer_email}<br>
        <strong>Refund ID:</strong> ${order.refund_id}<br>
        <strong>Amount Paid:</strong> $${order.amount_paid}<br>
        <strong>Date:</strong> ${order.created_at}
      </p>
      <hr>
    `;
  });
}

async function loadLeads() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('id', { ascending: false });

  const box = document.getElementById('leadsBox');
  box.innerHTML = "";

  if (error || !data) {
    box.innerHTML = "Error loading leads.";
    return;
  }

  data.forEach(lead => {
    box.innerHTML += `
      <p>
        <strong>Name:</strong> ${lead.name}<br>
        <strong>County:</strong> ${lead.county}<br>
        <strong>Amount:</strong> $${lead.amount}<br>
        <strong>Status:</strong> ${lead.status}<br>
        <strong>Date:</strong> ${lead.created_at}
      </p>
      <hr>
    `;
  });
}

async function loadRefunds() {
  const { data, error } = await supabase
    .from('refunds')
    .select('*')
    .order('id', { ascending: false });

  const box = document.getElementById('refundsBox');
  box.innerHTML = "";

  if (error || !data) {
    box.innerHTML = "Error loading refunds.";
    return;
  }

  data.forEach(refund => {
    box.innerHTML += `
      <p>
        <strong>Name:</strong> ${refund.name}<br>
        <strong>County:</strong> ${refund.county}<br>
        <strong>Amount:</strong> $${refund.amount}<br>
        <strong>Date:</strong> ${refund.created_at}
      </p>
      <hr>
    `;
  });
}

loadOrders();
loadLeads();
loadRefunds();
