// Game configuration constants for Coop's Adventure
const GameConfig = {
  GAME_WIDTH: 960,
  GAME_HEIGHT: 540,
  PLAYER: {
    WIDTH: 64,
    HEIGHT: 64,
    MAX_HP: 100,
    MAX_SPECIAL: 100,
    WALK_SPEED: 3.2,
    JUMP_VELOCITY: -12,
    GRAVITY: 0.75,
    ATTACK_POWER: 10,
    SPECIAL_COST: 35
  },
  ENEMY: {
    WIDTH: 64,
    HEIGHT: 64,
    BASE_HP: 30,
    BASE_SPEED: 2.4,
    MAX_ON_SCREEN: 10
  },
  PROP: {
    WIDTH: 48,
    HEIGHT: 48
  },
  LEVELS: 10,
  STAGES_PER_LEVEL: 10,
  WAVES_PER_STAGE: 10,
  BG_LAYERS: 3,
  BG_COLORS: ["#23272e", "#3b4252", "#a3be8c"],
  SEED_PREFIX: "COOPADVENTURE",
  PHYSICS: {
    GROUND_Y: 440
  },
  POWERUP: {
    TYPES: ['heal', 'special', 'invincibility'],
    WIDTH: 32,
    HEIGHT: 32
  },
  FPS: 60
};

window.GameConfig = GameConfig;