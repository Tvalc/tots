// PowerUpPool: object pooling for powerups
class PowerUpPool {
  constructor(scene) {
    this.pool = [];
    this.active = [];
    this.scene = scene;
  }
  spawn(x, y, type) {
    let powerup = this.pool.pop();
    if (!powerup) {
      powerup = new window.PowerUp(x, y, type, this, this.scene);
    } else {
      Object.assign(powerup, new window.PowerUp(x, y, type, this, this.scene));
      powerup.active = true;
    }
    this.active.push(powerup);
    return powerup;
  }
  update(dt, player) {
    for (let i=0;i<this.active.length;i++) {
      let p = this.active[i];
      if (p.active) {
        p.update(dt, player);
      } else {
        this.pool.push(p);
        this.active.splice(i,1);
        i--;
      }
    }
  }
  render(ctx) {
    for (let i=0;i<this.active.length;i++) {
      this.active[i].render(ctx);
    }
  }
  forEachActive(cb) {
    for (let i=0;i<this.active.length;i++) {
      cb(this.active[i]);
    }
  }
  kill(powerup) {
    powerup.active = false;
  }
  count() { return this.active.length; }
}
window.PowerUpPool = PowerUpPool;