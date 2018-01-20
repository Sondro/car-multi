import { WORLD_SIZE } from './../../config'

const { width, height } = WORLD_SIZE;

const worldCreator = game => {
  // Start P2 physics engine
  game.physics.startSystem(Phaser.Physics.P2JS);
  // We set this to true so our game won't pause if we focus
  // something else other than the browser
  game.stage.disableVisibilityChange = true;
  // Here we set the bounds of our game world
  game.world.setBounds(0, 0, width, height);
  createMap(game);
}

//let tileW = 64;
//let tileH = 64;
let tileW = 1024;
let tileH = 1024;

const createMap = game => {
  let groundTiles = []
  for (let i = 0; i <= width / tileW + 1; i++) {
    for (let j = 0; j <= height / tileH + 1; j++) {
      const groundSprite = game.add.sprite(i * tileW, j * tileH, 'asphalt');
      groundTiles.push(groundSprite);
    }
  }
}

export default worldCreator;
