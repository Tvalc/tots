// PreloadScene: Displays a loading screen while assets are being loaded.
class PreloadScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  enter() {
    console.log('PreloadScene entered');
    this.loadGameAssets(() => {
      const mainMenuScene = new window.MainMenuScene(this.canvas);
      window.StateManager.changeState(mainMenuScene);
    });
  }

  loadGameAssets(callback) {
    // Simulate asset loading
    setTimeout(callback, 2000);
  }

  render(ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.fillText('Loading...', this.canvas.width / 2 - 50, this.canvas.height / 2);
  }
}

window.PreloadScene = PreloadScene;