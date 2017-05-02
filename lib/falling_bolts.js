const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementsByTagName("canvas")[0];
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;

  const ctx = canvas.getContext("2d");
  let elem = document.getElementById("instructions");
  elem.addEventListener("click", () => {
    var timeLeft = 5;
    var countDown = document.getElementById('progressBar');
    var timerId = setInterval(countdown, 1000);
    function countdown() {
      if (timeLeft === 0) {
        clearTimeout(timerId);
        const game = new Game(ctx);
        new GameView(game, ctx).gameStart();
      } else {
        countDown.innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
      }
      elem.style.display = "none";
    }

  });
});