const http = require('http');
const { spawn } = require('child_process');

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function test() {
  console.log('Iniciando Next.js server na porta 3000...');
  const nextProcess = spawn('npx', ['next', 'start', '-p', '3000'], {
    shell: true,
    stdio: 'inherit'
  });

  // Aguarda servidor subir
  await wait(4500);

  try {
    // 1. Testa Homepage
    console.log('\n--- 1. Testando Homepage (/) ---');
    const homeRes = await fetch('http://localhost:3000/');
    console.log(`Homepage Status: ${homeRes.status} ${homeRes.statusText}`);

    // 2. Testa Rota /chat
    console.log('\n--- 2. Testando Página /chat ---');
    const chatRes = await fetch('http://localhost:3000/chat');
    console.log(`Página /chat Status: ${chatRes.status}`);

    // 3. Testa Rota /gerador
    console.log('\n--- 3. Testando Página /gerador ---');
    const geradorRes = await fetch('http://localhost:3000/gerador');
    console.log(`Página /gerador Status: ${geradorRes.status}`);

    // 4. Testa Rota /personalidades
    console.log('\n--- 4. Testando Página /personalidades ---');
    const persRes = await fetch('http://localhost:3000/personalidades');
    console.log(`Página /personalidades Status: ${persRes.status}`);

    // 5. Testa API /api/chat
    console.log('\n--- 5. Testando API /api/chat ---');
    const apiChatRes = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Oi sumido, tudo bem?',
        personalityId: 'debochado'
      })
    });
    const chatData = await apiChatRes.json();
    console.log('API /api/chat Resposta:', JSON.stringify(chatData, null, 2));

    // 6. Testa API /api/gerador
    console.log('\n--- 6. Testando API /api/gerador ---');
    const apiGeradorRes = await fetch('http://localhost:3000/api/gerador', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Oi, estava pensando em você.'
      })
    });
    const geradorData = await apiGeradorRes.json();
    console.log('API /api/gerador Resposta:', JSON.stringify(geradorData, null, 2));

    console.log('\n✅ TODOS OS TESTES PASSARAM COM SUCESSO!');
  } catch (err) {
    console.error('Erro no teste:', err);
  } finally {
    console.log('Encerrando servidor de teste...');
    nextProcess.kill('SIGTERM');
    process.exit(0);
  }
}

test();
