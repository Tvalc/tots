// SeededRandom: deterministic random for procedural waves
class SeededRandom {
  constructor() {
    this.seed = 1;
  }
  setSeed(seedStr) {
    // Simple hash of string to int seed (FNV)
    let hash = 2166136261;
    for (let i = 0; i < seedStr.length; i++) {
      hash ^= seedStr.charCodeAt(i);
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    this.seed = hash >>> 0;
  }
  random() {
    // Mulberry32 PRNG
    let t = this.seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}
window.SeededRandom = SeededRandom;