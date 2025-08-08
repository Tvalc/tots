// PropPool: object pooling for destructible props
class PropPool {
  constructor(scene) {
    this.pool = [];
    this.active = [];
    this.scene = scene;
  }
  spawn(x, y, type) {
    let prop = this.pool.pop();
    if (!prop) {
      prop = new window.DestructibleProp(x, y, type, this, this.scene);
    } else {
      Object.assign(prop, new window.DestructibleProp(x, y, type, this, this.scene));
      prop.active = true;
    }
    this.active.push(prop);
    return prop;
  }
  update(dt, player) {
    for (let i=0;i<this.active.length;i++) {
      let p = this.active[i];
      if (p.active) {
        p.update(dt, player);
      } else {
        this.pool.push(p);
        this.active.splice(i,1);
        i--;
      }
    }
  }
  render(ctx) {
    for (let i=0;i<this.active.length;i++) {
      this.active[i].render(ctx);
    }
  }
  forEachActive(cb) {
    for (let i=0;i<this.active.length;i++) {
      cb(this.active[i]);
    }
  }
  kill(prop) {
    prop.active = false;
  }
  count() { return this.active.length; }
}
window.PropPool = PropPool;