// AudioManager: Handles audio playback for the game.
const AudioManager = {
  sounds: {},

  loadSounds(soundMap) {
    for (const [key, url] of Object.entries(soundMap)) {
      const audio = new Audio(url);
      this.sounds[key] = audio;
    }
  },

  play(soundKey) {
    const sound = this.sounds[soundKey];
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  },

  stop(soundKey) {
    const sound = this.sounds[soundKey];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }
};

window.AudioManager = AudioManager;