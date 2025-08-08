// UIScene: Manages non-gameplay UI overlays (HUD, menus, etc.)
class UIScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }
  start() {
    // Not used for rendering, handled by React overlays
  }
  stop() {}
  onResize() {
    // React overlays are responsive, but can sync here if needed
    if (window.HUDOverlay && typeof window.HUDOverlay.resize === 'function') {
      window.HUDOverlay.resize();
    }
    if (window.VirtualControls && typeof window.VirtualControls.resize === 'function') {
      window.VirtualControls.resize();
    }
  }
}
window.UIScene = UIScene;