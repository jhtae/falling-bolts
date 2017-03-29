const Util = {
    randomColor() {
        const hexColor = 'ABCDEF0123456789';
        const color = '#';

        for (let i = 0; i < 3; i++) {
            color += hexColor[Math.floor((Math.random() * 16))];
        }
        return color;
    },

    randomVec(length) {
        return [(Math.random() * ((7 / 1000) * Game.DIM_X)) + ((3 / 1000) * Game.DIM_X), 0]

    },
    randomRadius(radius) {
        return (Math.random() * 25) + 5;
    }
};