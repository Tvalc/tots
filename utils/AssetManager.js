// AssetManager: Manages assets for the game, including preloading and retrieval
const AssetManager = {
  sprites: {},

  /**
   * Preloads assets and stores them in the AssetManager.
   * @param {Function} cb - Callback function to execute after all assets are loaded.
   */
  preloadAssets(cb) {
    const assets = {
      coinboy: [
        "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/coinboy_1.png",
        "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/coinboy_2.png",
        "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/coinboy_3.png"
      ],
      coop_walk: [
        "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/coop_walk_1.png",
        "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/coop_walk_2.png",
        "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/coop_walk_3.png"
      ],
      coop_jump: [
        "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/coop_jump_1.png"
      ],
      coop_attack: [
        "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/coop_attack_1.png",
        "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/coop_attack_2.png"
      ]
    };

    let totalAssets = Object.keys(assets).reduce((sum, key) => sum + assets[key].length, 0);
    let loadedAssets = 0;

    const checkAllLoaded = () => {
      if (loadedAssets === totalAssets && cb) cb();
    };

    const loadImages = (urls, key) => {
      const frames = [];
      urls.forEach((url, index) => {
        const img = new Image();
        img.onload = () => {
          frames[index] = img;
          loadedAssets++;
          checkAllLoaded();
        };
        img.onerror = () => {
          // Fallback: red box
          const canvas = document.createElement('canvas');
          canvas.width = 64;
          canvas.height = 64;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#f00';
          ctx.fillRect(0, 0, 64, 64);
          frames[index] = canvas;
          loadedAssets++;
          checkAllLoaded();
        };
        img.src = url;
      });
      this.sprites[key] = frames;
    };

    for (const [key, urls] of Object.entries(assets)) {
      loadImages(urls, key);
    }
  },

  /**
   * Retrieves a sprite by key.
   * @param {string} key - The key of the sprite to retrieve.
   * @returns {Array|undefined} - The sprite frames or undefined if not found.
   */
  getSprite(key) {
    return this.sprites[key];
  }
};

window.AssetManager = AssetManager;