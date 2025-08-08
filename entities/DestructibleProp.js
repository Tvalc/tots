// DestructibleProp: breakable crates/barrels
class DestructibleProp {
  constructor(x, y, type, pool, scene) {
    this.x = x;
    this.y = y;
    this.type = type || 0;
    this.pool = pool;
    this.scene = scene;
    this.width = GameConfig.PROP.WIDTH;
    this.height = GameConfig.PROP.HEIGHT;
    this.hp = 18 + (type*8);
    this.active = true;
    this.color = ["#c08401","#b8b8b8","#8e4e2c"][type%3];
    this.invincible = false;
    this.invTimer = 0;
  }
  update(dt, player) {
    if (!this.active) return;
    // Gravity
    this.y += GameConfig.PLAYER.GRAVITY * (dt/16);
    if (this.y >= GameConfig.PHYSICS.GROUND_Y-this.height) {
      this.y = GameConfig.PHYSICS.GROUND_Y-this.height;
    }
    // Invincibility
    if (this.invincible) {
      this.invTimer += dt;
      if (this.invTimer > 400) {
        this.invincible = false;
        this.invTimer = 0;
      }
    }
  }
  render(ctx) {
    if (!this.active) return;
    ctx.save();
    // Shadow
    ctx.globalAlpha = 0.14;
    ctx.beginPath();
    ctx.ellipse(this.x+this.width/2, this.y+this.height-8, 12, 6, 0, 0, Math.PI*2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.globalAlpha = 1;
    // Body
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.invincible ? "#fbbf24" : "#222";
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
    ctx.stroke();
    // Details
    ctx.beginPath();
    ctx.moveTo(this.x+4, this.y+this.height-6);
    ctx.lineTo(this.x+this.width-4, this.y+this.height-6);
    ctx.strokeStyle = "#eab308";
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.restore();
  }
  takeDamage(amt) {
    if (this.invincible || !this.active) return;
    this.hp -= amt;
    this.invincible = true;
    if (window.AudioManager) window.AudioManager.play('propBreak');
    if (this.hp <= 0) {
      this.active = false;
      if (this.pool) this.pool.kill(this);
      // PowerUp spawn chance
      if (window.PowerUpPool && Math.random()<0.22) {
        let p = this;
        setTimeout(()=>{
          if (window.PowerUpPool) window.PowerUpPool.spawn(p.x,p.y+16);
        }, 90);
      }
    }
  }
  getHitbox() {
    return { x: this.x+4, y: this.y+4, w: this.width-8, h: this.height-8 };
  }
}
window.DestructibleProp = DestructibleProp;