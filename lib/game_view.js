class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.timerId = null;
  }

  checkKeyPressed(event) {
    switch (event.keyCode) {
      case 37:
        this.player.keyLeft = true;
        break;
      case 39:
        this.player.keyRight = true;
        break;
      case 32:
        this.player.spacebar = true;
        break;
      case 84:

    }
  }

  checkKeyLifted(event) {
    switch (event.keyCode) {
      case 37:
        this.player.keyLeft = false;
        break;
      case 39:
        this.player.keyRight = false;
        break;
      case 32:
        this.player.spacebar = false;
        break;
      case 84:
    }
  }
  onEnterKey(event) {
    if (event.keyCode === 13 && this.game.gameOver === true) {
      this.gameStart();
    }
  }
  gameStart() {
    this.game.gameOver = false;
    this.player = this.game.addPlayer();
    window.addEventListener("keydown", this.checkKeyPressed.bind(this));
    window.addEventListener("keyup", this.checkKeyLifted.bind(this));
    window.addEventListener("keydown", this.onEnterKey.bind(this));
    this.start();
  }

  start() {
    let gameView = this;
    clearInterval(this.timerId);
    this.game.Score = 0;
    this.timerId = setInterval(
      () => {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
        gameView.updateScore();


        if (gameView.game.bolts.length === 0) {
          gameView.stop();
        }
      }, 1000 / 60
    );
  }
  updateScore() {
    if (this.game.gameOver) {
      this.ctx.textAlign="center"; 

      this.ctx.font = "50px Helvetica";
      this.ctx.fillStyle = "white";
      this.ctx.fillText("Score: " + this.game.Score, 500, 200);
    } else {
      this.ctx.font = "15px Helvetica";
      this.ctx.fillStyle = "black";
      this.ctx.fillText("Score: " + this.game.Score, 820, 40);
    }

  }


  stop() {
    clearInterval(this.timerId);
  }
}

module.exports = GameView;