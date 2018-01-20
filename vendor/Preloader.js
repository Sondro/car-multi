/* global BasicGame */
(function(BasicGame) {
	'use strict';
	BasicGame.Preloader = function () {

		this.background = null;
		this.preloadBar = null;

		this.ready = false;

	};



	BasicGame.Preloader.prototype = {

		preload: function () {
				

			//	These are the assets we loaded in Boot.js
			//	A nice sparkly background and a loading progress bar
			this.preloadBar = this.add.sprite(0, 400, 'preloaderBar');

			//	This sets the preloadBar sprite as a loader sprite.
			//	What that does is automatically crop the sprite from 0 to full-width
			//	as the files below are loaded in.
			this.load.setPreloadSprite(this.preloadBar);

			
		    
		    
		    
		    
			//Comment when you test in local
			//Uncomment when you test in a web server
			//this.load.audio('bgmusic', 'assets/sounds/battleThemeA.mp3');
			//this.load.audio('spellsound', 'assets/sounds/zap2e.ogg');





			this.load.spritesheet('enemyLight', 'assets/images/allenemy.png', 192, 142);
			this.load.spritesheet('enemyBigLight', 'assets/images/wyvern_compositeallenemy.png', 256, 256);
			this.load.spritesheet('enemy', 'assets/images/allenemy2.png', 192, 142);
			this.load.spritesheet('enemyBig', 'assets/images/wyvern_compositeallenemy2.png', 256, 256);
			this.load.spritesheet('character', 'assets/images/all_small.png', 73.125,120);

			this.load.spritesheet('explosionlight', 'assets/images/spr_smoke_strip24_256x256.png', 256, 256);


			this.load.spritesheet('dropsplash', 'assets/images/char_blood4.png', 20, 20);
			this.load.spritesheet('splatter', 'assets/images/80_splatter_add.png', 100, 100);

			this.load.spritesheet('tower_lightning', 'assets/images/tower_lightning.png');
			this.load.spritesheet('tower_lightning_off', 'assets/images/tower_lightning_off.png');
			
			
			//Zoom: these assets are not used with zoom
			//this.load.spritesheet('black_bar', 'assets/images/black_bar.png');
			//this.load.spritesheet('green_bar', 'assets/images/green_bar.png');
			//this.load.spritesheet('red_bar', 'assets/images/red_bar.png');
			
			
			this.load.spritesheet('avatar_box', 'assets/images/avatar_box.png');
			//this.load.image('background', 'assets/images/grass_all.png');
			//this.load.image('background', 'assets/images/sand2.jpg');
			this.load.image('background', 'assets/images/dngfloor.jpg');
			this.game.load.spritesheet('explosion', 'assets/images/explosion.png', 128, 128);
			this.game.load.spritesheet('explosion_char', 'assets/images/char_blood2.png', 128, 128);
			this.game.load.spritesheet('explosionb', 'assets/images/explosion_5.png', 120, 120);
			this.game.load.spritesheet('energy_globe', 'assets/images/energy_globe.png', 160, 134);
			this.load.image('myoption', 'assets/images/options.png');
			this.load.image('exit', 'assets/images/exit.png');
			this.load.image('fullscreen', 'assets/images/screen.png');
			this.load.image('music1', 'assets/images/music1.png');
			this.load.image('music2', 'assets/images/music2.png');
			this.load.image('goback', 'assets/images/goback.png');
			this.load.image('abilities', 'assets/images/abilities.png');
			this.load.image('bkgoption', 'assets/images/DecorOldPaper_small.png');
			this.load.image('background_intro', 'assets/images/background_intro.png');
			this.load.image('introbutton', 'assets/images/intro2.png');
			this.load.image('introgenericbutton', 'assets/images/intro1.png');
			this.load.image('up', 'assets/images/up_orange_big.png');
			this.load.image('down', 'assets/images/down_orange_big.png');


			this.load.image('bullet', 'assets/images/meteor.png');
			this.load.image('wallA', 'assets/images/grave.png');
			this.load.image('grave', 'assets/images/grave.png');
			this.load.image('obs1', 'assets/images/obs1rock.png');
			this.load.image('obs2', 'assets/images/obs2rock.png');
			this.load.image('obs3', 'assets/images/obs3rock.png');
			this.load.image('obs4', 'assets/images/obs4rock.png');



			this.load.image('magicbutton', 'assets/images/base-magic.png');
			this.load.image('magicbuttonarea', 'assets/images/small/area-magic.png');
			this.load.image('magicbuttonheal', 'assets/images/heal-magic.png');
			this.load.image('magicbuttonmultiple', 'assets/images/small/multiple-magic.png');

			this.load.spritesheet('buttons', 'assets/images/buttons.png', 215, 41);
			this.load.spritesheet('buttons_directions', 'assets/images/buttons_directions.png', 300, 86);




			this.load.image('compass', 'assets/images/compass_rose.png');
			this.load.image('touch_segment', 'assets/images/touch_segment.png');
			this.load.image('touch', 'assets/images/touch.png');

			//Map section
			this.load.image('map_small', 'assets/images/map/map_small.png');
			this.load.image('avatar_map', 'assets/images/map/avatar_map.png');
			this.load.image('demon_map', 'assets/images/map/demon_map.png');
			this.load.image('wyvern_map', 'assets/images/map/wyvern_map.png');
			this.load.image('mapbutton', 'assets/images/mapbutton.png');
			
			
			
			//Zoom
			this.load.spritesheet('zoom_plus', 'assets/images/zoom_button/zoom-plus.png', 65, 65);
			this.load.spritesheet('zoom_minus', 'assets/images/zoom_button/zoom-minus.png', 65, 65);
			



		},

		create: function () {
			//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
			this.preloadBar.cropEnabled = false;

		},

		update: function () {

			//	You don't actually need to do this, but I find it gives a much smoother game experience.
			//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
			//	You can jump right into the menu if you want and still play the music, but you'll have a few
			//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
			//	it's best to wait for it to decode here first, then carry on.
			
			//	If you don't have any music in your game then put the game.state.start line into the create function and delete
			//	the update function completely.
			
			//if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
			//{
				this.ready = true;
				this.state.start('Game');
				
			//}

		}

	};
})(BasicGame);
