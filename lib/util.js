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
        return (Math.random() * 30) + 5;


    }
};

module.exports = Util;