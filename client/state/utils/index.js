export const neg = (n) => {
  return 0 - n;
}
export const getMPH = (n, s = 0.0833) => {
  if(n < 1) { return 0; }
  return Math.floor(((n * s) * 3600) / 5280);
}
export const getMPHStr3 = (n, s = 0.0833) => {
  if(n < 1) { return 0; }
  return Math.floor(((n * s) * 3600) / 5280).toString().padStart(3, '0'));
}
export const getMPHStr4 = (n, s = 0.0833) => {
  if(n < 1) { return 0; }
  return Math.floor(((n * s) * 3600) / 5280).toString().padStart(4, '0'));
}
export const isDown = (game, key) => game.input.keyboard.isDown(key);
export const createText = (game, target) =>
  game.add.text(target.x, target.y, '', {
    fontSize: '12px',
    fill: '#FFF',
    align: 'center'
  })
