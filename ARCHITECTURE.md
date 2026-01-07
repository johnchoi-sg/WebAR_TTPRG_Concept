# Architecture Documentation

## 🏗️ System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        User Device                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   Web Browser                         │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │              index.html                        │  │   │
│  │  │  ┌──────────────────────────────────────────┐ │  │   │
│  │  │  │         Device Detection                 │ │  │   │
│  │  │  │  ┌────────────┬─────────────────────┐   │ │  │   │
│  │  │  │  │  Mobile?   │     Desktop?        │   │ │  │   │
│  │  │  │  └─────┬──────┴──────┬──────────────┘   │ │  │   │
│  │  │  │        │             │                   │ │  │   │
│  │  │  │   ┌────▼─────┐  ┌────▼─────┐           │ │  │   │
│  │  │  │   │ AR Mode  │  │ Desktop  │           │ │  │   │
│  │  │  │   │          │  │   Mode   │           │ │  │   │
│  │  │  │   └────┬─────┘  └────┬─────┘           │ │  │   │
│  │  │  │        │             │                   │ │  │   │
│  │  │  │   ┌────▼─────────────▼─────┐           │ │  │   │
│  │  │  │   │    game.js (Core)      │           │ │  │   │
│  │  │  │   │  - Scene Management    │           │ │  │   │
│  │  │  │   │  - Character Control   │           │ │  │   │
│  │  │  │   │  - World Generation    │           │ │  │   │
│  │  │  │   │  - Input Handling      │           │ │  │   │
│  │  │  │   └────┬───────────────────┘           │ │  │   │
│  │  │  │        │                                │ │  │   │
│  │  │  │   ┌────▼───────────────────┐           │ │  │   │
│  │  │  │   │   Three.js + AR.js     │           │ │  │   │
│  │  │  │   │   (Rendering Engine)   │           │ │  │   │
│  │  │  │   └────────────────────────┘           │ │  │   │
│  │  │  └──────────────────────────────────────────┘ │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 File Structure & Responsibilities

```
WebAR_TTPRG_Concept/
│
├── 🎮 CORE GAME FILES
│   ├── index.html          # Entry point, HTML structure
│   ├── game.js             # Main game logic (500+ lines)
│   └── styles.css          # UI styling and layout
│
├── 📖 DOCUMENTATION
│   ├── README.md           # Complete project documentation
│   ├── QUICKSTART.md       # Quick start guide
│   ├── DEPLOYMENT.md       # Deployment instructions
│   ├── PROJECT_SUMMARY.md  # Project overview
│   ├── FEATURES.md         # Feature checklist
│   └── ARCHITECTURE.md     # This file
│
├── 🧪 TESTING & UTILITIES
│   ├── test-desktop.html   # Desktop mode testing
│   ├── marker-info.html    # AR marker information
│   └── overview.html       # Visual project overview
│
└── ⚙️ CONFIGURATION
    ├── package.json        # NPM configuration
    └── .gitignore          # Git ignore rules
```

---

## 🔄 Application Flow

### Desktop Mode Flow

```
1. Page Load
   ↓
2. Device Detection (isMobile = false)
   ↓
3. initDesktop()
   ├── Create Scene
   ├── Setup Camera (Perspective)
   ├── Create Renderer
   ├── Add Lights
   ├── Create World
   └── Create Character
   ↓
4. Setup Keyboard Controls
   ├── Listen for keydown
   └── Listen for keyup
   ↓
5. Animation Loop
   ├── updateCharacter()
   │   ├── Read keyboard state
   │   ├── Calculate movement
   │   ├── Apply boundaries
   │   └── Update rotation
   ├── updateCamera()
   │   ├── Calculate offset
   │   └── Follow character
   └── render()
```

### Mobile AR Mode Flow

```
1. Page Load
   ↓
2. Device Detection (isMobile = true)
   ↓
3. initAR()
   ├── Request Camera Access
   ├── Create Scene
   ├── Setup AR Camera
   ├── Create Renderer
   ├── Initialize AR Toolkit Source
   ├── Initialize AR Toolkit Context
   ├── Setup Marker Controls (Hiro)
   ├── Create Marker Root (anchor)
   ├── Add Lights
   ├── Create World (on marker)
   └── Create Character (on marker)
   ↓
4. Setup Touch Joystick
   ├── Listen for touchstart
   ├── Listen for touchmove
   └── Listen for touchend
   ↓
5. AR Animation Loop
   ├── Update AR Context (marker tracking)
   ├── updateCharacter()
   │   ├── Read joystick state
   │   ├── Calculate movement
   │   ├── Apply boundaries
   │   └── Update rotation
   └── render()
```

---

## 🧩 Component Architecture

### game.js Components

```javascript
// ===== CONFIGURATION =====
CONFIG {
    character: { speed, size }
    camera: { distance, height, angle }
    world: { size }
}

// ===== GLOBAL STATE =====
- scene              // Three.js scene
- camera             // Camera object
- renderer           // WebGL renderer
- character          // Character mesh group
- worldMap           // World mesh group
- isMobile           // Device type flag
- isARMode           // AR mode flag
- keys               // Keyboard state
- joystickVector     // Joystick input

// ===== INITIALIZATION =====
init()
├── detectDevice()
├── initDesktop() or initAR()
├── setupControls()
└── animate()

// ===== DESKTOP FUNCTIONS =====
initDesktop()
setupKeyboardControls()
updateCamera()
onWindowResize()

// ===== AR FUNCTIONS =====
initAR()
onARSourceReady()
onARResize()
setupTouchJoystick()

// ===== SHARED FUNCTIONS =====
setupLights()
createWorld()
├── addTerrainFeatures()
│   ├── createTree()
│   └── createRock()
createCharacter()
updateCharacter()
animate()
```

---

## 🎨 Rendering Pipeline

### Desktop Rendering

```
┌─────────────────────────────────────────┐
│  1. Scene Setup                         │
│     - Background color                  │
│     - Fog                               │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│  2. Lighting                            │
│     - Ambient Light (0.6 intensity)     │
│     - Directional Light (0.8 intensity) │
│     - Shadow mapping enabled            │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│  3. World Geometry                      │
│     - Ground plane (5x5)                │
│     - Grid helper                       │
│     - Border walls                      │
│     - Trees (procedural)                │
│     - Rocks (procedural)                │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│  4. Character                           │
│     - Body (capsule)                    │
│     - Head (sphere)                     │
│     - Eyes (spheres)                    │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│  5. Camera Positioning                  │
│     - Isometric angle (45°)             │
│     - Follow character                  │
│     - Look at character                 │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│  6. Render to Canvas                    │
│     - WebGL rendering                   │
│     - Shadow pass                       │
│     - Color pass                        │
└─────────────────────────────────────────┘
```

### AR Rendering

```
┌─────────────────────────────────────────┐
│  1. Camera Feed                         │
│     - Access device camera              │
│     - Display video stream              │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│  2. Marker Detection                    │
│     - AR.js processes video frame       │
│     - Detect Hiro pattern               │
│     - Calculate marker pose             │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│  3. World Anchoring                     │
│     - Position marker root              │
│     - Attach world to marker            │
│     - Transform coordinates             │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│  4. Scene Rendering                     │
│     - Same as desktop                   │
│     - But anchored to marker            │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│  5. Composite Output                    │
│     - Video background                  │
│     - 3D scene overlay                  │
│     - Alpha blending                    │
└─────────────────────────────────────────┘
```

---

## 🎮 Input System Architecture

### Desktop Input

```
Keyboard
   ↓
Event Listeners (keydown/keyup)
   ↓
keys{} Object (state storage)
   ↓
updateCharacter() reads keys{}
   ↓
Calculate movement vector
   ↓
Apply to character position
```

### Mobile Input

```
Touch Screen
   ↓
Joystick Element
   ↓
Touch Event Handlers
   ├── touchstart → activate joystick
   ├── touchmove → calculate vector
   └── touchend → reset joystick
   ↓
joystickVector{x, y} (normalized)
   ↓
updateCharacter() reads joystickVector
   ↓
Calculate movement vector
   ↓
Apply to character position
```

---

## 🔧 Configuration System

### CONFIG Object Structure

```javascript
CONFIG = {
    character: {
        speed: 0.05,    // Units per frame
        size: 0.3       // Base scale
    },
    camera: {
        distance: 8,    // Distance from character
        height: 6,      // Height above ground
        angle: π/4      // Isometric angle (radians)
    },
    world: {
        size: 5         // World dimensions (units)
    }
}
```

### How Configuration is Used

```
CONFIG.character.speed
   ↓
updateCharacter()
   ↓
movement = direction * CONFIG.character.speed

CONFIG.camera.angle
   ↓
updateCamera()
   ↓
offset = distance * cos/sin(CONFIG.camera.angle)

CONFIG.world.size
   ↓
createWorld()
   ↓
ground = PlaneGeometry(CONFIG.world.size, CONFIG.world.size)
```

---

## 🌐 Dependency Graph

```
index.html
   ├── Three.js (CDN)
   │   └── WebGL rendering
   ├── AR.js (CDN)
   │   ├── aframe-ar.min.js
   │   └── ar-threex.js
   ├── styles.css
   │   └── UI styling
   └── game.js
       ├── Device detection
       ├── Scene management
       ├── Input handling
       └── Game logic
```

---

## 📊 Data Flow Diagram

### Character Movement

```
Input Device (Keyboard/Touch)
   ↓
Input Handler (keys/joystick)
   ↓
Movement Vector {x, z}
   ↓
Normalize (if diagonal)
   ↓
Apply Speed Multiplier
   ↓
Calculate New Position
   ↓
Boundary Check
   ↓
Update Character Position
   ↓
Update Character Rotation
   ↓
(Desktop only) Update Camera
   ↓
Render Frame
```

---

## 🎯 State Management

### Application State

```javascript
// Device State
isMobile: boolean
isARMode: boolean

// Scene State
scene: THREE.Scene
camera: THREE.Camera
renderer: THREE.WebGLRenderer

// Game Objects
character: THREE.Group
worldMap: THREE.Group

// AR State (mobile only)
arToolkitSource: ARToolkitSource
arToolkitContext: ARToolkitContext
markerRoot: THREE.Group

// Input State
keys: { [key: string]: boolean }
joystickActive: boolean
joystickVector: { x: number, y: number }
```

---

## 🔄 Lifecycle Hooks

### Initialization Lifecycle

```
1. window.load event
   ↓
2. init()
   ↓
3. detectDevice()
   ↓
4. initDesktop() or initAR()
   ↓
5. setupControls()
   ↓
6. animate() [starts loop]
```

### Animation Loop Lifecycle

```
requestAnimationFrame()
   ↓
(AR only) Update AR Context
   ↓
updateCharacter()
   ↓
(Desktop only) updateCamera()
   ↓
renderer.render()
   ↓
[repeat]
```

---

## 🏗️ Three.js Scene Graph

```
scene
├── camera (desktop) / AR camera (mobile)
├── ambientLight
├── directionalLight
├── worldMap (or markerRoot in AR)
│   ├── ground (PlaneGeometry)
│   ├── gridHelper
│   ├── borders (4x BoxGeometry)
│   ├── trees (5x Group)
│   │   ├── trunk (CylinderGeometry)
│   │   └── foliage (ConeGeometry)
│   └── rocks (3x DodecahedronGeometry)
└── character (or on markerRoot in AR)
    ├── body (CapsuleGeometry)
    ├── head (SphereGeometry)
    ├── leftEye (SphereGeometry)
    └── rightEye (SphereGeometry)
```

---

## 🔐 Security Considerations

### Camera Access
- HTTPS required (except localhost)
- User permission required
- Graceful fallback on denial

### Input Validation
- Boundary checking on movement
- Normalized input vectors
- Clamped joystick values

### Resource Loading
- CDN resources (trusted sources)
- No user-uploaded content
- Static asset loading

---

## ⚡ Performance Optimizations

### Rendering
- Shadow map optimization
- Low-poly geometry
- Efficient materials
- RequestAnimationFrame

### Memory
- Object reuse (no recreation)
- Efficient event listeners
- Proper cleanup on resize

### Computation
- Boundary checks (early exit)
- Normalized vectors (cached)
- Conditional updates

---

## 🧪 Testing Architecture

### Test Files
- `test-desktop.html` - Desktop mode
- `marker-info.html` - AR setup
- `overview.html` - Project overview

### Test Coverage
- Device detection
- Input handling
- Movement boundaries
- Camera following
- AR marker tracking
- Joystick functionality

---

## 📈 Scalability Considerations

### Current Architecture
- Single-player only
- Client-side only
- No persistence
- Static world

### Future Scalability
- Add backend (Node.js/Firebase)
- WebSocket for multiplayer
- Database for persistence
- Dynamic world loading
- Asset streaming

---

**Last Updated**: January 2026

*This architecture supports the current v1.0 implementation and is designed for future extensibility.*

