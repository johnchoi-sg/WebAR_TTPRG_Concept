# 🎮 WebAR TTRPG Concept

A cross-platform WebAR tabletop RPG game using Three.js and MindAR.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Enable Camera (One-time)
**Chrome Flag Method (Easiest):**
```
1. Open: chrome://flags/#unsafely-treat-insecure-origin-as-secure
2. Add: http://localhost:8000
3. Set to: Enabled
4. Restart Chrome
```

See [`docs/CAMERA_SETUP.md`](docs/CAMERA_SETUP.md) for detailed instructions.

### 3. Start Server
```bash
npm start
```

### 4. Open in Browser
```
http://localhost:8000
```

---

## 📱 Test AR (Recommended First!)

### Step 1: Compile Target
```bash
# Open in browser:
http://localhost:8000/compile-target.html

# Select assets/target.png
# Click "Compile Target"
# Save as assets/targets.mind
```

### Step 2: Test AR
```bash
# Open in browser:
http://localhost:8000/ar-test.html

# Point camera at target.png
# You should see a green box!
```

See [`docs/QUICK_START.md`](docs/QUICK_START.md) for detailed guide.

---

## 📁 Project Structure

```
WebAR_TTPRG_Concept/
├── index.html              # Main game
├── ar-test.html            # Simple AR test
├── compile-target.html     # Target compiler
├── test-desktop.html       # Desktop mode test
├── ar-test-simple.html     # Minimal AR test
│
├── src/                    # Source modules (ES6)
│   ├── game.js             # Main entry point
│   ├── config.js           # Configuration
│   ├── state.js            # State management
│   ├── ar.js               # AR mode (MindAR)
│   ├── world.js            # World generation
│   ├── character.js        # Character logic
│   ├── controls.js         # Input controls
│   ├── camera.js           # Camera control
│   ├── sensors.js          # Device sensors
│   └── debug.js            # Debug panel
│
├── css/
│   └── styles.css          # All styles
│
├── assets/
│   ├── target.png          # AR marker image
│   ├── targets.mind        # Compiled marker (generate this!)
│   └── hiro.png            # Alternative marker
│
└── docs/                   # Documentation
    ├── QUICK_START.md      # ⭐ Start here!
    ├── SIMPLE_TEST.md      # Detailed test guide
    ├── CAMERA_SETUP.md     # Camera permissions
    ├── MODULES.md          # Code architecture
    └── ... (more docs)
```

---

## 🎯 Features

### Desktop Mode
- ✅ 3D world with terrain
- ✅ Character movement (WASD/Arrow keys)
- ✅ Isometric camera view
- ✅ Trees, rocks, borders

### AR Mode (Mobile)
- ✅ MindAR image tracking
- ✅ Touch joystick controls
- ✅ World anchored to marker
- ✅ Dead reckoning (gyro/accelerometer)
- ✅ Debug panel with sensor data

### Modular Architecture
- ✅ 11 focused ES6 modules
- ✅ Clean separation of concerns
- ✅ Easy to test and maintain
- ✅ Well documented

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [`docs/QUICK_START.md`](docs/QUICK_START.md) | ⭐ **Start here!** 3-step setup |
| [`docs/SIMPLE_TEST.md`](docs/SIMPLE_TEST.md) | Detailed AR test guide |
| [`docs/CAMERA_SETUP.md`](docs/CAMERA_SETUP.md) | Camera permission setup |
| [`docs/CAMERA_TROUBLESHOOTING.md`](docs/CAMERA_TROUBLESHOOTING.md) | Fix camera issues |
| [`docs/MODULES.md`](docs/MODULES.md) | Code architecture |
| [`docs/MODULE_DIAGRAM.md`](docs/MODULE_DIAGRAM.md) | Visual architecture |
| [`docs/MIGRATION_GUIDE.md`](docs/MIGRATION_GUIDE.md) | Refactoring details |
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | Deploy to GitHub Pages |

---

## 🧪 Testing

### Test AR Quickly
```bash
npm start
# Then open: http://localhost:8000/ar-test.html
```

### Test Desktop Mode
```bash
npm start
# Then open: http://localhost:8000/test-desktop.html
```

### Test on Mobile
```bash
npm run start:https
# Then open on phone: https://YOUR_IP:8000/ar-test.html
```

---

## 🛠️ Development

### Available Scripts

```bash
npm start              # Start HTTP server
npm run start:https    # Start HTTPS server (for mobile)
npm run generate-cert  # Generate SSL certificate (one-time)
npm run dev            # Start and open in browser
npm run test:ar        # Start and open AR test
```

### Project Commands

```bash
# Start development
npm start

# Compile AR target
open compile-target.html

# Test AR
open ar-test.html

# Full game
open index.html
```

---

## 📱 Mobile Testing

1. **Generate certificate** (one-time):
   ```bash
   npm run generate-cert
   ```

2. **Start HTTPS server**:
   ```bash
   npm run start:https
   ```

3. **Find your IP**:
   ```bash
   ipconfig    # Windows
   ifconfig    # Mac/Linux
   ```

4. **Open on phone**:
   ```
   https://YOUR_IP:8000/ar-test.html
   ```

5. **Accept security warning** and **allow camera**

---

## 🎮 Controls

### Desktop
- **Arrow Keys** or **WASD** - Move character
- **Mouse** - Look around (if enabled)

### Mobile AR
- **Touch Joystick** - Move character
- **🔬 Button** - Toggle debug panel
- **📱 Button** - Request sensor permissions

---

## 🐛 Troubleshooting

### Camera Not Working?
See [`docs/CAMERA_TROUBLESHOOTING.md`](docs/CAMERA_TROUBLESHOOTING.md)

**Quick fix:**
1. Enable Chrome flag (see above)
2. Restart browser
3. Use exact URL: `localhost:8000`

### Target Not Detected?
- Print target image on paper
- Good lighting
- Hold steady
- Not too close, not too far

### Still Stuck?
- Check [`docs/SIMPLE_TEST.md`](docs/SIMPLE_TEST.md)
- Check browser console (F12)
- See [`docs/`](docs/) folder for all guides

---

## 🚀 Deployment

Deploy to GitHub Pages:

```bash
# Push to GitHub
git push origin main

# Enable GitHub Pages in repo settings
# Source: main branch, / (root)

# Your site will be at:
# https://yourusername.github.io/WebAR_TTPRG_Concept/
```

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for details.

---

## 🏗️ Architecture

This project uses a **modular ES6 architecture**:

- **11 focused modules** in `src/`
- **Single responsibility** per module
- **Explicit dependencies** via imports
- **Easy to test** and maintain

See [`docs/MODULES.md`](docs/MODULES.md) for detailed architecture.

---

## 📖 Learn More

- **MindAR Docs**: https://hiukim.github.io/mind-ar-js-doc/
- **Three.js Docs**: https://threejs.org/docs/
- **A-Frame Docs**: https://aframe.io/docs/

---

## 🎯 Next Steps

1. ✅ **Test AR** - Follow [`docs/QUICK_START.md`](docs/QUICK_START.md)
2. ✅ **Compile target** - Use `compile-target.html`
3. ✅ **Run test** - Open `ar-test.html`
4. ✅ **Play game** - Open `index.html`
5. ✅ **Customize** - Edit modules in `src/`

---

## 📄 License

MIT

---

**Ready to start? Open [`docs/QUICK_START.md`](docs/QUICK_START.md) and follow the 3 steps!** 🚀
