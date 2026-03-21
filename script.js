// ============================================================
//  SCRIPT.JS — Inicializador e ligação dos botões
//
//  Ordem de carregamento no HTML (importante):
//    1. engine.js  — motor central (sem dependências)
//    2. faseN.js   — dados de cada fase (sem dependências)
//    3. script.js  — inicializador (depende de engine + fases)
//
//  Para adicionar novas fases:
//    • Crie faseN.js seguindo o modelo das fases existentes
//    • Adicione <script src="faseN.js"> no HTML antes de script.js
//    • Na fase anterior, defina: proximaFase: () => Engine.init(FASEN, 'game-canvas', N)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Controle da tela inicial ────────────────────────────
  const telaInicial   = document.getElementById('tela-inicial');
  const containerJogo = document.getElementById('container-jogo');

  document.getElementById('btn-iniciar-jogo').addEventListener('click', () => {
    telaInicial.style.display   = 'none';
    containerJogo.style.display = 'flex';
    containerJogo.style.flexDirection = 'column';
    Engine.init(FASE1, 'game-canvas', 1);
  });

  // ── Botões de comando ───────────────────────────────────
  document.getElementById('btn-frente') .addEventListener('click', () => Engine.adicionarComando('frente'));
  document.getElementById('btn-esq')    .addEventListener('click', () => Engine.adicionarComando('esq'));
  document.getElementById('btn-dir')    .addEventListener('click', () => Engine.adicionarComando('dir'));
  document.getElementById('btn-coletar').addEventListener('click', () => Engine.adicionarComando('coletar'));

  // ── Executar e limpar ───────────────────────────────────
  document.getElementById('btn-executar').addEventListener('click', () => Engine.executar());
  document.getElementById('btn-limpar')  .addEventListener('click', () => Engine.limparComandos());

});
