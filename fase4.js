const FASE4 = {
  titulo:         'FASE 4 — APROXIMAÇÃO',
  direcaoInicial: 1,   // aponta para baixo

  inicio: { r: 0, c: 7 },

  // Mapa: 0 = parede, 1 = caminho, 3 = bug
  mapa: [
    [ 0, 0, 0, 0, 0, 0, 0, 1 ], 
    [ 0, 0, 0, 0, 0, 0, 0, 1 ],
    [ 0, 0, 0, 3, 1, 1, 1, 1 ],  // bug em (2,3)
    [ 0, 0, 0, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 1, 0, 0, 0, 0 ],
    [ 0, 0, 3, 1, 1, 1, 3, 0 ],  // bugs em (5,2) e (5,6)
    [ 0, 0, 1, 0, 0, 0, 1, 0 ],
    [ 0, 0, 3, 1, 1, 1, 1, 0 ],  // bug em (7,2)
  ],

  curiosidade: 'A engenheira Margaret Hamilton liderou a equipe que escreveu o codigo do Apollo 11. O sistema que ela criou se recuperou sozinho de uma falha três minutos antes do pouso, evitando que a missão fosse abortada.',

  proximaFase: () => Engine.init(FASE5, 'game-canvas', 5),
};
