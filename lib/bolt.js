const Util = require("./util");
const MovingObject = require("./moving_object");

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
