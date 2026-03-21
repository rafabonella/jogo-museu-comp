const FASE3 = {
  titulo:         'FASE 3 — NAVEGAÇÃO',
  direcaoInicial: 0,   // aponta para a direita

  inicio: { r: 0, c: 0 },

  // Mapa: 0 = parede, 1 = caminho, 3 = bug
  mapa: [
    [ 1, 1, 1, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 1, 1, 3, 0, 0 ],  // bug em (3,5)
    [ 0, 0, 0, 0, 0, 1, 0, 0 ],
    [ 0, 0, 0, 0, 0, 1, 0, 0 ],
    [ 0, 3, 1, 1, 1, 1, 0, 0 ],  // bug em (6,1)
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  ],

  curiosidade: 'Para falar com o computador da missão, os astronautas usavam uma linguagem simples: uma ação e um dado. Ver a velocidade? 06 (exibir) e 60 (velocidade).',

  proximaFase: () => Engine.init(FASE4, 'game-canvas', 4),
};
