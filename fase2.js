const FASE2 = {
  titulo:          'Fase 2: O teste',
  descricao:       'Ajude Ada Lovelace a chegar na Máquina Analítica de Babbage',
  direcaoInicial:  0,   // 0=direita

  // Posição inicial (linha, coluna) — canto superior esquerdo
  inicio: { r: 0, c: 0 },

  mapa: [
    //col: 0  1  2  3  4  5  6  7
    [      1, 1, 1, 0, 1, 1, 1, 1 ],  // row 0
    [      0, 1, 0, 1, 0, 1, 0, 1 ],  // row 1
    [      1, 1, 1, 1, 1, 1, 0, 1 ],  // row 2
    [      1, 0, 1, 0, 1, 1, 1, 0 ],  // row 3
    [      1, 1, 0, 1, 0, 1, 0, 1 ],  // row 4
    [      0, 1, 0, 0, 1, 1, 1, 1 ],  // row 5
    [      1, 1, 1, 0, 1, 0, 3, 0 ],  // row 6
    [      1, 0, 1, 1, 1, 1, 0, 0 ],  // row 7  ← objetivo em (7,6)
  ],

  // Callback opcional para quando o jogador vencer (carrega próxima fase)
  proximaFase: null,
  // Para habilitar: proximaFase: () => Engine.init(FASE2, 'grid')
};