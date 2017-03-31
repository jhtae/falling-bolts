const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementsByTagName("canvas")[0];
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;

  const ctx = canvas.getContext("2d");
  let elem = document.getElementById("instructions");
  elem.addEventListener("click", () => {
    elem.style.display = "none";
    const game = new Game(ctx);
    new GameView(game, ctx).gameStart();
  });
});