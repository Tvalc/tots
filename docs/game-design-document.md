# Game Design Document

## Description
Overall game vision, mechanics, and core design decisions

## Content
```game_design_document
title: Coop's Adventure – Game Design Document
version: 1.0
author: Snib AI Game Platform
date: 2024-06-08

---

## 1. Game Vision

**Coop's Adventure** is a fast-paced, side-scrolling beat ‘em up designed for instant, browser-based play. Inspired by arcade classics, the game delivers a massive, procedurally generated adventure through 1,000 unique combat waves. Players control Coop, a classic brawler hero, battling through escalating stages and levels, solo or in local co-op. With seamless support for both desktop and mobile (touch and mouse/keyboard), instant load, and replayable content, Coop’s Adventure aims to deliver the ultimate pick-up-and-play web fighting experience.

---

## 2. Target Audience

- **Ages:** 10+
- **Player Profiles:**
  - Fans of retro and arcade beat ’em ups
  - Players seeking quick, action-packed browser gameplay
  - Casual gamers and younger audiences
  - Mobile and desktop users (including low-powered devices)
  - Users who prefer instant access without downloads or installs

---

## 3. Key Differentiators

- **Epic Content Scale:** 1,000 procedurally generated combat waves per playthrough (10 levels × 10 stages × 10 waves)
- **Procedural Encounters:** Unique randomization of enemy types and groupings for each wave
- **Instant Browser Play:** <5s load, no installs, instant resume, cross-device
- **Responsive, Cross-Device Action:** Auto-adapting controls and UI for mobile (touch/gesture) and desktop (keyboard/mouse)
- **Classic Beat 'Em Up Feel:** Tight combos, crowd control, and satisfying feedback reminiscent of genre legends

---

## 4. Core Gameplay Loop

1. **Stage Start:** Coop appears on the left edge; background and enemies load.
2. **Combat:** 10–20 randomized enemies spawn; player fights using combos and special moves.
3. **Wave Clear:** When all enemies are defeated, “Go!” prompt appears.
4. **Advance:** Player moves Coop to the right (via arrow key, swipe, or tap/hold).
5. **Transition:** Background scrolls, new wave spawns.
6. **Stage End:** After 10 waves, stage complete; new environment loads.
7. **Level Progression:** 10 stages per level; game is won after 10 levels.
8. **Failure:** If Coop’s HP reaches zero, game over (option to restart current level).

**Example:**
- Level 2, Stage 3, Wave 4: Coop faces 12 enemies (mix of Sailors and Guard Dogs). After winning, player swipes right to move to the “Freighter Deck,” and the next wave spawns.

---

## 5. Controls & Input

### Desktop
- **Move:** Arrow keys / WASD
- **Attack:** Z, left mouse click, or tap
- **Jump:** X, spacebar, or tap
- **Special:** C, right mouse click, or long tap (hold 0.5s+)
- **Advance:** Hold → or click/tap right side post-wave

### Mobile
- **Virtual D-Pad:** Left side of screen for movement
- **Actions:** On-screen buttons for Attack, Jump, Special (right side)
- **Advance:** Swipe right or tap/hold right edge after wave

**Input Design Considerations:**
- All actions accessible by touch and mouse/keyboard
- Multi-touch support for combos (e.g., move + attack)
- Visual feedback: Button highlights, Coop animation flashes
- Quick restart and instant resume supported

---

## 6. Game Structure & Progression

### Levels, Stages, and Waves

- **10 Levels:** Each with a unique theme and visual style
  - (e.g., Level 1: City Streets; Level 2: Docks; Level 3: Subway; Level 4: Rooftops; etc.)
- **10 Stages per Level:** Distinct backgrounds and minor environmental twists for each stage
- **10 Waves per Stage:** Each wave spawns 10–20 procedurally mixed enemies

**Example Level Structure:**
- Level 1: City Streets
  - Stage 1: Alleyway, Stage 2: Park, ..., Stage 10: Overpass
- Level 2: Docks
  - Stage 1: Waterfront, Stage 2: Warehouse, ..., Stage 10: Loading Crane

**Scene Transitions:**
- Parallax background scrolls horizontally as Coop advances
- Fade, slide, or subtle weather/lighting changes to show progress

---

## 7. Enemy System

- **Enemy Archetypes (per Level):**
  - Level 1: Basic Thug, Street Punk
  - Level 2: Dock Worker, Sailor, Guard Dog
  - Level 3: Subway Hooligan, Skater, Fast Ninja
  - Later levels introduce new, tougher enemies (e.g., “Heavy Bruiser”, “Elite Ninja”)
- **Wave Generation:**
  - 10–20 enemies selected from current stage’s pool
  - Max 8–10 enemies rendered on-screen at once; others queue in
- **Enemy AI:**
  - Basic: Approach, attack, retreat/circle, repeat
  - Advanced: Some dash, jump, throw objects, coordinate attacks
- **Bosses:**
  - Every 10th stage (Stage 10) features a unique boss with special moves/attack patterns

**Example:**
- Level 3, Wave 7: 5 Skaters (fast, low HP), 7 Fast Ninjas (agile, dash attack), 3 Hooligans (medium HP)

---

## 8. Player Character

- **Protagonist:** Coop
- **Visual:** Classic brawler (pixel art or cartoon style to maximize clarity/performance)
- **Moveset:**
  - **Light Attack:** 3-hit combo chain, fast
  - **Jump Attack:** Downward kick when airborne
  - **Special Move:** Area-of-effect spin attack (consumes special meter)
  - **Grab/Throw:** Tap & hold attack near enemy to grab, then throw (optional for MVP)
- **Health:** HP bar; losing all HP ends current run (restart from start of current level)
- **Power-ups:**
  - Health packs (+25% HP)
  - Special meter refills
  - Dropped by some enemies or found in destructible objects

---

## 9. Visuals & Presentation

- **Art Style:** Pixel or cartoon sprites, optimized for browser performance
- **Animations:** Fluid walk, attack, jump, hit, victory, and defeat cycles
- **Backgrounds:** Multi-layer parallax for depth, unique style per level/stage
- **UI/HUD:**
  - Top: HP bar, special meter
  - Corner: Current Level/Stage/Wave
  - Minimalist and touch-friendly for mobile; mouse/keyboard hints for desktop

**Responsive Design:**
- UI scales and rearranges based on screen size/orientation
- Touch controls hidden on desktop; desktop prompts hidden on mobile
- Large touch targets for mobile

---

## 10. Audio

- **Music:** Upbeat chiptune or synthwave; unique tracks per level
- **SFX:** Punch/kick impacts, jumps, special moves, enemy defeat, wave clear, transitions
- **Format:** Use compressed OGG/MP3 for low latency and fast load

---

## 11. Monetization & Retention

- **Ads:** Optional interstitial video ads between levels (never mid-level)
- **Cosmetic Unlocks:**
  - Alternate Coop outfits (classic, neon, sportswear, etc.), unlocked by progression or repeat play
- **Progress Save:**
  - Browser-based save (localStorage) at start of each level
  - Quick resume from last completed level

---

## 12. Success Metrics

- **Session Length:** Median playtime per session (target: 10+ minutes)
- **Level Completion Rate:** Percent of players finishing each level
- **Repeat Sessions:** Percent of users returning after 1 and 7 days
- **Performance:** 30fps+ on Chrome, Safari, Edge, Firefox, Android/iOS
- **Input Engagement:** Representation of both touch and keyboard/mouse play

---

## 13. Implementation Considerations

- **Performance:**
  - Limit to 8–10 on-screen enemies
  - Use object pooling for all entities (enemies, effects)
  - Art/audio assets lightweight for <5s load
- **Procedural Generation:**
  - Seeded random for repeatable fairness
  - Enemy pools and spawn weights per stage
- **Responsive Design:**
  - CSS breakpoints, auto-scaling UI, touch/mouse input detection
  - Real-time adaptation to orientation changes
- **Input Handling:**
  - Unified abstraction for keyboard, mouse, touch
  - Immediate visual feedback for input
  - Support for pause, quick restart, and settings
- **Instant Play:**
  - Minimal splash, direct transition to gameplay
  - Preload next stage assets during play

---

## 14. Open Questions / Next Steps

- Finalize Coop’s visual design, enemy archetypes, and UI
- Define and balance advanced enemy/boss behaviors
- Create environment art and parallax backgrounds for all levels
- Balance special move mechanics (cost, cooldown, impact)
- Implement and test procedural wave logic for fairness and variety
- Plan and prototype co-op mode (future update)

---

## 15. Potential Conflicts / Inconsistencies

- **Document Consistency:** No pre-existing character, mechanic, or system definitions. All referenced systems and content are foundational and non-conflicting.
- **Future Expansion:** Any new features or content must align with these core mechanics, structure, and design philosophies.

---

END OF DOCUMENT
```


---
*Generated on 8/7/2025*
