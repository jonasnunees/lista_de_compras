# 🚀 Guia de Configuração - Supermercado Pro

Este guia vai te ajudar a configurar o projeto com Supabase do zero.

## 📋 Pré-requisitos

- Conta no [Supabase](https://supabase.com) (gratuita)
- Conta no [Vercel](https://vercel.com) (gratuita)
- Git instalado

---

## 1️⃣ Configurar o Supabase

### Passo 1: Criar o Projeto

1. Acesse [supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em **"New Project"**
4. Preencha:
   - **Name**: `supermercado-pro`
   - **Database Password**: Escolha uma senha forte
   - **Region**: Escolha a mais próxima (ex: South America)
5. Clique em **"Create new project"**
6. Aguarde alguns minutos até o projeto ser criado

### Passo 2: Criar as Tabelas

1. No painel do Supabase, clique em **"SQL Editor"** (ícone de banco de dados)
2. Clique em **"New query"**
3. Copie todo o conteúdo do arquivo `database.sql`
4. Cole no editor SQL
5. Clique em **"Run"** (ou pressione Ctrl + Enter)
6. Aguarde a mensagem de sucesso ✅

### Passo 3: Verificar as Tabelas

1. Clique em **"Table Editor"** no menu lateral
2. Você deve ver duas tabelas:
   - ✅ `current_shopping`
   - ✅ `shopping_history`

### Passo 4: Pegar as Credenciais

1. Clique em **"Settings"** (ícone de engrenagem) no menu lateral
2. Clique em **"API"**
3. Você verá:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public**: `eyJhbGc...` (chave pública)
4. **Copie essas duas informações** - vamos usar a seguir!

---

## 2️⃣ Configurar o Código

### Atualizar auth.js

Abra o arquivo `auth.js` e substitua:

```javascript
// Linha 8-9
const SUPABASE_URL = 'https://seu-projeto.supabase.co'; // Cole sua URL aqui
const SUPABASE_KEY = 'sua-chave-publica-aqui'; // Cole sua chave anon public aqui
```

### Atualizar script.js

Abra o arquivo `script.js` e substitua:

```javascript
// Linha 8-9
const SUPABASE_URL = 'https://seu-projeto.supabase.co'; // Cole sua URL aqui
const SUPABASE_KEY = 'sua-chave-publica-aqui'; // Cole sua chave anon public aqui
```

---

## 3️⃣ Configurar Autenticação por Email

### Habilitar Email Authentication

1. No Supabase, clique em **"Authentication"** no menu lateral
2. Clique em **"Providers"**
3. Certifique-se que **"Email"** está habilitado (toggle verde)
4. Em **"Email Auth"**, configure:
   - ✅ Enable email confirmations: **DESABILITADO** (para facilitar testes)
   - ✅ Enable email signup: **HABILITADO**

### Configurar Email Templates (Opcional)

1. Vá em **"Email Templates"**
2. Você pode personalizar os emails de confirmação
3. Para desenvolvimento, deixe como está

---

## 4️⃣ Deploy no Vercel

### Preparar o Repositório

1. Crie um repositório no GitHub
2. Faça commit de todos os arquivos:
```bash
git init
git add .
git commit -m "Primeira versão com Supabase"
git branch -M main
git remote add origin https://github.com/seu-usuario/supermercado-pro.git
git push -u origin main
```

### Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Clique em **"Import Project"**
4. Selecione seu repositório `supermercado-pro`
5. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: ./
6. Em **"Environment Variables"**, adicione:
   - `SUPABASE_URL`: sua URL do Supabase
   - `SUPABASE_KEY`: sua chave pública
7. Clique em **"Deploy"**
8. Aguarde o deploy finalizar ✅

---

## 5️⃣ Testar a Aplicação

### Teste de Cadastro

1. Acesse sua URL do Vercel (ex: `supermercado-pro.vercel.app`)
2. Você será redirecionado para `/login.html`
3. Clique em **"Cadastre-se"**
4. Preencha:
   - Nome completo
   - Email (use um email real)
   - Senha (mínimo 6 caracteres)
5. Clique em **"Criar conta"**
6. Você deve ver: ✅ "Conta criada com sucesso!"

### Teste de Login

1. Na tela de login, use o email e senha criados
2. Clique em **"Entrar"**
3. Você deve ser redirecionado para a tela principal
4. Veja seu nome no canto superior direito

### Teste de Funcionalidades

1. **Adicionar Produto**:
   - Defina um orçamento (ex: R$ 100)
   - Adicione produtos com nome, quantidade e preço
   - Veja os valores atualizando em tempo real

2. **Editar/Remover**:
   - Clique no ✎ para editar
   - Clique no ✕ para remover

3. **Finalizar Compra**:
   - Clique em "Finalizar e Salvar"
   - Confirme a finalização
   - Veja a compra aparecer no histórico

4. **Histórico**:
   - Filtre por mês e ano
   - Veja o total gasto no período

5. **Logout**:
   - Clique em "Sair"
   - Faça login novamente
   - Seus dados devem estar salvos!

---

## 6️⃣ Verificar Dados no Supabase

### Ver os Dados Salvos

1. Acesse o Supabase
2. Clique em **"Table Editor"**
3. Selecione `shopping_history`
4. Você deve ver suas compras salvas ✅

### Ver Usuários Cadastrados

1. Clique em **"Authentication"** → **"Users"**
2. Você deve ver os usuários cadastrados

---

## 🐛 Solução de Problemas

### Erro: "Failed to fetch"

**Problema**: As credenciais do Supabase não foram configuradas corretamente.

**Solução**:
1. Verifique se você substituiu `SUPABASE_URL` e `SUPABASE_KEY` nos arquivos `auth.js` e `script.js`
2. Certifique-se de usar a chave **anon public**, não a chave **service_role**

### Erro: "JWT expired" ou "Invalid JWT"

**Problema**: O token de autenticação expirou.

**Solução**:
1. Faça logout
2. Faça login novamente

### Não recebe email de confirmação

**Problema**: O Supabase está configurado para exigir confirmação de email.

**Solução**:
1. No Supabase, vá em **Authentication** → **Providers**
2. Desabilite **"Enable email confirmations"**
3. Ou configure o SMTP nas configurações de email

### Dados não aparecem

**Problema**: As políticas RLS (Row Level Security) podem estar bloqueando.

**Solução**:
1. Execute novamente o script `database.sql` completo
2. Verifique se as políticas foram criadas corretamente

### Erro 403 ao salvar dados

**Problema**: O usuário não tem permissão para salvar dados.

**Solução**:
1. Verifique se o RLS está configurado corretamente
2. Certifique-se de estar logado (verifique o console do navegador)

---

## 📚 Recursos Úteis

- [Documentação do Supabase](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Database](https://supabase.com/docs/guides/database)
- [Vercel Docs](https://vercel.com/docs)

---

## 🎉 Tudo Pronto!

Agora você tem um sistema completo de lista de compras com:
- ✅ Autenticação segura
- ✅ Banco de dados na nuvem
- ✅ Deploy automático
- ✅ Dados sincronizados entre dispositivos

**Aproveite e boas compras! 🛒💰**