// Effect: simple hit/spark/impact effect
class Effect {
  constructor(type, x, y, pool, scene) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.pool = pool;
    this.scene = scene;
    this.active = true;
    this.frame = 0;
    this.timer = 0;
    this.maxFrames = 8;
    this.color = type === 'hit' ? "#fbbf24" : "#a3e635";
    this.big = false;
  }
  update(dt) {
    if (!this.active) return;
    this.timer += dt;
    if (this.timer > 22) {
      this.frame++;
      this.timer = 0;
      if (this.frame > this.maxFrames) {
        this.active = false;
        if (this.pool) this.pool.kill(this);
      }
    }
  }
  render(ctx) {
    if (!this.active) return;
    ctx.save();
    ctx.globalAlpha = 0.7-0.07*this.frame;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.big?28-2*this.frame:14-1*this.frame, 0, Math.PI*2);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.big?5-0.4*this.frame:3-0.2*this.frame;
    ctx.stroke();
    ctx.restore();
  }
  setBig(val) {
    this.big = !!val;
  }
}
window.Effect = Effect;