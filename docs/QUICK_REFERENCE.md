# 🚀 Quick Reference Guide

## Module Cheat Sheet

### Need to change game settings?
→ **`config.js`**
```javascript
export const CONFIG = {
    character: { speed: 0.05, size: 0.3 },
    camera: { distance: 8, height: 6 },
    world: { size: 5 }
};
```

### Need to add/modify world objects?
→ **`world.js`**
```javascript
export function createWorld(parent)
export function setupLights(scene)
```

### Need to change character appearance/movement?
→ **`character.js`**
```javascript
export function createCharacter(parent)
export function updateCharacter(character, state, isARMode)
```

### Need to add new keyboard shortcuts or modify joystick?
→ **`controls.js`**
```javascript
export function setupKeyboardControls(state)
export function setupTouchJoystick(state)
```

### Need to change camera behavior?
→ **`camera.js`**
```javascript
export function updateCamera(camera, character)
export function setupResizeHandler(camera, renderer)
```

### Need to modify AR tracking or marker behavior?
→ **`ar.js`**
```javascript
export async function initAR(state)
export function setMarkerVisible(state, visible)
```

### Need to adjust dead reckoning or sensor handling?
→ **`sensors.js`**
```javascript
export function setupDeviceOrientation(state)
export function applyDeadReckoning(state)
export function requestSensorPermissions(state)
```

### Need to add/modify debug information?
→ **`debug.js`**
```javascript
export function setupDebugPanel(state)
export function updateDebugPanel(state, isARMode)
```

### Need to change device detection logic?
→ **`device.js`**
```javascript
export function detectMobile()
```

### Need to add new global state?
→ **`state.js`**
```javascript
export const state = {
    // Add your new state here
};
```

### Need to change initialization or animation loop?
→ **`game.js`**
```javascript
async function init()
function initDesktop()
function animate()
```

## Common Tasks

### Add a new tree type
1. Open `world.js`
2. Create new function: `function createPineTree() { ... }`
3. Call it in `addTerrainFeatures()`

### Change character speed
1. Open `config.js`
2. Modify `CONFIG.character.speed`

### Add new keyboard control
1. Open `controls.js`
2. Add key listener in `setupKeyboardControls()`
3. Handle in `character.js` → `updateCharacter()`

### Add new debug info
1. Open `index.html` → Add HTML element
2. Open `debug.js` → Update `updateDebugPanel()`

### Change AR marker image
1. Open `ar.js`
2. Modify `imageTargetSrc` in `initAR()`

### Add sound effects
1. Create `src/audio.js`
2. Export functions: `playSound()`, `setupAudio()`
3. Import in `game.js`: `import { setupAudio } from './audio.js';`

## Import Examples

### Import single export
```javascript
import { CONFIG } from './config.js';
```

### Import multiple exports
```javascript
import { createWorld, setupLights } from './world.js';
```

### Import everything
```javascript
import * as World from './world.js';
// Use: World.createWorld(), World.setupLights()
```

## State Access

### Reading state
```javascript
if (state.markerVisible) {
    // Do something
}
```

### Modifying state
```javascript
state.markerVisible = true;
state.character.position.x = 0;
```

### Passing state to functions
```javascript
updateCharacter(state.character, state, state.isARMode);
```

## Module Template

```javascript
// src/mymodule.js

// Imports
import { CONFIG } from './config.js';
import { state } from './state.js';

// Private functions (not exported)
function helperFunction() {
    // Implementation
}

// Public functions (exported)
export function myPublicFunction(param1, param2) {
    // Implementation
    helperFunction();
}

export function anotherPublicFunction() {
    // Implementation
}
```

## Debugging Tips

### Console logging
```javascript
console.log('🐛 Debug:', state.character.position);
```

### Check module loading
```javascript
console.log('✅ Module loaded: mymodule.js');
```

### Verify imports
```javascript
import { CONFIG } from './config.js';
console.log('CONFIG:', CONFIG);
```

### Check state
```javascript
console.log('State:', JSON.stringify(state, null, 2));
```

## File Structure

```
WebAR_TTPRG_Concept/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Styles
├── src/                    # Source modules
│   ├── game.js             # Main entry point
│   ├── config.js           # Configuration
│   ├── state.js            # State management
│   ├── device.js           # Device detection
│   ├── world.js            # World generation
│   ├── character.js        # Character logic
│   ├── controls.js         # Input controls
│   ├── camera.js           # Camera control
│   ├── ar.js               # AR mode
│   ├── sensors.js          # Device sensors
│   └── debug.js            # Debug panel
├── assets/                 # Images, markers, etc.
├── README.md               # Project overview
├── MODULES.md              # Module documentation
├── MODULE_DIAGRAM.md       # Visual architecture
├── MIGRATION_GUIDE.md      # Migration details
└── QUICK_REFERENCE.md      # This file
```

## Performance Tips

### Minimize state updates in animate()
```javascript
function animate() {
    // Only update what changes every frame
    updateCharacter(state.character, state, state.isARMode);
    // Don't recreate objects
}
```

### Use object pooling for repeated objects
```javascript
// In world.js
const rockPool = [];
function getRock() {
    return rockPool.pop() || createRock();
}
```

### Lazy load modules
```javascript
// Only load when needed
if (needsAudio) {
    const { playSound } = await import('./audio.js');
    playSound('jump');
}
```

## Testing

### Test individual modules
```javascript
// test.html
<script type="module">
    import { createCharacter } from './src/character.js';
    const parent = new THREE.Group();
    const char = createCharacter(parent);
    console.log('Character created:', char);
</script>
```

### Mock dependencies
```javascript
// In test
const mockState = {
    keys: { 'w': true },
    joystickVector: { x: 0, y: 0 }
};
updateCharacter(character, mockState, false);
```

## Common Errors

### "Cannot use import statement outside a module"
**Fix:** Add `type="module"` to script tag
```html
<script type="module" src="src/game.js"></script>
```

### "Uncaught ReferenceError: THREE is not defined"
**Fix:** Ensure Three.js is loaded before your module
```html
<script src="https://cdn.jsdelivr.net/npm/three@0.147.0/build/three.min.js"></script>
<script type="module" src="src/game.js"></script>
```

### "Cannot find module"
**Fix:** Check file path and extension
```javascript
// Wrong
import { CONFIG } from './config';

// Correct
import { CONFIG } from './config.js';
```

### "state is undefined"
**Fix:** Import state and pass it to functions
```javascript
import { state } from './state.js';
myFunction(state);
```

## Best Practices

✅ **DO:**
- Keep modules focused on single responsibility
- Export only what's needed
- Pass dependencies explicitly
- Use meaningful names
- Add comments for complex logic
- Log important events

❌ **DON'T:**
- Create circular dependencies
- Mutate state from multiple places
- Use global variables
- Mix concerns in one module
- Export everything
- Forget to handle errors

## Need More Help?

- **Architecture:** Read `MODULES.md`
- **Visual Diagram:** See `MODULE_DIAGRAM.md`
- **Migration Details:** Check `MIGRATION_GUIDE.md`
- **Project Overview:** See `README.md`

