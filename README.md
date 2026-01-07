# WebAR TTRPG Game

A cross-platform WebAR game built with Three.js and AR.js that adapts to desktop and mobile devices.

## Features

### Desktop Mode 🖥️
- **Controls**: Arrow keys or WASD to move character
- **Camera**: Top-down isometric view that follows the character
- **View**: Full 3D rendered world with lighting and shadows

### Mobile AR Mode 📱
- **AR Marker Detection**: Point camera at Hiro marker to anchor the game world
- **Touch Joystick**: On-screen joystick for character movement
- **Camera**: Uses device camera for AR experience
- **World Anchoring**: Game world appears on flat surface (table/floor)

## How to Play

### Desktop
1. Open `index.html` in a modern web browser
2. Use **Arrow Keys** or **WASD** to move the character around the map
3. The camera follows the character in an isometric view

### Mobile
1. Open `index.html` on a smartphone or tablet
2. Grant camera permissions when prompted
3. Print or display the **Hiro AR Marker** (see below)
4. Point your camera at the marker
5. Once detected, the game world will appear anchored to the marker
6. Use the **touch joystick** (bottom-right) to move the character

## AR Marker

The game uses the standard **Hiro marker** from AR.js. You can:
- Download it from: https://github.com/AR-js-org/AR.js/blob/master/data/images/hiro.png
- Print it on paper
- Display it on another screen
- Keep the marker flat on a table for best results

## Setup

### Local Development
1. Clone or download this repository
2. Serve the files using a local web server (required for camera access):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server -p 8000
   
   # Using PHP
   php -S localhost:8000
   ```
3. Open `http://localhost:8000` in your browser

### Mobile Testing
- Use HTTPS (required for camera access on mobile)
- Deploy to GitHub Pages, Netlify, or Vercel for easy HTTPS hosting
- Or use ngrok to tunnel your local server: `ngrok http 8000`

## Technologies Used

- **Three.js** (v0.132.2) - 3D graphics library
- **AR.js** (v3.4.5) - WebAR framework for marker-based AR
- **Vanilla JavaScript** - No additional frameworks required

## Game Elements

### Character
- Animated 3D character with body, head, and eyes
- Rotates to face movement direction
- Casts shadows on the world

### World Map
- 5x5 unit grid-based terrain
- Procedurally placed trees and rocks
- Border walls to define play area
- Grid helper for spatial reference

### Controls
- **Desktop**: Keyboard (Arrow keys / WASD)
- **Mobile**: Touch joystick with visual feedback

## Browser Compatibility

### Desktop
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Mobile
- iOS Safari 14+ (iOS 14.3+ recommended for better AR support)
- Chrome for Android 90+
- Samsung Internet 14+

**Note**: Camera access requires HTTPS (except on localhost)

## Customization

### Adjust Character Speed
Edit `CONFIG.character.speed` in `game.js` (default: 0.05)

### Change World Size
Edit `CONFIG.world.size` in `game.js` (default: 5)

### Modify Camera Angle
Edit `CONFIG.camera.angle` in `game.js` (default: π/4 for 45° isometric)

### Change Colors
Modify material colors in the `createCharacter()` and `createWorld()` functions

## Troubleshooting

### Mobile AR Issues
- **Marker not detected**: Ensure good lighting and marker is clearly visible
- **Camera not starting**: Check browser permissions for camera access
- **Performance issues**: Close other apps, use a newer device
- **HTTPS required**: Deploy to a hosting service with HTTPS

### Desktop Issues
- **Black screen**: Check browser console for errors
- **Controls not working**: Click on the page to focus it first

## Future Enhancements

- [ ] Multiplayer support
- [ ] Character customization
- [ ] Quest system
- [ ] Inventory management
- [ ] Different terrain types
- [ ] Sound effects and music
- [ ] Save/load game state
- [ ] Multiple AR markers for larger worlds

## License

MIT License - Feel free to use and modify for your projects!

## Credits

- Built with Three.js and AR.js
- Hiro marker pattern from AR.js project

