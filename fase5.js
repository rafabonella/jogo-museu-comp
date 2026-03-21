const FASE5 = {
  titulo:         'FASE 5 — POUSO FINAL',
  direcaoInicial: 0,   // aponta para a direita

  inicio: { r: 0, c: 0 },

  // Mapa: 0 = parede, 1 = caminho, 3 = bug
  mapa: [
    [ 1, 1, 0, 0, 0, 0, 0, 0 ],  
    [ 0, 1, 0, 3, 1, 1, 0, 0 ],  // bug em (1,3)
    [ 0, 1, 0, 0, 0, 1, 0, 0 ],  
    [ 0, 1, 1, 1, 1, 1, 0, 0 ],  
    [ 0, 0, 0, 0, 0, 1, 0, 0 ],  
    [ 0, 3, 1, 1, 1, 3, 0, 0 ],  // bugs em (5,1) e (5,5)
    [ 0, 1, 0, 0, 0, 0, 0, 3 ],  // bug em (6,7)
    [ 0, 1, 1, 1, 1, 1, 1, 1 ], 
  ],

  curiosidade: 'Hoje em dia, o código-fonte do Apollo 11, escrito em AGC Assembly Language, está disponível gratuitamente na internet e pode ser acessado por qualquer pessoa!',

  proximaFase: null,
};
