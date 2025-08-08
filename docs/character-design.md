# Character Design Document

## Description
Character profiles, abilities, and backstories

## Content
```character_design_document
title: Coop's Adventure – Character Design Document
version: 1.0
author: Snib AI Game Platform
date: 2024-06-08

---

## 1. Character Overview

### Character Name:
**Coop**

### Role in Game:
- **Protagonist**
- Player-controlled hero in all game modes (solo and local co-op)
- The only playable character for MVP; supports alternate costumes as unlockable cosmetics

### Narrative Function:
- Classic, down-to-earth brawler on a quest to clean up the city and defeat waves of increasingly tough enemies
- Minimalist backstory to fit pick-up-and-play, arcade-style approach
- Character personality and charm expressed through animation, visual design, and victory/defeat poses rather than deep narrative exposition

---

## 2. Visual Design

### Art Style:
- **Pixel art** or **cartoon vector-style** (SVG or PNG), matching the game’s retro/arcade theme
- High-contrast, bold colors for clarity across screen sizes and device types
- Readable silhouette for instant recognition during chaotic combat

### Sprite Specifications:
- **Default Sprite Size:** 48x48 px (minimum) up to 72x72 px (max), to maintain clarity on mobile and desktop
- **Animation Frames:**
  - Idle (2–4 frames)
  - Walk/Run (6–8 frames)
  - Light Attack Combo (3 frames per hit, 3 hits = 9 frames)
  - Jump (2–4 frames)
  - Jump Attack (2 frames)
  - Special Move (Spin Attack, 8 frames for fluidity)
  - Grab/Throw (optional for MVP, 4 frames)
  - Hurt/Flinch (2 frames)
  - Victory/Dance (2 frames)
  - Defeat/KO (2 frames)
- **Asset Formats:** PNG or WebP (for raster), SVG (for vector, if using), sprite sheets preferred for performance
- **Max Single Image Size:** ≤256 KB per sprite sheet

### Color Palette:
- Primary: Red, Blue, White (default outfit)
- Alternate palettes for unlockable costumes (see section 6)

### Visual Feedback:
- Attack impact: Brief color flashes, motion lines
- Damage: Red “tint” overlay for 150ms, shake animation
- Special move: Glow/aura effect (overlay or sprite)

### Example (Default Look):
- Red headband, blue jacket, white t-shirt, black fingerless gloves, sneakers

---

## 3. Personality & Expression

### Personality:
- Energetic, upbeat, confident but approachable
- Shows determination in idle stance and attack animations
- Celebrates with a fist pump or dance on wave/level clear
- “Ouch” face and stagger for damage, exaggerated KO for defeat

### Animation/Emote Cues:
- Small taunt or flex pose if idle >5 seconds (non-interruptive)
- Short, punchy voice SFX (“Hya!” / “Let’s go!”) for impact (if audio budget allows)

---

## 4. Core Stats

| Stat             | Value (Initial)    | Progression/Notes              |
|------------------|-------------------|-------------------------------|
| HP (Health)      | 100               | Can be restored via power-ups |
| Special Meter    | 100 (max)         | Consumed by special move      |
| Attack Power     | 10 per hit        | +5 per level (scales up)      |
| Combo Chain      | 3 hits            | 1st: 10 dmg, 2nd: 12, 3rd: 15|
| Jump Height      | 1.5x character h. | Fixed, responsive             |
| Move Speed       | 2.5 px/frame      | Slight increase per level     |
| Special Attack   | 30 dmg (AoE)      | Costs 50 special meter        |

**Note:** All stats balanced for browser/mobile performance and rapid feedback, per GDD guidelines.

---

## 5. Moveset & Abilities

### 5.1. Basic Moves

#### Move / Walk / Run
- **Input:** Arrow keys, WASD, virtual D-pad, swipe, or tap/hold edge
- **Effect:** Responsive left/right movement, no inertia
- **Animation:** 6–8 frame walk cycle; subtle "bounce" for energy

#### Jump
- **Input:** X, Spacebar, on-screen button, or tap
- **Effect:** Vertical leap, 0.5s airtime, 1.5x character height
- **Animation:** 2–4 frame jump arc

#### Crouch (Optional/Future)
- **Input:** Down arrow or swipe down
- **Effect:** Dodges select low attacks

### 5.2. Combat Actions

#### Light Attack (Combo)
- **Input:** Z, left click, tap
- **Effect:** 3-hit chain, rapidly tap for full sequence
- **Damage:** 10, 12, 15 (progressive per hit)
- **Animation:** 3x3 frames, attacks flow into each other
- **Feedback:** Screen shake on final hit

#### Jump Attack
- **Input:** Jump + attack during airtime
- **Effect:** Downward kick, 15 damage, knocks down standard enemies
- **Animation:** 2 frames, “swoosh” effect

#### Special Move: Spin Attack
- **Input:** C, right click, or long tap (hold 0.5s+)
- **Effect:** 360° hitbox, 30 damage to all enemies within 1.2x character radius; brief invulnerability (0.25s)
- **Cost:** 50 special meter (max 2 uses per full meter)
- **Cooldown:** None, limited by meter only
- **Visual:** Glow trail, motion blur for spin
- **Audio:** Distinct spin SFX

#### Grab/Throw (Optional for MVP)
- **Input:** Hold attack near enemy
- **Effect:** Grabs an enemy, press attack to throw; 20 damage, knocks down target and any enemies hit by thrown body
- **Animation:** 4 frames (grab, wind-up, throw, recover)

### 5.3. Power-Ups

#### Health Pack
- **Effect:** +25 HP (cannot exceed max)
- **Visual:** Red cross icon, floats and spins

#### Special Meter Refill
- **Effect:** +25 meter (cannot exceed max)
- **Visual:** Blue lightning orb

### 5.4. Damage & Defeat

- When hit, Coop flashes red and staggers briefly (0.2–0.3s)
- If HP reaches 0, defeat animation plays (falls to knees, fades out), triggers game over sequence per GDD

---

## 6. Progression & Customization

### Progression
- **Stat Scaling:** Attack power and movement speed increase slightly per completed level (e.g., +5 attack, +0.2 px/frame speed)
- **Cosmetic Unlocks:** New outfits/costumes unlocked for every 2 levels completed or by meeting play milestones

### Example Outfits:
- **Classic:** Default red/blue/white
- **Neon:** Hot pink/teal/yellow (synthwave palette)
- **Sports:** Tracksuit, headband, sneakers
- **Urban:** Hoodie, cargo pants, skate shoes

**Implementation:**
- Outfits as alternate color palettes (palette swaps) for maximum asset reuse and performance
- Sprite sheet overlays or separate color layers for quick switching

---

## 7. Implementation Considerations

### Sprite & Animation
- Prefer sprite sheets (PNG/WebP) for animation performance and batching
- Single sheet per outfit to minimize draw calls; keep under 256 KB
- Frame counts balanced for smooth but lightweight animation (max 24–32 frames total across all actions)

### Input & Responsiveness
- All actions accessible via keyboard, mouse, and touch
- Hold-to-advance and multi-touch combos for mobile
- Large hitboxes for touch controls; action buttons ≥48px on mobile

### Performance
- Sprite memory footprint ≤1MB total across all costumes
- Animation update logic optimized for Phaser.js 3.90.0 (use Phaser.Animations)
- All VFX (e.g., flashes, glow, hit effects) implemented as lightweight overlays or sprite sheet animations

### Accessibility
- High-contrast options for colorblind players (e.g., alternate color palettes)
- Clear visual feedback for all moves and state changes
- Optional simplified controls (toggle in settings)

---

## 8. Audio Cues

- **Attack:** “Whack”/“Smack” SFX, short and punchy, <100ms
- **Jump:** “Whoosh” SFX, subtle
- **Special:** Distinct spin SFX, slightly longer (200–300ms)
- **Hurt:** Grunt or “oof” (if budget allows), else simple impact sound
- **Victory:** Short jingle or cheer
- **Defeat:** Descending “wah wah” or fade-out

**Format:** OGG/MP3, mono, <50KB per SFX; all cues <1s for responsiveness

---

## 9. Narrative & Charm

- Coop’s personality shines through expressive, exaggerated animations and quick catchphrases (optional)
- No lengthy dialog; focus on action and visual storytelling
- Victory/defeat animations provide flavor and player connection

---

## 10. Example Implementation (Phaser.js 3.90.0)

```js
// Example: Coop Animation Setup
this.anims.create({
  key: 'coop_walk',
  frames: this.anims.generateFrameNumbers('coop_sprite', { start: 0, end: 7 }),
  frameRate: 12,
  repeat: -1
});
this.anims.create({
  key: 'coop_attack1',
  frames: this.anims.generateFrameNumbers('coop_sprite', { start: 8, end: 10 }),
  frameRate: 16,
  repeat: 0
});
// ...repeat for jump, special, hurt, etc.
```

---

## 11. Summary Table

| Aspect         | Spec / Value                                   |
|----------------|-----------------------------------------------|
| Name           | Coop                                          |
| Role           | Player Protagonist                            |
| Art Style      | Pixel/Cartoon, 48x48–72x72 px, bold colors    |
| Moveset        | 3-Hit Combo, Jump/Jump Attack, Special, Grab  |
| Stats          | 100 HP, 3-Hit Combo, 100 Special Meter        |
| Progression    | Stats & cosmetic unlocks per level            |
| Control        | Keyboard, Mouse, Touch, Multi-touch           |
| Sprite Size    | ≤256 KB/sheet, 24–32 frames total             |
| Audio          | OGG/MP3, punchy SFX, <50 KB each              |

---

## 12. Open Questions

- Finalize Coop’s default and unlockable costume color palettes
- Determine if grab/throw is MVP or post-launch
- Record/commission short voice SFX for extra personality (optional)
- Test animation readability at lowest supported screen size

---

## 13. References

- See [game_design_document v1.0] and [level_design_document v1.0] for consistency on mechanics, stats, and visuals
- All elements comply with Snib platform technical constraints (see asset, performance, and input specs above)

---

END OF DOCUMENT
```



---
*Generated on 8/7/2025*
