# 📦 Module Architecture

The game has been refactored into a clean, modular architecture using ES6 modules. Each module has a single responsibility, making the code easier to understand, test, and maintain.

## 📁 Module Structure

```
src/
├── game.js         # Main entry point & animation loop
├── config.js       # Game configuration constants
├── state.js        # Global game state management
├── device.js       # Device detection (mobile vs desktop)
├── world.js        # World generation & lighting
├── character.js    # Character creation & movement
├── controls.js     # Keyboard & touch joystick controls
├── camera.js       # Camera positioning & updates
├── ar.js           # MindAR initialization & setup
├── sensors.js      # Device orientation & dead reckoning
└── debug.js        # Debug panel UI
```

## 🎯 Module Responsibilities

### `game.js` - Main Entry Point
**Purpose**: Orchestrates the entire game initialization and animation loop

**Key Functions**:
- `init()` - Initializes the game, detects device, sets up appropriate mode
- `initDesktop()` - Initializes desktop mode with Three.js
- `animate()` - Main animation loop for both desktop and AR modes

**Dependencies**: All other modules

---

### `config.js` - Configuration
**Purpose**: Centralized game configuration constants

**Exports**:
- `CONFIG` - Object containing:
  - `character` - Speed and size settings
  - `camera` - Distance, height, and angle settings
  - `world` - World size settings

**Dependencies**: None

---

### `state.js` - State Management
**Purpose**: Manages all global game state in a single object

**Exports**:
- `state` - Object containing all game state:
  - Three.js objects (scene, camera, renderer, character, worldMap)
  - Device detection flags (isMobile, isARMode)
  - AR objects (mindarThree, anchor, markerVisible)
  - Input state (keys, joystick)
  - Sensor data (deviceOrientation, deviceAcceleration)
  - Dead reckoning state
- `initThreeObjects()` - Initializes Three.js Vector3 and Euler objects

**Dependencies**: Three.js (global)

---

### `device.js` - Device Detection
**Purpose**: Detects whether the user is on mobile or desktop

**Exports**:
- `detectMobile()` - Returns true if mobile device detected

**Detection Methods**:
- User agent string analysis
- Screen size check (≤768px)

**Dependencies**: None

---

### `world.js` - World Generation
**Purpose**: Creates the game world with terrain, features, and lighting

**Exports**:
- `createWorld(parent)` - Creates the world map with ground, grid, borders, and terrain
- `setupLights(scene)` - Adds ambient and directional lighting

**Features Created**:
- Ground plane with material
- Grid helper
- Border walls
- Trees (5 random positions)
- Rocks (3 random positions)

**Dependencies**: `config.js`, Three.js (global)

---

### `character.js` - Character
**Purpose**: Creates and updates the player character

**Exports**:
- `createCharacter(parent)` - Creates character mesh (capsule body, head, eyes)
- `updateCharacter(character, state, isARMode)` - Updates character position based on input

**Features**:
- Capsule-shaped body (cylinder + spheres)
- Spherical head with eyes
- Movement with boundary checking
- Auto-rotation to face movement direction

**Dependencies**: `config.js`, Three.js (global)

---

### `controls.js` - Input Controls
**Purpose**: Handles keyboard and touch joystick input

**Exports**:
- `setupKeyboardControls(state)` - Sets up WASD/Arrow key listeners
- `setupTouchJoystick(state)` - Sets up touch joystick for mobile

**Input Handling**:
- Keyboard: Arrow keys and WASD
- Touch: Virtual joystick with drag detection
- Mouse: Also works with joystick for desktop testing

**Dependencies**: None

---

### `camera.js` - Camera Control
**Purpose**: Manages camera positioning and updates

**Exports**:
- `updateCamera(camera, character)` - Positions camera behind and above character
- `setupResizeHandler(camera, renderer)` - Handles window resize events

**Camera Behavior**:
- Desktop: Follows character from behind (isometric-style view)
- AR: Controlled by MindAR

**Dependencies**: `config.js`, Three.js (global)

---

### `ar.js` - AR Mode
**Purpose**: Initializes and manages MindAR for augmented reality

**Exports**:
- `initAR(state)` - Async function to initialize MindAR
- `setMarkerVisible(state, visible)` - Handles marker found/lost events

**AR Features**:
- MindAR initialization with image tracking
- Anchor creation for world attachment
- Target found/lost event handling
- Dead reckoning activation

**Dependencies**: `world.js`, `character.js`, `sensors.js`, `debug.js`, MindAR (global)

---

### `sensors.js` - Device Sensors
**Purpose**: Handles device orientation and motion for dead reckoning

**Exports**:
- `setupDeviceOrientation(state)` - Sets up gyroscope and accelerometer listeners
- `applyDeadReckoning(state)` - Applies dead reckoning when marker is lost
- `requestSensorPermissions(state)` - Manually requests sensor permissions (iOS 13+)

**Sensor Data**:
- **Gyroscope**: Alpha, beta, gamma rotation angles
- **Accelerometer**: X, Y, Z acceleration values

**Dead Reckoning**:
- Uses device orientation to estimate position when marker is lost
- Stores last known marker position/rotation
- Applies orientation deltas to anchor

**Dependencies**: Three.js (global)

---

### `debug.js` - Debug Panel
**Purpose**: Provides real-time debugging information for AR mode

**Exports**:
- `setupDebugPanel(state)` - Initializes debug panel UI
- `updateDebugPanel(state, isARMode)` - Updates debug values every frame

**Debug Information**:
- Marker tracking status
- Gyroscope data (alpha, beta, gamma)
- Accelerometer data (x, y, z)
- Camera position and rotation
- Character position
- Sensor permission button

**Dependencies**: `sensors.js`

---

## 🔄 Data Flow

```
┌─────────────┐
│   game.js   │ ◄── Entry point
└──────┬──────┘
       │
       ├──► device.js ──► Detect mobile/desktop
       │
       ├──► Desktop Mode:
       │    ├──► world.js ──► Create world
       │    ├──► character.js ──► Create character
       │    ├──► controls.js ──► Setup keyboard
       │    └──► camera.js ──► Setup camera
       │
       └──► AR Mode:
            ├──► ar.js ──► Initialize MindAR
            │    ├──► world.js ──► Create world on anchor
            │    ├──► character.js ──► Create character on anchor
            │    ├──► sensors.js ──► Setup orientation
            │    └──► debug.js ──► Setup debug panel
            └──► controls.js ──► Setup joystick

┌──────────────────┐
│ Animation Loop   │
└────────┬─────────┘
         │
         ├──► character.js ──► Update position
         ├──► camera.js ──► Update camera (desktop)
         ├──► sensors.js ──► Apply dead reckoning (AR)
         └──► debug.js ──► Update debug panel (AR)
```

## 🎨 Benefits of Modular Architecture

### ✅ Separation of Concerns
Each module has a single, well-defined responsibility

### ✅ Reusability
Modules can be reused across different projects

### ✅ Testability
Individual modules can be tested in isolation

### ✅ Maintainability
Bugs are easier to locate and fix

### ✅ Scalability
New features can be added as new modules

### ✅ Readability
Smaller files are easier to understand

### ✅ Collaboration
Multiple developers can work on different modules

## 🚀 Usage

### Importing Modules

```javascript
// Import specific exports
import { CONFIG } from './config.js';
import { state } from './state.js';
import { createWorld } from './world.js';

// Import multiple exports
import { setupKeyboardControls, setupTouchJoystick } from './controls.js';
```

### Adding New Features

1. Create a new module file in `src/`
2. Export functions/objects using `export`
3. Import the module in `game.js` or other modules
4. Update this documentation

### Example: Adding a new module

```javascript
// src/audio.js
export function playSound(soundName) {
    // Implementation
}

export function setupAudio() {
    // Implementation
}
```

```javascript
// src/game.js
import { playSound, setupAudio } from './audio.js';

function init() {
    setupAudio();
    // ...
}
```

## 📝 Notes

- All modules use ES6 module syntax (`import`/`export`)
- Three.js and MindAR are loaded as global scripts (not modules)
- State is passed explicitly to functions (no hidden global dependencies)
- Each module is self-contained and focused on a single responsibility

