# 🚀 SIMPLE AR TEST - GUARANTEED TO WORK

## Step 1: Compile Your Target (2 minutes)

1. **Open** `compile-target.html` in Chrome
2. **Click** "Choose File" and select `assets/target.png`
3. **Click** "Compile Target" button
4. **Wait** 30-60 seconds (be patient!)
5. **Download** will start automatically → Save as `targets.mind`
6. **Move** `targets.mind` to `assets/` folder

## Step 2: Enable Camera (1 minute)

**Chrome Flag Method:**
1. Open: `chrome://flags/#unsafely-treat-insecure-origin-as-secure`
2. Add: `http://localhost:8000`
3. Set to: **Enabled**
4. Click **Relaunch**

## Step 3: Run Server

```bash
npm start
```

## Step 4: Test AR

1. Open: `http://localhost:8000/ar-test.html`
2. Allow camera when prompted
3. Point camera at `assets/target.png` (print it or show on another screen)
4. You should see:
   - ✅ Green spinning box
   - ✅ "IT WORKS!" text
   - ✅ Target image overlay

## 🎯 That's It!

If you see the green box and text, **AR IS WORKING!**

---

## 🐛 Not Working?

### Can't compile target?
- Make sure you're using Chrome
- Check console (F12) for errors
- Try a different image (simpler, high contrast)

### Camera not starting?
- Did you enable Chrome flag?
- Did you restart Chrome after enabling?
- Is server running? (`npm start`)
- Using exact URL: `localhost:8000` (not 127.0.0.1)?

### Target not detected?
- Print the target image on paper (bigger is better)
- Or show it on another screen
- Make sure lighting is good
- Hold steady, not too close, not too far
- Try different angles

### Still stuck?
- Check browser console (F12) for errors
- Make sure `targets.mind` is in `assets/` folder
- Try refreshing the page
- Try closing other apps using camera

---

## 📱 Mobile Test

1. Use HTTPS: `npm run start:https`
2. Find your IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
3. On phone: `https://YOUR_IP:8000/ar-test.html`
4. Accept security warning
5. Allow camera
6. Point at target

---

## ✅ Success Checklist

- [ ] `targets.mind` file exists in `assets/` folder
- [ ] Chrome flag enabled and browser restarted
- [ ] Server running (`npm start`)
- [ ] Opened `http://localhost:8000/ar-test.html`
- [ ] Camera permission granted
- [ ] Pointing at target image
- [ ] Good lighting

**Once all checked, it WILL work!** 🎉

