// EffectPool: object pooling for effects
class EffectPool {
  constructor(scene) {
    this.pool = [];
    this.active = [];
    this.scene = scene;
  }
  spawn(type, x, y, big) {
    let effect = this.pool.pop();
    if (!effect) {
      effect = new window.Effect(type, x, y, this, this.scene);
    } else {
      Object.assign(effect, new window.Effect(type, x, y, this, this.scene));
      effect.active = true;
      effect.frame = 0;
      effect.timer = 0;
    }
    if (big) effect.setBig(true);
    this.active.push(effect);
    return effect;
  }
  update(dt) {
    for (let i=0;i<this.active.length;i++) {
      let p = this.active[i];
      if (p.active) {
        p.update(dt);
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
  kill(effect) {
    effect.active = false;
  }
}
window.EffectPool = EffectPool;