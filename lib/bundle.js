/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);

const Util = {
    randomColor(e) {
        const hexColor = 'ABCDEF0123456789';
        let color = '#';

        for (let i = 0; i < 3; i++) {
            color += hexColor[Math.floor((Math.random() * 16))];
        }
        return color;
    },
    randomPos() {
        return [0, (Game.DIM_Y * Math.random()) / 3];
    },

    randomVec(length) {
        return [(Math.random() * ((7 / 1000) * Game.DIM_X)) + ((3 / 1000) * Game.DIM_X), 0]

    },
    randomRadius(radius) {
        return (Math.random() * 25) + 5;
    }
};

module.exports = Util;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Bolt = __webpack_require__(4);
const Player = __webpack_require__(5);
const Util = __webpack_require__(0);
const MovingObject = __webpack_require__(2);

class Game {
    constructor() {
        this.bolts = [];
        this.players = [];
        this.addFallingBolts();
        this.gameOver = false;
        this.BallRate = 5000;

    }

    add(object) {
        if (object instanceof Bolt) {
            this.bolts.push(object);
        } else if (object instanceof Player) {
            this.players.push(object);
        } else {
            throw "unknown type of object";
        }
    }
    addFallingBolts() {
        for (let i = 0; i < Game.NUM_FALLING_BOLTS; i++) {
            this.add(new Bolt({
                game: this
            }));
        }
    }
    addPlayer() {
        const player = new Player({
            pos: [500, 562],
            game: this
        });

        this.add(player);
        return player;
    }

    allObjects() {
        return [].concat(this.players, this.bolts);
    }

    checkCollisions() {
        const allObjects = this.allObjects();
        for (let i = 0; i < allObjects.length; i++) {
            for (let j = 0; j < allObjects.length; j++) {
                const obj1 = allObjects[i];
                const obj2 = allObjects[j];

                if (obj1.isCollidedWith(obj2)) {
                    const collision = obj1.collideWith(obj2);
                    if (collision) return;
                }
            }
        }
    }

    draw(ctx) {
        ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
        ctx.fillStyle = Game.BG_COLOR;
        ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

        ctx.clearRect(130, 570, 10, 30);
        ctx.fillStyle = '#FF7F50';
        ctx.fillRect(130, 570, 10, 30);

        this.allObjects().forEach((object) => {
            object.draw(ctx);
        });
    }

    isOutOfBounds(position) {
        return (position[0] < 0) || (position[1] < 0) ||
            (position[0] > Game.DIM_X) || (position[1] > Game.DIM_Y);
    }
    moveObjects(delta) {
        this.allObjects().forEach((object) => {
            debugger;
            object.move;
        });
    }

    remove(object) {
        if (object instanceof Bolt) {
            if (!this.gameOver) {
                var idx = this.bolts.indexOf(object);
                this.bolts[idx] = new Bolt({
                    game: this
                });
            } else {
                this.bolts.splice(this.bolts.indexOf(object), 1);
            }
        } else if (object instanceof Player) {
            var playerPos = object.pos;

            this.players.splice(this.players.indexOf(object), 1);
        } else {
            throw "unknown type of object";
        }
    }
    step(delta) {
        this.moveObjects(delta);
        this.checkCollisions();
    }
    wrap(pos) {
        return [
            Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
        ];
    }

    GameOver() {
        this.remove(this.players[0]);
        this.gameView.submitScore();
        this.gameView.showMenu = true;
        $('.play-game').toggleClass('show');
        $('.scoreboard').toggleClass('show');
        this.gameOver = true;
    }
}

Game.BG_COLOR = "#white";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 60;
Game.NUM_FALLING_BOLTS = 1;
Game.BOUNCE_FRCITION = 1.1;
Game.SCORE = 0;


module.exports = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
// const Player = require('./player');
const Game = __webpack_require__(1);
const Bolt = __webpack_require__(4);


class MovingObject {
    constructor(options) {
        this.pos = options.pos;
        this.vel = options.vel;
        this.radius = options.radius;
        this.color = options.color;
        this.game = options.game;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(
            this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
        );
        ctx.fill();
    }

    move() {
        this.newPos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
        this.testPosRight = [this.newPos[0] + 15, this.newPos[1]];
        this.testPosLeft = [this.newPos[0] - 5 - 135, this.newPos[1]];

        if (this instanceof Player) {
            if (this.right) {
                this.vel = [5, 0];
            }

            if (this.left) {
                this.vel = [-5, 0];
            }

            if (this.spacebar) {
                this.vel = [this.vel[0] * 2, 0];
            }

            if (!this.left && !this.right) {
                this.vel = [0, 0];
            }

            if (this.game.isOutOfBounds(this.testPosRight) ||
                this.game.isOutOfBounds(this.testPosLeft)) {
                return;
            }
        }

        this.pos = this.newPos;
        if (this.game.isOutOfBounds(this.pos)) {
            if (!this.game.gameView.showMenu) {
                Game.Score += 10;
            }
            this.remove();
        }

        if (this instanceof Bolt) {
            this.gravitate();
            if (this.hitFloor()) {
                this.vel = [this.vel[0], -this.vel[1] / Game.BounceFriction];
            }
        }
    }

    remove() {
        this.game.remove(this);
    }

    collideWithPlayer(otherObject) {
        if (this instanceof Player || otherObject instanceof Player) {
            this.game.GameOver();
        }
    }
    collideWith(otherObject) {
        const centerDist = Util.dist(this.pos, otherObject.pos);
        return centerDist < (this.radius + otherObject.radius);
    }
}


module.exports = MovingObject;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);


class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.timerId = null;
    this.game = game;    
    window.addEventListener("keydown", this.checkKeyPressed.bind(this));
    window.addEventListener("keyup", this.checkKeyLifted.bind(this));
    window.addEventListener("keydown", this.onEnterKey.bind(this));
  }

  

  checkKeyPressed (event) {
    switch(event.keyCode) {
        case 37:
            this.player.keyLeft = true;
            break;
        case 39:
            this.palyer.keyRight = true;
            break;
        case 32:
            this.player.spacebar = true;
            break;
        case 84:

    }
}

  checkKeyLifted (event) {
   switch(event.keyCode) {
        case 37:
            this.player.keyLeft = false;
            break;
        case 39:
            this.palyer.keyRight = false;
            break;
        case 32:
            this.player.spacebar = false;
            break;
        case 84:
    }
  }
 onEnterKey(event){
    if (event.keyCode === 13) {
      console.log();
      this.gameStart();
    }
  }
  gameStart() {
    this.game = new Game(this);
    // this.player = this.game.addPlayer();
    this.showMenu = false;
    this.start();
  }

  start() {
    const gameView = this;

    clearInterval(this.timerId);
    Game.Score = 0;
    this.timerId = setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);

        if (gameView.game.balls.length === 0) {
          gameView.stop();
        }
      }, 1000 / Game.FPS
    );
  }

   updateScore() {
    this.ctx.font = "35px Indie Flower";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Score: " + Game.Score, 820, 40);
  }

   stop() {
    clearInterval(this.timerId);
  }
}

module.exports = GameView;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
const MovingObject = __webpack_require__(2);

const DEFAULTS = {
    COLOR: '#000000',
    RADIUS: 25,
};

class Bolt {
    constructor(options){
        options.color = Util.randomColor(DEFAULTS.COLOR);
        options.radius = Util.randomRadius();
        options.pos = Util.randomPos();


    }
}

module.exports = Bolt;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(2);
const Util = __webpack_require__(0);


class Player extends MovingObject {
    constructor(options) {
        options.radius = Player.RADIUS;
        this.width = Player.WIDTH;
        this.height = Player.HEIGHT;
        options.vel = [0, 0];
        options.color = Util.randomColor();
        super(options);
        this.tickCount = 0;
        this.frameIndex = 0;
        this.ticksPerFrame = 10;
    }

    draw(ctx){
        
    }
}

Player.RADIUS = 10;
Player.WIDTH = 25;
Player.HEIGHT = 38.4;

module.exports = Player;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);
const GameView = __webpack_require__(3);

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  new GameView(ctx).gameStart();
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map