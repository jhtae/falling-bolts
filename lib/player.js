const MovingObject = require("./moving_object");
const Util = require("./util");


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