# Project Structure

## File Organization
```
dia-muertos-match3/
├── index.html          # Main game page with HTML structure
├── styles.css          # Responsive CSS styling and animations
├── game.js            # Core game logic and rendering engine
├── assets.js          # SVG graphics and visual assets
├── audio.js           # Audio management and sound generation
├── README.md          # Project documentation
├── LICENSE            # MIT license
├── CHANGELOG.md       # Version history
└── .kiro/             # IDE configuration and specifications
    └── specs/         # Feature specifications
```

## Code Organization Patterns

### Main Game Class (`game.js`)
- **Single Responsibility**: `DiaDeLosMuertosGame` class manages all game state
- **Method Grouping**: Related functionality grouped together
  - Initialization: `constructor()`, `initGame()`, `loadAssets()`
  - Game Logic: `findMatches()`, `processMatches()`, `swapTiles()`
  - Special Powers: `activateCrossPower()`, `activateCatPower()`, `activateGhostPower()`
  - Rendering: `draw()`, `updateAnimations()`, `gameLoop()`
  - Level Management: `completeLevel()`, `nextLevel()`, `resetGame()`

### Asset Management (`assets.js`)
- **SVG Constants**: All graphics defined as template literals
- **Modular Symbols**: Each game symbol as separate SVG definition
- **Reusable Components**: Skull variations for decorative elements

### Audio System (`audio.js`)
- **AudioManager Class**: Encapsulates all audio functionality
- **Procedural Generation**: Web Audio API for dynamic sound creation
- **Graceful Degradation**: Fallback when audio not supported

### Styling (`styles.css`)
- **Mobile-First**: Responsive breakpoints for different screen sizes
- **CSS Custom Properties**: Consistent color scheme and spacing
- **Animation Classes**: Reusable animation effects for skulls and UI

## Naming Conventions
- **Classes**: PascalCase (`DiaDeLosMuertosGame`, `AudioManager`)
- **Methods**: camelCase (`findMatches`, `activateCrossPower`)
- **Constants**: UPPER_SNAKE_CASE (`SVG_ASSETS`)
- **CSS Classes**: kebab-case (`game-container`, `level-complete-modal`)
- **IDs**: camelCase (`gameCanvas`, `levelCompleteModal`)

## State Management
- **Game State**: Centralized in main game class properties
- **Persistence**: LocalStorage for level progress and total score
- **Animation State**: Separate arrays for animations and particles
- **Audio State**: Managed by AudioManager instance