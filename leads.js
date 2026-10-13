import { supabase } from './supabase.js';

async function loadLeads() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('id', { ascending: false });

  const box = document.getElementById('leadsList');
  box.innerHTML = "";

  if (error || !data) {
    box.innerHTML = "Error loading leads.";
    return;
  }

  data.forEach(lead => {
    const div = document.createElement('div');
    div.className = "lead-item";

    div.innerHTML = `
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>County:</strong> ${lead.county}</p>
      <p><strong>Amount:</strong> $${lead.amount}</p>
      <p><strong>Status:</strong> ${lead.status}</p>
      <button onclick="markSold(${lead.id})">Mark as Sold</button>
      <hr>
    `;

    box.appendChild(div);
  });
}

window.loadLeads = loadLeads;

async function markSold(id) {
  const { error } = await supabase
    .from('leads')
    .update({ status: 'sold' })
    .eq('id', id);

  if (error) {
    alert("Failed to update lead.");
    return;
  }

  alert("Lead marked as sold.");
  loadLeads();
}

window.markSold = markSold;
