const FASE2 = {
  titulo:         'FASE 2 — ÓRBITA',
  direcaoInicial: 0,   // aponta para a direita

  inicio: { r: 0, c: 0 },

  // Mapa: 0 = parede, 1 = caminho, 3 = bug
  mapa: [
    [ 1, 1, 1, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 1, 1, 1, 3, 0 ],  // bug em (4,6)
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  ],

  curiosidade: 'O código do Apollo 11 foi costurado à mão! A memória permanente do computador (ROM) era feita passando fios por anéis magnéticos minúsculos.',

  proximaFase: () => Engine.init(FASE3, 'game-canvas', 3),
};
