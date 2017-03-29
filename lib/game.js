const Bolt = require("./bolt");
const Player = require("./player");
const Util = require("./util");
const MovingObject = require('./moving_object');

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