// 1. CONFIGURAÇÃO
const SUPABASE_URL = 'https://vkgqxwcxnzuqjsgfzuau.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrZ3F4d2N4bnp1cWpzZ2Z6dWF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3MDg3MDAsImV4cCI6MjA4MjI4NDcwMH0.vJnHuo9ORGBSgDPh6TlV8gBR6XjCzY6RYIe_zNjZ5I8';

// Inicialização correta (evitando conflito com a variável global 'supabase')
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Esta função agora será "vista" pelo navegador
function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm.style.display !== 'none') {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    } else {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    }
}

function showNotification(text, color) {
    const note = document.getElementById('notification');
    note.innerText = text;
    note.style.backgroundColor = color;
    note.style.display = 'block';
    setTimeout(() => note.style.display = 'none', 3000);
}

function showLoading(show) {
    const loading = document.getElementById('loading');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    if (show) {
        loading.style.display = 'block';
        loginForm.style.display = 'none';
        signupForm.style.display = 'none';
    } else {
        loading.style.display = 'none';
        loginForm.style.display = 'block';
    }
}

async function handleLogin() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        showNotification('Preencha todos os campos!', '#ef4444');
        return;
    }
    
    showLoading(true);
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });
        if (error) throw error;
        showNotification('Login realizado!', '#16a34a');
        setTimeout(() => window.location.href = 'app.html', 1000);
    } catch (error) {
        showNotification('Email ou senha incorretos!', '#ef4444');
        showLoading(false);
    }
}

async function handleSignup() {
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    
    // 1. Verificação de campos vazios
    if (!name || !email || !password || !confirm) {
        showNotification('Preencha tudo!', '#ef4444');
        return;
    }

    // 2. NOVA VALIDAÇÃO: Expressão Regular para Senha Forte
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        showNotification('Senha fraca! Use 8+ caracteres, maiúscula, número e símbolo.', '#ef4444');
        return;
    }
    
    // 3. Verificação de confirmação
    if (password !== confirm) {
        showNotification('Senhas diferentes!', '#ef4444');
        return;
    }
    
    showLoading(true);
    try {
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: { data: { full_name: name } }
        });
        
        if (error) throw error;
        showNotification('Conta criada! Confirme seu e-mail.', '#16a34a');
        setTimeout(() => { showLoading(false); toggleForms(); }, 2000);
    } catch (error) {
        showNotification(error.message, '#ef4444');
        showLoading(false);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const isSignup = document.getElementById('signup-form').style.display !== 'none';
                isSignup ? handleSignup() : handleLogin();
            }
        });
    });
});