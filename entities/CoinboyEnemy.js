// CoinboyEnemy: A specialized enemy with animation and state behaviors
class CoinboyEnemy extends Enemy {
  constructor(x, y, pool, scene) {
    super(x, y, 0, pool, scene); // Type 0 for Coinboy
    this.animationFrames = AssetManager.getSprite('coinboy'); // Preloaded frames
    this.currentFrame = 0;
    this.frameTimer = 0;
    this.state = 'walk'; // 'walk' or 'roll'
    this.stateTimer = 0;
    this.rollSpeed = 4.5;
    this.walkSpeed = 2.0;
    this.rotation = 0; // For roll animation
  }

  /**
   * Updates the enemy's state and animation.
   * @param {number} dt - Delta time since the last update.
   * @param {Object} player - The player object.
   */
  update(dt, player) {
    if (!this.active) return;

    this.stateTimer += dt;

    // Switch states periodically
    if (this.state === 'walk' && this.stateTimer > 3000) {
      this.state = 'roll';
      this.stateTimer = 0;
    } else if (this.state === 'roll' && this.stateTimer > 2000) {
      this.state = 'walk';
      this.stateTimer = 0;
    }

    // Movement logic
    if (this.state === 'walk') {
      this.x += this.facing * this.walkSpeed * (dt / 16);
    } else if (this.state === 'roll') {
      this.x += this.facing * this.rollSpeed * (dt / 16);
      this.rotation += 0.2 * this.facing; // Rotate during roll
    }

    // Update animation frame
    this.frameTimer += dt;
    if (this.frameTimer > 100) {
      this.currentFrame = (this.currentFrame + 1) % this.animationFrames.length;
      this.frameTimer = 0;
    }

    // Gravity and bounds
    super.update(dt, player);
  }

  /**
   * Renders the enemy on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  render(ctx) {
    if (!this.active) return;

    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

    if (this.state === 'roll') {
      ctx.rotate(this.rotation);
    }

    const frame = this.animationFrames[this.currentFrame];
    ctx.drawImage(frame, -this.width / 2, -this.height / 2, this.width, this.height);

    ctx.restore();
  }
}

window.CoinboyEnemy = CoinboyEnemy;