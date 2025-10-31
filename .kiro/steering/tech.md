# Technology Stack

## Core Technologies
- **HTML5**: Semantic markup with Canvas API for game rendering
- **CSS3**: Responsive design with media queries, animations, and gradients
- **JavaScript ES6+**: Modern JavaScript with classes, arrow functions, and modules
- **Web Audio API**: Procedural audio generation for music and sound effects
- **SVG**: Scalable vector graphics for game symbols and decorative elements
- **Canvas 2D**: Hardware-accelerated rendering for smooth animations

## Architecture Patterns
- **Class-based OOP**: Single `DiaDeLosMuertosGame` class managing all game state
- **Component Separation**: 
  - `game.js`: Core game logic and rendering
  - `assets.js`: SVG graphics and visual resources
  - `audio.js`: Audio management and procedural sound generation
  - `styles.css`: Responsive styling and animations
- **Event-driven**: DOM event listeners for user interaction
- **Animation System**: RequestAnimationFrame-based game loop with delta time

## Build System
**No build system required** - this is a vanilla JavaScript project that runs directly in browsers.

## Development Commands
```bash
# Local development server (recommended)
python -m http.server 8000        # Python 3
python -m SimpleHTTPServer 8000   # Python 2
npx http-server                    # Node.js
php -S localhost:8000             # PHP

# Then open http://localhost:8000
```

## Browser Compatibility
- Modern browsers with ES6+ support
- Web Audio API support (optional, graceful degradation)
- Canvas 2D context support
- Touch events for mobile devices

## Performance Considerations
- Particle system with automatic cleanup
- Responsive canvas sizing with device pixel ratio
- Mobile-optimized animations (reduced on smaller screens)
- Efficient SVG-to-Canvas conversion for symbols