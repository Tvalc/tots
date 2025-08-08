// StateManager: Manages the state transitions between game scenes.
class StateManager {
  constructor() {
    this.currentState = null;
  }

  changeState(newState) {
    if (this.currentState && typeof this.currentState.exit === 'function') {
      this.currentState.exit();
    }
    this.currentState = newState;
    if (this.currentState && typeof this.currentState.enter === 'function') {
      this.currentState.enter();
    }
  }

  update(dt) {
    if (this.currentState && typeof this.currentState.update === 'function') {
      this.currentState.update(dt);
    }
  }

  render(ctx) {
    if (this.currentState && typeof this.currentState.render === 'function') {
      this.currentState.render(ctx);
    }
  }
}

window.StateManager = StateManager;