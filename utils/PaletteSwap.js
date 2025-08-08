// PaletteSwap: swap colors for Coop's cosmetics
const PaletteSwap = {
  palettes: ["#77cbe5","#a3e635","#f472b6","#fbbf24","#c084fc","#38bdf8","#22d3ee"],
  get(idx) { return this.palettes[idx%this.palettes.length]; }
};
window.PaletteSwap = PaletteSwap;