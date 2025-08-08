// MainMenuScene: Shows logo and menu, start button, settings, etc.
class MainMenuScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.running = false;
    this.menuActive = true;
    this._bindInput = this.onInput.bind(this);
  }
  start() {
    this.running = true;
    this.render();
    this.menuActive = true;
    document.addEventListener('keydown', this._bindInput);
    // Show React menu overlay
    if (window.MenuOverlay && typeof window.MenuOverlay.show === 'function') {
      window.MenuOverlay.show();
    }
  }
  stop() {
    this.running = false;
    document.removeEventListener('keydown', this._bindInput);
    if (window.MenuOverlay && typeof window.MenuOverlay.hide === 'function') {
      window.MenuOverlay.hide();
    }
  }
  render() {
    if (!this.running) return;
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.ctx.fillStyle = "#23272e";
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

    this.ctx.save();
    this.ctx.font = "bold 54px sans-serif";
    this.ctx.fillStyle = "#fff";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Coop's Adventure", this.canvas.width/2, this.canvas.height/2-60);
    this.ctx.font = "24px sans-serif";
    this.ctx.fillStyle = "#a3be8c";
    this.ctx.fillText("Press Enter to Start", this.canvas.width/2, this.canvas.height/2+10);
    this.ctx.font = "18px sans-serif";
    this.ctx.fillStyle = "#d8dee9";
    this.ctx.fillText("Arrow keys/WASD: Move | Space: Jump | Z: Attack | X: Special | Esc: Pause", this.canvas.width/2, this.canvas.height/2+60);
    this.ctx.restore();
    if (this.running) requestAnimationFrame(this.render.bind(this));
  }
  onInput(e) {
    if (!this.menuActive) return;
    if (e.key === 'Enter') {
      this.menuActive = false;
      if (window._COOP_EVENT_BUS)
        window._COOP_EVENT_BUS.emit('goto', 'GameScene');
    }
  }
}
window.MainMenuScene = MainMenuScene;