# 📁 Project Organization

## Clean File Structure

The project has been reorganized for clarity and maintainability!

## 📂 Root Directory (Clean!)

```
WebAR_TTPRG_Concept/
├── index.html              ← Main game entry point
├── ar-test.html            ← Simple AR test
├── ar-test-simple.html     ← Minimal AR test
├── compile-target.html     ← Target compiler tool
├── test-desktop.html       ← Desktop mode test
│
├── README.md               ← Main documentation
├── package.json            ← NPM configuration
├── package-lock.json       ← NPM lock file
│
├── generate-cert.bat       ← SSL certificate generator
├── start-https.bat         ← HTTPS server starter
│
├── src/                    ← Source code modules
├── css/                    ← Stylesheets
├── assets/                 ← Images and markers
└── docs/                   ← All documentation
```

**✅ Clean and organized!**

---

## 📦 Source Code (`src/`)

```
src/
├── game.js         ← Main entry point
├── config.js       ← Configuration
├── state.js        ← State management
├── device.js       ← Device detection
├── world.js        ← World generation
├── character.js    ← Character logic
├── controls.js     ← Input controls
├── camera.js       ← Camera control
├── ar.js           ← AR mode (MindAR)
├── sensors.js      ← Device sensors
├── debug.js        ← Debug panel
└── README.md       ← Module documentation
```

**11 focused ES6 modules**

---

## 🎨 Styles (`css/`)

```
css/
└── styles.css      ← All styles in one file
```

**Single stylesheet for entire project**

---

## 🖼️ Assets (`assets/`)

```
assets/
├── target.png      ← AR marker image (your custom target)
├── targets.mind    ← Compiled marker (generated)
└── hiro.png        ← Alternative marker
```

**Only essential assets**

---

## 📚 Documentation (`docs/`)

### Setup & Getting Started
- **`QUICK_START.md`** ⭐ - 3-step quick start guide
- **`SIMPLE_TEST.md`** - Detailed test guide
- **`START_HERE.md`** - Original start guide
- **`QUICKSTART.md`** - Alternative quick start

### Camera & Permissions
- **`CAMERA_SETUP.md`** - Complete camera setup
- **`CAMERA_TROUBLESHOOTING.md`** - Fix camera issues
- **`ENABLE_CAMERA.md`** - Quick camera enable
- **`START_HERE_CAMERA.md`** - Camera setup guide

### Code Architecture
- **`MODULES.md`** - Module documentation
- **`MODULE_DIAGRAM.md`** - Visual architecture
- **`ARCHITECTURE.md`** - System architecture
- **`MIGRATION_GUIDE.md`** - Refactoring details
- **`REFACTORING_SUMMARY.md`** - Refactoring overview
- **`QUICK_REFERENCE.md`** - Quick code reference

### Testing & AR
- **`TEST_README.md`** - Test files guide
- **`AR_MARKER_GUIDE.md`** - AR marker info
- **`MINDAR_SETUP.md`** - MindAR configuration
- **`DEAD_RECKONING.md`** - Dead reckoning docs

### Features & UI
- **`FEATURES.md`** - Feature list
- **`CONTROLS_GUIDE.md`** - Control instructions
- **`DEBUG_PANEL.md`** - Debug panel guide
- **`UI_GUIDE.md`** - UI documentation

### Deployment & Troubleshooting
- **`DEPLOYMENT.md`** - Deploy to GitHub Pages
- **`IOS_TROUBLESHOOTING.md`** - iOS-specific fixes
- **`MOBILE_AR_CHECKLIST.md`** - Mobile AR checklist

### Project Info
- **`PROJECT_SUMMARY.md`** - Project overview
- **`PROJECT_STRUCTURE.md`** - Structure details
- **`BUGFIXES.md`** - Bug fix history
- **`README.md`** - Docs folder readme

### HTML Documentation
- **`marker-info.html`** - Marker information page
- **`overview.html`** - Project overview page

---

## 🗂️ What Changed?

### ✅ Moved to `docs/`
All `.md` documentation files moved from root to `docs/`:
- CAMERA_SETUP.md
- CAMERA_TROUBLESHOOTING.md
- ENABLE_CAMERA.md
- START_HERE_CAMERA.md
- MIGRATION_GUIDE.md
- MODULE_DIAGRAM.md
- MODULES.md
- QUICK_REFERENCE.md
- QUICK_START.md
- REFACTORING_SUMMARY.md
- SIMPLE_TEST.md
- TEST_README.md
- UI_GUIDE.md

### ✅ Moved to Root
Test HTML files moved from `assets/` to root:
- ar-test-simple.html
- test-desktop.html

### ✅ Moved to `docs/`
Documentation HTML moved from `assets/` to `docs/`:
- marker-info.html
- overview.html

### ❌ Deleted
Duplicate files removed:
- game.js (duplicate of src/game.js)
- styles.css (duplicate of css/styles.css)
- MINDAR_SETUP.md (duplicate, already in docs/)

---

## 📍 Quick Navigation

### Want to...

**Start the project?**
→ Root `README.md`

**Test AR quickly?**
→ `docs/QUICK_START.md`

**Fix camera issues?**
→ `docs/CAMERA_TROUBLESHOOTING.md`

**Understand the code?**
→ `docs/MODULES.md`

**Deploy to production?**
→ `docs/DEPLOYMENT.md`

**See all features?**
→ `docs/FEATURES.md`

---

## 🎯 File Naming Convention

### Root Files
- **HTML files**: Lowercase with hyphens (`ar-test.html`)
- **Config files**: Lowercase (`package.json`)
- **Scripts**: Lowercase with hyphens (`.bat` files)
- **README**: Uppercase (`README.md`)

### Source Files
- **Modules**: Lowercase (`game.js`, `ar.js`)
- **One word**: No hyphens (`world.js`, `camera.js`)

### Documentation
- **All caps**: With underscores (`QUICK_START.md`)
- **Descriptive**: Clear purpose (`CAMERA_SETUP.md`)

---

## 📊 File Count

```
Root:           8 files (HTML + config)
src/:          12 files (11 modules + README)
css/:           1 file
assets/:        3 files
docs/:         30+ files (all documentation)
```

**Total: ~55 files** (well organized!)

---

## 🎨 Benefits

### ✅ Clean Root
- Only essential files visible
- Easy to find main entry points
- No clutter

### ✅ Organized Docs
- All documentation in one place
- Easy to find guides
- Logical grouping

### ✅ Clear Structure
- Source code separate
- Assets separate
- Documentation separate

### ✅ Easy Navigation
- Intuitive folder names
- Consistent naming
- Clear hierarchy

---

## 🚀 Usage

### For Users
```
1. Read root README.md
2. Follow docs/QUICK_START.md
3. Open index.html
```

### For Developers
```
1. Check src/ for code
2. Read docs/MODULES.md
3. Modify and test
```

### For Troubleshooting
```
1. Check docs/CAMERA_TROUBLESHOOTING.md
2. Check docs/SIMPLE_TEST.md
3. Check browser console
```

---

## 📝 Notes

- **Root README.md** is the main entry point
- **All docs** link to `docs/` folder
- **Test menu** in index.html updated with new paths
- **No duplicate files** - everything has one location
- **Logical grouping** - related files together

---

**The project is now clean, organized, and easy to navigate!** ✨


