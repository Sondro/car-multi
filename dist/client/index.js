!function(e){function t(a){if(r[a])return r[a].exports;var i=r[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var r={};t.m=e,t.c=r,t.d=function(e,r,a){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.WINDOW_WIDTH=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,t.WINDOW_HEIGHT=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,t.WORLD_SIZE={width:1600,height:1200},t.ASSETS_URL="../assets"},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.neg=function(e){return 0-e},t.isDown=function(e,t){return e.input.keyboard.isDown(t)},t.createText=function(e,t){return e.add.text(t.x,t.y,"",{fontSize:"12px",fill:"#FFF",align:"center"})}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r,a){return{socket:a,sprite:(0,i.default)(e,t,r),playerName:null,playerNum:3,speed:0,speedText:null,drive:function(e){var t={W:Phaser.Keyboard.W,S:Phaser.Keyboard.S,A:Phaser.Keyboard.A,D:Phaser.Keyboard.D,aU:Phaser.Keyboard.UP,aD:Phaser.Keyboard.DOWN,aL:Phaser.Keyboard.LEFT,aR:Phaser.Keyboard.RIGHT};(0,s.neg)(5);0!==this.speed&&this.emitPlayerData(),(0,s.isDown)(e,t.W)&&!(0,s.isDown)(e,t.aU)&&this.speed<401||(0,s.isDown)(e,t.aU)&&!(0,s.isDown)(e,t.W)&&this.speed<401?this.speed+=10:this.speed>=10&&(this.speed-=10),(0,s.isDown)(e,t.S)&&!(0,s.isDown)(e,t.aD)&&this.speed>-201||(0,s.isDown)(e,t.aD)&&!(0,s.isDown)(e,t.S)&&this.speed>-201?this.speed-=5:this.speed<=-5&&(this.speed+=5),(0,s.isDown)(e,t.A)&&!(0,s.isDown)(e,t.aL)||(0,s.isDown)(e,t.aL)&&!(0,s.isDown)(e,t.A)?this.sprite.body.angularVelocity=this.speed/1e3*-5:(0,s.isDown)(e,t.D)||(0,s.isDown)(e,t.aR)?this.sprite.body.angularVelocity=this.speed/1e3*5:this.sprite.body.angularVelocity=0,this.sprite.body.velocity.x=this.speed*Math.cos(.01745*(this.sprite.body.angle-360)),this.sprite.body.velocity.y=this.speed*Math.sin(.01745*(this.sprite.body.angle-360)),e.world.bringToTop(this.sprite),this.updatePlayerName(),this.updatePlayerStatusText("speed",this.sprite.body.x-57,this.sprite.body.y-39,this.speedText)},emitPlayerData:function(){a.emit("move-player",{x:this.sprite.body.x,y:this.sprite.body.y,angle:this.sprite.body.rotation,playerName:{name:this.playerName.text,x:this.playerName.x,y:this.playerName.y},speed:{value:this.speed,x:this.speedText.x,y:this.speedText.y}})},updatePlayerName:function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.playerNum,arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.sprite.body.x-57),t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.sprite.body.y-59;this.playerName.text="P"+this.playerNum,this.playerName.x=e,this.playerName.y=t,r.world.bringToTop(this.playerName)},updatePlayerStatusText:function(e,t,a,i){var s=e[0].toUpperCase()+e.substring(1);this[e]<0?this.newText=0:this.newText=this[e],i.x=t,i.y=a,i.text=s+": "+parseInt(this.newText),r.world.bringToTop(i)}}};var a=r(7),i=function(e){return e&&e.__esModule?e:{default:e}}(a),s=r(1)},function(e,t,r){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var n=r(0),o=r(4),p=function(e){return e&&e.__esModule?e:{default:e}}(o),u=function(e){function t(){a(this,t);var e=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,n.WINDOW_WIDTH,n.WINDOW_HEIGHT,Phaser.AUTO));return e.state.add("Game",p.default),e.state.start("Game"),e}return s(t,e),t}(Phaser.Game);new u},function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),p=r(0),u=r(1),l=r(5),d=a(l),y=r(6),c=a(y),h=r(2),f=a(h),m=r(8),b=a(m),x=r(9),g=a(x),_=r(10),v=a(_),T=null,w={},P=function(e){function t(){i(this,t);var e=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.player={},e}return n(t,e),o(t,[{key:"preload",value:function(){(0,d.default)(this.game)}},{key:"create",value:function(){var e=p.WORLD_SIZE.width,t=p.WORLD_SIZE.height;(0,c.default)(this.game),T=io("https://simple-car-game.herokuapp.com/"),this.player=(0,f.default)(Math.random()*e,Math.random()*t/2,this.game,T),this.player.playerName=(0,u.createText)(this.game,this.player.sprite.body),this.player.speedText=(0,u.createText)(this.game,this.player.sprite.body),(0,b.default)(T,this.player),(0,g.default)(T,w,this.game),this.game.camera.x=this.player.sprite.x-400,this.game.camera.y=this.player.sprite.y-300,this.game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL}},{key:"update",value:function(){this.player.drive(this.game);var e=this.player.sprite.x-400,t=this.player.sprite.y-300;this.game.camera.x+=.08*(e-this.game.camera.x),this.game.camera.y+=.08*(t-this.game.camera.y),(0,v.default)(w)}}]),t}(Phaser.State);t.default=P},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),i=function(e){e.load.crossOrigin="Anonymous",e.stage.backgroundColor="black",e.load.image("asphalt",a.ASSETS_URL+"/img/asphalt/asphalt_1080p.jpg"),e.load.image("car",a.ASSETS_URL+"/img/car/car.png")};t.default=i},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),i=a.WORLD_SIZE.width,s=a.WORLD_SIZE.height,n=function(e){e.physics.startSystem(Phaser.Physics.P2JS),e.stage.disableVisibilityChange=!0,e.world.setBounds(0,0,i,s),o(e)},o=function(e){for(var t=[],r=0;r<=i/1024+1;r++)for(var a=0;a<=s/1024+1;a++){var n=e.add.sprite(1024*r,1024*a,"asphalt");t.push(n)}};t.default=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(e,t,r){var a=r.add.sprite(e,t,"car");return r.physics.p2.enable(a,!1),a};t.default=a},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(e,t){e.on("connect",function(){e.emit("new-player",{x:t.sprite.body.x,y:t.sprite.body.y,angle:t.sprite.rotation,playerName:{name:String(e.id),x:t.playerName.x,y:t.playerName.y},speed:{value:t.speed,x:t.speed.x,y:t.speed.y}})})};t.default=a},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(2),i=function(e){return e&&e.__esModule?e:{default:e}}(a),s=r(1),n=function(e,t,r){e.on("update-players",function(a){var n={};for(var o in a){var p=a[o];if(void 0===t[o]&&o!==e.id){var u=(0,i.default)(p.x,p.y,r);u.playerName=(0,s.createText)(r,u),u.speedText=(0,s.createText)(r,u),u.updatePlayerName(p.playerName.name,p.playerName.x,p.playerName.y),t[o]=u}n[o]=!0,o!==e.id&&(t[o].target_x=p.x,t[o].target_y=p.y,t[o].target_rotation=p.angle,t[o].playerName.target_x=p.playerName.x,t[o].playerName.target_y=p.playerName.y,t[o].speedText.target_x=p.speed.x,t[o].speedText.target_y=p.speed.y,t[o].speed=p.speed.value)}for(var l in t)n[l]||(t[l].sprite.destroy(),t[l].playerName.destroy(),t[l].speedText.destroy(),delete t[l])})};t.default=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(e){for(var t in e){var r=e[t];if(void 0!==r.target_x){r.sprite.body.x+=.3*(r.target_x-r.sprite.body.x),r.sprite.body.y+=.3*(r.target_y-r.sprite.body.y);var a=r.target_rotation,i=(a-r.sprite.body.rotation)/(2*Math.PI);i-=Math.round(i),i*=2*Math.PI,r.sprite.body.rotation+=.3*i,r.playerName.x+=.3*(r.playerName.target_x-r.playerName.x),r.playerName.y+=.3*(r.playerName.target_y-r.playerName.y),r.speedText.x+=.3*(r.speedText.target_x-r.speedText.x),r.speedText.y+=.3*(r.speedText.target_y-r.speedText.y),r.updatePlayerStatusText("speed",r.speedText.x,r.speedText.y,r.speedText)}}};t.default=a}]);