// GameOverScene: Shows game over overlay and option to restart
class GameOverScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.running = false;
    this._bindInput = this.handleInput.bind(this);
  }
  start() {
    this.running = true;
    this.render();
    document.addEventListener('keydown', this._bindInput);
    if (window.GameOverOverlay && typeof window.GameOverOverlay.show === 'function') {
      window.GameOverOverlay.show();
    }
  }
  stop() {
    this.running = false;
    document.removeEventListener('keydown', this._bindInput);
    if (window.GameOverOverlay && typeof window.GameOverOverlay.hide === 'function') {
      window.GameOverOverlay.hide();
    }
  }
  render() {
    if (!this.running) return;
    // Overlay
    this.ctx.save();
    this.ctx.globalAlpha = 0.85;
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    this.ctx.globalAlpha = 1;
    this.ctx.font = "bold 54px sans-serif";
    this.ctx.fillStyle = "#ef4444";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Game Over", this.canvas.width/2, this.canvas.height/2-20);
    this.ctx.font = "24px sans-serif";
    this.ctx.fillStyle = "#fff";
    this.ctx.fillText("Press Enter to Restart", this.canvas.width/2, this.canvas.height/2+40);
    this.ctx.restore();
    if (this.running) requestAnimationFrame(this.render.bind(this));
  }
  handleInput(e) {
    if (e.key === 'Enter') {
      if (window._COOP_EVENT_BUS)
        window._COOP_EVENT_BUS.emit('goto', 'MainMenuScene');
    }
  }
}
window.GameOverScene = GameOverScene;