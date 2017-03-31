## Falling Balls

[Live link](https://jhtae.github.io/falling-bolts/)

![demo_2](/assets/giphy.gif)

#### Background

Falling Balls is a simple yet addicting game with a simple user interface and easy controls. The character is controlled and able to be moved left and right to dodge balls that are thrown. The ball come in random sizes and velocities, and bounce out of the game. The character tries to stay alive as long as possible, as the balls come at a more frequent game with respect to the longevity of life.

#### Implementation
- JavaScript
- Canvas
- CSS

#### Gameplay

There are balls of random size, velocity, and color


- Right & Left arrow keys moves the player left and right
- Spacebar speeds up the rate

#### Functionality
- [x] Start and Restart
- [x] Balls fall, hit the floor, and bounce
- [x] Balls increase in volume as game continues
- [x] Score display
- [x] Instructions on how to play




```JavaScript
ball() {
    this.vel = [this.vel[0], this.vel[1] + DEFAULTS.GRAVITY];
}

hitFloor() {
    if ((this.pos[1] + this.radius) >= 585 && this.vel[1] >= 0) {
        return true;
    } else {
        return false;
    }

if (this.hitFloor()) {
    this.vel = [this.vel[0], -this.vel[1] / this.game.bounce_friction];
}
```


#### Future Development

- [ ] Change balls to arrows
- [ ] Create bolts that fall from the sky
- [ ] Add a castle
- [ ] Change player to knight