// WaveGenerator: seeded, procedural enemy wave generator
class WaveGenerator {
  constructor(enemies, props, powerUps, scene) {
    this.level = 1;
    this.stage = 1;
    this.wave = 1;
    this.enemies = enemies;
    this.props = props;
    this.powerUps = powerUps;
    this.scene = scene;
    this.maxLevel = GameConfig.LEVELS;
    this.maxStage = GameConfig.STAGES_PER_LEVEL;
    this.maxWave = GameConfig.WAVES_PER_STAGE;
    this.seededRandom = new window.SeededRandom();
    this.enemyQueue = [];
    this.activeBoss = false;
    this.generateWave();
  }

  update() {
    if (this.enemies.count() === 0 && this.enemyQueue.length === 0 && !this.activeBoss) {
      this.wave++;
      if (this.wave > this.maxWave) {
        this.stage++;
        this.wave = 1;
        if (this.stage > this.maxStage) {
          this.level++;
          this.stage = 1;
          if (this.level > this.maxLevel) {
            this.level = 1;
          }
        }
      }
      this.generateWave();
    }

    while (this.enemies.count() < GameConfig.ENEMY.MAX_ON_SCREEN && this.enemyQueue.length > 0) {
      let e = this.enemyQueue.shift();
      this.enemies.spawn(e.x, e.y, e.type);
    }

    if (this.wave === 10 && !this.activeBoss && this.enemies.count() < 1) {
      this.activeBoss = true;
      this.spawnBoss();
    }
    if (this.activeBoss && this.enemies.count() === 0) {
      this.activeBoss = false;
    }
  }

  generateWave() {
    let seed = `${GameConfig.SEED_PREFIX}_${this.level}_${this.stage}_${this.wave}`;
    this.seededRandom.setSeed(seed);
    this.enemyQueue = [];
    let numEnemies = 4 + Math.floor(this.seededRandom.random() * 5);
    if (this.wave === 10) numEnemies = 0;

    for (let i = 0; i < numEnemies; i++) {
      let type = this.seededRandom.random() < 0.3 ? 'coinboy' : Math.floor(this.seededRandom.random() * 4);
      let side = this.seededRandom.random() < 0.5 ? -1 : 1;
      let x = side < 0 ? -70 : this.scene.canvas.width + 20;
      let y = GameConfig.PHYSICS.GROUND_Y - GameConfig.ENEMY.HEIGHT;
      this.enemyQueue.push({ x, y, type });
    }
  }

  spawnBoss() {
    let type = Math.min(4, Math.floor(this.level / 2));
    let x = this.scene.canvas.width / 2 - GameConfig.ENEMY.WIDTH / 2;
    let y = GameConfig.PHYSICS.GROUND_Y - GameConfig.ENEMY.HEIGHT;
    this.enemies.spawn(x, y, type);
  }
}
window.WaveGenerator = WaveGenerator;