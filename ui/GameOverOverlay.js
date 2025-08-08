// GameOverOverlay: React-style Game Over overlay
window.GameOverOverlay = {
  mount(containerId) {
    if (document.getElementById('coop-gameover')) return;
    const root = document.getElementById(containerId) || document.body;
    const over = document.createElement('div');
    over.id = 'coop-gameover';
    over.className = 'tw-absolute tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-pointer-events-auto';
    over.style.display = "none";
    over.innerHTML = `
      <div class="tw-bg-black/80 tw-rounded tw-shadow tw-p-4 tw-text-center">
        <h1 class="tw-text-red-500 tw-text-4xl tw-font-bold tw-mb-6">Game Over</h1>
        <button id="gameover-restart" class="tw-bg-green-500 tw-text-white tw-px-4 tw-py-2 tw-rounded tw-font-bold tw-cursor-pointer">Restart</button>
        <br>
        <button id="gameover-menu" class="tw-bg-gray-600 tw-text-white tw-px-4 tw-py-2 tw-rounded tw-font-bold tw-cursor-pointer tw-mt-4">Back to Menu</button>
      </div>
    `;
    root.appendChild(over);
    document.getElementById('gameover-restart').onclick = () => {
      this.hide();
      if (window._COOP_EVENT_BUS)
        window._COOP_EVENT_BUS.emit('goto', 'GameScene');
    };
    document.getElementById('gameover-menu').onclick = () => {
      this.hide();
      if (window._COOP_EVENT_BUS)
        window._COOP_EVENT_BUS.emit('goto', 'MainMenuScene');
    };
  },
  show() {
    const over = document.getElementById('coop-gameover');
    if (over) over.style.display = "flex";
  },
  hide() {
    const over = document.getElementById('coop-gameover');
    if (over) over.style.display = "none";
  }
};