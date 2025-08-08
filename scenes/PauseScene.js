// PauseScene: Overlays pause UI, resumes on input
class PauseScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.running = false;
    this._resumeBind = this.handleInput.bind(this);
  }
  start() {
    this.running = true;
    this.render();
    window._COOP_STATE.setHudState({ paused: true });
    document.addEventListener('keydown', this._resumeBind);
    if (window.PauseOverlay && typeof window.PauseOverlay.show === 'function') {
      window.PauseOverlay.show();
    }
  }
  stop() {
    this.running = false;
    window._COOP_STATE.setHudState({ paused: false });
    document.removeEventListener('keydown', this._resumeBind);
    if (window.PauseOverlay && typeof window.PauseOverlay.hide === 'function') {
      window.PauseOverlay.hide();
    }
  }
  render() {
    if (!this.running) return;
    // Overlay only, do not clear screen
    this.ctx.save();
    this.ctx.globalAlpha = 0.6;
    this.ctx.fillStyle = "#23272e";
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    this.ctx.globalAlpha = 1;
    this.ctx.font = "bold 54px sans-serif";
    this.ctx.fillStyle = "#fff";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Paused", this.canvas.width/2, this.canvas.height/2-20);
    this.ctx.font = "24px sans-serif";
    this.ctx.fillStyle = "#a3be8c";
    this.ctx.fillText("Press Escape or P to Resume", this.canvas.width/2, this.canvas.height/2+30);
    this.ctx.restore();
    if (this.running) requestAnimationFrame(this.render.bind(this));
  }
  handleInput(e) {
    if (e.key === "Escape" || e.key.toLowerCase() === "p") {
      if (window._COOP_EVENT_BUS)
        window._COOP_EVENT_BUS.emit('goto', 'GameScene');
    }
  }
}
window.PauseScene = PauseScene;