// Main entry point for the game. Initializes and starts the game.
(function () {
  window.addEventListener('DOMContentLoaded', () => {
    // Get the game canvas
    const canvas = document.getElementById('game-canvas');
    if (!canvas) {
      alert('Game canvas not found!');
      return;
    }

    // Focus the canvas for keyboard input
    canvas.focus();

    // Attach InputManager to the canvas
    if (window.InputManager && typeof window.InputManager.attach === 'function') {
      window.InputManager.attach(canvas);
    } else {
      console.error('InputManager is not properly initialized or missing the attach method!');
      return;
    }

    // Initialize and start the BootScene
    try {
      const bootScene = new window.BootScene(canvas);
      bootScene.start();
    } catch (error) {
      console.error('Failed to start the game:', error.message);
    }
  });
})();