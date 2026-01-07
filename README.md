# 🎮 WebAR TTRPG Game

A cross-platform WebAR tabletop RPG game built with **MindAR** and **Three.js**.

## 🚀 Quick Start

```bash
# Start local server
npm start

# Or use Python
python -m http.server 8000
```

Then open `http://localhost:8000`

## 📁 Project Structure

```
WebAR_TTPRG_Concept/
├── index.html              # Main entry point
├── package.json            # NPM configuration
├── README.md               # This file
│
├── src/                    # Source code
│   └── game.js            # Main game logic
│
├── css/                    # Stylesheets
│   └── styles.css         # Main styles
│
├── assets/                 # Test files and utilities
│   ├── test-desktop.html  # Desktop mode test
│   ├── ar-test-simple.html # Simple AR test
│   ├── marker-info.html   # AR marker info
│   └── overview.html      # Project overview
│
└── docs/                   # Documentation
    ├── START_HERE.md      # Quick start guide
    ├── QUICKSTART.md      # 3-step setup
    ├── MINDAR_SETUP.md    # MindAR configuration
    ├── DEPLOYMENT.md      # Deploy instructions
    ├── CONTROLS_GUIDE.md  # Control schemes
    ├── DEBUG_PANEL.md     # Debug UI guide
    ├── DEAD_RECKONING.md  # Sensor tracking
    ├── FEATURES.md        # Feature list
    ├── BUGFIXES.md        # Bug fix history
    ├── ARCHITECTURE.md    # Technical details
    └── PROJECT_SUMMARY.md # Project overview
```

## 🎯 Features

### Desktop Mode 🖥️
- **Controls**: Arrow keys or WASD
- **Camera**: Top-down view following character
- **Graphics**: Full 3D rendering with shadows

### Mobile AR Mode 📱
- **Tracking**: MindAR image-based AR
- **Controls**: Touch joystick
- **Sensors**: Gyroscope + accelerometer dead reckoning
- **Debug**: Real-time sensor monitoring panel

### Game World 🌍
- 5x5 grid-based map
- Procedural terrain (trees, rocks)
- Character with movement and rotation
- Collision detection

## 📖 Documentation

- **[START_HERE.md](docs/START_HERE.md)** - Best starting point
- **[QUICKSTART.md](docs/QUICKSTART.md)** - Get running in 3 steps
- **[MINDAR_SETUP.md](docs/MINDAR_SETUP.md)** - AR configuration
- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Deploy to web

## 🎮 How to Play

### Desktop
1. Open `index.html` in browser
2. Use **Arrow Keys** or **WASD** to move
3. Camera follows automatically

### Mobile AR
1. Deploy to HTTPS (required for camera)
2. Print target image (see [MINDAR_SETUP.md](docs/MINDAR_SETUP.md))
3. Point camera at target
4. Use touch joystick to move

## 🔧 Technology Stack

- **Three.js** v0.147.0 - 3D graphics
- **MindAR** v1.2.2 - WebAR tracking
- **Vanilla JavaScript** - No frameworks
- **HTML5 + CSS3** - UI

## 📱 Browser Support

| Browser | Desktop | Mobile AR |
|---------|---------|-----------|
| Chrome | ✅ | ✅ |
| Safari | ✅ | ✅ |
| Firefox | ✅ | ⚠️ |
| Edge | ✅ | ✅ |

**Note**: Mobile AR requires HTTPS (except localhost)

## 🚀 Deployment

Quick deploy options:

```bash
# GitHub Pages
git push origin main
# Enable Pages in repo settings

# Netlify
# Drag folder to app.netlify.com/drop

# Vercel
npx vercel
```

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for details.

## 🎨 Customization

### Change Character Speed
```javascript
// src/game.js
CONFIG.character.speed = 0.05;  // Adjust this
```

### Change World Size
```javascript
// src/game.js
CONFIG.world.size = 5;  // Adjust this
```

### Use Custom AR Target
1. Create `.mind` file at https://hiukim.github.io/mind-ar-js-doc/tools/compile
2. Update `src/game.js`:
```javascript
imageTargetSrc: './assets/your-target.mind'
```

## 🐛 Troubleshooting

### Desktop Issues
- **Black screen**: Check browser console (F12)
- **Controls not working**: Click page to focus

### Mobile AR Issues
- **Camera not working**: Must use HTTPS
- **Target not detecting**: Check lighting, print larger
- **Poor tracking**: Use high-contrast target image

See [docs/](docs/) for detailed troubleshooting guides.

## 📊 Project Stats

- **Files**: 20+
- **Lines of Code**: ~1500+
- **Documentation Pages**: 12
- **Features**: 100+
- **Version**: 2.0.0 (MindAR)

## 🎉 Recent Updates

### v2.0.0 - MindAR Migration
- ✅ Migrated from AR.js to MindAR
- ✅ Better tracking stability
- ✅ Custom image targets
- ✅ Improved performance

### v1.2.0 - Debug Panel
- ✅ Real-time sensor monitoring
- ✅ Debug UI with toggle
- ✅ Gyroscope/accelerometer display

### v1.1.0 - Dead Reckoning
- ✅ Gyroscope integration
- ✅ Accelerometer support
- ✅ Smooth tracking fallback

## 📄 License

MIT License - Free to use and modify!

## 🤝 Contributing

Contributions welcome! See [FEATURES.md](docs/FEATURES.md) for ideas.

## 📞 Support

- Check [docs/](docs/) for guides
- Open an issue on GitHub
- See troubleshooting in [START_HERE.md](docs/START_HERE.md)

---

**Built with ❤️ using MindAR and Three.js**

🎲 **Happy Gaming!** ✨

