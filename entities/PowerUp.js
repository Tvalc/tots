// PowerUp: heal, special, invincibility
class PowerUp {
  constructor(x, y, type, pool, scene) {
    this.x = x;
    this.y = y;
    this.type = type || 0;
    this.pool = pool;
    this.scene = scene;
    this.width = GameConfig.POWERUP.WIDTH;
    this.height = GameConfig.POWERUP.HEIGHT;
    this.active = true;
    this.colors = ["#22c55e","#2563eb","#fbbf24"];
    this.icon = ["❤","⚡","★"];
    this.timer = 0;
  }
  update(dt, player) {
    if (!this.active) return;
    this.timer += dt;
    this.y += Math.sin(this.timer/260)*0.5;
    // Gravity
    this.y += GameConfig.PLAYER.GRAVITY * (dt/90);
    if (this.y > GameConfig.PHYSICS.GROUND_Y-this.height) {
      this.y = GameConfig.PHYSICS.GROUND_Y-this.height;
    }
    // Pickup check
    if (player && window.CollisionUtils.rectsOverlap(this.getHitbox(), player.getHitbox())) {
      switch(this.type) {
        case 0: player.hp = Math.min(player.hp+30, GameConfig.PLAYER.MAX_HP); break;
        case 1: player.special = Math.min(player.special+45, GameConfig.PLAYER.MAX_SPECIAL); break;
        case 2: player.invincible = true; player.invTimer = 0; break;
      }
      this.active = false;
      if (window.AudioManager) window.AudioManager.play('powerup');
      if (this.pool) this.pool.kill(this);
    }
  }
  render(ctx) {
    if (!this.active) return;
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x+this.width/2, this.y+this.height/2, 14, 0, Math.PI*2);
    ctx.globalAlpha = 0.77;
    ctx.fillStyle = this.colors[this.type%3];
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.font = "20px sans-serif";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(this.icon[this.type%3], this.x+this.width/2, this.y+this.height/2+8);
    ctx.restore();
  }
  getHitbox() {
    return { x:this.x+6, y:this.y+6, w:this.width-12, h:this.height-12 };
  }
}
window.PowerUp = PowerUp;