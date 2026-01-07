# 📱 Mobile AR Not Working - Complete Checklist

## 🚨 **Quick Diagnosis**

### Test This FIRST

I created a **simple test page** to verify AR.js works on your device:

**Open: `ar-test-simple.html`**

This minimal page shows:
- 🔴 Red cube
- 🟢 Green sphere  
- 🔵 Blue cone

**If this works** → Issue is with main game code  
**If this doesn't work** → Device/setup issue

---

## ✅ **Essential Requirements**

### 1. HTTPS (CRITICAL!)

❌ **http://** - Will NOT work  
✅ **https://** - Required

**Check your URL:**
```
❌ http://192.168.1.100:8000  ← Won't work
❌ http://localhost:8000       ← Won't work on mobile
✅ https://yoursite.netlify.app ← Works!
✅ https://yourusername.github.io ← Works!
```

**Quick HTTPS Options:**
1. **GitHub Pages** (free, easy)
2. **Netlify** (drag & drop)
3. **Vercel** (instant deploy)
4. **ngrok** (local testing)

### 2. Camera Permissions

**iOS:**
- Settings > Safari > Camera → Allow
- Or Settings > Chrome > Camera → Allow

**Android:**
- Settings > Apps > Browser > Permissions > Camera → Allow

**Test camera access:**
```javascript
// Open browser console and run:
navigator.mediaDevices.getUserMedia({video: true})
  .then(() => alert('Camera OK!'))
  .catch(err => alert('Camera Error: ' + err))
```

### 3. Correct Marker

**Must be the Hiro marker!**

Download from:
```
https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png
```

Or open: `marker-info.html`

**Common mistakes:**
- ❌ Using wrong marker image
- ❌ Marker too small (< 10cm)
- ❌ Black border cut off
- ❌ Poor print quality
- ❌ Marker wrinkled or folded

### 4. Browser Compatibility

**iOS:**
- ✅ Safari 14+ (best)
- ✅ Chrome 90+
- ⚠️ Firefox (limited support)

**Android:**
- ✅ Chrome 90+ (best)
- ✅ Samsung Internet 14+
- ⚠️ Firefox (limited support)

**Check your version:**
- iOS: Settings > General > About > Version
- Browser: Usually in Settings > About

---

## 🔍 **Debugging Steps**

### Step 1: Open Browser Console

**iOS Safari:**
1. Connect iPhone to Mac
2. Mac Safari > Develop > [Your iPhone] > [Your Page]
3. Check Console tab

**Android Chrome:**
1. Connect to computer
2. Chrome on computer: `chrome://inspect`
3. Find your device
4. Click "inspect"

**Or use the simple test page** (`ar-test-simple.html`) which shows status on screen!

### Step 2: Check Console Messages

**You should see:**
```
✅ "Setting up scene..."
✅ "Camera ready!"
✅ "AR Context ready!"
✅ "Scene setup complete"
```

**When you point at marker:**
```
✅ "MARKER DETECTED!"
```

**If you see errors:**
```
❌ "Camera error" → Check permissions/HTTPS
❌ "Failed to load" → Check internet connection
❌ "WebGL not supported" → Update browser/OS
```

### Step 3: Check What You See

**Do you see:**

✅ **Camera feed** → Camera working  
❌ **Black screen** → Camera issue  
❌ **White/gray screen** → Rendering issue  

**When pointing at marker:**

✅ **3D objects appear** → Working!  
❌ **Nothing appears** → Detection or rendering issue  
⚠️ **Flickers** → Tracking issue  

---

## 🎯 **Common Issues & Fixes**

### Issue 1: "I see camera but no 3D objects"

**Possible causes:**

1. **Marker not detected**
   - Print larger (15cm x 15cm minimum)
   - Better lighting
   - Keep marker flat
   - Move to 40-60cm distance
   - Ensure full marker visible

2. **Objects too small**
   - ✅ Fixed in latest update (3x scale + test cube)
   - Refresh browser to get update

3. **Wrong marker**
   - Must be Hiro pattern
   - Download from official source
   - Don't use random QR codes

### Issue 2: "Black screen, no camera"

**Fixes:**

1. **Check HTTPS** - Most common issue!
2. **Grant permissions** - Check browser settings
3. **Close other apps** - Free up camera
4. **Restart browser** - Clear state
5. **Try different browser** - Chrome vs Safari

### Issue 3: "Marker detected but nothing visible"

**Fixes:**

1. **Refresh browser** - Get latest code (3x scale)
2. **Check console** - Look for errors
3. **Try test page** - `ar-test-simple.html`
4. **Increase brightness** - Phone screen brightness up
5. **Better lighting** - On marker

### Issue 4: "Objects flicker/disappear"

**Tracking issues:**

1. **Keep marker visible** - Don't cover it
2. **Stable lighting** - No moving shadows
3. **Don't move too fast** - Smooth movements
4. **Marker flat** - No curves or folds
5. **Larger marker** - Easier to track

---

## 📊 **Optimal Setup**

### Perfect Testing Environment

| Item | Specification |
|------|---------------|
| **Marker Size** | 15cm x 15cm (6" x 6") |
| **Paper** | White, matte finish |
| **Print Quality** | High quality, clear lines |
| **Surface** | White table, flat |
| **Lighting** | Bright indoor, no glare |
| **Distance** | 40-60cm from marker |
| **Angle** | Phone perpendicular to marker |
| **Connection** | HTTPS (deployed site) |
| **Browser** | Safari 14+ or Chrome 90+ |
| **iOS Version** | 14.3 or later |

---

## 🧪 **Testing Protocol**

### Test 1: Simple AR Test Page

1. Open `ar-test-simple.html` on mobile (via HTTPS)
2. Grant camera permissions
3. Point at Hiro marker
4. Should see: Red cube, green sphere, blue cone

**Result:**
- ✅ Works → Device supports AR.js
- ❌ Doesn't work → Device/browser issue

### Test 2: Official AR.js Example

1. Go to: https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
2. Point at Hiro marker
3. Should see 3D text

**Result:**
- ✅ Works → Your device is compatible
- ❌ Doesn't work → Update browser/iOS

### Test 3: Main Game

1. Open `index.html` (via HTTPS)
2. Check top-left status
3. Point at marker
4. Should see: "✅ Marker detected!"

**Result:**
- ✅ Status changes → Detection working
- ❌ Stays "Searching" → Marker issue

---

## 🔧 **Latest Updates**

### What I Just Fixed

1. **3x scale** (was 2x) - Even bigger objects
2. **Test cube** - Bright red cube always added
3. **Better events** - Marker detection on markerControls
4. **More logging** - Console shows detection status
5. **Status display** - Shows object count and scale
6. **Simple test page** - Minimal AR test

### Get Latest Version

**Hard refresh:**
- **iOS Safari**: Pull down page, release
- **iOS Chrome**: Settings > Clear browsing data
- **Android**: Settings > Clear cache

Or close tab completely and reopen.

---

## 📱 **Device-Specific Issues**

### iOS Safari

**Known issues:**
- Strict WebGL limits (close other tabs)
- Camera permission sticky (check Settings)
- Cache aggressive (hard refresh needed)

**Solutions:**
- Close all other tabs
- Restart Safari
- Update iOS to latest

### iOS Chrome

**Known issues:**
- Sometimes better than Safari
- Different permission handling

**Solutions:**
- Try if Safari doesn't work
- Check Chrome-specific permissions

### Android Chrome

**Usually most reliable!**

**If issues:**
- Update Chrome
- Update Android
- Clear app data

---

## 🎯 **Action Plan**

### Do This Now:

1. **✅ Verify HTTPS**
   - Check URL starts with `https://`
   - If not, deploy to GitHub Pages/Netlify

2. **✅ Test simple page**
   - Open `ar-test-simple.html`
   - Does it work?

3. **✅ Check marker**
   - Is it the Hiro pattern?
   - Is it 15cm x 15cm or larger?
   - Is it clearly printed?

4. **✅ Verify camera**
   - Do you see camera feed?
   - Is it clear and focused?

5. **✅ Check console**
   - Any error messages?
   - Does it say "Marker detected"?

6. **✅ Try test marker**
   - Display marker on laptop screen
   - Point phone at laptop
   - Does it detect?

---

## 💡 **Pro Tips**

### Marker Tips

1. **Print multiple sizes** - Test which works best
2. **Laminate it** - Keeps it flat and clean
3. **Tape to table** - Prevents movement
4. **White background** - Better contrast

### Lighting Tips

1. **Indirect light** - No direct sun
2. **Even lighting** - No shadows on marker
3. **Bright enough** - Not dim
4. **No glare** - Matte surface better than glossy

### Phone Tips

1. **Clean camera lens** - Smudges affect detection
2. **Stable hands** - Or use phone stand
3. **Full brightness** - Easier to see 3D objects
4. **Close apps** - Free up resources

---

## 🆘 **Still Not Working?**

### Information Needed

To help debug, provide:

1. **URL you're testing** (is it HTTPS?)
2. **Device & iOS/Android version**
3. **Browser & version**
4. **What you see** (camera? black screen? nothing?)
5. **Console errors** (screenshot if possible)
6. **Test page result** (does ar-test-simple.html work?)

### Quick Tests

Run in console:
```javascript
// Check AR.js loaded
console.log(typeof THREEx); // Should be "object"

// Check Three.js loaded
console.log(typeof THREE); // Should be "object"

// Check WebGL
console.log(!!document.createElement('canvas').getContext('webgl')); // Should be true

// Check camera
navigator.mediaDevices.getUserMedia({video: true})
  .then(() => console.log('✅ Camera OK'))
  .catch(e => console.log('❌ Camera Error:', e));
```

---

## ✅ **Success Indicators**

When it's working, you'll see:

1. **Camera feed** - Background shows camera
2. **Status: "✅ Marker detected!"** - Top left, green
3. **Red test cube** - Floating above marker
4. **Green world** - Game terrain
5. **Character** - Cyan/green character
6. **Joystick** - Bottom right corner
7. **Stable tracking** - Objects don't flicker

---

**Start with `ar-test-simple.html` - it's the easiest way to verify your setup!** 🎯

