import { ASSETS_URL } from '.'

const fileLoader = game => {
  game.load.crossOrigin = 'Anonymous';
// game.stage.backgroundColor = '#1E1E1E';
game.stage.backgroundColor = 'black';
  
game.load.image('asphalt', `${ASSETS_URL}/img/asphalt/asphalt_1080p.jpg`);
//  game.load.image('asphalt', `${ASSETS_URL}/img/asphalt/asphalt.png`)

  game.load.image('car', `${ASSETS_URL}/img/car/car.png`);
  // console.log(`Build: ${new Date().toString()}`);
  
  //joystick:
  game.load.image('touch', `${ASSETS_URL}/img/ui/joy/touch.png`);
  game.load.image('touch_segment', `${ASSETS_URL}/img/ui/joy/touch_segment.png`);
  game.load.image('compass', `${ASSETS_URL}/img/ui/joy/compass_rose.png`);

}

export default fileLoader
