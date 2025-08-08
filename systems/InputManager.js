// InputManager: Handles keyboard input and provides an interface for querying key states.
const InputManager = {
  _keys: {},

  // Attach event listeners to the specified target (default: window)
  attach(target = window) {
    target.addEventListener('keydown', (e) => {
      this._keys[e.code || e.key] = true;
    });

    target.addEventListener('keyup', (e) => {
      this._keys[e.code || e.key] = false;
    });
  },

  // Check if a specific key is currently pressed
  isKeyDown(key) {
    return !!this._keys[key];
  }
};

// Attach InputManager to the global window object
window.InputManager = InputManager;