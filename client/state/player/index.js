import createPlayer from './createPlayer';
import { isDown, getMPHstr3, neg, } from '../utils';
export default function (x, y, game, socket) {
  const player = {
    socket,
    sprite: createPlayer(x, y, game),
    playerName: null,
    playerNum: 7,
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

      let camaro1967_maxFor = 401;
      let camaro1967_maxRev = -200;
      let camaro1967_accelFor = 10;
      let camaro1967_accelRev = 5;
      let camaro1967_leftRate = -5;
      let camaro1967_rightRate = 5;
       

      let maxFor = camaro1967_maxFor;
      let maxRev = camaro1967_maxRev;
      let accelFor = camaro1967_accelFor;
      let accelRev = camaro1967_accelRev;
      let negLimit = neg(accelRev);
      let leftRate = camaro1967_leftRate;
      let rightRate = camaro1967_rightRate;

      // Only emit if the player is moving
      if (this.speed !== 0) {
        this.emitPlayerData()
      }

      // Drive forward if W is pressed down
      
      if (isDown(game, KEYS.W) && !isDown(game, KEYS.aU) && this.speed < maxFor || 
          isDown(game, KEYS.aU) && !isDown(game, KEYS.W) && this.speed < maxFor) 
        { this.speed += accelFor; }
        else if (this.speed >= accelFor) { this.speed -= accelFor; }

      // Drive backwards if S is pressed down
      
      if (isDown(game, KEYS.S ) && !isDown(game, KEYS.aD) && this.speed > maxRev ||
       isDown(game, KEYS.aD) && !isDown(game, KEYS.S) && this.speed > maxRev) 
       { this.speed -= accelRev } 
       else if (this.speed <= negLimit) 
       { this.speed += accelRev; }

      // Steers the car
      if (isDown(game, KEYS.A) && !isDown(game, KEYS.aL) || isDown(game, KEYS.aL) && !isDown(game, KEYS.A)) {
        this.sprite.body.angularVelocity = leftRate * (this.speed / 1000);
      } else if (isDown(game, KEYS.D) || isDown(game, KEYS.aR)) {
        this.sprite.body.angularVelocity = rightRate * (this.speed / 1000);
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
      //const capitalizedStatus = status[0].toUpperCase() + status.substring(1);
      if(this.speed >= 0) { this.speedAbs = this.speed; }
      else { this.speedAbs = neg(this.speed); }

      text.x = x;
      text.y = y;
      //text.text = `${capitalizedStatus}: ${this.speedAbs}`;
      text.text = `${this.speedAbs}`;

      text.text = text.text.replace(text.text, getMPHstr3(this.speedAbs));
      game.world.bringToTop(text);
      
      //console.log('' + text.text);
    }
  }
  return player;
}
