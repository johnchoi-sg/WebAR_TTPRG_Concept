# 📦 Source Modules

This directory contains all the game's source code, organized into focused ES6 modules.

## Module Overview

| Module | Size | Purpose | Dependencies |
|--------|------|---------|--------------|
| `config.js` | 338B | Game configuration constants | None |
| `state.js` | 1KB | Global state management | Three.js |
| `device.js` | 693B | Device detection | None |
| `world.js` | 4KB | World generation & lighting | `config.js` |
| `character.js` | 4KB | Character creation & movement | `config.js` |
| `controls.js` | 3KB | Keyboard & touch controls | None |
| `camera.js` | 821B | Camera positioning | `config.js` |
| `ar.js` | 3KB | MindAR initialization | `world.js`, `character.js`, `sensors.js`, `debug.js` |
| `sensors.js` | 5KB | Device sensors & dead reckoning | None |
| `debug.js` | 4KB | Debug panel UI | `sensors.js` |
| `game.js` | 4KB | Main entry point & animation loop | All modules |

## Quick Links

- **Architecture Details**: See `/MODULES.md`
- **Visual Diagrams**: See `/MODULE_DIAGRAM.md`
- **Migration Guide**: See `/MIGRATION_GUIDE.md`
- **Quick Reference**: See `/QUICK_REFERENCE.md`

## Module Descriptions

### `game.js` - Main Entry Point
The orchestrator that initializes the game and runs the animation loop.

**Key Functions:**
- `init()` - Initializes game based on device type
- `initDesktop()` - Sets up desktop mode
- `animate()` - Main game loop

**Imports:** All other modules

---

### `config.js` - Configuration
Centralized configuration constants.

**Exports:**
- `CONFIG` - Game settings object

**Imports:** None

---

### `state.js` - State Management
Global game state in a single object.

**Exports:**
- `state` - Game state object
- `initThreeObjects()` - Initializes Three.js objects

**Imports:** None (uses Three.js global)

---

### `device.js` - Device Detection
Detects mobile vs desktop devices.

**Exports:**
- `detectMobile()` - Returns true if mobile

**Imports:** None

---

### `world.js` - World Generation
Creates the game world with terrain and lighting.

**Exports:**
- `createWorld(parent)` - Creates world objects
- `setupLights(scene)` - Adds lighting

**Imports:** `config.js`

---

### `character.js` - Character
Creates and updates the player character.

**Exports:**
- `createCharacter(parent)` - Creates character mesh
- `updateCharacter(character, state, isARMode)` - Updates position

**Imports:** `config.js`

---

### `controls.js` - Input Controls
Handles keyboard and touch input.

**Exports:**
- `setupKeyboardControls(state)` - Sets up keyboard
- `setupTouchJoystick(state)` - Sets up joystick

**Imports:** None

---

### `camera.js` - Camera Control
Manages camera positioning.

**Exports:**
- `updateCamera(camera, character)` - Updates camera position
- `setupResizeHandler(camera, renderer)` - Handles resize

**Imports:** `config.js`

---

### `ar.js` - AR Mode
Initializes and manages MindAR.

**Exports:**
- `initAR(state)` - Async AR initialization
- `setMarkerVisible(state, visible)` - Handles marker events

**Imports:** `world.js`, `character.js`, `sensors.js`, `debug.js`

---

### `sensors.js` - Device Sensors
Handles gyroscope and accelerometer for dead reckoning.

**Exports:**
- `setupDeviceOrientation(state)` - Sets up sensors
- `applyDeadReckoning(state)` - Applies dead reckoning
- `requestSensorPermissions(state)` - Requests permissions

**Imports:** None (uses Three.js global)

---

### `debug.js` - Debug Panel
Provides real-time debugging information.

**Exports:**
- `setupDebugPanel(state)` - Initializes debug UI
- `updateDebugPanel(state, isARMode)` - Updates debug values

**Imports:** `sensors.js`

---

## Usage Examples

### Importing a Module
```javascript
import { CONFIG } from './config.js';
import { createWorld } from './world.js';
```

### Using Exported Functions
```javascript
import { createCharacter } from './character.js';

const character = createCharacter(scene);
```

### Accessing State
```javascript
import { state } from './state.js';

if (state.markerVisible) {
    console.log('Marker is visible!');
}
```

## Development Guidelines

### Adding a New Module

1. **Create the file** in `src/`
```javascript
// src/mymodule.js
```

2. **Add imports**
```javascript
import { CONFIG } from './config.js';
import { state } from './state.js';
```

3. **Implement functions**
```javascript
// Private function (not exported)
function helperFunction() {
    // ...
}

// Public function (exported)
export function myPublicFunction() {
    // ...
}
```

4. **Import in game.js**
```javascript
import { myPublicFunction } from './mymodule.js';
```

### Best Practices

✅ **DO:**
- Keep modules focused on single responsibility
- Export only what's needed
- Pass dependencies explicitly
- Use descriptive names
- Add JSDoc comments

❌ **DON'T:**
- Create circular dependencies
- Use global variables
- Mix multiple concerns
- Export internal helpers
- Mutate state from multiple places

### Testing a Module

```html
<!-- test.html -->
<script src="https://cdn.jsdelivr.net/npm/three@0.147.0/build/three.min.js"></script>
<script type="module">
    import { createCharacter } from './src/character.js';
    
    const scene = new THREE.Scene();
    const character = createCharacter(scene);
    console.log('Character created:', character);
</script>
```

## Module Dependencies Graph

```
game.js
├── config.js
├── state.js
├── device.js
├── world.js
│   └── config.js
├── character.js
│   └── config.js
├── controls.js
├── camera.js
│   └── config.js
├── ar.js
│   ├── world.js
│   ├── character.js
│   ├── sensors.js
│   └── debug.js
│       └── sensors.js
├── sensors.js
└── debug.js
    └── sensors.js
```

## File Sizes

```
  338B  config.js
 1.0KB  state.js
  693B  device.js
 4.1KB  world.js
 3.7KB  character.js
 2.7KB  controls.js
  821B  camera.js
 3.1KB  ar.js
 5.2KB  sensors.js
 4.0KB  debug.js
 3.6KB  game.js
------
~29KB  Total (unminified)
```

## Performance Notes

- ES6 modules are optimized by modern browsers
- Modules are loaded once and cached
- Tree-shaking can reduce bundle size
- No runtime overhead compared to monolithic code

## Browser Compatibility

Requires browsers with ES6 module support:
- ✅ Chrome 61+
- ✅ Firefox 60+
- ✅ Safari 11+
- ✅ Edge 16+

## Common Issues

### "Cannot use import statement outside a module"
**Fix:** Ensure `<script type="module">` in HTML

### "Module not found"
**Fix:** Check file path includes `.js` extension

### "THREE is not defined"
**Fix:** Load Three.js before your modules

### "Circular dependency detected"
**Fix:** Refactor to remove circular imports

## Further Reading

- [MDN: JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [ES6 Modules In Depth](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/)
- [JavaScript Module Pattern](https://www.patterns.dev/posts/module-pattern/)

## Questions?

See the main documentation:
- `/MODULES.md` - Detailed module documentation
- `/MODULE_DIAGRAM.md` - Visual architecture
- `/QUICK_REFERENCE.md` - Quick lookup guide
- `/MIGRATION_GUIDE.md` - Before/after comparison

