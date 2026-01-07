# 🗺️ Module Dependency Diagram

## Visual Architecture

```
                                    ┌─────────────────────┐
                                    │     index.html      │
                                    │  (ES6 Module Load)  │
                                    └──────────┬──────────┘
                                               │
                                               ▼
                    ┌──────────────────────────────────────────────────┐
                    │                    game.js                       │
                    │         (Main Entry & Animation Loop)            │
                    └──┬───────┬────────┬────────┬────────┬───────┬───┘
                       │       │        │        │        │       │
        ┌──────────────┘       │        │        │        │       └──────────────┐
        │                      │        │        │        │                      │
        ▼                      ▼        ▼        ▼        ▼                      ▼
   ┌─────────┐          ┌─────────┐ ┌────────┐ ┌──────┐ ┌──────────┐     ┌─────────┐
   │ config  │          │  state  │ │ device │ │ world│ │character │     │ camera  │
   │  .js    │          │   .js   │ │  .js   │ │  .js │ │   .js    │     │   .js   │
   └────┬────┘          └────┬────┘ └───┬────┘ └──┬───┘ └────┬─────┘     └────┬────┘
        │                    │          │         │          │                 │
        │                    │          │         │          │                 │
        │              ┌─────┴──────────┴─────────┴──────────┴─────────────────┘
        │              │
        │              ▼
        │         ┌─────────┐
        │         │ controls│
        │         │   .js   │
        │         └─────────┘
        │
        │         ┌─────────────────────────────────────────┐
        └────────►│               ar.js                     │
                  │    (MindAR Initialization)              │
                  └──┬──────────┬──────────┬────────────┬───┘
                     │          │          │            │
                     ▼          ▼          ▼            ▼
                  ┌──────┐  ┌──────┐  ┌─────────┐  ┌───────┐
                  │ world│  │character│ │ sensors │  │ debug │
                  │  .js │  │  .js  │  │   .js   │  │  .js  │
                  └──────┘  └───────┘  └─────────┘  └───┬───┘
                                                         │
                                                         ▼
                                                    ┌─────────┐
                                                    │ sensors │
                                                    │   .js   │
                                                    └─────────┘
```

## Module Layers

### Layer 1: Foundation (No Dependencies)
- **config.js** - Pure configuration constants
- **device.js** - Device detection logic

### Layer 2: Core Utilities (Minimal Dependencies)
- **state.js** - State management (depends on Three.js global)
- **world.js** - World generation (depends on config.js)
- **character.js** - Character logic (depends on config.js)
- **camera.js** - Camera control (depends on config.js)
- **controls.js** - Input handling (no module dependencies)
- **sensors.js** - Device sensors (no module dependencies)

### Layer 3: UI & Features (Multiple Dependencies)
- **debug.js** - Debug panel (depends on sensors.js)

### Layer 4: Mode Initialization (High-Level)
- **ar.js** - AR mode setup (depends on world, character, sensors, debug)

### Layer 5: Orchestration (Top-Level)
- **game.js** - Main entry point (depends on all modules)

## Import/Export Flow

```
config.js
  └─► exports: CONFIG
       └─► imported by: world.js, character.js, camera.js, game.js

state.js
  └─► exports: state, initThreeObjects()
       └─► imported by: game.js

device.js
  └─► exports: detectMobile()
       └─► imported by: game.js

world.js
  └─► exports: createWorld(), setupLights()
       └─► imported by: ar.js, game.js

character.js
  └─► exports: createCharacter(), updateCharacter()
       └─► imported by: ar.js, game.js

controls.js
  └─► exports: setupKeyboardControls(), setupTouchJoystick()
       └─► imported by: game.js

camera.js
  └─► exports: updateCamera(), setupResizeHandler()
       └─► imported by: game.js

sensors.js
  └─► exports: setupDeviceOrientation(), applyDeadReckoning(), requestSensorPermissions()
       └─► imported by: ar.js, debug.js

debug.js
  └─► exports: setupDebugPanel(), updateDebugPanel()
       └─► imported by: ar.js, game.js

ar.js
  └─► exports: initAR(), setMarkerVisible()
       └─► imported by: game.js
```

## Execution Flow

### Desktop Mode
```
1. game.js: init()
2. device.js: detectMobile() → false
3. game.js: initDesktop()
   ├─► state.js: Initialize Three.js scene
   ├─► world.js: createWorld(), setupLights()
   ├─► character.js: createCharacter()
   ├─► camera.js: updateCamera(), setupResizeHandler()
   └─► controls.js: setupKeyboardControls()
4. game.js: animate() loop
   ├─► character.js: updateCharacter()
   ├─► camera.js: updateCamera()
   └─► render()
```

### AR Mode
```
1. game.js: init()
2. device.js: detectMobile() → true
3. ar.js: initAR()
   ├─► MindAR: Initialize camera & renderer
   ├─► world.js: setupLights()
   ├─► world.js: createWorld(anchor)
   ├─► character.js: createCharacter(anchor)
   ├─► sensors.js: setupDeviceOrientation()
   └─► debug.js: setupDebugPanel()
4. controls.js: setupTouchJoystick()
5. game.js: animate() loop
   ├─► character.js: updateCharacter()
   ├─► sensors.js: applyDeadReckoning() (if marker lost)
   ├─► debug.js: updateDebugPanel()
   └─► render()
```

## File Size Summary

| Module       | Lines | Size  | Complexity |
|--------------|-------|-------|------------|
| config.js    | ~15   | 338B  | ⭐         |
| state.js     | ~40   | 1KB   | ⭐         |
| device.js    | ~20   | 693B  | ⭐         |
| world.js     | ~120  | 4KB   | ⭐⭐       |
| character.js | ~110  | 4KB   | ⭐⭐       |
| controls.js  | ~80   | 3KB   | ⭐⭐       |
| camera.js    | ~25   | 821B  | ⭐         |
| sensors.js   | ~150  | 5KB   | ⭐⭐⭐     |
| debug.js     | ~110  | 4KB   | ⭐⭐       |
| ar.js        | ~90   | 3KB   | ⭐⭐⭐     |
| game.js      | ~110  | 4KB   | ⭐⭐⭐     |

**Total: ~870 lines** (down from ~791 lines in monolithic file, but much more organized!)

## Benefits Achieved

### 🎯 Single Responsibility
Each module has one clear purpose

### 🔄 Loose Coupling
Modules communicate through well-defined interfaces

### 📦 High Cohesion
Related functionality is grouped together

### 🧪 Testable
Each module can be tested independently

### 📖 Readable
Smaller files are easier to understand

### 🚀 Maintainable
Changes are localized to specific modules

### 🔧 Extensible
New features can be added as new modules

