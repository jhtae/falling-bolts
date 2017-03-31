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
/***/ (function(module, exports) {

const Util = {

   dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },
    randomColor() {
        const hexColor = 'ABCDEF0123456789';
        let color = '#';

        for (let i = 0; i < 6; i++) {
            color += hexColor[Math.floor((Math.random() * 16))];
        }
        return color;
    },



    randomRadius(asd) {
        let rand = Math.floor(Math.random() * 50);
        let radius = rand <= 25 ? 25 : rand;
        radius = radius > 50 ? 50 : radius;
        return radius;
    }
};

module.exports = Util;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
const Bolt = __webpack_require__(2);


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


        if (this.constructor.name === 'Player') {
            if (this.keyRight) {
                this.vel = [5, 0];
            }

            if (this.keyLeft) {
                this.vel = [-5, 0];
            }

            if (this.spacebar) {
                this.vel = [this.vel[0] * 2, 0];
            }

            if (!this.keyLeft && !this.keyRight) {
                this.vel = [0, 0];
            }

            if (this.game.isOutOfBounds(this.testPosRight) ||
                this.game.isOutOfBounds(this.testPosLeft)) {
                return;
            }
        }

        this.pos = this.newPos;

        if (this.game.isOutOfBounds(this.pos)) {
            if (!this.game.gameOver) {
             this.game.Score += 10; 
            }
            
            this.remove();

        }
        if (this.constructor.name === 'Bolt') {
            this.boltFall();

            if (this.hitFloor()) {
                // if (this.pos[1] > 600) {
                //     console.log(this.vel[1]);
                //     console.log(this.pos[1]);
                // }
                this.vel = [this.vel[0], -this.vel[1] / this.game.bounce_friction];
                // if (this.pos[1] > 600) {
                //     this.pos[1] = this.pos[1]+ this.vel[1];
                //     console.log(this.vel[1]);
                //     console.log(this.pos[1]);
                //     console.log(this.radius);
                // }
            }

        }
    }


    remove() {
        this.game.remove(this);
    }
    collideWithPlayer(otherObject) {
        if (this.constructor.name === 'Player' || otherObject.constructor.name === 'Player')
            this.game.GameOver();
    }

    collideWith(otherObject) {
        const centerDist = Util.dist(this.pos, otherObject.pos);
        return centerDist < (this.radius + otherObject.radius);
    }



}
const NORMAL_FRAME_TIME_DELTA = 1000 / 30;


module.exports = MovingObject;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
const MovingObject = __webpack_require__(1);
const Player = __webpack_require__(3);

const DEFAULTS = {
    COLOR: '#000000',
    GRAVITY: .5
};


class Bolt extends MovingObject {
    constructor(options = {}) {

        options.color = Util.randomColor(DEFAULTS.COLOR);
        options.radius = Util.randomRadius();
        options.pos = options.game.randomPos();
        options.vel = options.game.randomVec();
        super(options);
        this.game = options.game;
    
    }
    boltFall() {
        this.vel = [this.vel[0], this.vel[1] + DEFAULTS.GRAVITY];
    }

    hitFloor() {
        if (this.pos[1] >= this.game.dim_y) {
            console.log((this.pos[1] + this.radius) >= this.game.dim_y && this.vel[1] >= 0, 'pos', this.pos[1], 'rad', this.radius, 'vel',this.vel[1]);
        }
        if ((this.pos[1] + this.radius) >= this.game.dim_y && this.vel[1] >= 0) {
            return true;
        }
        return false;
    }
 

}



module.exports = Bolt;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Util = __webpack_require__(0);


class Player extends MovingObject {
    constructor(options) {

        options.radius = Player.RADIUS;
      
        options.vel = [0, 0];
        options.color = Util.randomColor();
        super(options);

        this.width = Player.WIDTH;
        this.height = Player.HEIGHT;
        this.keyLeft = this.keyLeft || false;
        this.keyRight = this.keyRight || false;
        this.spacebar = this.spacebar || false;

        this.image = Player.STANDLEFT;

        this.tickCount = 0;
        this.frameIndex = 0;
        this.ticksPerFrame = 10;
    }

    draw(ctx) {
        var drawOptions = [Player.WALK];
        if (this.keyLeft) {
            drawOptions = drawOptions.concat(this.renderLeft());
        } else if (this.keyRight) {
            drawOptions = drawOptions.concat(this.renderRight());
        } else {
            this.image = this.frameIndex % 2 === 0 ? Player.STANDRIGHT : Player.STANDLEFT;
            drawOptions = [this.image, 1, 1, 25, 32];
        }

        ctx.drawImage(
            drawOptions[0],
            drawOptions[1],
            drawOptions[2],
            drawOptions[3],
            drawOptions[4],
            this.pos[0],
            this.pos[1],
            Player.WIDTH,
            Player.HEIGHT
        );
        this.update();
    }
 
    update() {
        this.tickCount += 1;

        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            this.frameIndex += 1;
        }
    }

    renderLeft() {
        switch (this.frameIndex % 5) {
            case 0:
                return [5, 0, 25, 30];
            case 1:
                return [35, 0, 25, 30];
            case 2:
                return [60, 0, 25, 30];
            case 3:
                return [90, 0, 25, 30];
            case 4:
                return [115, 0, 25, 30];
        }
    }

    renderRight() {
        switch (this.frameIndex % 5) {
            case 0:
                return [5, 40, 25, 30];
            case 1:
                return [35, 40, 25, 30];
            case 2:
                return [60, 40, 25, 30];
            case 3:
                return [90, 40, 25, 30];
            case 4:
                return [115, 40, 25, 30];
        }
    }
}


Player.RADIUS = 10;
Player.WIDTH = 25;
Player.HEIGHT = 38.4;

Player.STANDLEFT = new Image();
Player.STANDLEFT.src = 'assets/standleft_00.png';

Player.STANDRIGHT = new Image();
Player.STANDRIGHT.src = 'assets/standright_00.png';

Player.WALK = new Image();
Player.WALK.src = 'assets/walk.png';


module.exports = Player;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Bolt = __webpack_require__(2);
const Player = __webpack_require__(3);
const Util = __webpack_require__(0);
const MovingObject = __webpack_require__(1);

class Game {
    constructor(ctx) {
        this.bolts = [];
        this.players = [];
        this.addFallingBolts();
        this.gameOver = false;
        this.BoltRate = 5000;
        this.ctx = ctx;
        this.dim_x = 1000;
        this.dim_y = 600;
        this.FPS = 60;
        this.score = 0;
        this.gravity = 0.5;
        this.bounce_friction = 1.1;
        this.timer = window.setInterval(() => {
            this.add(new Bolt({
                game: this
            }));
        }, this.BoltRate);
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

        let game = this;

        this.allObjects().forEach((obj1) => {
            game.allObjects().forEach((obj2) => {
                if (obj1 === obj2) {
                    return;
                }
                if (obj1.collideWith(obj2)) {
                    obj1.collideWithPlayer(obj2);
                }
            });
        });
    }



    draw(ctx) {
        ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

        ctx.clearRect(130, 570, 10, 30);
        ctx.fillStyle = 'gray';
        ctx.fillRect(130, 570, 10, 30);
        this.allObjects().forEach((object) => {
            object.draw(ctx);
        });

        if (this.gameOver === true) {

            ctx.beginPath();
            ctx.globalAlpha = 0.5;

            ctx.lineWidth = "4";
            ctx.strokeStyle = "Black";
            ctx.fillRect(0, 0, 1000, 600);
            ctx.stroke();
            ctx.globalAlpha = 1;
            ctx.font = "35px Helvetica";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Game Over", 400, 300);
            ctx.fillText("Press enter to try again", 400, 400);

        }
    }

    isOutOfBounds(position) {
        return (position[0] < 0) || (position[1] < 0) ||
            (position[0] > Game.DIM_X) || (position[1] > Game.DIM_Y);
    }
    moveObjects(delta) {
        this.allObjects().forEach((object) => {
            object.move(delta);
        });
    }

    randomPos() {
        return [0, (Game.DIM_Y * Math.random()) / 3];
    }
    randomVec() {
        return [(Math.random() * ((7 / 1000) * Game.DIM_X)) + ((3 / 1000) * Game.DIM_X), 0];
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

    GameOver() {
        this.remove(this.players[0]);
        this.gameOver = true;


    }
}



Game.BG_COLOR = 'white';
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 60;
Game.NUM_FALLING_BOLTS = 1;
Game.BOUNCE_FRCITION = 1.1;
Game.SCORE = 0;
Game.Gravity = 0.5;

module.exports = Game;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.timerId = null;
  }

  checkKeyPressed(event) {
    switch (event.keyCode) {
      case 37:
        this.player.keyLeft = true;
        break;
      case 39:
        this.player.keyRight = true;
        break;
      case 32:
        this.player.spacebar = true;
        break;
      case 84:

    }
  }

  checkKeyLifted(event) {
    switch (event.keyCode) {
      case 37:
        this.player.keyLeft = false;
        break;
      case 39:
        this.player.keyRight = false;
        break;
      case 32:
        this.player.spacebar = false;
        break;
      case 84:
    }
  }
  onEnterKey(event) {
    if (event.keyCode === 13 && this.game.gameOver === true) {
      this.gameStart();
    }
  }
  gameStart() {
    this.game.gameOver = false;
    this.player = this.game.addPlayer();
    window.addEventListener("keydown", this.checkKeyPressed.bind(this));
    window.addEventListener("keyup", this.checkKeyLifted.bind(this));
    window.addEventListener("keydown", this.onEnterKey.bind(this));
    this.start();
  }

  start() {
    let gameView = this;
    clearInterval(this.timerId);
    this.game.Score = 0;
    this.timerId = setInterval(
      () => {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
        gameView.updateScore();


        if (gameView.game.bolts.length === 0) {
          gameView.stop();
        }
      }, 1000 / 60
    );
  }

  updateScore() {
    if (this.game.gameOver) {
      this.ctx.textAlign="center"; 

      this.ctx.font = "50px Helvetica";
      this.ctx.fillStyle = "white";
      this.ctx.fillText("Score: " + this.game.Score, 400, 200);
    } else {
      this.ctx.font = "15px Helvetica";
      this.ctx.fillStyle = "black";
      this.ctx.fillText("Score: " + this.game.Score, 820, 40);
    }

  }


  stop() {
    clearInterval(this.timerId);
  }
}

module.exports = GameView;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(4);
const GameView = __webpack_require__(5);

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementsByTagName("canvas")[0];
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;

  const ctx = canvas.getContext("2d");
  const game  = new Game(ctx);
  new GameView(game, ctx).gameStart();
});



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map