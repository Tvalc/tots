// BootScene: Initial scene to set up the game environment.
class BootScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  start() {
    console.log('BootScene started');
    this.loadAssets(() => {
      const preloadScene = new window.PreloadScene(this.canvas);
      window.StateManager.changeState(preloadScene);
    });
  }

  loadAssets(callback) {
    window.AssetManager.preloadAssets(callback);
  }
}

window.BootScene = BootScene;