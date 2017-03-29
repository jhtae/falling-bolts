const Util = require("./util");
const MovingObject = require("./moving_object");

const DEFAULTS = {
    COLOR: '#000000',
    RADIUS: 25,
};

class Bolt {
    constructor(options){
        options.color = options.Util.randomColor(DEFAULTS.COLOR);
        options.radius = options.Util.randomRadius();

    }
}