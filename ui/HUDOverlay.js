// HUDOverlay: React-style HUD using DOM
window.HUDOverlay = {
  state: { 
    hp: 100, 
    special: 100, 
    level: 1, 
    stage: 1, 
    wave: 1, 
    paused: false, 
    gameOver: false, 
    combo: 0, 
    canSpecial: true,
    announcements: []
  },
  mount(containerId) {
    const root = document.getElementById(containerId) || document.body;
    if (!document.getElementById('coop-hud')) {
      const hud = document.createElement('div');
      hud.id = 'coop-hud';
      hud.className = 'tw-absolute tw-z-30 tw-top-0 tw-left-0 tw-w-full tw-flex tw-justify-between tw-items-start tw-p-4';
      root.appendChild(hud);
    }
    this.updateHUD(this.state);
  },
  show() {
    const hud = document.getElementById('coop-hud');
    if (hud) hud.style.display = 'flex';
    this.updateHUD(this.state);
  },
  hide() {
    const hud = document.getElementById('coop-hud');
    if (hud) hud.style.display = 'none';
  },
  resize() {
    // Responsive handled by Tailwind classes
  },
  updateHUD(state) {
    this.state = Object.assign({}, this.state, state);
    let hud = document.getElementById('coop-hud');
    if (!hud) return;
    const announcements = this.state.announcements.map(a => `<div class="tw-text-white">${a.message}</div>`).join('');
    hud.innerHTML = `
      <div class="tw-bg-black/80 tw-rounded tw-shadow tw-px-4 tw-py-2">
        <span class="tw-text-white tw-font-bold">HP:</span>
        <span class="tw-text-red-500 tw-font-bold">${Math.round(this.state.hp)}</span>
        <span class="tw-mx-2"></span>
        <span class="tw-text-white tw-font-bold">Special:</span>
        <span class="tw-text-blue-600 tw-font-bold">${Math.round(this.state.special)}</span>
        <span class="tw-mx-2"></span>
        <span class="tw-text-white tw-font-bold">Combo:</span>
        <span class="tw-text-green-500 tw-font-bold">${this.state.combo || 0}</span>
      </div>
      <div class="tw-bg-black/80 tw-rounded tw-shadow tw-px-4 tw-py-2 tw-flex tw-items-center">
        <span class="tw-text-white">Level ${this.state.level} | Stage ${this.state.stage} | Wave ${this.state.wave}</span>
      </div>
      <div class="tw-bg-black/80 tw-rounded tw-shadow tw-px-4 tw-py-2 tw-mt-4">
        <h3 class="tw-text-white tw-font-bold">Announcements:</h3>
        ${announcements}
      </div>
    `;
  }
};