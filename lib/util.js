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