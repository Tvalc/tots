# Level Design Document

## Description
Individual level layouts, progression, and mechanics

## Content
```level_design_document
title: Coop's Adventure – Level Design Document
version: 1.0
author: Snib AI Game Platform
date: 2024-06-08

---

## 1. Purpose & Scope

This Level Design Document details the structure, progression, pacing, environmental storytelling, and player guidance for Coop’s Adventure, ensuring all levels are consistent with defined mechanics (jump, run, power-up, enemy, hp, health, quest) and optimized for instant browser-based play across devices.

---

## 2. Level Structure & Flow

### 2.1. Hierarchy

- **Levels (10 total):** Each with a distinct theme, color palette, and set of enemy archetypes.
- **Stages (10 per level):** Unique sub-areas within the level, offering varied backgrounds and minor environmental shifts.
- **Waves (10 per stage):** Individual combat encounters, procedurally generated for variety and replayability.

#### Example:
- **Level 2: Docks**
  - Stage 1: Waterfront
  - Stage 2: Warehouse
  - ...
  - Stage 10: Loading Crane (Boss Stage)
    - Each stage contains 10 combat waves.

### 2.2. Layout

- **Playable Area:** Horizontal, side-scrolling “arena” with fixed vertical bounds; width extends as Coop advances.
- **Boundaries:** Soft limits on left/right; Coop starts at leftmost edge, advances right through waves.
- **Parallax Backgrounds:** Multi-layered for depth, unique layers per level and stage.
- **Destructibles:** Crates, barrels, and background props (1–3 per wave) can contain power-ups (health, special meter).

#### Sample Arena (HTML5 Canvas Grid Reference)
- **Width:** 1024–1600px (scales based on device/screen)
- **Height:** 540–900px (scales based on device/orientation)
- **Enemy Spawn Zones:** Off-screen right/left/top, enter play area dynamically.
- **Power-up Locations:** Near destructibles at arena edges or mid-field.

---

## 3. Progression & Pacing

### 3.1. Difficulty Curve

- **Wave 1:** Fewest, weakest enemies (e.g., 10 total; all “Basic Thug”)
- **Waves 2–9:** Gradually increase enemy mix, count, and aggression. Introduce new enemy types and limited hazards.
- **Wave 10 (Boss):** Unique boss enemy + minions; distinct arena layout or environmental hazard.

#### Wave Difficulty Formula
- **Enemy HP:** +5% per wave within stage
- **Enemy Count:** +2 per wave (e.g., Wave 1: 10; Wave 5: 16)
- **Aggression:** AI attack intervals shorten by 0.1s per wave

### 3.2. Environmental Variety

- **Stage Transitions:** Use fade/slide, weather changes (rain, fog), or time-of-day shifts.
- **Boss Arenas:** Larger, visually distinct; e.g., Docks – Loading Crane has moving cargo hazards.

### 3.3. Player Guidance

- **Wave Start:** “Ready!” flash, short camera focus on enemy spawn side.
- **Wave End:** “Go!” arrow, screen shake, and right-edge glow prompt to advance.
- **Tutorials:** Level 1, Stage 1 overlays: “Press X or Tap [Jump]”, “Move with arrows or swipe”, “Attack with Z or tap”.

---

## 4. Level Themes & Environmental Storytelling

### 4.1. Thematic Progression

Each level visually and mechanically escalates the story:

| Level | Theme          | Visual Motifs         | Unique Enemies         | Interactive Props         |
|-------|----------------|----------------------|------------------------|--------------------------|
| 1     | City Streets   | Graffiti, neon, cars | Basic Thug, Punk       | Phone booth, bin         |
| 2     | Docks          | Cranes, water, crates| Sailor, Dock Worker, Dog| Barrel, crate            |
| 3     | Subway         | Trains, graffiti     | Skater, Hooligan, Ninja| Ticket kiosk, bench      |
| 4     | Rooftops       | Antennae, pigeons    | Elite Ninja, Bruiser   | Water tower, AC unit     |
| ...   | ...            | ...                  | ...                    | ...                      |

### 4.2. Environmental Storytelling Examples

- **Progressing through the Docks:** Backgrounds start at quiet piers, then show increased security, culminating in a boss stage with patrol boats and a spotlight.
- **Destructibles:** Hidden power-ups in barrels hint at smuggling operations, reinforcing the dock theme.

---

## 5. Interactive Elements

### 5.1. Destructible Objects

- **Crates/Barrels:** 1–3 per wave; breakable with attack/jump; may contain power-ups.
- **Power-Ups:**
  - **Health Pack:** +25% HP (referenced from “hp”/“health” mechanic)
  - **Special Meter:** +50% special bar
  - **Temporary Buffs:** (Future) e.g., 10s attack boost

### 5.2. Enemy Waves

- **Spawn Logic:** Max 8–10 enemies on-screen; others queue in.
- **Enemy Mix:** Procedurally selected from level’s archetypes per “enemy”/“enemies” mechanic.
- **AI Variety:** Basic (approach/attack), Advanced (jump, dash, coordinate).
- **Bosses:** Unique attack patterns, environmental manipulation (e.g., boss knocks down crates).

### 5.3. Hazards

- **Stage 10 Bosses:** May trigger hazards (e.g., falling cargo, moving trains).
- **Optional (Performance):** Hazards limited to 1–2 per boss arena, simple hitbox.

---

## 6. Player Guidance & Onboarding

- **First Stage:** Contextual overlays for controls (jump, run, attack, special, power-up).
- **Visual Cues:** Flashing arrows, UI highlights, “Go!” prompts, destructible highlights.
- **Failure Feedback:** Red flash and HP loss on hit; “Game Over” overlay with restart prompt.

---

## 7. UI & Input Considerations

- **Touch & Mouse:** Large on-screen buttons, swipe zones, clear feedback (button highlights, vibration).
- **Keyboard:** WASD/Arrows, Z/X/C, spacebar mappings, visible hints for desktops.
- **HUD:** Top bar with Coop’s HP (health mechanic), special meter, level/stage/wave; responsive scaling.

---

## 8. Performance & Browser Optimization

- **Asset Streaming:** 
  - Preload current stage assets; lazy-load next stage’s backgrounds, music, and enemy sprites.
- **Enemy Cap:** 8–10 on-screen for CPU/GPU performance.
- **Object Pooling:** For enemies, destructibles, effects.
- **Art Style:** Pixel/cartoon, <64px per sprite for enemy/Coop, background layers compressed.
- **Audio:** 128kbps OGG/MP3, 3–4s loops for music; SFX <100ms for punchiness.
- **Responsive Layout:** CSS breakpoints for mobile/desktop, instant orientation adaptation.

---

## 9. Example Level Breakdown

### Level 2: Docks

#### Stage 3: Warehouse
- **Background:** Dimly lit warehouse, stacked crates, shadows
- **Destructibles:** 2 crates (1 contains health, 1 contains special)
- **Wave 1:** 8 Dock Workers (easy), 2 Guard Dogs
- **Wave 5:** 6 Sailors, 5 Dock Workers, 5 Guard Dogs (more aggressive)
- **Wave 10 (Boss):** “Foreman Briggs” (throws crates, wide attack arc), 3 Sailors assist, moving forklift hazard

#### Stage 7: Freighter Deck
- **Background:** Ship deck at sunset, cargo containers
- **Destructibles:** 1 barrel (special meter), 2 crates (empty)
- **Wave 1:** 10 Sailors
- **Wave 7:** 7 Sailors, 7 Guard Dogs, 2 Dock Workers
- **Wave 10 (Boss):** “Captain Rook” (harpoon spin attack), 4 Guard Dogs, environmental hazard: slippery deck (random slide)

---

## 10. Accessibility & Player Support

- **Colorblind-Safe Palettes:** Avoid red/green contrasts for UI and enemies.
- **Font Size Scaling:** Minimum 16px, scale with screen size.
- **Pause/Restart:** Always accessible via on-screen or key/button press.
- **Audio Toggle:** On-screen mute/unmute.

---

## 11. Level Design Implementation Checklist

- [ ] Unique backgrounds and parallax for each level/stage
- [ ] Procedural wave generation logic (enemy mix, count, spawn points)
- [ ] Boss logic and hazards for every 10th stage
- [ ] Destructible object placement and power-up drops
- [ ] Adaptive UI for both desktop and mobile
- [ ] Performance profiling on low-end devices
- [ ] Control overlays for onboarding and guidance

---

## 12. Open Issues & Inconsistencies

- No new mechanics introduced; all referenced systems (jump, run, power-up, enemy, hp, health, quest) are consistently included.
- Ensure “quest” mechanic is reflected via “Level/Stage/Wave” progression and “defeat boss to continue” loop.
- Future expansion: Environmental hazards and advanced power-ups to be balanced for browser performance.

---

END OF DOCUMENT
```


---
*Generated on 8/7/2025*
