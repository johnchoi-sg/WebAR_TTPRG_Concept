# 🔄 Migration Guide: Monolithic → Modular

This guide explains how the original monolithic `game.js` was refactored into a modular architecture.

## What Changed?

### Before: Single File (791 lines)
```
src/
└── game.js  (everything in one file)
```

### After: 11 Modules (~870 lines total)
```
src/
├── game.js         # Main entry point (110 lines)
├── config.js       # Configuration (15 lines)
├── state.js        # State management (40 lines)
├── device.js       # Device detection (20 lines)
├── world.js        # World generation (120 lines)
├── character.js    # Character logic (110 lines)
├── controls.js     # Input controls (80 lines)
├── camera.js       # Camera control (25 lines)
├── ar.js           # AR mode (90 lines)
├── sensors.js      # Device sensors (150 lines)
└── debug.js        # Debug panel (110 lines)
```

## Code Mapping

### Configuration → `config.js`

**Before:**
```javascript
// game.js (lines 1-15)
const CONFIG = {
    character: { speed: 0.05, size: 0.3 },
    camera: { distance: 8, height: 6, angle: Math.PI / 4 },
    world: { size: 5 }
};
```

**After:**
```javascript
// config.js
export const CONFIG = {
    character: { speed: 0.05, size: 0.3 },
    camera: { distance: 8, height: 6, angle: Math.PI / 4 },
    world: { size: 5 }
};
```

---

### Global State → `state.js`

**Before:**
```javascript
// game.js (lines 17-43)
let scene, camera, renderer;
let character, worldMap;
let isMobile = false;
let isARMode = false;
// ... etc
```

**After:**
```javascript
// state.js
export const state = {
    scene: null,
    camera: null,
    renderer: null,
    character: null,
    worldMap: null,
    isMobile: false,
    isARMode: false,
    // ... etc
};
```

---

### Device Detection → `device.js`

**Before:**
```javascript
// game.js (lines 60-75)
function detectMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // ...
    return result;
}
```

**After:**
```javascript
// device.js
export function detectMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // ...
    return result;
}
```

---

### World Generation → `world.js`

**Before:**
```javascript
// game.js (lines 417-521)
function createWorld(parent = scene) { /* ... */ }
function addTerrainFeatures(parent) { /* ... */ }
function createTree() { /* ... */ }
function createRock() { /* ... */ }
function setupLights() { /* ... */ }
```

**After:**
```javascript
// world.js
import { CONFIG } from './config.js';

export function createWorld(parent) { /* ... */ }
export function setupLights(scene) { /* ... */ }
function addTerrainFeatures(parent) { /* ... */ }  // private
function createTree() { /* ... */ }  // private
function createRock() { /* ... */ }  // private
```

---

### Character → `character.js`

**Before:**
```javascript
// game.js (lines 523-621)
function createCharacter(parent = scene) { /* ... */ }
function updateCharacter() { /* ... */ }
```

**After:**
```javascript
// character.js
import { CONFIG } from './config.js';

export function createCharacter(parent) { /* ... */ }
export function updateCharacter(character, state, isARMode) { /* ... */ }
```

---

### Controls → `controls.js`

**Before:**
```javascript
// game.js (lines 623-703)
function setupKeyboardControls() { /* ... */ }
function setupTouchJoystick() { /* ... */ }
```

**After:**
```javascript
// controls.js
export function setupKeyboardControls(state) { /* ... */ }
export function setupTouchJoystick(state) { /* ... */ }
```

---

### Camera → `camera.js`

**Before:**
```javascript
// game.js (lines 705-723)
function updateCamera() { /* ... */ }
function onWindowResize() { /* ... */ }
```

**After:**
```javascript
// camera.js
import { CONFIG } from './config.js';

export function updateCamera(camera, character) { /* ... */ }
export function setupResizeHandler(camera, renderer) { /* ... */ }
```

---

### AR Mode → `ar.js`

**Before:**
```javascript
// game.js (lines 128-191)
async function initAR() { /* ... */ }
function setMarkerVisible(visible) { /* ... */ }
```

**After:**
```javascript
// ar.js
import { setupLights } from './world.js';
import { createWorld } from './world.js';
import { createCharacter } from './character.js';
// ... more imports

export async function initAR(state) { /* ... */ }
export function setMarkerVisible(state, visible) { /* ... */ }
```

---

### Sensors → `sensors.js`

**Before:**
```javascript
// game.js (lines 200-272)
function setupDeviceOrientation() { /* ... */ }
function handleDeviceOrientation(event) { /* ... */ }
function handleDeviceMotion(event) { /* ... */ }
function applyDeadReckoning() { /* ... */ }
function requestSensorPermissions() { /* ... */ }
```

**After:**
```javascript
// sensors.js
export function setupDeviceOrientation(state) { /* ... */ }
export function applyDeadReckoning(state) { /* ... */ }
export function requestSensorPermissions(state) { /* ... */ }
function handleDeviceOrientation(event, state) { /* ... */ }  // private
function handleDeviceMotion(event, state) { /* ... */ }  // private
```

---

### Debug Panel → `debug.js`

**Before:**
```javascript
// game.js (lines 274-398)
function setupDebugPanel() { /* ... */ }
function updateDebugPanel() { /* ... */ }
function updateDebugValue(id, value) { /* ... */ }
```

**After:**
```javascript
// debug.js
import { requestSensorPermissions } from './sensors.js';

export function setupDebugPanel(state) { /* ... */ }
export function updateDebugPanel(state, isARMode) { /* ... */ }
function updateDebugValue(id, value) { /* ... */ }  // private
```

---

### Main Entry Point → `game.js` (refactored)

**Before:**
```javascript
// game.js (lines 77-791)
async function init() {
    isMobile = detectMobile();
    isARMode = isMobile;
    
    if (isARMode) {
        // ... inline AR setup
    } else {
        // ... inline desktop setup
    }
    
    animate();
}

function animate() {
    // ... 50+ lines of animation logic
}

window.addEventListener('DOMContentLoaded', init);
```

**After:**
```javascript
// game.js (refactored)
import { CONFIG } from './config.js';
import { state, initThreeObjects } from './state.js';
import { detectMobile } from './device.js';
// ... more imports

async function init() {
    initThreeObjects();
    state.isMobile = detectMobile();
    state.isARMode = state.isMobile;
    
    if (state.isARMode) {
        await initAR(state);
        setupTouchJoystick(state);
    } else {
        initDesktop();
        setupKeyboardControls(state);
    }
    
    animate();
}

function initDesktop() {
    // ... desktop setup using imported functions
}

function animate() {
    // ... cleaner animation logic using imported functions
}

window.addEventListener('DOMContentLoaded', init);
```

## Key Improvements

### ✅ Explicit Dependencies
**Before:** Functions accessed global variables implicitly
```javascript
function updateCharacter() {
    // Uses global 'character', 'keys', 'joystickVector', etc.
}
```

**After:** Functions receive dependencies explicitly
```javascript
export function updateCharacter(character, state, isARMode) {
    // Clear what data this function needs
}
```

### ✅ Public vs Private Functions
**Before:** All functions were global
```javascript
function createTree() { /* ... */ }  // Exposed globally
```

**After:** Only necessary functions are exported
```javascript
function createTree() { /* ... */ }  // Private to world.js
export function createWorld(parent) { /* ... */ }  // Public API
```

### ✅ Import/Export System
**Before:** Everything in global scope
```javascript
// All functions and variables accessible everywhere
```

**After:** Explicit imports
```javascript
import { CONFIG } from './config.js';
import { createWorld } from './world.js';
```

### ✅ Testability
**Before:** Hard to test individual functions
```javascript
// Can't test createCharacter() without entire game state
```

**After:** Easy to test in isolation
```javascript
import { createCharacter } from './character.js';
// Test with mock parent object
```

## HTML Changes

**Before:**
```html
<script src="src/game.js"></script>
```

**After:**
```html
<script type="module" src="src/game.js"></script>
```

The `type="module"` attribute enables ES6 module support.

## Breaking Changes

### None for End Users
The game functionality remains identical. All changes are internal.

### For Developers
If you were extending the old `game.js`:
1. Import the specific modules you need
2. Pass `state` object to functions instead of using globals
3. Use explicit imports instead of relying on global scope

## Migration Checklist

- [x] Extract configuration to `config.js`
- [x] Extract state management to `state.js`
- [x] Extract device detection to `device.js`
- [x] Extract world generation to `world.js`
- [x] Extract character logic to `character.js`
- [x] Extract controls to `controls.js`
- [x] Extract camera to `camera.js`
- [x] Extract AR mode to `ar.js`
- [x] Extract sensors to `sensors.js`
- [x] Extract debug panel to `debug.js`
- [x] Refactor main `game.js` to orchestrate modules
- [x] Update `index.html` to use ES6 modules
- [x] Create documentation (`MODULES.md`, `MODULE_DIAGRAM.md`)

## Testing

After migration, test:
- ✅ Desktop mode still works
- ✅ AR mode still works
- ✅ Keyboard controls work
- ✅ Touch joystick works
- ✅ Dead reckoning works
- ✅ Debug panel works

## Rollback Plan

If needed, the old monolithic `game.js` can be restored from git history:
```bash
git log --all --full-history -- src/game.js
git checkout <commit-hash> -- src/game.js
```

## Future Enhancements

Now that the code is modular, you can easily:
- Add audio system (`audio.js`)
- Add particle effects (`particles.js`)
- Add multiplayer (`network.js`)
- Add UI menus (`ui.js`)
- Add game logic (`gameplay.js`)
- Add enemy AI (`enemies.js`)

Each feature gets its own module! 🚀

