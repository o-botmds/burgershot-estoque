// js/admin.js
async function loadUsers() {
  const { data } = await supabase.from('profiles').select('*');
  const container = document.getElementById('users-list');
  
  container.innerHTML = data.map(u => `
    <div class="card" style="margin-bottom:15px; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <strong>${u.nome || 'Sem nome'}</strong><br>
        <small>${u.id}</small>
      </div>
      <div>
        <span style="background:${u.autorizado ? '#d4edda' : '#f8d7da'}; padding:5px 12px; border-radius:999px;">
          ${u.autorizado ? '✅ Autorizado' : '⛔ Bloqueado'}
        </span>
        <button onclick="toggleAuth('${u.id}')" class="btn" style="margin-left:10px;">
          ${u.autorizado ? 'Bloquear' : 'Autorizar'}
        </button>
      </div>
    </div>
  `).join('');
}

async function toggleAuth(userId) {
  const { data } = await supabase.from('profiles').select('autorizado').eq('id', userId).single();
  await supabase.from('profiles').update({ autorizado: !data.autorizado }).eq('id', userId);
  loadUsers();
}

async function addItem() {
  const nome = document.getElementById('item-nome').value.trim();
  if (!nome) return alert("Digite o nome do item");

  const { error } = await supabase.from('itens_estoque').insert([{
    nome: nome,
    quantidade: 0,
    min_quantidade: 5
  }]);

  if (!error) {
    alert("Item adicionado com sucesso!");
    document.getElementById('item-nome').value = '';
  }
}