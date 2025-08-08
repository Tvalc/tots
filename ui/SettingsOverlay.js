// SettingsOverlay: React-style Settings overlay (cosmetics, etc.)
window.SettingsOverlay = {
  mount(containerId) {
    if (document.getElementById('coop-settings')) return;
    const root = document.getElementById(containerId) || document.body;
    const settings = document.createElement('div');
    settings.id = 'coop-settings';
    settings.className = 'tw-absolute tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-pointer-events-auto';
    settings.style.display = "none";
    let palettes = window.PaletteSwap ? window.PaletteSwap.palettes : ["#77cbe5"];
    let paletteBtns = palettes.map((c,i)=>`
      <button data-pal="${i}" class="tw-w-10 tw-h-10 tw-rounded-full tw-border-2 tw-border-white tw-mx-2" style="background:${c};"></button>
    `).join('');
    settings.innerHTML = `
      <div class="tw-bg-black/80 tw-rounded tw-shadow tw-p-4 tw-text-center">
        <h1 class="tw-text-white tw-text-2xl tw-font-bold tw-mb-4">Settings</h1>
        <div class="tw-mb-4">
          <span class="tw-text-white">Coop Palette:</span>
          <div class="tw-flex tw-justify-center tw-items-center tw-mt-2">${paletteBtns}</div>
        </div>
        <button id="settings-close" class="tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2 tw-rounded tw-font-bold tw-cursor-pointer">Close</button>
      </div>
    `;
    root.appendChild(settings);
    // Palette button handlers
    palettes.forEach((c,i)=>{
      settings.querySelector(`button[data-pal="${i}"]`).onclick = () => {
        window.StateManager && window.StateManager.setPalette(i);
        window.Coop && (window.Coop.prototype.palette = i);
        if (window._COOP_STATE && window._COOP_STATE.currentScene && window._COOP_STATE.currentScene.player)
          window._COOP_STATE.currentScene.player.palette = i;
      };
    });
    document.getElementById('settings-close').onclick = () => {
      this.hide();
      if (window.MenuOverlay && typeof window.MenuOverlay.show === 'function')
        window.MenuOverlay.show();
    };
  },
  show() {
    const settings = document.getElementById('coop-settings');
    if (settings) settings.style.display = "flex";
  },
  hide() {
    const settings = document.getElementById('coop-settings');
    if (settings) settings.style.display = "none";
  }
};