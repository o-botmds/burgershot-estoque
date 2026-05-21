// js/stock.js
async function loadStock() {
  const { data, error } = await supabase
    .from('itens_estoque')
    .select('*')
    .order('nome');

  const container = document.getElementById('stock-list');
  container.innerHTML = '';

  if (data.length === 0) {
    container.innerHTML = '<p>Nenhum item cadastrado ainda.</p>';
    return;
  }

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.foto_url || 'https://via.placeholder.com/400x220/EC3521/FFFFFF?text=' + encodeURIComponent(item.nome)}" 
           style="width:100%; height:200px; object-fit:cover; border-radius:16px;">
      <h3 style="margin:15px 0 8px;">${item.nome}</h3>
      <p style="font-size:2.2rem; font-weight:700; color:var(--red);">${item.quantidade}</p>
      <small>Mínimo: ${item.min_quantidade}</small>
      
      <div style="margin-top:20px; display:flex; gap:12px;">
        <button onclick="alterarQuantidade(${item.id}, -1)" class="btn" style="background:#ddd; flex:1;">− Remover</button>
        <button onclick="alterarQuantidade(${item.id}, 1)" class="btn btn-primary" style="flex:1;">+ Adicionar</button>
      </div>
    `;
    container.appendChild(card);
  });
}

async function alterarQuantidade(id, delta) {
  const { data: item } = await supabase
    .from('itens_estoque')
    .select('quantidade')
    .eq('id', id)
    .single();

  const nova = Math.max(0, item.quantidade + delta);

  await supabase
    .from('itens_estoque')
    .update({ quantidade: nova })
    .eq('id', id);

  loadStock();
}