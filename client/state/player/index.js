import createPlayer from './createPlayer';
import { isDown, neg } from '../utils';
export default function (x, y, game, socket) {
  const player = {
    socket,
    sprite: createPlayer(x, y, game),
    playerName: null,
    playerNum: 3,
    speed: 0,
    speedText: null,
    drive (game) {
      /*
      Most of the driving logic was written by Daniel Wuggenig
      https://www.anexia-it.com/blog/en/introduction-to-the-phaser-framework/
      I decided to use it since this is supposed to be an introduction to multiplayer
      online car game, his driving solution is simple and clean and fits perfectly
      */

      const KEYS = {
        W: Phaser.Keyboard.W,
        S: Phaser.Keyboard.S,
        A: Phaser.Keyboard.A,
        D: Phaser.Keyboard.D,
        aU: Phaser.Keyboard.UP,
        aD: Phaser.Keyboard.DOWN,
        aL: Phaser.Keyboard.LEFT,
        aR: Phaser.Keyboard.RIGHT,
      }

      let camaro_maxFor = 401;
      let camaro_maxRev = -200;
      let camaro_accelFor = 10;
      let camaro_accelRev = 5;
      
      let maxFor = camaro_maxFor;
      let maxRev = camaro_maxRev;
      let accelFor = camaro_accelFor;
      let accelRev = camaro_accelRev;
      let negLimit = neg(accelRev);

      // Only emit if the player is moving
      if (this.speed !== 0) {
        this.emitPlayerData()
      }

      // Drive forward if W is pressed down
      
      if (isDown(game, KEYS.W) && !isDown(game, KEYS.aU) && this.speed < 401 || 
          isDown(game, KEYS.aU) && !isDown(game, KEYS.W) && this.speed < 401) 
        { this.speed += 10; }
        else if (this.speed >= 10) { this.speed -= 10; }

      // Drive backwards if S is pressed down
      
      if (isDown(game, KEYS.S ) && !isDown(game, KEYS.aD) && this.speed > -201 ||
       isDown(game, KEYS.aD) && !isDown(game, KEYS.S) && this.speed > -201) 
       { this.speed -= 5 } 
       else if (this.speed <= -5) 
       { this.speed += 5; }

      // Steers the car
      if (isDown(game, KEYS.A) && !isDown(game, KEYS.aL) || isDown(game, KEYS.aL) && !isDown(game, KEYS.A)) {
        this.sprite.body.angularVelocity = -5 * (this.speed / 1000)
      } else if (isDown(game, KEYS.D) || isDown(game, KEYS.aR)) {
        this.sprite.body.angularVelocity = 5 * (this.speed / 1000)
      } else {
        this.sprite.body.angularVelocity = 0
      }

      this.sprite.body.velocity.x = this.speed * Math.cos((this.sprite.body.angle - 360) * 0.01745);
      this.sprite.body.velocity.y = this.speed * Math.sin((this.sprite.body.angle - 360) * 0.01745);

      // Brings the player's sprite to top
      game.world.bringToTop(this.sprite);

      this.updatePlayerName();
      this.updatePlayerStatusText('speed', this.sprite.body.x - 57, this.sprite.body.y - 39, this.speedText);
    },
    emitPlayerData () {
      // Emit the 'move-player' event, updating the player's data on the server
      socket.emit('move-player', {
        x: this.sprite.body.x,
        y: this.sprite.body.y,
        angle: this.sprite.body.rotation,
        playerName: {
          name: this.playerName.text,
          x: this.playerName.x,
          y: this.playerName.y
        },
        speed: {
          value: this.speed,
          x: this.speedText.x,
          y: this.speedText.y
        }
      });
    },
    //name = this.socket.id
    updatePlayerName (name = `P${this.playerNum}`, x = this.sprite.body.x - 57, y = this.sprite.body.y - 59) {
      // Updates the player's name text and position
      this.playerName.text = `P${this.playerNum}`;
      //this.playerName.text = String(name);
      this.playerName.x = x;
      this.playerName.y = y;
      // Bring the player's name to top
      game.world.bringToTop(this.playerName)
    },
    updatePlayerStatusText (status, x, y, text) {
      // Capitalize the status text
      const capitalizedStatus = status[0].toUpperCase() + status.substring(1);
      let newText = ''
      // Set the speed text to either 0 or the current speed
      this[status] < 0 ? this.newText = 0 : this.newText = this[status];
      // Updates the text position and string
      text.x = x;
      text.y = y;
      text.text = `${capitalizedStatus}: ${parseInt(this.newText)}`
      game.world.bringToTop(text);
    }
  }
  return player;
}
