# ⚡ QUICK START - 3 STEPS TO WORKING AR

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🎯 GOAL: Get AR working in 5 minutes                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📋 Before You Start

You need:
- ✅ Chrome browser
- ✅ `target.png` in `assets/` folder (you have this!)
- ✅ 5 minutes

---

## Step 1️⃣: Compile Target (2 min)

```bash
# 1. Open in Chrome:
compile-target.html

# 2. Select your target.png
# 3. Click "Compile Target"
# 4. Wait 30-60 seconds
# 5. Save downloaded file as: assets/targets.mind
```

**✅ You should now have: `assets/targets.mind`**

---

## Step 2️⃣: Enable Camera (1 min)

```bash
# 1. Open Chrome, paste this:
chrome://flags/#unsafely-treat-insecure-origin-as-secure

# 2. In text box, type:
http://localhost:8000

# 3. Change dropdown to: Enabled
# 4. Click "Relaunch" button
```

**✅ Chrome will restart**

---

## Step 3️⃣: Test AR (2 min)

```bash
# 1. Start server:
npm start

# 2. Open in Chrome:
http://localhost:8000/ar-test.html

# 3. Allow camera when prompted

# 4. Point camera at target.png
#    (print it or show on another screen)
```

**✅ You should see a green spinning box and "IT WORKS!" text!**

---

## 🎉 SUCCESS!

If you see the green box, **AR IS WORKING!**

Now you can:
- Use the full game: `http://localhost:8000/index.html`
- Modify `ar-test.html` to experiment
- Create your own AR experiences

---

## 🐛 Troubleshooting

### "Can't compile target"
→ Use Chrome browser  
→ Check console (F12) for errors

### "Camera not working"
→ Did you enable Chrome flag?  
→ Did you restart Chrome?  
→ Is URL exactly `localhost:8000`?

### "Target not detected"
→ Print target image on paper  
→ Or show on another screen  
→ Good lighting, hold steady  
→ Not too close, not too far

### "Still not working"
→ See `SIMPLE_TEST.md` for detailed guide  
→ See `CAMERA_TROUBLESHOOTING.md` for camera issues

---

## 📱 Test on Mobile

```bash
# 1. Generate certificate (one-time):
npm run generate-cert

# 2. Start HTTPS server:
npm run start:https

# 3. Find your computer's IP:
ipconfig    # Windows
ifconfig    # Mac/Linux

# 4. On phone, open:
https://YOUR_IP:8000/ar-test.html

# 5. Accept security warning
# 6. Allow camera
# 7. Point at target
```

---

## 🎯 Quick Commands

```bash
# Compile target
open compile-target.html

# Test AR (desktop)
npm start
# Then: http://localhost:8000/ar-test.html

# Test AR (mobile)
npm run start:https
# Then: https://YOUR_IP:8000/ar-test.html

# Run full game
npm start
# Then: http://localhost:8000/index.html
```

---

## 📚 More Help

| File | What's Inside |
|------|---------------|
| `SIMPLE_TEST.md` | Detailed step-by-step guide |
| `CAMERA_TROUBLESHOOTING.md` | Camera permission fixes |
| `START_HERE_CAMERA.md` | Camera setup guide |
| `README.md` | Full project documentation |

---

**That's it! Get that green box showing and you're ready to go! 🚀**

