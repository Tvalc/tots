// ObjectPool: Abstract base class for object pooling
class ObjectPool {
  constructor() {
    this.pool = [];
    this.active = [];
  }
  spawn() {}
  kill(obj) {
    obj.active = false;
  }
  update(dt) {}
  render(ctx) {}
  forEachActive(cb) {}
  count() { return this.active.length; }
}
window.ObjectPool = ObjectPool;