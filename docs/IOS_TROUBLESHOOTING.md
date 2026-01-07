# 📱 iOS AR Troubleshooting Guide

## Common iOS Issues & Solutions

### Issue: "Nothing appears on the marker"

This is the most common iOS issue. Here's what to check:

---

## ✅ **Checklist - Do These First**

### 1. **Are you using HTTPS?**
❌ `http://` - Camera won't work  
✅ `https://` - Required for iOS

**Solution**: Deploy to:
- GitHub Pages (free HTTPS)
- Netlify (free HTTPS)
- Vercel (free HTTPS)
- Or use ngrok for local testing

### 2. **Did you grant camera permissions?**
- iOS will ask once
- If denied, you must enable in Settings

**Solution**: 
1. Go to Settings > Safari > Camera
2. Or Settings > [Your Browser] > Camera
3. Allow camera access

### 3. **Is the marker clearly visible?**
- Fully in frame
- Well-lit
- Flat surface
- No glare

**Solution**: 
- Print larger marker (15cm x 15cm minimum)
- Better lighting
- Hold phone 40-60cm away

### 4. **Check browser console**
Open Safari Developer Tools:
1. Settings > Safari > Advanced > Web Inspector
2. Connect to Mac
3. Check console for errors

---

## 🔧 **Quick Fixes**

### Fix 1: Scale is Too Small

The 3D objects might be there but too small to see!

**What I changed**:
```javascript
// Doubled the scale for better visibility
markerRoot.scale.set(2, 2, 2);
```

**Refresh your browser** to get this update.

---

### Fix 2: Check Debug Messages

Look at the top-left info panel:
- "🔍 Searching for marker..." = Marker not detected yet
- "✅ Marker detected!" = Working! Objects should be visible

If it says "Marker detected" but you see nothing:
- Objects might be too small (fixed above)
- Or rendering issue (see below)

---

### Fix 3: iOS Safari Specific Issues

**Problem**: iOS Safari is strict about WebGL

**Solutions**:
1. **Close other tabs** - iOS limits WebGL contexts
2. **Restart Safari** - Clear memory
3. **Update iOS** - Older versions have bugs
4. **Try Chrome** - Sometimes works better

---

### Fix 4: Marker Detection Settings

**Problem**: Default settings might not work well on iOS

**What I improved**:
```javascript
arToolkitContext = new THREEx.ArToolkitContext({
    maxDetectionRate: 60,  // Faster detection
    canvasWidth: window.innerWidth,
    canvasHeight: window.innerHeight
});
```

---

## 🐛 **Debugging Steps**

### Step 1: Check Camera Feed

**Do you see the camera feed?**

✅ **YES** - Camera is working, issue is with AR detection/rendering  
❌ **NO** - Camera access problem

If NO:
1. Check HTTPS
2. Check permissions
3. Check browser compatibility
4. Try different browser

### Step 2: Check Console Logs

**Refresh the page and check console for:**

```
✅ "Initializing AR mode..."
✅ "AR Source ready!"
✅ "AR Context initialized!"
✅ "AR initialization complete!"
```

If you see these, AR is initializing correctly.

**Also look for:**
```
✅ "Marker found!" - Detection working!
❌ "Marker lost!" - Lost tracking
```

### Step 3: Test Marker Detection

**Point camera at marker and watch console:**

- If "Marker found!" appears → Detection works, rendering issue
- If nothing appears → Detection problem

**Detection problems:**
- Marker too small
- Poor lighting
- Marker not flat
- Wrong marker image
- Too far/close

**Rendering problems:**
- Scale too small (fixed in update)
- WebGL context lost
- iOS memory issue

---

## 📊 **iOS Compatibility**

### Supported iOS Versions

| iOS Version | Safari | Chrome | Status |
|-------------|--------|--------|--------|
| iOS 11-12 | ⚠️ | ⚠️ | Limited support |
| iOS 13-14 | ✅ | ✅ | Good support |
| iOS 15+ | ✅ | ✅ | Best support |

### Recommended Setup

- **iOS**: 14.3 or later
- **Browser**: Safari 14+ or Chrome 90+
- **Device**: iPhone 8 or newer
- **Connection**: HTTPS required

---

## 🔍 **Advanced Debugging**

### Enable Verbose Logging

Add to console:
```javascript
localStorage.debug = 'ar.js:*'
```

Then refresh page for detailed AR.js logs.

### Check WebGL Support

Open console and type:
```javascript
document.createElement('canvas').getContext('webgl')
```

Should return WebGL context. If null, WebGL not available.

### Check Camera Stream

In console:
```javascript
navigator.mediaDevices.getUserMedia({video: true})
  .then(stream => console.log('Camera OK!', stream))
  .catch(err => console.error('Camera Error:', err))
```

---

## 💡 **Common Solutions**

### "I see camera but no 3D objects"

**Try these in order:**

1. **Refresh browser** (get latest updates with 2x scale)
2. **Print larger marker** (15cm x 15cm minimum)
3. **Better lighting** (bright but no glare)
4. **Move closer** (40-60cm from marker)
5. **Tilt phone slightly** (sometimes helps detection)
6. **Restart Safari** (clear memory)
7. **Try Chrome** (alternative browser)

### "Marker detected but objects disappear"

**Tracking lost - Keep marker visible:**
- Don't move phone too fast
- Keep marker in center of frame
- Stable lighting
- Marker stays flat

### "Performance is slow/choppy"

**iOS optimization:**
1. Close other apps
2. Close other browser tabs
3. Reduce shadows (in code)
4. Simplify 3D models

---

## 🎯 **Optimal iOS Setup**

### Perfect Testing Environment

1. **Marker**: 15cm x 15cm printed clearly
2. **Surface**: White table, marker flat
3. **Lighting**: Indoor lighting, no direct sun
4. **Distance**: 50cm from marker
5. **Position**: Marker centered in frame
6. **Angle**: Phone perpendicular to marker
7. **Browser**: Safari 15+ or Chrome 90+
8. **Connection**: HTTPS (deployed site)

---

## 📱 **iOS-Specific Code Improvements**

### What I Added for iOS

1. **Larger scale** (2x) for visibility
2. **Better detection settings** (60 fps)
3. **Marker visibility events** (debug feedback)
4. **Console logging** (troubleshooting)
5. **Status indicator** (shows detection state)

### Refresh Your Browser

All these improvements are in the latest code. **Hard refresh**:
- Safari: Hold reload button → "Reload Without Content Blockers"
- Chrome: Settings → Clear cache, then reload

---

## 🚨 **Still Not Working?**

### Try This Test

1. **Open this test page**: https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
2. **Point at Hiro marker**
3. **Does it work?**

✅ **YES** → Your device supports AR.js, issue with your deployment  
❌ **NO** → Device/browser compatibility issue

### If Test Works But Your Game Doesn't

**Possible causes:**
1. Wrong marker (make sure it's Hiro pattern)
2. HTTPS issue (check URL starts with https://)
3. Code error (check console)
4. Cache issue (hard refresh)

### If Test Doesn't Work

**Your device might not support AR.js:**
- Update iOS to latest version
- Try different browser
- Try different device
- Consider using desktop mode instead

---

## 📞 **Get Help**

### Information to Provide

When asking for help, include:
1. iOS version (Settings > General > About)
2. Browser and version
3. URL you're testing (is it HTTPS?)
4. Console errors (screenshot)
5. What you see (camera feed? nothing?)
6. Marker size and quality

### Useful Commands

Check in console:
```javascript
// Check if AR.js loaded
console.log(typeof THREEx)

// Check if Three.js loaded
console.log(typeof THREE)

// Check device
console.log(navigator.userAgent)

// Check camera permissions
navigator.permissions.query({name: 'camera'})
  .then(result => console.log('Camera:', result.state))
```

---

## ✅ **Success Checklist**

When it works, you should see:

- [ ] Camera feed visible
- [ ] Info panel shows "Marker detected!"
- [ ] 3D world appears on marker
- [ ] Character visible
- [ ] Trees and rocks visible
- [ ] Touch joystick appears
- [ ] Character moves when using joystick
- [ ] World stays anchored to marker

---

## 🎉 **It's Working!**

If you see the 3D world:
1. Use touch joystick to move character
2. Keep marker visible for tracking
3. Explore the world!
4. Have fun! 🎮✨

---

**Quick Summary:**
1. ✅ Use HTTPS
2. ✅ Grant camera permissions
3. ✅ Print 15cm x 15cm marker
4. ✅ Good lighting, flat surface
5. ✅ Refresh browser for latest updates
6. ✅ Watch debug messages in top-left

**Latest update includes 2x scale for better visibility on iOS!**

