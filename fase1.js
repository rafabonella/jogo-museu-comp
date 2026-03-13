const FASE1 = {
  titulo:          'Fase 1: O Início',
  descricao:       'Ajude Ada Lovelace a chegar na Máquina Analítica de Babbage',
  direcaoInicial:  0,   // 0=direita

  // Posição inicial (linha, coluna) — canto superior esquerdo
  inicio: { r: 4, c: 0 },

  mapa: [
    //col: 0  1  2  3  4  5  6  7
   [ 0, 0, 0, 0, 0, 0, 0, 0 ],  // row 0
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],  // row 1
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],  // row 2
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],  // row 3
    [ 1, 1, 1, 1, 1, 1, 1, 3 ],  // row 4
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],  // row 5
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],  // row 6
    [ 0, 0, 0, 0, 0, 0, 0, 0 ]   // row 7  ← objetivo em (7,6)
  ],

  // Callback opcional para quando o jogador vencer (carrega próxima fase)
  proximaFase: () => Engine.init(FASE2, 'grid'),
  // Para habilitar: proximaFase: () => Engine.init(FASE2, 'grid')
};