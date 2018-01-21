import createPlayer from './createPlayer';
import { isDown, neg, getMPH, } from '../utils';
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

      let camaro1967_maxFor = 801;
      let camaro1967_maxRev = -200;
      let camaro1967_accelFor = 3;
      let camaro1967_accelRev = 1;
      
      let maxFor = camaro1967_maxFor;
      let maxRev = camaro1967_maxRev;
      let accelFor = camaro1967_accelFor;
      let accelRev = camaro1967_accelRev;
      let negLimit = neg(accelRev);

      // Only emit if the player is moving
      if (this.speed !== 0) {
        this.emitPlayerData()
      }

      // Drive forward if W is pressed down
      
      if (isDown(game, KEYS.W) && !isDown(game, KEYS.aU) && this.speed < 801 || 
          isDown(game, KEYS.aU) && !isDown(game, KEYS.W) && this.speed < 801) 
        { this.speed += 3; }
        else if (this.speed >= 3) { this.speed -= 3; }

      // Drive backwards if S is pressed down
      
      if (isDown(game, KEYS.S ) && !isDown(game, KEYS.aD) && this.speed > -201 ||
       isDown(game, KEYS.aD) && !isDown(game, KEYS.S) && this.speed > -201) 
       { this.speed -= 1 } 
       else if (this.speed <= -1) 
       { this.speed += 1; }

      // Steers the car
      if (isDown(game, KEYS.A) && !isDown(game, KEYS.aL) || isDown(game, KEYS.aL) && !isDown(game, KEYS.A)) {
        this.sprite.body.angularVelocity = -7 * (this.speed / 1000);
      } else if (isDown(game, KEYS.D) || isDown(game, KEYS.aR)) {
        this.sprite.body.angularVelocity = 7 * (this.speed / 1000);
      } else {
        this.sprite.body.angularVelocity = 0;
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
      game.world.bringToTop(this.playerName);
    },
    updatePlayerStatusText (status, x, y, text) {
      // Capitalize the status text
      const capitalizedStatus = status[0].toUpperCase() + status.substring(1);
      let newText = ''
      // Set the speed text to either 0 or the current speed
      //this[status] < 0 ? this.newText = 0 : this.newText = this[status];

      //if (this[status] < 0) { this.newText = neg(this[status]); }
      // Updates the text position and string
      text.x = x;
      text.y = y;
      text.text = `${capitalizedStatus}: ${parseInt(this.newText)}`
      text.text = text.text.replace(`${this.speed}`, `${(getMPH(this.speed).toString().padStart(3, '0'))} / mph`);
      if (this[status] < 0) { text.text = text.text.replace(`-`, ``); }
      game.world.bringToTop(text);
    }
  }
  return player;
}
