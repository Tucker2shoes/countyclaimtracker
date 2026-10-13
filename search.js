data.forEach(refund => {
  const blurredCounty = "●●●●"; // blur county only

  const div = document.createElement('div');
  div.className = "result-item";

  div.innerHTML = `
    <p><strong>Name:</strong> ${refund.name}</p>
    <p><strong>County:</strong> ${blurredCounty}</p>
    <p><strong>Refund Amount:</strong> $${refund.amount}</p>
    <button onclick="unlock(${refund.id})">Unlock Full Record</button>
    <hr>
  `;

  resultsBox.appendChild(div);
});

