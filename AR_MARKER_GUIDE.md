# 📱 AR Marker Guide - Quick Start

## 🎯 What You Need

To test the mobile AR mode, you need to print or display the **Hiro AR Marker**.

---

## 📥 **Step 1: Get the Marker**

### Option A: View in Browser
Open `marker-info.html` in your browser - it shows the marker and has a download button.

### Option B: Direct Download
Download from: **https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png**

### Option C: Display on Screen
Open the image on another device (tablet, laptop) and point your phone at it.

---

## 🖨️ **Step 2: Print the Marker**

### Printing Tips

✅ **Size**: Print at least **10cm x 10cm** (4" x 4")  
✅ **Quality**: Use good quality printer settings  
✅ **Paper**: Regular white paper works fine  
✅ **Border**: Don't crop - the black border is essential!  
✅ **Color**: Black and white (no color needed)  

### Recommended Sizes
- **Small**: 10cm x 10cm - Works at close range (30-50cm)
- **Medium**: 15cm x 15cm - Best all-around size ← **Recommended**
- **Large**: 20cm x 20cm - Works from farther away (up to 1m)

---

## 📋 **Step 3: Prepare the Marker**

1. **Cut it out** (optional, but keeps it neat)
2. **Place on flat surface** - table, desk, or floor
3. **Ensure good lighting** - bright but no glare
4. **Keep it flat** - no wrinkles or folds!

---

## 📱 **Step 4: Test on Mobile**

### Requirements
- ✅ Mobile device (phone or tablet)
- ✅ Modern browser (Chrome, Safari)
- ✅ Camera permissions granted
- ✅ HTTPS connection (see deployment guide)

### Testing Steps

1. **Deploy to HTTPS** (required for camera access)
   - Use GitHub Pages, Netlify, or Vercel
   - Or use `ngrok` for local testing
   - See `DEPLOYMENT.md` for details

2. **Open game on mobile**
   - Navigate to your HTTPS URL
   - Grant camera permissions when asked

3. **Point camera at marker**
   - Hold phone 30-100cm from marker
   - Keep marker fully visible in frame
   - Wait for detection (1-2 seconds)

4. **Game appears!**
   - 3D world anchored to marker
   - Use touch joystick to move character
   - Keep marker visible for best tracking

---

## 🎨 **What the Hiro Marker Looks Like**

The Hiro marker has:
- **Black square border** (thick, essential for detection)
- **White background**
- **Black geometric pattern** inside (unique to Hiro)
- **Asymmetric design** (so AR.js knows orientation)

**Important**: The pattern is asymmetric so the system knows which way is "up"!

---

## ✅ **Testing Checklist**

Before testing, make sure:

- [ ] Marker is printed clearly (no smudges)
- [ ] Marker is on flat surface
- [ ] Good lighting (no shadows on marker)
- [ ] No glare or reflections
- [ ] Black border is intact (not cut off)
- [ ] Game deployed to HTTPS
- [ ] Camera permissions granted
- [ ] Modern browser (Chrome/Safari)

---

## 🔧 **Troubleshooting**

### "Marker not detected"

**Check these**:
- ✅ Marker is fully visible in camera frame
- ✅ Lighting is bright and even
- ✅ No glare or reflections on marker
- ✅ Marker is flat (not curved or wrinkled)
- ✅ Camera is 30-100cm away from marker
- ✅ Black border is clear and unobstructed

**Try this**:
- Move closer or farther away
- Adjust lighting
- Tilt phone slightly
- Print a larger marker
- Clean camera lens

### "Camera not starting"

**Check these**:
- ✅ Using HTTPS (required for camera)
- ✅ Camera permissions granted
- ✅ Browser supports WebRTC
- ✅ No other app using camera

**Try this**:
- Refresh page
- Clear browser cache
- Try different browser
- Restart phone

### "World appears but tracking is jittery"

**Check these**:
- ✅ Marker is well-lit
- ✅ Marker is completely flat
- ✅ No movement of marker
- ✅ Stable hand/phone position

**Try this**:
- Tape marker to table
- Use better lighting
- Hold phone steady
- Print larger marker

---

## 🎯 **Best Practices**

### For Best AR Experience

1. **Lighting**: Bright, even lighting works best
   - Avoid direct sunlight (causes glare)
   - Avoid dim lighting (hard to detect)
   - Indoor lighting is usually perfect

2. **Marker Placement**: 
   - Flat surface (table, desk, floor)
   - Stable (won't move or blow away)
   - Accessible (can walk around it)

3. **Distance**:
   - Start at 50cm away
   - Adjust based on marker size
   - Larger marker = can be farther away

4. **Movement**:
   - Keep marker in view
   - Move phone slowly
   - Don't cover marker with hands

---

## 📊 **Marker Size vs Distance**

| Marker Size | Optimal Distance | Max Distance |
|-------------|------------------|--------------|
| 10cm x 10cm | 30-50cm | 80cm |
| 15cm x 15cm | 40-80cm | 120cm |
| 20cm x 20cm | 50-100cm | 150cm |
| 30cm x 30cm | 80-150cm | 200cm |

---

## 🚀 **Quick Test (No Printing)**

Don't have a printer? Try this:

1. **Open marker image on laptop/tablet**
   - Go to the Hiro marker URL
   - Make it fullscreen
   - Increase brightness to max

2. **Point phone at screen**
   - Works just like printed marker
   - Keep screen flat
   - Avoid screen glare

**Note**: This works for testing but printing is better for actual gameplay!

---

## 🎮 **Alternative: Create Your Own Marker**

Want a custom marker? You can create one at:
- **AR.js Marker Training**: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html

Then update `game.js`:
```javascript
const markerControls = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
    type: 'pattern',
    patternUrl: 'path/to/your/custom/pattern.patt',  // Change this
    changeMatrixMode: 'cameraTransformMatrix'
});
```

---

## 📱 **Mobile Testing Workflow**

### Quick Local Testing with ngrok

1. **Start local server**:
   ```bash
   npm start
   ```

2. **In another terminal, start ngrok**:
   ```bash
   ngrok http 8000
   ```

3. **Use the HTTPS URL** on your mobile device:
   ```
   https://xxxx-xx-xxx-xxx-xxx.ngrok.io
   ```

4. **Point camera at marker** and test!

---

## 📖 **More Information**

- **Full Documentation**: See `README.md`
- **Deployment Guide**: See `DEPLOYMENT.md`
- **Controls Guide**: See `CONTROLS_GUIDE.md`
- **Marker Info Page**: Open `marker-info.html`

---

## 🎉 **Ready to Test!**

1. ✅ Download/print Hiro marker
2. ✅ Place on flat surface
3. ✅ Deploy game to HTTPS
4. ✅ Open on mobile
5. ✅ Point camera at marker
6. ✅ Play!

**Have fun with AR! 🎮✨**

---

**Quick Links**:
- Hiro Marker: https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png
- AR.js Docs: https://ar-js-org.github.io/AR.js-Docs/
- Marker Generator: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html

