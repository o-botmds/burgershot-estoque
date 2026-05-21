// js/auth.js
async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = 'login.html';
    return null;
  }
  return session.user;
}

async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert("Erro no login: " + error.message);
    return false;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('autorizado, nome')
    .eq('id', data.user.id)
    .single();

  if (profile && !profile.autorizado) {
    alert("Seu acesso ainda não foi autorizado pelo administrador.");
    await supabase.auth.signOut();
    return false;
  }

  return true;
}

async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'login.html';
}