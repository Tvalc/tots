// MenuOverlay: React-style Main Menu overlay
window.MenuOverlay = {
  mount(containerId) {
    if (document.getElementById('coop-menu')) return;
    const root = document.getElementById(containerId) || document.body;
    const menu = document.createElement('div');
    menu.id = 'coop-menu';
    menu.className = 'tw-absolute tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-pointer-events-auto';
    menu.style.display = "none";
    menu.innerHTML = `
      <div class="tw-bg-black/80 tw-rounded tw-shadow tw-p-4 tw-text-center">
        <h1 class="tw-text-white tw-text-4xl tw-font-bold tw-mb-6">Coop's Adventure</h1>
        <button id="menu-play" class="tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2 tw-rounded tw-font-bold tw-mb-4 tw-cursor-pointer">Start Game</button>
        <br>
        <button id="menu-settings" class="tw-bg-gray-600 tw-text-white tw-px-4 tw-py-2 tw-rounded tw-font-bold tw-cursor-pointer">Settings</button>
      </div>
    `;
    root.appendChild(menu);
    document.getElementById('menu-play').onclick = () => {
      this.hide();
      if (window._COOP_EVENT_BUS)
        window._COOP_EVENT_BUS.emit('goto', 'GameScene');
    };
    document.getElementById('menu-settings').onclick = () => {
      this.hide();
      if (window.SettingsOverlay && typeof window.SettingsOverlay.show === 'function')
        window.SettingsOverlay.show();
    };
  },
  show() {
    const menu = document.getElementById('coop-menu');
    if (menu) menu.style.display = "flex";
  },
  hide() {
    const menu = document.getElementById('coop-menu');
    if (menu) menu.style.display = "none";
  }
};