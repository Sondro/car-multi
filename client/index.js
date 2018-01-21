import { WINDOW_WIDTH, WINDOW_HEIGHT } from './config';
import Game from './state/Game';

class App extends Phaser.Game {
  constructor () {
    super(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.AUTO);
    this.state.add('Game', Game);
    this.state.start('Game');
    this.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
  }
}

const SimpleGame = new App();
