// GameScene: Main game logic, including player input handling and rendering.
class GameScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.player = null;

    // Defensive check to ensure InputManager is available
    if (!window.InputManager || typeof window.InputManager.isKeyDown !== 'function') {
      throw new Error('InputManager is not loaded or is missing the isKeyDown method!');
    }
  }

  start() {
    // Initialize the player and start the game loop
    this.player = new Coop(100, this.canvas.height - 64, this);
    this.loop();
  }

  loop() {
    // Main game loop: update and render
    this.update(16); // Assuming a fixed timestep of 16ms
    this.render();
    requestAnimationFrame(this.loop.bind(this));
  }

  update(dt) {
    // Gather input states using InputManager
    const input = {
      left: window.InputManager.isKeyDown("ArrowLeft"),
      right: window.InputManager.isKeyDown("ArrowRight"),
      jump: window.InputManager.isKeyDown("Space")
    };

    // Update the player with the current input
    this.player.update(dt, input);
  }

  render() {
    // Clear the canvas and render the player
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.render(this.ctx);
  }
}

// Attach GameScene to the global window object
window.GameScene = GameScene;