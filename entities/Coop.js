// Coop (Player) entity, updated with animation frames for walking, attacking, and jumping
class Coop {
  constructor(x, y, scene) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.width = 64;
    this.height = 64;
    this.scene = scene;
    this.facing = 1; // 1 = right, -1 = left
    this.grounded = true;
    this.currentAnimation = "idle";
    this.animFrame = 0;
    this.animTimer = 0;
    this.animations = {
      idle: AssetManager.getSprite("coop_walk") || [],
      walk: AssetManager.getSprite("coop_walk") || [],
      jump: AssetManager.getSprite("coop_jump") || [],
      attack: AssetManager.getSprite("coop_attack") || []
    };
  }

  update(dt, input) {
    // Movement logic
    if (input.left) {
      this.vx = -5;
      this.facing = -1;
      this.setAnimation("walk");
    } else if (input.right) {
      this.vx = 5;
      this.facing = 1;
      this.setAnimation("walk");
    } else {
      this.vx = 0;
      this.setAnimation("idle");
    }

    // Jump logic
    if (input.jump && this.grounded) {
      this.vy = -10;
      this.grounded = false;
      this.setAnimation("jump");
    }

    // Gravity
    this.vy += 0.5;

    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Ground collision
    if (this.y >= this.scene.canvas.height - this.height) {
      this.y = this.scene.canvas.height - this.height;
      this.vy = 0;
      this.grounded = true;
    }

    // Update animation
    this.updateAnimation(dt);
  }

  setAnimation(animation) {
    if (this.currentAnimation !== animation) {
      this.currentAnimation = animation;
      this.animFrame = 0;
      this.animTimer = 0;
    }
  }

  updateAnimation(dt) {
    const frames = this.animations[this.currentAnimation];
    if (!frames || frames.length === 0) return;

    this.animTimer += dt;
    if (this.animTimer > 100) {
      this.animTimer = 0;
      this.animFrame = (this.animFrame + 1) % frames.length;
    }
  }

  render(ctx) {
    const frames = this.animations[this.currentAnimation];
    if (frames && frames.length > 0) {
      const frame = frames[this.animFrame];
      ctx.save();
      if (this.facing === -1) {
        ctx.scale(-1, 1);
        ctx.drawImage(frame, -this.x - this.width, this.y, this.width, this.height);
      } else {
        ctx.drawImage(frame, this.x, this.y, this.width, this.height);
      }
      ctx.restore();
    } else {
      // Fallback: Render placeholder rectangle
      ctx.fillStyle = "#f00";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}

window.Coop = Coop;