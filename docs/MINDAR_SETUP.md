# 🚀 MindAR Setup Guide

## Why MindAR?

**MindAR is WAY better than AR.js!**

✅ **Better tracking** - More stable and accurate  
✅ **Custom images** - Use any image as a marker  
✅ **Modern** - Actively maintained  
✅ **Faster** - Better performance  
✅ **ML-powered** - Uses machine learning  
✅ **No special markers** - Any image works!  

---

## 🎯 Quick Start

The game now uses **MindAR** instead of AR.js. It's already configured with a default target image.

### What Changed

**Old (AR.js)**:
- Required Hiro marker (specific pattern)
- Marker-based tracking only
- Older technology
- Less stable tracking

**New (MindAR)**:
- Use ANY image as target
- Image-based tracking
- Modern ML-powered
- Much better tracking!

---

## 📸 Creating Your Own Target Image

### Step 1: Choose an Image

**Good target images have:**
- ✅ High contrast
- ✅ Unique features
- ✅ Rich textures
- ✅ Clear edges
- ✅ Not too simple

**Bad target images:**
- ❌ Plain colors
- ❌ Blurry
- ❌ Too simple
- ❌ Symmetric patterns
- ❌ Reflective surfaces

**Examples of good targets:**
- Playing cards
- Book covers
- Posters
- Photos with detail
- Logos with texture

### Step 2: Compile Target Image

Visit the MindAR compiler:
**https://hiukim.github.io/mind-ar-js-doc/tools/compile**

1. **Upload your image** (JPG or PNG)
2. **Click "Start"**
3. **Wait for processing** (30 seconds - 2 minutes)
4. **Download** the `.mind` file

### Step 3: Use Your Target

Update `game.js`:

```javascript
mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: container,
    imageTargetSrc: 'path/to/your-target.mind'  // Change this!
});
```

---

## 🎨 Current Setup

### Default Target

Currently using MindAR's example target:
```javascript
imageTargetSrc: 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.2/examples/image-tracking/assets/card-example/card.mind'
```

**To test**: Print or display this image:
https://hiukim.github.io/mind-ar-js-doc/samples/card.png

### Custom Target

To use your own:

1. **Create `.mind` file** (see above)
2. **Put in project folder** (e.g., `assets/my-target.mind`)
3. **Update game.js**:
   ```javascript
   imageTargetSrc: './assets/my-target.mind'
   ```

---

## 📱 Testing

### Desktop

1. Open in browser
2. Grant camera permission
3. Hold printed target in front of webcam
4. Game world appears on target!

### Mobile

1. Deploy to HTTPS (GitHub Pages, etc.)
2. Open on phone
3. Grant camera permission
4. Point at target image
5. Game world appears!

---

## 🔧 Configuration

### Basic Setup

```javascript
mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: container,                    // DOM element
    imageTargetSrc: 'path/to/target.mind',  // Your .mind file
    maxTrack: 1,                             // Number of targets to track
    filterMinCF: 0.0001,                     // Tracking sensitivity
    filterBeta: 0.001,                       // Smoothing factor
    warmupTolerance: 5,                      // Frames before tracking starts
    missTolerance: 5                         // Frames before losing track
});
```

### Advanced Options

```javascript
{
    uiLoading: "yes",           // Show loading UI
    uiScanning: "yes",          // Show scanning UI
    uiError: "yes",             // Show error UI
    maxTrack: 1,                // Max simultaneous targets
    filterMinCF: 0.0001,        // Lower = more sensitive
    filterBeta: 0.001,          // Lower = smoother
    warmupTolerance: 5,         // Higher = slower to start
    missTolerance: 5            // Higher = keeps tracking longer
}
```

---

## 🎯 Multiple Targets

Track multiple images at once:

```javascript
mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: container,
    imageTargetSrc: 'targets.mind',  // Compiled with multiple images
    maxTrack: 3                       // Track up to 3 at once
});

// Create anchor for each target
const anchor0 = mindarThree.addAnchor(0);  // First image
const anchor1 = mindarThree.addAnchor(1);  // Second image
const anchor2 = mindarThree.addAnchor(2);  // Third image

// Different content on each
anchor0.group.add(worldMap1);
anchor1.group.add(worldMap2);
anchor2.group.add(worldMap3);
```

---

## 🐛 Troubleshooting

### "Target not detecting"

**Check:**
- ✅ Good lighting
- ✅ Target clearly visible
- ✅ Target not too small (print 10cm+ wide)
- ✅ Camera focused
- ✅ Using compiled `.mind` file

**Try:**
- Print larger target
- Better lighting
- Hold steadier
- Recompile target with better image

### "Tracking is jittery"

**Adjust smoothing:**
```javascript
filterBeta: 0.01  // Increase for smoother (but slower)
```

### "Too slow to detect"

**Adjust sensitivity:**
```javascript
warmupTolerance: 2  // Decrease for faster detection
```

### "Loses tracking too quickly"

**Adjust tolerance:**
```javascript
missTolerance: 10  // Increase to keep tracking longer
```

---

## 📊 Performance

### MindAR vs AR.js

| Feature | MindAR | AR.js |
|---------|--------|-------|
| Tracking Quality | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Speed | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Custom Images | ✅ | ❌ |
| Stability | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Setup Complexity | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Maintenance | ⭐⭐⭐⭐⭐ | ⭐⭐ |

### System Requirements

**Minimum:**
- Modern browser (Chrome 90+, Safari 14+)
- Camera access
- HTTPS (except localhost)
- Decent GPU

**Recommended:**
- Latest browser
- Good camera
- Fast device
- Good lighting

---

## 🎨 Best Practices

### Target Image

1. **High resolution** - At least 512x512px
2. **Good contrast** - Clear features
3. **Unique** - Not too simple
4. **Flat** - Print on flat surface
5. **Matte** - Avoid glossy/reflective

### Lighting

1. **Bright** - Well-lit environment
2. **Even** - No harsh shadows
3. **No glare** - Matte surface helps
4. **Consistent** - Stable lighting

### Distance

1. **Start close** - 20-30cm to detect
2. **Move back** - Can track up to 1-2m
3. **Keep visible** - Full target in frame
4. **Steady** - Smooth movements

---

## 📚 Resources

### Official Docs
- **MindAR Docs**: https://hiukim.github.io/mind-ar-js-doc/
- **Compiler Tool**: https://hiukim.github.io/mind-ar-js-doc/tools/compile
- **Examples**: https://hiukim.github.io/mind-ar-js-doc/samples/

### GitHub
- **MindAR Repo**: https://github.com/hiukim/mind-ar-js
- **Issues**: https://github.com/hiukim/mind-ar-js/issues

### Community
- **Discussions**: https://github.com/hiukim/mind-ar-js/discussions

---

## 🔄 Migration from AR.js

Already done! The game now uses MindAR. Here's what changed:

### Code Changes

**Before (AR.js)**:
```javascript
arToolkitSource = new THREEx.ArToolkitSource({...});
arToolkitContext = new THREEx.ArToolkitContext({...});
markerControls = new THREEx.ArMarkerControls({...});
```

**After (MindAR)**:
```javascript
mindarThree = new window.MINDAR.IMAGE.MindARThree({...});
anchor = mindarThree.addAnchor(0);
await mindarThree.start();
```

### Benefits

✅ **Simpler API** - Less boilerplate  
✅ **Better tracking** - ML-powered  
✅ **Custom images** - No special markers  
✅ **Active development** - Regular updates  
✅ **Better docs** - Clear examples  

---

## 🎉 You're Ready!

1. **Test with default target** (card.png)
2. **Create your own target** (compiler tool)
3. **Update imageTargetSrc** in game.js
4. **Deploy and play!**

**MindAR is awesome - enjoy the better tracking!** 🚀✨

---

**Version**: 2.0.0 (MindAR)  
**Last Updated**: January 2026  
**Status**: ✅ Migrated from AR.js

