![domino](https://github.com/user-attachments/assets/1ee6ee70-516b-458a-bd6a-35a74caaafdf)

# killdomino 🔪🎲

A rogue-like domino game built with [Electron.js](https://www.electronjs.org/).  
Face an AI opponent in intense turn-based domino duels, earn cash, survive special pieces, and collect powerful objects.

[![YouTube](https://img.shields.io/badge/YouTube-channel-red?logo=youtube)](https://www.youtube.com/@killdominogame)

---

## Table of Contents

1. [Features](#features)
2. [Requirements](#requirements)
3. [Installation & Running](#installation--running)
4. [Gameplay](#gameplay)
   - [Objective](#objective)
   - [Turn Structure](#turn-structure)
   - [Scoring & Cash System](#scoring--cash-system)
   - [Combo Mechanics](#combo-mechanics)
5. [Domino Pieces](#domino-pieces)
   - [Standard Pieces](#standard-pieces)
   - [Special Pieces](#special-pieces)
6. [Objects](#objects)
7. [Project Structure](#project-structure)
8. [Modding Guide](#modding-guide)
9. [Built With](#built-with)
10. [License](#license)

---

## Features

- 🎲 **Turn-based domino gameplay** against an AI opponent
- 🔥 **Special domino pieces** with unique visual effects and behaviour
- 🎁 **Object / item system** that grants passive or active abilities each run
- 💰 **Cash-based progression** — earn money by outscoring the opponent and bet big to advance
- 🎵 **Dynamic music & sound effects** that react to combo intensity
- 📺 **CRT screen aesthetic** with screen-shake, vignette, and negative-filter effects
- 🤖 **AI with dialogue** powered by an in-game text-to-speech system
- 🛠 **Moddable** — add custom pieces with just a sprite and a few lines of code
- 🖥 **Fullscreen Electron app** that runs on Windows, macOS, and Linux

---

## Requirements

- [Node.js](https://nodejs.org/en/) v18 or newer (required by Electron 33)
- npm (bundled with Node.js)

> Electron and all other dependencies are installed automatically via `npm install`.

---

## Installation & Running

```bash
# 1. Clone the repository
git clone https://github.com/PabloPereiraHospido/killdomino.git
cd killdomino

# 2. Install dependencies
npm install

# 3. Start the game
npm run start
```

To package a distributable binary:

```bash
npm run make
```

![image](https://github.com/user-attachments/assets/20c03225-1ca1-47dd-8182-18239c709691)

---

## Gameplay

### Objective

Outscore the AI opponent every round to earn cash.  
Reach the current **BET** target (shown in the top-right corner) to advance to the next stage.  
If your cash hits **0**, the game is over.

### Turn Structure

Each round consists of multiple **hands**:

1. You receive a hand of **10 domino pieces** (7 visible, 3 hidden).
2. The game selects a required face value (`caraNecesaria`) that the next played piece must match.
3. On your turn, click a valid piece from your hand to play it.
4. After your turn, the AI automatically plays 1–5 pieces. The number of pieces is chosen randomly: without any objects active the AI plays 1 piece ~50 % of the time and up to 5 pieces ~10 % of the time. The **Luck** object shifts these probabilities in the player's favour.
5. Use the **bell button** (🔔) to voluntarily end your turn and pass to the AI.  
   > ⚠️ Pressing the bell marks the hand as "dirty" and removes the clean-hand bonus.
6. A hand ends when all pieces have been played (no remaining pieces in the hand).
7. Press **Escape** at any time to open the pause menu.

### Scoring & Cash System

At the end of each hand, a **gains screen** appears:

| Condition | Formula |
|-----------|---------|
| Clean hand (bell not pressed) | `(playerScore − opponentScore) × 3 × betCombo` |
| Normal hand | `(playerScore − opponentScore) × betCombo` |

- `betCombo` starts at **0.5 $** per score point and increases over time.
- Earned cash is added to your running total (internally called `playerHP` — a legacy name from an earlier health-points system, now repurposed as your cash balance).
- If your cash **≥ maxBet**, you enter the **box challenge** and the bet multiplies by 50.

### Combo Mechanics

Each piece you play adds its face value to your running combo (`damageCombo`).  
As the potential earnings grow relative to your current cash, the game intensifies:

| Threshold | Effect |
|-----------|--------|
| > 10 % of cash | Screen shake level 2 |
| > 20 % of cash | Screen shake level 3 |
| > 30 % of cash | Screen shake level 4 + vignette begins |
| > 40 % of cash | Screen shake level 5 + deeper vignette |
| > 50 % of cash | Screen shake level 6 + stronger vignette |
| > 60 % of cash | Screen shake level 7 + **negative screen filter** + bass impact |

---

## Domino Pieces

All available pieces are defined in `data/global_variables.js` in the `dados` array.

### Standard Pieces

Standard pieces are identified by two digits representing the top and bottom face values (e.g., `"66"`, `"12"`, `"35"`).  
The full double-six domino set is included (21 unique pieces).

### Special Pieces

Special pieces carry a third character that identifies their type:

| Suffix | Name | Behaviour |
|--------|------|-----------|
| `t` | **TNT** | Explosive piece; triggers a special TNT effect on play (e.g., `"12t"`, `"56t"`) |
| `f` | **Fire** | Burns with fire effects on hover and play (e.g., `"01f"`, `"06f"`) |
| `n` | **Magnetic (off)** | An electric/magnetic piece in its inactive state (e.g., `"01n"`, `"05n"`) |
| `p` | **Magnetic (on)** | Same piece after activation; toggles between `n` and `p` states (e.g., `"02p"`, `"04p"`) |
| `e` | **Electric** | Special electric piece (`"00e"`) |
| `c` | **Coin** | Coin piece that grants extra cash rewards (`"00c"`) |

---

## Objects

Objects are items collected during a run that modify gameplay. They are managed in `mechanics/box_logic.js`.

| Object | Effect |
|--------|--------|
| **Luck** 🍀 | Reduces the AI's probability of playing multiple pieces per turn (plays 1 piece ≥ 70 % of the time) |
| **Demon** 😈 | Transforms all pieces in your hand into `6/6` pieces |
| **Coin** 🪙 | At the end of each hand, earn **+10 %** of your current cash |
| **Blank** ⬜ | Allows playing a piece even if the face does not match `caraNecesaria` (one-time use per hand) |
| **Last Burn** 🔥 | When only 1 piece remains, automatically burns a random piece to trigger `checkIfRoundWin` |
| **Mirror** 🪞 | Activates a mirrored mode that alters the available piece pool |
| **Magnetic** 🧲 | Activates at the start and deactivates at the end of each hand, toggling all magnetic (`n`/`p`) pieces |
| **Ted Talk** 🎤 | AI dialogue ability (affects the story/TTS system) |

---

## Project Structure

```
killdomino/
├── main.js                    # Electron main process – creates the window, handles IPC events
├── start.js                   # Entry point helper
├── forge.config.js            # Electron Forge packaging config
├── screen_resolution.js       # Screen resolution utility
├── player_data_Script.js      # Loads and saves persistent player data (data/data.json)
│
├── scenes/                    # HTML scene files
│   ├── main_menu.html         # Main menu screen
│   ├── game.html              # Main game scene
│   ├── win.html               # Win screen
│   └── lose.html              # Lose screen
│
├── scene_scripts/             # JavaScript logic for each scene
│   ├── game_root_loader.js    # Game scene initialisation (music, hand randomisation, round loop)
│   ├── main_menu.js           # Main menu button logic
│   ├── settings.js            # Pause menu and settings logic
│   └── lose.js                # Lose screen logic
│
├── mechanics/                 # Core game logic modules
│   ├── pieces_logic.js        # Piece selection, validation, and per-piece switch logic
│   ├── ia.js                  # AI opponent turn logic and probability system
│   ├── turn.js                # Hand reset, round-win detection, and bet-advance logic
│   ├── combo_logic.js         # Combo counter, screen-shake, and vignette intensity
│   ├── roundGains.js          # End-of-hand gains screen and cash calculation
│   ├── box_logic.js           # Object / item logic (Demon, Magnetic, Coin, etc.)
│   ├── hand_UI.js             # Hand UI events (cursor, bell button, draw-piece button)
│   ├── cards_logic.js         # Card-pick UI (between rounds)
│   └── TTS.js                 # Text-to-speech character dialogue system
│
├── story/
│   └── IA_response.js         # AI dialogue scripts
│
├── data/
│   ├── global_variables.js    # Shared game-state variables and piece/object pools
│   └── data.json              # Persistent player data (score, etc.)
│
├── CSS/
│   ├── game_scene.css         # Styles for the game scene
│   └── main_menu.css          # Styles for the main menu
│
├── sprites/                   # Game images (pieces, UI, objects, backgrounds)
├── sounds/                    # Sound effects
├── music/                     # Background music tracks
└── fonts/                     # Custom fonts
```

---

## Modding Guide

killdomino is designed to be moddable. Follow these steps to add a custom piece:

### 1. Create the sprites

Place your piece images in the `sprites/` folder using this naming convention:

| Orientation | Format | Example |
|-------------|--------|---------|
| Vertical | `dado{top}{bottom}{id}.png` or `.gif` | `dado12x.gif` |
| Horizontal | `hdado{top}{bottom}{id}.png` or `.gif` | `hdado12x.gif` |

- `{top}` — top face value (0–6)
- `{bottom}` — bottom face value (0–6)
- `{id}` — a unique character or string that identifies your piece type

### 2. Register the piece

Open `data/global_variables.js` and add the piece identifier to the `dados` array:

```js
let dados = [
  // ... existing pieces ...
  "12x"   // ← your new piece
];
```

### 3. Implement the piece logic

Open `mechanics/pieces_logic.js` and add a `case` for your piece inside the main `switch` statement in `piecesLogic()`:

```js
case "x":   // matches cifra3 == "x"
    // Your piece logic here
    // cifra1 = top face, cifra2 = bottom face, cifra3 = piece type
    break;
```

> `caraNecesaria` is the face required to continue the sequence.  
> `estadoFicha` can be set to `"x2"` to trigger the double-score animation.

That's it — your custom piece is now part of the game!

---

## Built With

| Technology | Purpose |
|------------|---------|
| [Electron.js](https://www.electronjs.org/) | Desktop application shell |
| [Three.js](https://threejs.org/) | 3D rendering (available as dependency) |
| [Electron Forge](https://www.electronforge.io/) | Build & packaging toolchain |
| HTML / CSS / JavaScript | Game UI and logic |

---

## License

This project is licensed under the **ISC License**.
