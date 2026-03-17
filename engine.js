// ============================================================
//  ENGINE.JS — Mecânica central do jogo
//  Independente de fase. Recebe um objeto "fase" e roda tudo.
// ============================================================

const Engine = (() => {

  // Estado interno
  let faseAtual  = null;
  let gridEl     = null;
  let comandos   = [];        // fila de comandos montada pelo jogador
  let pos        = { r: 0, c: 0 };
  let direcao    = 0;         // 0=direita 1=baixo 2=esquerda 3=cima
  let executando = false;

  const DIRS = [
    { dr: 0, dc: 1,  nome: '→' },   // 0 direita
    { dr: 1, dc: 0,  nome: '↓' },   // 1 baixo
    { dr: 0, dc: -1, nome: '←' },   // 2 esquerda
    { dr: -1, dc: 0, nome: '↑' },   // 3 cima
  ];

  // ---- Inicialização ----------------------------------------
  function init(fase, gridElementId) {
    faseAtual = fase;
    gridEl    = document.getElementById(gridElementId);
    comandos  = [];
    pos       = { ...fase.inicio };
    direcao   = fase.direcaoInicial ?? 0;
    executando = false;

    _renderizarCabecalho(fase);
    _renderizarGrid();
    _atualizarFilaUI();
  }

  function _renderizarCabecalho(fase) {
    const h2 = document.querySelector('#cabecalho h2');
    const p  = document.querySelector('#cabecalho p');
    if (h2) h2.textContent = fase.titulo;
    if (p)  p.textContent  = fase.descricao;
  }

  // ---- Grid -------------------------------------------------
  function _renderizarGrid() {
    gridEl.innerHTML = '';
    const rows = faseAtual.mapa.length;
    const cols = faseAtual.mapa[0].length;
    gridEl.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridEl.style.gridTemplateRows    = `repeat(${rows}, 1fr)`;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement('div');
        cell.classList.add('celula');
        cell.dataset.r = r;
        cell.dataset.c = c;

        const tipo = faseAtual.mapa[r][c];
        if (tipo === 1) cell.classList.add('caminho');
        if (tipo === 2) cell.classList.add('parede');
        if (tipo === 3) cell.classList.add('objetivo');

        gridEl.appendChild(cell);
      }
    }
    _renderizarPersonagem();
  }

  function _renderizarPersonagem() {
    // limpa personagem anterior
    document.querySelectorAll('.personagem').forEach(el => {
      el.classList.remove('personagem');
      el.innerHTML = '';
    });

    const cell = _getCell(pos.r, pos.c);
    if (!cell) return;
    cell.classList.add('personagem');

    const seta = document.createElement('span');
    seta.textContent = DIRS[direcao].nome;
    seta.style.cssText = 'font-size:clamp(10px,2vw,18px); line-height:1; color:#fff; pointer-events:none;';
    cell.appendChild(seta);
  }

  function _getCell(r, c) {
    return gridEl.querySelector(`[data-r="${r}"][data-c="${c}"]`);
  }

  // ---- Comandos UI ------------------------------------------
  function adicionarComando(tipo) {
    if (executando) return;
    comandos.push(tipo);
    _atualizarFilaUI();
  }

  function limparComandos() {
    if (executando) return;
    comandos = [];
    _atualizarFilaUI();
  }

  function _atualizarFilaUI() {
    const fila  = document.getElementById('fila-comandos');
    const vazia = document.getElementById('msg-vazia');
    if (!fila) return;

    // remove blocos anteriores mas mantém #msg-vazia
    fila.querySelectorAll('.bloco-comando').forEach(el => el.remove());

    if (comandos.length === 0) {
      if (vazia) vazia.style.display = 'block';
      return;
    }
    if (vazia) vazia.style.display = 'none';

    const LABELS = {
      frente:  '↑ Avançar',
      esq:     '⭯ Girar à Esquerda',
      dir:     '⭮ Girar à Direita',
      coletar: '⚙️ Coletar',
    };

    comandos.forEach((cmd, idx) => {
      const bloco = document.createElement('div');
      bloco.classList.add('bloco-comando');
      bloco.innerHTML = `
        <span>${LABELS[cmd] ?? cmd}</span>
        <span class="btn-remover" data-idx="${idx}" style="cursor:pointer;color:#e94560;font-weight:bold;">✕</span>
      `;
      bloco.querySelector('.btn-remover').addEventListener('click', () => {
        if (!executando) { comandos.splice(idx, 1); _atualizarFilaUI(); }
      });
      fila.appendChild(bloco);
    });

    fila.scrollTop = fila.scrollHeight;
  }

  // ---- Execução ---------------------------------------------
  async function executar() {
    if (executando || comandos.length === 0) return;
    executando = true;

    for (let i = 0; i < comandos.length; i++) {
      const cmd = comandos[i];
      _destacarComandoAtivo(i);

      if (cmd === 'frente') {
        const ok = _mover();
        if (!ok) { _erro('Bateu numa parede! Tente novamente.'); return; }
        await _sleep(300);
      } else if (cmd === 'esq') {
        direcao = (direcao + 3) % 4;
        _renderizarPersonagem();
        await _sleep(300);
      } else if (cmd === 'dir') {
        direcao = (direcao + 1) % 4;
        _renderizarPersonagem();
        await _sleep(300);
      } else if (cmd === 'coletar') {
        const tipo = faseAtual.mapa[pos.r][pos.c];
        if (tipo === 3) {
          _sucesso();
          return;
        } else {
          _erro('Não há nada para coletar aqui!');
          return;
        }
      }
    }

    // terminou todos os comandos sem coletar
    _erro('Sequência incompleta. Você não chegou ao objetivo!');
  }

  function _mover() {
    const d  = DIRS[direcao];
    const nr = pos.r + d.dr;
    const nc = pos.c + d.dc;
    const rows = faseAtual.mapa.length;
    const cols = faseAtual.mapa[0].length;

    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) return false;
    if (faseAtual.mapa[nr][nc] !== 1 && faseAtual.mapa[nr][nc] !== 3) return false;  // parede ou vazio

    pos = { r: nr, c: nc };
    _renderizarPersonagem();
    return true;
  }

  function _destacarComandoAtivo(idx) {
    const blocos = document.querySelectorAll('.bloco-comando');
    blocos.forEach((b, i) => {
      b.style.outline = i === idx ? '2px solid #ffd700' : 'none';
      b.style.opacity = i < idx ? '0.4' : '1';
    });
  }

  // ---- Feedback ---------------------------------------------
  function _erro(msg) {
    executando = false;
    // Passamos 'false' para NÃO limpar os comandos quando ele erra
    _mostrarModal('❌ Erro!', msg, '#e94560', 'Tentar Novamente', () => _reiniciar(false));
  }

  function _sucesso() {
    executando = false;
    const temProxima = !!faseAtual.proximaFase;
    const btnLabel   = temProxima ? 'Próxima Fase ➜' : 'Jogar Novamente';
    _mostrarModal('🏆 Parabéns!', faseAtual.msgSucesso ?? 'Você concluiu a fase!', '#4caf50', btnLabel, () => {
      if (temProxima) faseAtual.proximaFase();
      // Passamos 'true' para limpar os comandos se ele for recomeçar o jogo do zero
      else _reiniciar(true); 
    });
  }

  // Adicionamos o parâmetro limparFila (que por padrão é false)
  function _reiniciar(limparFila = false) {
    pos       = { ...faseAtual.inicio };
    direcao   = faseAtual.direcaoInicial ?? 0;
    executando = false;
    
    // Só zera o array se for explicitamente solicitado
    if (limparFila) {
        comandos = [];
        _atualizarFilaUI();
    }

    _renderizarGrid();
    
    // Tira os destaques visuais (aquele brilho amarelo) dos blocos
    document.querySelectorAll('.bloco-comando').forEach(b => {
      b.style.outline = 'none';
      b.style.opacity = '1';
    });
  }

  function _mostrarModal(titulo, msg, cor, btnLabel, callback) {
    // Remove modal antigo se existir
    document.getElementById('modal-feedback')?.remove();

    const overlay = document.createElement('div');
    overlay.id = 'modal-feedback';
    overlay.style.cssText = `
      position:fixed; inset:0; background:rgba(0,0,0,0.7);
      display:flex; justify-content:center; align-items:center;
      z-index:1000; animation: fadeIn 0.2s ease;
    `;

    overlay.innerHTML = `
      <div style="
        background:#1a1a2e; border:3px solid ${cor}; border-radius:16px;
        padding:32px 40px; text-align:center; max-width:340px;
        box-shadow: 0 0 40px ${cor}55;
        animation: popIn 0.3s cubic-bezier(.34,1.56,.64,1);
      ">
        <div style="font-size:48px; margin-bottom:12px;">${titulo.split(' ')[0]}</div>
        <h3 style="color:${cor}; font-size:22px; margin-bottom:10px;">${titulo.replace(titulo.split(' ')[0]+' ','')}</h3>
        <p style="color:#ccc; margin-bottom:24px; line-height:1.5;">${msg}</p>
        <button id="btn-modal-ok" style="
          background:${cor}; color:#fff; border:none; border-radius:8px;
          padding:12px 32px; font-size:16px; font-weight:bold; cursor:pointer;
        ">${btnLabel}</button>
      </div>
    `;

    // Injetar keyframes se ainda não existirem
    if (!document.getElementById('modal-keyframes')) {
      const style = document.createElement('style');
      style.id = 'modal-keyframes';
      style.textContent = `
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes popIn  { from{transform:scale(0.7);opacity:0} to{transform:scale(1);opacity:1} }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(overlay);
    document.getElementById('btn-modal-ok').addEventListener('click', () => {
      overlay.remove();
      callback();
    });
  }

  // ---- Utils ------------------------------------------------
  function _sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  // ---- API pública ------------------------------------------
  return { init, adicionarComando, limparComandos, executar };

})();