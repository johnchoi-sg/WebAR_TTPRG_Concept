# 📁 Project Structure

## Overview

The project is organized into logical folders for easy navigation and maintenance.

```
WebAR_TTPRG_Concept/
│
├── 📄 index.html              # Main entry point
├── 📄 package.json            # NPM configuration
├── 📄 package-lock.json       # NPM lock file
├── 📄 README.md               # Project overview
├── 📄 .gitignore             # Git ignore rules
│
├── 📁 src/                    # Source Code
│   └── game.js               # Main game logic (800+ lines)
│
├── 📁 css/                    # Stylesheets
│   └── styles.css            # Main styles & UI
│
├── 📁 assets/                 # Test Files & Utilities
│   ├── test-desktop.html     # Desktop mode test with FPS counter
│   ├── ar-test-simple.html   # Minimal AR test
│   ├── marker-info.html      # AR marker information page
│   ├── overview.html         # Visual project overview
│   └── hiro.png              # Legacy Hiro marker (reference)
│
└── 📁 docs/                   # Documentation (14 files)
    ├── START_HERE.md         # 👈 Best starting point!
    ├── QUICKSTART.md         # 3-step setup guide
    ├── README.md             # Original detailed docs
    ├── PROJECT_SUMMARY.md    # Project overview
    ├── PROJECT_STRUCTURE.md  # This file
    │
    ├── MINDAR_SETUP.md       # MindAR configuration
    ├── AR_MARKER_GUIDE.md    # Legacy AR.js marker guide
    │
    ├── CONTROLS_GUIDE.md     # Control schemes
    ├── DEBUG_PANEL.md        # Debug UI documentation
    ├── DEAD_RECKONING.md     # Sensor tracking details
    │
    ├── DEPLOYMENT.md         # Deployment instructions
    ├── FEATURES.md           # Feature checklist
    ├── BUGFIXES.md           # Bug fix history
    ├── ARCHITECTURE.md       # Technical architecture
    │
    ├── IOS_TROUBLESHOOTING.md      # iOS-specific help
    └── MOBILE_AR_CHECKLIST.md      # Mobile AR debugging
```

---

## 📂 Folder Details

### Root Files

#### `index.html`
- Main entry point
- Loads MindAR and Three.js
- References `src/game.js` and `css/styles.css`
- Contains HTML structure for UI elements

#### `package.json`
- NPM configuration
- Scripts for local server
- Project metadata

#### `README.md`
- Project overview
- Quick start instructions
- Links to detailed docs

---

### 📁 `src/` - Source Code

#### `game.js` (~800 lines)
Main game logic including:

**Configuration**
- `CONFIG` object (character, camera, world settings)

**Initialization**
- `init()` - Entry point
- `detectDevice()` - Mobile vs desktop
- `initDesktop()` - Desktop mode setup
- `initAR()` - MindAR AR mode setup

**3D World**
- `createWorld()` - Terrain generation
- `createCharacter()` - Player character
- `createTree()`, `createRock()` - Terrain features
- `setupLights()` - Lighting system

**Controls**
- `setupKeyboardControls()` - Desktop input
- `setupTouchJoystick()` - Mobile joystick
- `updateCharacter()` - Movement logic
- `updateCamera()` - Camera following

**AR & Sensors**
- `setupDeviceOrientation()` - Gyroscope
- `handleDeviceOrientation()` - Sensor data
- `handleDeviceMotion()` - Accelerometer
- `applyDeadReckoning()` - Sensor fusion

**Debug**
- `setupDebugPanel()` - Debug UI
- `updateDebugPanel()` - Real-time updates
- `requestSensorPermissions()` - iOS permissions

**Animation**
- `animate()` - Main game loop
- `onWindowResize()` - Responsive handling

---

### 📁 `css/` - Stylesheets

#### `styles.css` (~280 lines)
All styling including:

**Layout**
- Body and container styles
- Responsive design

**UI Components**
- Info panel (top-left)
- Debug panel (collapsible)
- Touch joystick (mobile)
- Toggle buttons

**AR Container**
- Video and canvas positioning
- Overlay management

**Animations**
- Loading indicators
- Transitions
- Hover effects

---

### 📁 `assets/` - Test Files & Utilities

#### `test-desktop.html`
- Standalone desktop mode test
- FPS counter
- Position/rotation stats
- Debug information
- No dependencies on main game

#### `ar-test-simple.html`
- Minimal AR test
- Verifies MindAR works
- Simple colored shapes
- Good for troubleshooting

#### `marker-info.html`
- AR marker information page
- Download links
- Usage instructions
- Legacy (AR.js era)

#### `overview.html`
- Visual project overview
- Feature showcase
- Quick links
- Nice landing page

#### `hiro.png`
- Legacy Hiro marker image
- From AR.js era
- Kept for reference
- Not used with MindAR

---

### 📁 `docs/` - Documentation

#### Getting Started (Read These First!)

**`START_HERE.md`** ⭐
- Best starting point
- Quick overview
- What to read next
- File navigation

**`QUICKSTART.md`**
- 3-step setup
- Minimal instructions
- Get running fast

**`README.md`**
- Original detailed docs
- Complete feature list
- Comprehensive guide

**`PROJECT_SUMMARY.md`**
- High-level overview
- Feature breakdown
- Technology stack
- Version history

**`PROJECT_STRUCTURE.md`** (This file)
- Folder organization
- File descriptions
- Navigation guide

---

#### AR & Tracking

**`MINDAR_SETUP.md`** ⭐
- MindAR configuration
- Creating custom targets
- Compiler tool usage
- Migration from AR.js

**`AR_MARKER_GUIDE.md`**
- Legacy AR.js markers
- Hiro marker info
- Historical reference
- Not needed for MindAR

---

#### Controls & Interaction

**`CONTROLS_GUIDE.md`**
- Desktop controls (keyboard)
- Mobile controls (joystick)
- Camera behavior
- Customization options

**`DEBUG_PANEL.md`**
- Debug UI documentation
- Sensor monitoring
- Real-time data display
- Troubleshooting with debug panel

**`DEAD_RECKONING.md`**
- Gyroscope integration
- Accelerometer usage
- Sensor fusion
- Technical details

---

#### Deployment & Setup

**`DEPLOYMENT.md`**
- GitHub Pages
- Netlify
- Vercel
- Firebase
- Custom servers
- HTTPS setup

**`FEATURES.md`**
- Complete feature list
- Implemented features ✅
- Future enhancements 🚧
- Version roadmap

**`BUGFIXES.md`**
- Bug fix history
- Version changelog
- Known issues
- Solutions applied

**`ARCHITECTURE.md`**
- Technical architecture
- System design
- Data flow
- Component structure
- Coordinate systems

---

#### Troubleshooting

**`IOS_TROUBLESHOOTING.md`**
- iOS-specific issues
- Safari quirks
- Permission handling
- Common problems

**`MOBILE_AR_CHECKLIST.md`**
- Complete debugging checklist
- Step-by-step diagnosis
- Common issues
- Quick fixes

---

## 🗺️ Navigation Guide

### "I want to..."

**...get started quickly**
→ `docs/QUICKSTART.md`

**...understand the project**
→ `docs/START_HERE.md` → `README.md`

**...configure AR tracking**
→ `docs/MINDAR_SETUP.md`

**...deploy to web**
→ `docs/DEPLOYMENT.md`

**...debug AR issues**
→ `docs/MOBILE_AR_CHECKLIST.md`

**...understand the code**
→ `docs/ARCHITECTURE.md`

**...customize controls**
→ `docs/CONTROLS_GUIDE.md`

**...see all features**
→ `docs/FEATURES.md`

**...fix iOS problems**
→ `docs/IOS_TROUBLESHOOTING.md`

**...test desktop mode**
→ `assets/test-desktop.html`

**...test AR quickly**
→ `assets/ar-test-simple.html`

---

## 📊 File Statistics

### By Type

| Type | Count | Location |
|------|-------|----------|
| JavaScript | 1 | `src/` |
| CSS | 1 | `css/` |
| HTML (main) | 1 | root |
| HTML (test) | 4 | `assets/` |
| Markdown | 14 | `docs/` |
| Images | 1 | `assets/` |
| Config | 3 | root |

### By Purpose

| Purpose | Files |
|---------|-------|
| Core Game | 3 (HTML, JS, CSS) |
| Documentation | 14 |
| Testing | 4 |
| Configuration | 3 |
| Assets | 1 |

### Lines of Code

| File | Lines | Purpose |
|------|-------|---------|
| `src/game.js` | ~800 | Game logic |
| `css/styles.css` | ~280 | Styling |
| `index.html` | ~100 | Structure |
| **Total** | **~1180** | Core code |

---

## 🔄 Recent Changes

### v2.0.0 - Project Reorganization

**Before:**
```
WebAR_TTPRG_Concept/
├── game.js
├── styles.css
├── index.html
├── README.md
├── QUICKSTART.md
├── DEPLOYMENT.md
├── ... (12 more .md files)
├── test-desktop.html
├── ar-test-simple.html
└── ... (more files)
```

**After:**
```
WebAR_TTPRG_Concept/
├── index.html
├── README.md
├── src/
├── css/
├── assets/
└── docs/
```

**Benefits:**
- ✅ Cleaner root directory
- ✅ Logical organization
- ✅ Easier navigation
- ✅ Better maintainability
- ✅ Professional structure

---

## 🎯 Best Practices

### Adding New Files

**JavaScript**
→ Add to `src/`

**CSS**
→ Add to `css/`

**Documentation**
→ Add to `docs/`

**Test/Utility HTML**
→ Add to `assets/`

**Images/Media**
→ Add to `assets/`

### Naming Conventions

**Files:**
- Lowercase with hyphens: `my-file.js`
- Descriptive names: `debug-panel.js` not `dp.js`

**Folders:**
- Lowercase: `src/`, `docs/`, `assets/`
- Plural for collections: `assets/` not `asset/`

**Documentation:**
- UPPERCASE with underscores: `START_HERE.md`
- Clear purpose: `QUICKSTART.md` not `QUICK.md`

---

## 📚 Related Documentation

- **README.md** - Project overview
- **docs/START_HERE.md** - Getting started
- **docs/ARCHITECTURE.md** - Technical details
- **docs/FEATURES.md** - Feature list

---

**Last Updated**: January 2026  
**Version**: 2.0.0  
**Status**: ✅ Organized

