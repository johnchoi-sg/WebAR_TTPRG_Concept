# 🎨 UI Guide - Test Menu

## New Test Menu Button

A **"🧪 Tests"** button has been added to the bottom-left corner of the main page!

### 📍 Location

```
┌─────────────────────────────────────┐
│  🖥️ Info Panel          🔬 Debug   │  ← Top
│                                     │
│                                     │
│         Game Area                   │
│                                     │
│                                     │
│  🧪 Tests                Joystick  │  ← Bottom
└─────────────────────────────────────┘
```

### 🎯 What It Does

Click the **"🧪 Tests"** button to reveal a menu with quick access to:

1. **🔨 Compile Target**
   - Opens `compile-target.html`
   - Create your `targets.mind` file
   - One-time setup

2. **📷 Simple AR Test**
   - Opens `ar-test.html`
   - Test AR with green box
   - Verify everything works

3. **⚡ Quick Start Guide**
   - Opens `QUICK_START.md`
   - 3-step setup guide
   - Fast setup instructions

4. **📚 Detailed Guide**
   - Opens `SIMPLE_TEST.md`
   - Complete step-by-step
   - Troubleshooting included

### 🎨 Design

**Button:**
- Blue color (#6495ed)
- Rounded corners
- Hover effect (lifts up)
- Always visible

**Menu:**
- Dark background
- Blue border
- Appears above button
- Auto-closes when clicking outside

### 📱 Mobile Friendly

On mobile devices:
- Button is smaller
- Menu is compact
- Touch-friendly
- Doesn't block joystick

### 🚀 Usage

```
1. Open index.html
2. Click "🧪 Tests" button (bottom-left)
3. Choose what you need:
   - Compile target → First time setup
   - AR Test → Verify it works
   - Guides → Read instructions
4. Menu closes automatically
```

### ✨ Features

✅ **Always accessible** - Available on every page load  
✅ **Non-intrusive** - Stays in corner, doesn't block game  
✅ **Quick access** - One click to test pages  
✅ **Smart closing** - Closes when you click outside  
✅ **Mobile optimized** - Works great on phones  

### 🎯 Perfect For

- **First-time setup** - Quick access to compiler
- **Testing** - Jump to AR test instantly
- **Troubleshooting** - Access guides quickly
- **Development** - Switch between pages easily

### 🔧 Customization

Want to add more links? Edit `index.html`:

```html
<a href="your-page.html" class="test-link">
    🎮 Your Link<br>
    <small>Description here</small>
</a>
```

### 🎨 Color Scheme

- **Button**: Blue (#6495ed)
- **Hover**: Brighter blue
- **Background**: Dark with transparency
- **Border**: Blue glow
- **Text**: White with gray descriptions

### 📐 Layout

```
🧪 Tests  ← Button (always visible)
    ↓ (click)
┌─────────────────────────┐
│  🧪 Test Pages          │  ← Menu header
├─────────────────────────┤
│  🔨 Compile Target      │  ← Link 1
│  Create targets.mind    │
├─────────────────────────┤
│  📷 Simple AR Test      │  ← Link 2
│  Test AR with green box │
├─────────────────────────┤
│  ⚡ Quick Start Guide   │  ← Link 3
│  3-step setup guide     │
├─────────────────────────┤
│  📚 Detailed Guide      │  ← Link 4
│  Step-by-step           │
└─────────────────────────┘
```

### 🎯 Quick Access Flow

```
Main Game (index.html)
        ↓
Click "🧪 Tests"
        ↓
Choose option:
├─► 🔨 Compile Target → compile-target.html
├─► 📷 AR Test → ar-test.html
├─► ⚡ Quick Start → QUICK_START.md
└─► 📚 Detailed → SIMPLE_TEST.md
```

### ✅ Benefits

**For New Users:**
- Easy to find test pages
- Clear descriptions
- Quick setup access

**For Developers:**
- Fast page switching
- Always available
- No need to remember URLs

**For Testing:**
- One-click AR test
- Quick compiler access
- Instant guide lookup

---

**The test menu makes your AR project super easy to navigate!** 🎉

