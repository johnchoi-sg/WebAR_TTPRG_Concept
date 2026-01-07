# Deployment Guide

This guide covers various deployment options for your WebAR TTRPG game.

## 🌐 Deployment Options

### Option 1: GitHub Pages (Recommended - Free & Easy)

1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: WebAR TTRPG Game"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to "Pages" section
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`
   - Click Save

3. **Access your game**
   - URL: `https://YOUR_USERNAME.github.io/YOUR_REPO/`
   - Wait 2-3 minutes for first deployment

**Pros**: Free, HTTPS, easy updates
**Cons**: Public only (unless you have Pro)

---

### Option 2: Netlify (Great for Quick Deploys)

1. **Via Drag & Drop**
   - Go to https://app.netlify.com/drop
   - Drag your project folder
   - Get instant HTTPS URL

2. **Via Git (Continuous Deployment)**
   - Connect your GitHub repository
   - Build settings: None needed (static site)
   - Deploy!

3. **Custom Domain (Optional)**
   - Add custom domain in Site settings
   - Update DNS records

**Pros**: Instant deploys, great performance, custom domains
**Cons**: None really!

---

### Option 3: Vercel (Excellent Performance)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow prompts**
   - Login with GitHub/GitLab/Bitbucket
   - Configure project (defaults are fine)
   - Deploy!

**Pros**: Excellent CDN, fast deploys, great DX
**Cons**: None!

---

### Option 4: Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure**
   - Public directory: `.` (current directory)
   - Single-page app: No
   - Overwrite index.html: No

4. **Deploy**
   ```bash
   firebase deploy
   ```

**Pros**: Google infrastructure, reliable
**Cons**: Requires Firebase account

---

### Option 5: Custom Server (VPS/Cloud)

#### Using Nginx

1. **Install Nginx**
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **Copy files**
   ```bash
   sudo cp -r * /var/www/html/
   ```

3. **Configure SSL (Let's Encrypt)**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

4. **Nginx config** (`/etc/nginx/sites-available/default`)
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/html;
       index index.html;

       location / {
           try_files $uri $uri/ =404;
       }
   }
   ```

**Pros**: Full control, custom configuration
**Cons**: Requires server management

---

## 📱 Mobile Testing Before Deployment

### Method 1: ngrok (Easiest)

1. **Start local server**
   ```bash
   npm start
   ```

2. **In another terminal**
   ```bash
   ngrok http 8000
   ```

3. **Use the HTTPS URL** on your mobile device

### Method 2: Local Network

1. **Find your local IP**
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. **Start server**
   ```bash
   npm start
   ```

3. **Access from mobile**
   - URL: `http://YOUR_LOCAL_IP:8000`
   - Note: Camera won't work without HTTPS

---

## ⚙️ Environment-Specific Configurations

### Production Optimizations

1. **Minify JavaScript** (optional)
   ```bash
   npm install -g terser
   terser game.js -c -m -o game.min.js
   ```
   Update `index.html` to use `game.min.js`

2. **Optimize Three.js** (use production build)
   Replace in `index.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js"></script>
   ```

3. **Add Service Worker** (for offline support)
   Create `sw.js`:
   ```javascript
   const CACHE_NAME = 'webar-ttrpg-v1';
   const urlsToCache = ['/', '/index.html', '/game.js', '/styles.css'];

   self.addEventListener('install', event => {
       event.waitUntil(
           caches.open(CACHE_NAME)
               .then(cache => cache.addAll(urlsToCache))
       );
   });

   self.addEventListener('fetch', event => {
       event.respondWith(
           caches.match(event.request)
               .then(response => response || fetch(event.request))
       );
   });
   ```

   Register in `index.html`:
   ```javascript
   if ('serviceWorker' in navigator) {
       navigator.serviceWorker.register('/sw.js');
   }
   ```

---

## 🔒 HTTPS Requirements

**Camera access requires HTTPS** (except localhost)

### Free SSL Options:
1. **Let's Encrypt** - Free SSL certificates
2. **Cloudflare** - Free SSL proxy
3. **GitHub Pages** - Automatic HTTPS
4. **Netlify/Vercel** - Automatic HTTPS

---

## 🧪 Testing Checklist

Before deploying, test:

- [ ] Desktop controls (Arrow keys, WASD)
- [ ] Mobile camera access
- [ ] AR marker detection
- [ ] Touch joystick
- [ ] Character movement boundaries
- [ ] Performance (60 FPS target)
- [ ] Different browsers
- [ ] Different devices
- [ ] Different screen sizes

---

## 📊 Analytics (Optional)

Add Google Analytics or similar:

```html
<!-- Add before </head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🐛 Debugging Production Issues

### Enable Console Logging

Add to `game.js`:
```javascript
const DEBUG = window.location.hostname === 'localhost';

function log(...args) {
    if (DEBUG) console.log(...args);
}
```

### Check Browser Console
- Desktop: F12 or Cmd+Option+I
- Mobile: Use remote debugging
  - Chrome: chrome://inspect
  - Safari: Develop > Device Name

### Common Issues

1. **Camera not working**
   - Check HTTPS
   - Verify permissions
   - Check browser compatibility

2. **AR marker not detected**
   - Ensure good lighting
   - Check marker quality
   - Verify AR.js loaded correctly

3. **Performance issues**
   - Reduce shadow quality
   - Lower polygon count
   - Disable fog on mobile

---

## 🔄 Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
```

---

## 📈 Performance Monitoring

### Add FPS Counter

Already included in `test-desktop.html`, add to main game if needed.

### Monitor Load Times

```javascript
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime}ms`);
});
```

---

## 🎯 Post-Deployment

1. **Test on real devices**
2. **Share with friends**
3. **Gather feedback**
4. **Iterate and improve**
5. **Monitor analytics**

---

## 📞 Support

If you encounter issues:
1. Check browser console
2. Verify HTTPS is enabled
3. Test on different devices
4. Check AR.js documentation
5. Review Three.js docs

---

## 🚀 Quick Deploy Commands

```bash
# GitHub Pages
git add . && git commit -m "Deploy" && git push

# Netlify
netlify deploy --prod

# Vercel
vercel --prod

# Firebase
firebase deploy
```

Happy deploying! 🎮✨

