// Enemy entity, updated with cartoon-style rendering and variations
class Enemy {
  constructor(x, y, type, pool, scene) {
    this.x = x;
    this.y = y;
    this.type = type || 0;
    this.pool = pool;
    this.scene = scene;
    this.width = GameConfig.ENEMY.WIDTH;
    this.height = GameConfig.ENEMY.HEIGHT;
    this.facing = 1;
    this.hp = GameConfig.ENEMY.BASE_HP + 5 * type;
    this.speed = GameConfig.ENEMY.BASE_SPEED + 0.2 * type;
    this.active = true;
    this.invincible = false;
    this.invTimer = 0;
    this.color = ["#cbd5e1", "#f472b6", "#fbbf24", "#a3e635", "#38bdf8"][type % 5];
    this.accessory = ["none", "headband", "hat", "glasses", "scarf"][type % 5];
    this.attackTimer = 0;
  }

  update(dt, player) {
    if (!this.active) return;
    // Simple AI: move toward player, attack if close
    let dx = (player.x + player.width / 2) - (this.x + this.width / 2);
    this.facing = Math.sign(dx) || 1;
    if (Math.abs(dx) > 36) {
      this.x += this.facing * this.speed * (dt / 16);
    }
    // Attack timer
    this.attackTimer += dt;
    if (this.attackTimer > 1300 && Math.abs(dx) < 48 && Math.abs(player.y - this.y) < 32) {
      player.takeDamage(10 + this.type * 2);
      this.attackTimer = 0;
      if (window.AudioManager) window.AudioManager.play('enemyAttack');
    }
    // Gravity
    this.y += GameConfig.PLAYER.GRAVITY * (dt / 16);
    if (this.y >= GameConfig.PHYSICS.GROUND_Y - this.height) {
      this.y = GameConfig.PHYSICS.GROUND_Y - this.height;
    }
    // Invincibility
    if (this.invincible) {
      this.invTimer += dt;
      if (this.invTimer > 600) {
        this.invincible = false;
        this.invTimer = 0;
      }
    }
    // Out of bounds
    if (this.x < -this.width || this.x > this.scene.canvas.width + this.width) {
      this.active = false;
    }
  }

  render(ctx) {
    if (!this.active) return;
    ctx.save();

    // Shadow
    ctx.globalAlpha = 0.19;
    ctx.beginPath();
    ctx.ellipse(this.x + this.width / 2, this.y + this.height - 8, 22, 9, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.globalAlpha = 1;

    // Body
    ctx.beginPath();
    ctx.ellipse(this.x + this.width / 2, this.y + this.height / 2 + 8, 22, 28, 0, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Head
    ctx.beginPath();
    ctx.arc(this.x + this.width / 2, this.y + this.height / 2 - 10, 13, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.stroke();

    // Eyes
    ctx.beginPath();
    ctx.arc(this.x + this.width / 2 - 5, this.y + this.height / 2 - 13, 2, 0, Math.PI * 2);
    ctx.arc(this.x + this.width / 2 + 5, this.y + this.height / 2 - 13, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#222";
    ctx.fill();

    // Mouth
    ctx.beginPath();
    ctx.arc(this.x + this.width / 2, this.y + this.height / 2 - 6, 4, 0, Math.PI, false);
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = "#222";
    ctx.stroke();

    // Arms
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2 - 14, this.y + this.height / 2 + 2);
    ctx.lineTo(this.x + this.width / 2 - 22, this.y + this.height / 2 + 18);
    ctx.moveTo(this.x + this.width / 2 + 14, this.y + this.height / 2 + 2);
    ctx.lineTo(this.x + this.width / 2 + 22, this.y + this.height / 2 + 18);
    ctx.stroke();

    // Legs
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2 - 8, this.y + this.height / 2 + 28);
    ctx.lineTo(this.x + this.width / 2 - 8, this.y + this.height / 2 + 42);
    ctx.moveTo(this.x + this.width / 2 + 8, this.y + this.height / 2 + 28);
    ctx.lineTo(this.x + this.width / 2 + 8, this.y + this.height / 2 + 42);
    ctx.stroke();

    // Accessory
    if (this.accessory === "headband") {
      ctx.beginPath();
      ctx.rect(this.x + this.width / 2 - 12, this.y + this.height / 2 - 18, 24, 4);
      ctx.fillStyle = "#ff0000";
      ctx.fill();
    } else if (this.accessory === "hat") {
      ctx.beginPath();
      ctx.arc(this.x + this.width / 2, this.y + this.height / 2 - 20, 15, Math.PI, 0);
      ctx.fillStyle = "#000";
      ctx.fill();
    } else if (this.accessory === "glasses") {
      ctx.beginPath();
      ctx.rect(this.x + this.width / 2 - 10, this.y + this.height / 2 - 15, 8, 4);
      ctx.rect(this.x + this.width / 2 + 2, this.y + this.height / 2 - 15, 8, 4);
      ctx.fillStyle = "#000";
      ctx.fill();
    } else if (this.accessory === "scarf") {
      ctx.beginPath();
      ctx.arc(this.x + this.width / 2, this.y + this.height / 2 + 10, 10, 0, Math.PI * 2);
      ctx.fillStyle = "#ff5722";
      ctx.fill();
    }

    ctx.restore();
  }

  takeDamage(amt, facing) {
    if (this.invincible || !this.active) return;
    this.hp -= amt;
    this.invincible = true;
    if (window.AudioManager) window.AudioManager.play('enemyHurt');
    if (this.hp <= 0) {
      this.active = false;
      if (this.pool) this.pool.kill(this);
      // PowerUp spawn chance
      if (this.scene.powerUps && Math.random() < 0.12) {
        let p = this;
        setTimeout(() => {
          if (this.scene.powerUps) this.scene.powerUps.spawn(p.x, p.y + 24);
        }, 180);
      }
    } else {
      // Knockback
      this.x += facing * 18;
    }
  }

  getHitbox() {
    return { x: this.x + 8, y: this.y + 8, w: this.width - 16, h: this.height - 16 };
  }
}
window.Enemy = Enemy;