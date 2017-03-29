const Game = require("./game");


class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.timerId = null;
    this.game = game;    
    window.addEventListener("keydown", this.checkKeyPressed.bind(this));
    window.addEventListener("keyup", this.checkKeyLifted.bind(this));
    window.addEventListener("keydown", this.onEnterKey.bind(this));
  }

  

  checkKeyPressed (event) {
    switch(event.keyCode) {
        case 37:
            this.player.keyLeft = true;
            break;
        case 39:
            this.palyer.keyRight = true;
            break;
        case 32:
            this.player.spacebar = true;
            break;
        case 84:

    }
}

  checkKeyLifted (event) {
   switch(event.keyCode) {
        case 37:
            this.player.keyLeft = false;
            break;
        case 39:
            this.palyer.keyRight = false;
            break;
        case 32:
            this.player.spacebar = false;
            break;
        case 84:
    }
  }
 onEnterKey(event){
    if (event.keyCode === 13) {
      console.log();
      this.gameStart();
    }
  }
  gameStart() {
    this.game = new Game(this);
    // this.player = this.game.addPlayer();
    this.showMenu = false;
    this.start();
  }

  start() {
    const gameView = this;

    clearInterval(this.timerId);
    Game.Score = 0;
    this.timerId = setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);

        if (gameView.game.balls.length === 0) {
          gameView.stop();
        }
      }, 1000 / Game.FPS
    );
  }

   updateScore() {
    this.ctx.font = "35px Indie Flower";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Score: " + Game.Score, 820, 40);
  }

   stop() {
    clearInterval(this.timerId);
  }
}

module.exports = GameView;
