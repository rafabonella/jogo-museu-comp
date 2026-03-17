// ============================================================
//  SCRIPT.JS — Inicializador e ligação dos botões
//  Para adicionar novas fases: importe o arquivo faseN.js no
//  HTML e chame Engine.init(FASEN, 'grid') quando quiser trocar.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Controle do Menu Inicial ────────────────────────────────
  const telaInicial = document.getElementById('tela-inicial');
  const containerJogo = document.getElementById('container-jogo');
  const btnIniciar = document.getElementById('btn-iniciar-jogo');

  // O jogo só começa de fato quando este botão é clicado
  btnIniciar.addEventListener('click', () => {
      telaInicial.classList.add('oculta');      // Esconde o menu
      containerJogo.classList.remove('oculta'); // Mostra o jogo
      
      // Inicializa a engine na Fase 1
      // Troque FASE1 por FASE2, FASE3... conforme quiser carregar.
      Engine.init(FASE1, 'grid');
  });

  // ── Botões de comando ──────────────────────────────────────
  document.getElementById('btn-frente') .addEventListener('click', () => Engine.adicionarComando('frente'));
  document.getElementById('btn-esq')    .addEventListener('click', () => Engine.adicionarComando('esq'));
  document.getElementById('btn-dir')    .addEventListener('click', () => Engine.adicionarComando('dir'));
  document.getElementById('btn-coletar').addEventListener('click', () => Engine.adicionarComando('coletar'));

  // ── Limpar / Executar ──────────────────────────────────────
  document.getElementById('btn-executar').addEventListener('click', () => Engine.executar());

  // Botão de limpar (se existir no HTML)
  const btnLimpar = document.getElementById('btn-limpar');
  if (btnLimpar) btnLimpar.addEventListener('click', () => Engine.limparComandos());

});