# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Start Local Server
```bash
# Option 1: Using npm (recommended)
npm start

# Option 2: Using Python
python -m http.server 8000

# Option 3: Using Node.js directly
npx http-server -p 8000
```

### Step 2: Open in Browser
- **Desktop**: Open `http://localhost:8000`
- **Mobile**: Use your local IP (e.g., `http://192.168.1.x:8000`)

### Step 3: Play!

#### Desktop Mode 🖥️
- Just start playing with **Arrow Keys** or **WASD**
- Camera follows your character automatically

#### Mobile AR Mode 📱
1. Open `marker-info.html` first to get the AR marker
2. Print or display the Hiro marker
3. Grant camera permissions
4. Point camera at marker
5. Use touch joystick to move

## 🎯 AR Marker

Get the marker at: `marker-info.html` or download directly from:
https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png

## 🔧 Troubleshooting

### "Camera not working"
- Use HTTPS or localhost
- Check browser permissions
- Try a different browser

### "Marker not detected"
- Ensure good lighting
- Keep marker flat and visible
- Try adjusting distance (30-100cm)

### "Black screen on desktop"
- Check browser console (F12)
- Refresh the page
- Try a different browser

## 📱 Mobile Testing with HTTPS

For mobile devices, you need HTTPS. Quick options:

### Option 1: ngrok (easiest)
```bash
# Start local server first
npm start

# In another terminal
ngrok http 8000
# Use the https URL provided
```

### Option 2: Deploy to hosting
- GitHub Pages (free)
- Netlify (free)
- Vercel (free)

## 🎮 Controls Reference

| Platform | Movement | Camera |
|----------|----------|---------|
| Desktop | Arrow Keys / WASD | Auto-follow (isometric) |
| Mobile AR | Touch Joystick | Device Camera |

## 📦 Project Files

```
WebAR_TTPRG_Concept/
├── index.html          # Main game file
├── game.js             # Game logic
├── styles.css          # Styling
├── marker-info.html    # AR marker info
├── README.md           # Full documentation
├── QUICKSTART.md       # This file
└── package.json        # NPM configuration
```

## 🌟 Tips for Best Experience

1. **Desktop**: Use Chrome or Firefox for best performance
2. **Mobile**: Use latest iOS Safari or Chrome Android
3. **AR Marker**: Print at least 10cm x 10cm
4. **Lighting**: Bright, even lighting works best
5. **Distance**: Keep 30-100cm from marker

## 🎨 Customization

Want to modify the game? Check these files:

- `game.js` - Game logic, character, world generation
- `styles.css` - Visual styling, colors, UI
- `CONFIG` object in `game.js` - Game parameters

Enjoy your WebAR TTRPG adventure! 🎲✨

