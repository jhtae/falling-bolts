const Bolt = require("./bolt");
const Player = require("./player");
const Util = require("./util");
const MovingObject = require('./moving_object');

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
            ctx.fillText("Game Over", 500, 300);
            ctx.fillText("Press enter to try again", 500, 400);

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
                let idx = this.bolts.indexOf(object);
                this.bolts[idx] = new Bolt({
                    game: this
                });
            } else {
                this.bolts.splice(this.bolts.indexOf(object), 1);
            }
        } else if (object instanceof Player) {
            let playerPos = object.pos;

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