// PerformanceMonitor: FPS/CPU monitor (not displayed, but can be used for debug)
const PerformanceMonitor = {
  last: performance.now(), frames:0, fps:0,
  update() {
    this.frames++;
    let now = performance.now();
    if (now-this.last > 1000) {
      this.fps = this.frames;
      this.frames = 0;
      this.last = now;
    }
  },
  getFPS() { return this.fps; }
};
window.PerformanceMonitor = PerformanceMonitor;