// PauseOverlay: React-style Pause overlay
window.PauseOverlay = {
  mount(containerId) {
    if (document.getElementById('coop-pause')) return;
    const root = document.getElementById(containerId) || document.body;
    const pause = document.createElement('div');
    pause.id = 'coop-pause';
    pause.className = 'tw-absolute tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-pointer-events-auto';
    pause.style.display = "none";
    pause.innerHTML = `
      <div class="tw-bg-black/80 tw-rounded tw-shadow tw-p-4 tw-text-center">
        <h1 class="tw-text-white tw-text-3xl tw-font-bold tw-mb-4">Paused</h1>
        <button id="pause-resume" class="tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2 tw-rounded tw-font-bold tw-cursor-pointer">Resume</button>
        <br>
        <button id="pause-menu" class="tw-bg-gray-600 tw-text-white tw-px-4 tw-py-2 tw-rounded tw-font-bold tw-cursor-pointer tw-mt-4">Menu</button>
      </div>
    `;
    root.appendChild(pause);
    document.getElementById('pause-resume').onclick = () => {
      this.hide();
      if (window._COOP_EVENT_BUS)
        window._COOP_EVENT_BUS.emit('goto', 'GameScene');
    };
    document.getElementById('pause-menu').onclick = () => {
      this.hide();
      if (window._COOP_EVENT_BUS)
        window._COOP_EVENT_BUS.emit('goto', 'MainMenuScene');
    };
  },
  show() {
    const pause = document.getElementById('coop-pause');
    if (pause) pause.style.display = "flex";
  },
  hide() {
    const pause = document.getElementById('coop-pause');
    if (pause) pause.style.display = "none";
  }
};