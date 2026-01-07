# Controls Guide

## 🎮 Desktop Controls (v1.0.2+)

### Keyboard Controls

The controls are now **camera-aligned** for intuitive movement!

```
        ↑ (W)
         |
    ← (A) + → (D)
         |
        ↓ (S)
```

### What Each Key Does

| Key | Direction | Visual Result |
|-----|-----------|---------------|
| **↑** or **W** | Forward | Character moves **away** from camera (up on screen) |
| **↓** or **S** | Backward | Character moves **toward** camera (down on screen) |
| **←** or **A** | Left | Character moves **left** on screen |
| **→** or **D** | Right | Character moves **right** on screen |

### Diagonal Movement

You can press two keys at once for diagonal movement:
- **↑ + →** (W + D) = Move diagonally up-right
- **↑ + ←** (W + A) = Move diagonally up-left
- **↓ + →** (S + D) = Move diagonally down-right
- **↓ + ←** (S + A) = Move diagonally down-left

---

## 📱 Mobile AR Controls

### Touch Joystick

A virtual joystick appears in the bottom-right corner:

```
     ↑
   ← ⊕ →
     ↓
```

- **Drag** the joystick in any direction
- Character moves in that direction
- Release to stop moving

### Joystick Features

- ✅ 360° movement
- ✅ Visual feedback
- ✅ Smooth control
- ✅ Auto-centers when released

---

## 🎯 How Camera-Aligned Controls Work

### The Problem (v1.0.1 and earlier)

```
Camera View (diagonal at 45°):
    
    World Z-axis ↑
                 |
                 |
    World X-axis →

When you pressed ↑, character moved along World Z-axis
But visually, this looked diagonal on screen!
```

### The Solution (v1.0.2+)

```
Camera View (directly behind character):

    Screen Up ↑
              |
              |
    Screen Right →

Camera is now positioned directly behind the character!
Arrow keys naturally align with screen directions.
```

### Technical Details

The camera is simply positioned behind and above the character:

```javascript
// Camera positioned directly behind character
const offset = new THREE.Vector3(
    0,                      // No X offset (centered)
    CONFIG.camera.height,   // Height above (6 units)
    CONFIG.camera.distance  // Distance behind (8 units)
);

camera.position.copy(character.position).add(offset);
camera.lookAt(character.position);
```

This creates a natural "behind the character" view where controls match screen directions perfectly!

---

## 🔧 Customizing Controls

### Change Camera Position

Edit `game.js`:

```javascript
CONFIG = {
    camera: {
        distance: 8,  // How far behind character
        height: 6     // How high above character
    }
}
```

**Common configurations**:
- `distance: 5, height: 3` = Close follow cam
- `distance: 8, height: 6` = Default balanced view ← Current
- `distance: 12, height: 8` = Far overview
- `distance: 8, height: 10` = High angle view

**Note**: Controls always match screen directions!

### Change Movement Speed

Edit `game.js`:

```javascript
CONFIG = {
    character: {
        speed: 0.05  // Increase for faster, decrease for slower
    }
}
```

---

## 🎓 Understanding Isometric View

### What is Isometric?

Isometric view is a 3D perspective where:
- Camera is at a 45° angle horizontally
- Camera looks down at ~35° vertically
- Parallel lines stay parallel (no perspective distortion)
- Common in strategy games and RPGs

### Why Use It?

✅ Shows both top and side of objects  
✅ Good spatial awareness  
✅ Classic game aesthetic  
✅ Easy to see the whole play area  

### Examples in Games

- Diablo series
- StarCraft
- Age of Empires
- Civilization
- Stardew Valley

---

## 🕹️ Control Tips

### Desktop

1. **Use WASD** for one-handed play (left hand)
2. **Use Arrow Keys** for traditional control
3. **Hold two keys** for diagonal movement
4. **Character auto-rotates** to face movement direction

### Mobile AR

1. **Place marker flat** on table for best experience
2. **Use thumb** on joystick for comfortable control
3. **Keep marker visible** in camera view
4. **Good lighting** helps marker tracking

---

## 🐛 Troubleshooting

### "Controls feel reversed"

This shouldn't happen with v1.0.2+, but if it does:
- Refresh the browser
- Clear cache (Ctrl+Shift+R)
- Check you're using the latest version

### "Character moves but in wrong direction"

- Make sure you've refreshed after the update
- Check browser console for errors
- Try a different browser

### "Diagonal movement feels too fast"

This is normalized in v1.0.2+, but you can adjust:
```javascript
// In game.js, updateCharacter() function
if (moveX !== 0 && moveZ !== 0) {
    moveX *= 0.707;  // Adjust this value (0.707 = √2/2)
    moveZ *= 0.707;
}
```

---

## 📊 Control Comparison

| Version | Control Type | Feel |
|---------|-------------|------|
| v1.0.0 | World-aligned | ❌ Confusing |
| v1.0.1 | World-aligned | ❌ Confusing |
| v1.0.2+ | Camera-aligned | ✅ Intuitive |

---

## 🎮 Advanced: Custom Control Schemes

Want to add custom controls? Here's how:

### Add Mouse Control

```javascript
// In game.js
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Calculate world position and move character
});
```

### Add Gamepad Support

```javascript
// In game.js
window.addEventListener('gamepadconnected', (e) => {
    console.log('Gamepad connected:', e.gamepad);
});

function updateGamepad() {
    const gamepads = navigator.getGamepads();
    if (gamepads[0]) {
        const gp = gamepads[0];
        inputX = gp.axes[0]; // Left stick X
        inputZ = gp.axes[1]; // Left stick Y
    }
}
```

---

**Version**: 1.0.2  
**Last Updated**: January 2026  
**Status**: Camera-aligned controls active ✅

