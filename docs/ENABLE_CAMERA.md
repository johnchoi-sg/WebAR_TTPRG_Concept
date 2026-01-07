# 📷 Enable Camera in 3 Easy Steps

## ⚡ Quick Setup (Chrome - Easiest!)

### Step 1: Open Chrome Flags
Copy and paste this into Chrome's address bar:
```
chrome://flags/#unsafely-treat-insecure-origin-as-secure
```

### Step 2: Add Localhost
In the text box, type:
```
http://localhost:8000
```

### Step 3: Enable and Restart
1. Click the dropdown → Select **"Enabled"**
2. Click **"Relaunch"** button at the bottom

## ✅ That's It!

Now run:
```bash
npm start
```

Open: `http://localhost:8000`

**Camera will work!** 🎉

---

## 🔒 Alternative: HTTPS (Works in All Browsers)

### One-Time Setup:
```bash
npm run generate-cert
```

### Every Time You Develop:
```bash
npm run start:https
```

Open: `https://localhost:8000`

**Accept the security warning** (it's safe, it's your own certificate!)

---

## 📱 For Mobile Testing

1. Use HTTPS method above
2. Find your computer's IP address:
   - Windows: `ipconfig` in Command Prompt
   - Mac/Linux: `ifconfig` in Terminal
3. On your phone, open: `https://YOUR_IP:8000`
4. Accept security warning
5. Allow camera when prompted

---

## 🐛 Troubleshooting

### Camera Still Not Working?

**Check these:**
- [ ] Server is running (`npm start`)
- [ ] Chrome flag is **Enabled** (not "Default")
- [ ] Browser was **restarted** after enabling flag
- [ ] URL is exactly `localhost:8000` (not 127.0.0.1)
- [ ] Camera works in other apps
- [ ] No other app is using the camera

**Still stuck?** See `CAMERA_SETUP.md` for detailed troubleshooting.

---

## 🎯 Quick Test

Open browser console (F12) and run:
```javascript
navigator.mediaDevices.getUserMedia({ video: true })
    .then(() => console.log('✅ Camera works!'))
    .catch(err => console.error('❌ Error:', err));
```

If you see **"✅ Camera works!"** → You're all set! 🚀

If you see an error → Check the troubleshooting section above.

---

## 📚 More Info

- Full guide: `CAMERA_SETUP.md`
- All browsers: See `CAMERA_SETUP.md`
- Production deployment: See `DEPLOYMENT.md`

