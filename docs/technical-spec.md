# Technical Specification

## Description
Architecture, performance, and platform requirements

## Content
```technical_spec_document
title: Coop's Adventure – Technical Specification
version: 1.0
author: Snib AI Game Platform
date: 2024-06-08

---

## 1. Overview

This technical specification translates the Coop’s Adventure Game Design Document into actionable development guidance for the Snib AI Game Platform. It details architecture, technology choices, performance constraints, platform compatibility, and implementation strategies for a browser-based, instant-play beat ‘em up, using Phaser.js 3.90.0.

---

## 2. Technology Stack

### 2.1 Game Engine

- **Primary:** Phaser.js 3.90.0 (ES6 module import)
- **Rendering:** WebGL (with Canvas fallback)
- **Physics:** Phaser Arcade Physics (lightweight, performant)
- **Scripting:** JavaScript ES6+ (TypeScript optional but recommended for maintainability)
- **Asset Management:** Phaser Loader plugin for images, audio, and JSON
- **UI Layer:** Phaser Scene + CSS3 for overlays (touch controls, HUD)
- **Responsive UI:** CSS3 (Flexbox, Grid, Media Queries) + Phaser Scale Manager

### 2.2 Supported Web Features

- WebGL, Web Audio API, Canvas 2D
- Pointer events (mouse, touch)
- Keyboard events
- Local Storage (window.localStorage, 5-10MB)

### 2.3 Prohibited Technologies

- No Unity, Godot, native code, server-side logic, or native desktop/mobile OS APIs.

---


### **Add to Section 2 (Technology Stack):**
```markdown
#### 2.4 Asset Sourcing Policy

- All external assets (images, audio, fonts, etc.) must be explicitly provided by the user.
- If an asset is not supplied by the user, the game must generate the required visual or audio element using code (CSS, SVG, Canvas, or procedural audio) only.
- No third-party, stock, or default assets may be used unless uploaded or authorized by the user.
- All programmatically generated visuals must be compatible with React, TypeScript, and Tailwind CSS.
```

### **Update Section 3.1 (Asset Optimization):**
- Add:  
  > “If a required asset is not provided by the user, fallback to CSS/SVG/Canvas-generated visuals or procedural audio.”

### **Update Section 10.1 (Snib Platform CDN):**
- Add:  
  > “Only user-supplied assets are uploaded to and referenced from the Snib CDN. No external asset fetching is permitted.”

### **Update Section 14 (Compliance with Existing Documents):**
- Add:  
  > “Asset sourcing policy (user-provided only, otherwise code/CSS-generated) is now a core requirement and must be reflected in all related design documents.”

---

## 3. **Summary Table of Recommendations**

| Area                | Recommendation                                                                 |
|---------------------|--------------------------------------------------------------------------------|
| Asset Sourcing      | Add explicit section on user-provided assets only; code/CSS fallback required  |
| Cross-Doc Consistency | Reference in all design docs; update compliance section                       |
| Fallbacks           | Describe CSS/SVG/Canvas/procedural audio fallbacks for missing assets          |
| Platform Constraints| Ensure compatibility with React, TypeScript, Tailwind CSS                      |
| Documentation Best Practices | Use clear, labeled sections and provide code examples                  |

---


## 3. Performance & Asset Guidelines

| Metric                | Target/Limit         |
|-----------------------|---------------------|
| Initial Load Time     | ≤ 3 seconds         |
| Max Game Size         | ≤ 10MB (JS bundle + all assets) |
| Target FPS            | 60                  |
| Max Memory Usage      | ≤ 500MB             |
| Asset Budget          | ≤ 50MB (images & audio) |
| Max Image Size        | ≤ 2MB (each)        |
| Max Audio Length      | ≤ 3 min (each)      |
| Enemies On-Screen     | ≤ 10                |

### 3.1 Asset Optimization

- **Spritesheets:** Use TexturePacker or similar to compress and combine sprites; prefer WebP/PNG.
- **Audio:** Use OGG/MP3 at 96–128kbps, short SFX (<100KB each).
- **Backgrounds:** Multi-layer parallax via tiled horizontal strips; compress to <500KB/layer.
- **UI:** SVG for scalable icons where possible; rasterize for performance if needed.

### 3.2 Loading Strategy

- **Preload:** Core sprites, Coop, first level’s backgrounds, first enemy set, main UI, SFX.
- **Lazy Load:** Next stage/level assets in background during gameplay.
- **Progressive Loading:** Display minimal loading screen (<1s); animated progress bar using Phaser Loader.

---

## 4. Game Architecture

### 4.1 Phaser Scene Structure

- **BootScene:** Preloads minimal assets, configures scaling, routes to PreloadScene.
- **PreloadScene:** Loads core assets, shows loading progress, routes to MainMenuScene.
- **MainMenuScene:** UI, settings, cosmetic selection, resume/new game.
- **GameScene:** Core gameplay (levels, waves, combat, input, HUD, procedural gen).
- **PauseScene:** Overlay for pause/options.
- **GameOverScene:** Results, restart/exit options.
- **UIScene:** Persistent overlay for HUD (HP, special meter, wave info), responsive controls.

### 4.2 Entity Management

- **Coop:** Player character class; handles movement, attacks, state, animation.
- **Enemy:** Base class with per-archetype subclasses (AI, stats, art, behavior).
- **Object Pooling:** Use Phaser.Group or custom pools for Coop, enemies, projectiles, effects.
- **Power-ups:** Lightweight, pooled objects for health/special refills.

### 4.3 Procedural Wave Generation

- **Seeded RNG:** Use a deterministic seed (e.g., level/stage/wave number + user ID) for fairness and replayability.
- **Wave Generator:** For each wave, select N enemies randomly (weights per archetype), cap simultaneous spawns to 8–10.
- **Queue System:** Off-screen enemies queue in as on-screen count drops.

---

## 5. Input & Controls

### 5.1 Unified Input System

- **Abstraction Layer:** Map Phaser input events (keyboard, pointer, touch) to logical game actions.
- **Touch:** Multi-touch (move + attack), virtual joystick (left), action buttons (right).
- **Desktop:** Keyboard (WASD/Arrow), mouse clicks, gamepad (future).
- **Visual Feedback:** Button highlights, Coop sprite flashes.

### 5.2 Responsive Controls

- **Mobile:** Auto-show touch UI; large, thumb-friendly targets; support swipe/hold for “Advance.”
- **Desktop:** Hide touch UI; show key/mouse hints.
- **Real-Time Input Mapping:** Detect input device and update UI hints/controls instantly.

### 5.3 Accessibility

- **High-contrast mode toggle**
- **Large text option for HUD**
- **Configurable key bindings (future version)**

---

## 6. Visuals & Presentation

### 6.1 Art Pipeline

- **Style:** Pixel art or vector cartoon; scale at 2× for Retina/HiDPI; fit to device via Phaser Scale Manager.
- **Parallax:** 3–4 background layers, scroll at different rates.
- **Animation:** Sprite sheets (idle, walk, attack, jump, special, hit, KO); target ≤12 frames/anim.
- **Effects:** Use particle systems (Phaser ParticleEmitter) for impacts, special moves.

### 6.2 UI/HUD

- **Layout:** Top bar (HP, special meter), corner (level/stage/wave), unobtrusive overlays.
- **Responsive:** CSS3 and Phaser’s scale manager for resizing, repositioning on orientation change.
- **Touch Controls:** Absolute-positioned divs over Phaser canvas; transparent PNGs or SVGs for buttons.

---

## 7. Audio

### 7.1 Format & Loading

- **Music:** OGG/MP3, 48–96kbps, looped seamlessly; load 1–2 tracks in memory at a time.
- **SFX:** Short OGG/MP3; group by context (attack, hit, wave clear, UI).
- **Preload:** Only SFX for first waves; stream other audio as needed.

### 7.2 Playback

- **Web Audio API:** Phaser.Sound for mixing, volume control, mute toggle.
- **Performance:** Avoid >6 simultaneous audio channels.

---

## 8. Data Persistence

### 8.1 Save System

- **Technology:** window.localStorage; fallback if unavailable (warn user).
- **What to Save:** Last completed level, cosmetics, settings.
- **When:** On level completion, settings change, or pause.
- **Size:** Ensure total save footprint <1MB.

---

## 9. Performance Optimization

### 9.1 Rendering

- **Sprite Batching:** Use sprite atlases; minimize draw calls.
- **Cull Off-screen Entities:** Only update/render visible entities.
- **Pooling:** Never destroy/recreate sprites mid-level; always reuse.
- **Fixed Update/Render Steps:** Cap logic updates to 60Hz, skip frames as needed.

### 9.2 Memory

- **Unload Unused Assets:** On level transition, destroy and dereference assets not needed for next level.
- **Image Compression:** Use indexed PNG/WebP for backgrounds and characters.
- **Limit Audio Buffers:** Unload/replace background music when changing levels.

### 9.3 Asset Loading

- **Async Loading:** Use Phaser.Loader’s async API for all non-critical assets.
- **Progressive Reveal:** Show “Stage X Loading…” screen, but keep to <1s.

---

## 10. Deployment & Compatibility

### 10.1 Snib Platform CDN

- All assets hosted on Snib CDN; reference via relative paths or platform API.
- No external HTTP requests (CORS restrictions).

### 10.2 Browser Support

- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Test on mobile Safari/Chrome (iOS/Android), desktop browsers.
- No plugins, no downloads.

### 10.3 Offline

- No offline support; game must handle loss of connectivity gracefully (pause, “reconnect” prompt).

---

## 11. Security & Sandbox

- No file system access, no eval or dynamic script injection.
- Sanitize all user input (e.g., cosmetic names).
- Save only to localStorage; no cookies or tracking.

---

## 12. Example Implementation Patterns

### 12.1 Phaser Loader (Preload Example)
```js
class PreloadScene extends Phaser.Scene {
  preload() {
    this.load.image('coop', 'assets/coop.png');
    this.load.spritesheet('enemies', 'assets/enemies.png', { frameWidth: 32, frameHeight: 32 });
    this.load.audio('bgm1', ['assets/music/level1.ogg', 'assets/music/level1.mp3']);
    // ...load backgrounds, UI, etc.
  }
  create() {
    this.scene.start('MainMenuScene');
  }
}
```

### 12.2 Responsive HUD
```js
// In UIScene
updateLayout(width, height) {
  if (width < 600) {
    // Stack HUD vertically for mobile
  } else {
    // Horizontal HUD for desktop
  }
}
window.addEventListener('resize', () => this.updateLayout(window.innerWidth, window.innerHeight));
```

### 12.3 Object Pooling Pattern
```js
class EnemyPool {
  constructor(scene, key) {
    this.pool = scene.add.group({ classType: Enemy, maxSize: 10, runChildUpdate: true });
  }
  spawn(x, y, type) {
    let enemy = this.pool.get(x, y, type);
    enemy.active = true; enemy.visible = true;
    // ...
  }
  release(enemy) { 
    enemy.active = false; enemy.visible = false; 
    this.pool.killAndHide(enemy);
  }
}
```

---

## 13. Open/Outstanding Items

- Finalize art asset pipeline (sprite sizes, color depth, animation frame counts).
- Confirm UI/UX flows for pause, resume, and settings.
- Optimize first-load experience for sub-3s target on mobile 4G.
- Playtest procedural generation for fairness and variety.

---

## 14. Compliance with Existing Documents

- All referenced mechanics (jump, run, power-up, enemies, hp, quest) implemented per game_design_document.
- No conflicts detected with character_design or level_design; update if new enemy archetypes or player moves are added.

---

END OF DOCUMENT
```


---
*Generated on 8/7/2025*
