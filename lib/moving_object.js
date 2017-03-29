const Util = require("./util");
// const Player = require('./player');
const Game = require('./game');
const Bolt = require('./bolt');


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