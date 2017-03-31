const MovingObject = require("./moving_object");
const Util = require("./util");


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