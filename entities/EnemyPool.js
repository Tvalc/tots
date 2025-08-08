// EnemyPool: object pooling for enemies
class EnemyPool {
  constructor(scene) {
    this.pool = [];
    this.active = [];
    this.scene = scene;
  }

  spawn(x, y, type) {
    let enemy;
    if (type === 'coinboy') {
      enemy = this.pool.find(e => e instanceof CoinboyEnemy && !e.active);
      if (!enemy) {
        enemy = new CoinboyEnemy(x, y, this, this.scene);
      } else {
        Object.assign(enemy, new CoinboyEnemy(x, y, this, this.scene));
        enemy.active = true;
      }
    } else {
      enemy = this.pool.find(e => e instanceof Enemy && !e.active);
      if (!enemy) {
        enemy = new Enemy(x, y, type, this, this.scene);
      } else {
        Object.assign(enemy, new Enemy(x, y, type, this, this.scene));
        enemy.active = true;
      }
    }

    this.active.push(enemy);
    return enemy;
  }

  update(dt, player) {
    for (let i = 0; i < this.active.length; i++) {
      let e = this.active[i];
      if (e.active) {
        e.update(dt, player);
      } else {
        this.pool.push(e);
        this.active.splice(i, 1);
        i--;
      }
    }
  }

  render(ctx) {
    for (let i = 0; i < this.active.length; i++) {
      this.active[i].render(ctx);
    }
  }

  kill(enemy) {
    enemy.active = false;
  }

  count() {
    return this.active.length;
  }

  // New helper method to maintain API consistency
  forEachActive(callback) {
    this.active.forEach(callback);
  }
}
window.EnemyPool = EnemyPool;