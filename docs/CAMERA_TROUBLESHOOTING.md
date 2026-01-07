# 📷 Camera Not Working? Quick Fix Guide

## 🚨 Problem: "No Camera Permission" or Camera Not Starting

### ✅ Quick Fix (Choose ONE)

#### Option 1: Enable Chrome Flag (2 minutes)

1. **Open Chrome** (or Edge)
2. **Copy and paste** this in address bar:
   ```
   chrome://flags/#unsafely-treat-insecure-origin-as-secure
   ```
3. **In the text box**, type:
   ```
   http://localhost:8000
   ```
4. **Change dropdown** from "Default" to **"Enabled"**
5. **Click "Relaunch"** button at bottom
6. **Restart your server**: `npm start`
7. **Open**: `http://localhost:8000`

**✅ Camera should now work!**

---

#### Option 2: Use HTTPS (5 minutes, works everywhere)

1. **Generate certificate** (one-time):
   ```bash
   npm run generate-cert
   ```

2. **Start HTTPS server**:
   ```bash
   npm run start:https
   ```

3. **Open browser**:
   ```
   https://localhost:8000
   ```

4. **Click "Advanced"** → **"Proceed to localhost"**
5. **Allow camera** when prompted

**✅ Camera should now work!**

---

## 🔍 Still Not Working? Check These:

### 1. Browser Permissions
- Click the 🔒 or ⓘ icon in address bar
- Check camera is set to "Allow"
- If blocked, change to "Allow" and refresh

### 2. URL Must Be Exact
- ✅ Use: `localhost:8000`
- ❌ Don't use: `127.0.0.1:8000`

### 3. Server Must Be Running
```bash
# Check if server is running
# You should see: "Starting up http-server..."

# If not running, start it:
npm start
```

### 4. Close Other Apps Using Camera
- Zoom
- Skype
- Teams
- OBS
- Other browser tabs with camera

### 5. Check System Permissions

**Windows:**
1. Settings → Privacy → Camera
2. Make sure "Allow apps to access your camera" is ON
3. Make sure Chrome/Edge is allowed

**Mac:**
1. System Preferences → Security & Privacy → Camera
2. Check the box next to Chrome/Edge

**Linux:**
```bash
# Check if camera exists
ls /dev/video*

# Should show: /dev/video0
```

### 6. Try Different Browser
- Chrome (recommended)
- Edge (recommended)
- Firefox (needs different setup - see CAMERA_SETUP.md)
- Safari (requires HTTPS)

### 7. Try Incognito/Private Mode
Sometimes extensions block camera access.

---

## 🧪 Test Camera Directly

### In Browser Console (F12):
```javascript
navigator.mediaDevices.getUserMedia({ video: true })
    .then(() => console.log('✅ Camera works!'))
    .catch(err => console.error('❌ Error:', err.name, err.message));
```

### Common Errors:

| Error | Meaning | Fix |
|-------|---------|-----|
| `NotAllowedError` | Permission denied | Enable Chrome flag or use HTTPS |
| `NotFoundError` | No camera found | Check camera is connected |
| `NotReadableError` | Camera in use | Close other apps |
| `SecurityError` | Not secure context | Use HTTPS or localhost flag |

---

## 📱 Mobile Not Working?

### iOS (iPhone/iPad)
**MUST use HTTPS!** No workarounds.

1. Run: `npm run start:https`
2. Find your computer's IP:
   ```bash
   ipconfig  # Windows
   ifconfig  # Mac/Linux
   ```
3. On iPhone, open: `https://YOUR_IP:8000`
4. Accept security warning
5. Allow camera

### Android
Can use either method, but HTTPS is recommended.

---

## 🎯 Quick Checklist

Before asking for help, verify:

- [ ] Server is running (`npm start` or `npm run start:https`)
- [ ] Chrome flag is enabled OR using HTTPS
- [ ] Browser was restarted after enabling flag
- [ ] URL is exactly `localhost:8000` (not 127.0.0.1)
- [ ] Camera works in other apps (test with Photo Booth, Camera app, etc.)
- [ ] No other app is using camera
- [ ] Browser has camera permission
- [ ] System has camera permission
- [ ] Tried in incognito mode
- [ ] Tried different browser

---

## 💡 Pro Tips

### For Development
Use **Chrome Flag** method - fastest for testing

### For Serious Work
Use **HTTPS** method - works in all browsers

### For Mobile Testing
**Must use HTTPS** - no other option

### For Production
GitHub Pages provides HTTPS automatically - no setup needed!

---

## 📞 Still Stuck?

1. **Check browser console** (F12) for error messages
2. **Read full guide**: `CAMERA_SETUP.md`
3. **Check setup guide**: `START_HERE_CAMERA.md`
4. **Verify your setup**:
   - What browser? (Chrome, Firefox, Safari, Edge?)
   - What OS? (Windows, Mac, Linux, iOS, Android?)
   - What URL? (localhost:8000 or 127.0.0.1:8000?)
   - HTTP or HTTPS?
   - Any error messages?

---

## 🎉 Success!

Once camera works, you should see:
- ✅ Camera feed in background
- ✅ "Enable Camera" button works
- ✅ No error messages in console
- ✅ AR container visible
- ✅ Joystick appears

**Now point camera at the AR marker and enjoy!** 🚀

