# 📷 Camera Permission Setup for Localhost

WebAR requires camera access, but browsers restrict camera access to HTTPS sites for security. Here's how to enable it for localhost development.

## 🚀 Quick Start (Recommended)

### Method 1: Chrome Flag (Easiest)

1. Open Chrome
2. Go to: `chrome://flags/#unsafely-treat-insecure-origin-as-secure`
3. Add: `http://localhost:8000`
4. Set dropdown to: **Enabled**
5. Click **Relaunch**

**✅ Done!** Camera will now work on `http://localhost:8000`

---

## 🔒 Production-Ready: HTTPS on Localhost

For the best development experience (works in all browsers):

### Step 1: Install mkcert (One-time setup)

**Windows (PowerShell as Admin):**
```powershell
choco install mkcert
# or
scoop install mkcert
```

**Mac:**
```bash
brew install mkcert
```

**Linux:**
```bash
sudo apt install mkcert
```

### Step 2: Generate Certificate

**Option A: Use the script**
```bash
# Windows
generate-cert.bat

# Mac/Linux
npm run generate-cert
```

**Option B: Manual**
```bash
npx mkcert create-ca
npx mkcert create-cert
```

### Step 3: Start HTTPS Server

**Option A: Use the script**
```bash
# Windows
start-https.bat

# Mac/Linux
npm run start:https
```

**Option B: Manual**
```bash
npx http-server -p 8080 -S -C cert.pem -K key.pem
```

### Step 4: Open in Browser
```
https://localhost:8000
```

**⚠️ Note:** You may see a security warning. Click "Advanced" → "Proceed to localhost" (it's safe, it's your own certificate!)

---

## 🌐 Browser-Specific Instructions

### Chrome/Edge

**Method 1: Flag (Development)**
1. `chrome://flags/#unsafely-treat-insecure-origin-as-secure`
2. Add: `http://localhost:8080`
3. Enable and restart

**Method 2: Command Line**
```bash
# Windows
"C:\Program Files\Google\Chrome\Application\chrome.exe" --unsafely-treat-insecure-origin-as-secure="http://localhost:8080" --user-data-dir=C:\chrome-dev-profile

# Mac
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --unsafely-treat-insecure-origin-as-secure="http://localhost:8080"

# Linux
google-chrome --unsafely-treat-insecure-origin-as-secure="http://localhost:8080"
```

**Method 3: HTTPS (Recommended)**
- Use the HTTPS setup above

---

### Firefox

**Method 1: Config Flags**
1. Go to `about:config`
2. Accept the warning
3. Search: `media.devices.insecure.enabled`
4. Set to: **true**
5. Search: `media.getusermedia.insecure.enabled`
6. Set to: **true**

**Method 2: HTTPS (Recommended)**
- Use the HTTPS setup above

---

### Safari

Safari **requires HTTPS** even for localhost. No workarounds available.

**Solution:** Use HTTPS setup above

---

## 🧪 Testing Camera Access

### Quick Test Page

Create `test-camera.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Camera Test</title>
</head>
<body>
    <h1>Camera Test</h1>
    <video id="video" autoplay playsinline style="width: 100%; max-width: 640px;"></video>
    <p id="status">Requesting camera...</p>
    
    <script>
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                document.getElementById('video').srcObject = stream;
                document.getElementById('status').textContent = '✅ Camera working!';
                document.getElementById('status').style.color = 'green';
            })
            .catch(err => {
                document.getElementById('status').textContent = '❌ Camera denied: ' + err.message;
                document.getElementById('status').style.color = 'red';
            });
    </script>
</body>
</html>
```

### Test in Console

Open browser console and run:
```javascript
navigator.mediaDevices.getUserMedia({ video: true })
    .then(() => console.log('✅ Camera access granted!'))
    .catch(err => console.error('❌ Camera denied:', err));
```

---

## 🐛 Troubleshooting

### "NotAllowedError: Permission denied"

**Causes:**
- Browser blocked camera access
- Not using HTTPS (except localhost with flags)
- Camera is being used by another app

**Solutions:**
1. Check browser camera permissions in settings
2. Enable localhost flag (see above)
3. Use HTTPS
4. Close other apps using camera (Zoom, Skype, etc.)
5. Try incognito/private mode

### "NotFoundError: Requested device not found"

**Causes:**
- No camera connected
- Camera drivers not installed
- Camera disabled in BIOS/System Settings

**Solutions:**
1. Check if camera works in other apps
2. Update camera drivers
3. Enable camera in system settings
4. Try different browser

### "NotReadableError: Could not start video source"

**Causes:**
- Camera is in use by another app
- Hardware error

**Solutions:**
1. Close all apps using camera
2. Restart browser
3. Restart computer
4. Check camera in Device Manager (Windows)

### "SecurityError: The operation is insecure"

**Causes:**
- Not using HTTPS
- Localhost flag not enabled

**Solutions:**
1. Use HTTPS (recommended)
2. Enable localhost flag
3. Check URL is exactly `localhost` (not `127.0.0.1`)

---

## 📱 Mobile Testing

### iOS (iPhone/iPad)

**Requirements:**
- ✅ Must use HTTPS
- ✅ Must be Safari or in-app browser
- ✅ iOS 11+ for WebRTC

**Setup:**
1. Use HTTPS server (see above)
2. Find your computer's local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
3. Open `https://YOUR_IP:8080` on iPhone
4. Accept security warning
5. Allow camera when prompted

**Note:** Chrome/Firefox on iOS use Safari's engine, so HTTPS is required.

### Android

**Requirements:**
- ✅ HTTPS recommended (but localhost flag works)
- ✅ Chrome 53+ or Firefox 68+

**Setup:**
1. Use HTTPS server (recommended)
2. Or enable Chrome flag: `chrome://flags/#unsafely-treat-insecure-origin-as-secure`
3. Add your computer's IP address
4. Open in Chrome
5. Allow camera when prompted

---

## 🔐 Security Notes

### Development vs Production

**Development (localhost):**
- Browser flags are OK
- Self-signed certificates are OK
- Security warnings are expected

**Production (deployed):**
- ✅ Must use valid HTTPS certificate
- ✅ Must have proper SSL/TLS setup
- ✅ Use Let's Encrypt (free) or paid certificate

### GitHub Pages

GitHub Pages provides HTTPS automatically:
- `https://yourusername.github.io/your-repo/`
- Camera will work without any setup!

---

## 📋 Quick Reference

| Browser | Method | Difficulty | Works? |
|---------|--------|-----------|--------|
| Chrome | Flag | ⭐ Easy | ✅ Yes |
| Chrome | HTTPS | ⭐⭐ Medium | ✅ Yes |
| Firefox | Config | ⭐ Easy | ✅ Yes |
| Firefox | HTTPS | ⭐⭐ Medium | ✅ Yes |
| Safari | HTTPS only | ⭐⭐ Medium | ✅ Yes |
| Edge | Flag | ⭐ Easy | ✅ Yes |
| Edge | HTTPS | ⭐⭐ Medium | ✅ Yes |

---

## 🎯 Recommended Setup

### For Quick Testing
1. Use Chrome
2. Enable flag: `chrome://flags/#unsafely-treat-insecure-origin-as-secure`
3. Add: `http://localhost:8080`
4. Restart browser

### For Serious Development
1. Generate SSL certificate (one-time)
2. Use HTTPS server
3. Works in all browsers
4. Closer to production environment

### For Mobile Testing
1. Use HTTPS server
2. Access via local network IP
3. Accept security warning
4. Test on real devices

---

## 🚀 Next Steps

1. **Choose your method** (Flag or HTTPS)
2. **Start the server**: `npm start` or `start-https.bat`
3. **Open in browser**: `http://localhost:8080` or `https://localhost:8080`
4. **Allow camera** when prompted
5. **Test AR mode** on mobile

---

## 📞 Still Having Issues?

1. Check browser console for errors
2. Verify camera works in other apps
3. Try different browser
4. Try incognito/private mode
5. Check system camera permissions
6. Restart browser/computer

---

## ✅ Success Checklist

- [ ] Server is running
- [ ] Browser flag enabled OR using HTTPS
- [ ] Camera permission granted
- [ ] Video feed visible
- [ ] AR marker detection working
- [ ] No console errors

**Once all checked, you're ready to develop! 🎉**

