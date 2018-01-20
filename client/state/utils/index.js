export const isDown = (game, key) => game.input.keyboard.isDown(key);
export const isUp = (game, key) => game.input.keyboard.isUp(key);
export const createText = (game, target) =>
  game.add.text(target.x, target.y, '', {
    fontSize: '12px',
    fill: '#FFF',
    align: 'center'
  })
