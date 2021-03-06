const Util = require("./util");
const MovingObject = require("./moving_object");
const Player = require("./player");

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

        if ((this.pos[1] + this.radius) >= 585 && this.vel[1] >= 0) {
            return true;
        }
        return false;
    }
 

}



module.exports = Bolt;