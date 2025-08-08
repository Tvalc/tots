// VirtualControls: Touch controls for mobile
window.VirtualControls = {
  mount(containerId) {
    if (document.getElementById('coop-virtual-controls')) return;
    const root = document.getElementById(containerId) || document.body;
    const controls = document.createElement('div');
    controls.id = 'coop-virtual-controls';
    controls.className = 'tw-absolute tw-z-40 tw-inset-0 tw-pointer-events-none';
    controls.innerHTML = `
      <div class="tw-absolute tw-bottom-4 tw-left-4 tw-flex tw-space-x-4">
        <div id="vc-left" class="tw-w-16 tw-h-16 tw-bg-black/80 tw-rounded-full tw-pointer-events-auto"></div>
        <div id="vc-right" class="tw-w-16 tw-h-16 tw-bg-black/80 tw-rounded-full tw-pointer-events-auto"></div>
      </div>
      <div class="tw-absolute tw-bottom-4 tw-right-4 tw-flex tw-space-x-4">
        <div id="vc-attack" class="tw-w-16 tw-h-16 tw-bg-green-500 tw-rounded-full tw-pointer-events-auto tw-flex tw-items-center tw-justify-center tw-text-white tw-text-xl tw-font-bold">Z</div>
        <div id="vc-jump" class="tw-w-16 tw-h-16 tw-bg-blue-600 tw-rounded-full tw-pointer-events-auto tw-flex tw-items-center tw-justify-center tw-text-white tw-text-xl tw-font-bold">␣</div>
        <div id="vc-special" class="tw-w-16 tw-h-16 tw-bg-yellow-400 tw-rounded-full tw-pointer-events-auto tw-flex tw-items-center tw-justify-center tw-text-white tw-text-xl tw-font-bold">X</div>
      </div>
    `;
    root.appendChild(controls);
    this.attachHandlers();
  },
  show() {
    const c = document.getElementById('coop-virtual-controls');
    if (c) c.style.display = 'block';
  },
  hide() {
    const c = document.getElementById('coop-virtual-controls');
    if (c) c.style.display = 'none';
  },
  resize() {},
  attachHandlers() {
    // Touch handlers for each button
    function bindBtn(id, key, downVal) {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.ontouchstart = e => { e.preventDefault(); window._COOP_STATE.input[key] = true; };
      btn.ontouchend = e => { e.preventDefault(); window._COOP_STATE.input[key] = false; };
      btn.onmousedown = e => { window._COOP_STATE.input[key] = true; };
      btn.onmouseup = e => { window._COOP_STATE.input[key] = false; };
      btn.onmouseleave = e => { window._COOP_STATE.input[key] = false; };
    }
    bindBtn('vc-left', 'left');
    bindBtn('vc-right', 'right');
    bindBtn('vc-attack', 'attack');
    bindBtn('vc-jump', 'jump');
    bindBtn('vc-special', 'special');
  }
};