# Assets & Icons Guide

This document explains the app's visual assets and how to regenerate or customize them.

## 📱 App Icons

### Source Files (SVG)
Located in `assets/`:
- `logo.svg` - Main logo (512x512)
- `icon.svg` - App icon source (1024x1024)
- `adaptive-icon.svg` - Android adaptive icon foreground
- `splash.svg` - Splash screen with app name

### Generated Files (PNG)
- `icon.png` (1024x1024) - iOS app icon
- `adaptive-icon.png` (1024x1024) - Android adaptive icon
- `splash.png` (1284x2778) - Splash screen
- `favicon.png` (48x48) - Web favicon

## 🎨 Design System

### Logo Concept
- **Primary Color**: Indigo/Purple (#4F46E5)
- **Design Elements**:
  - Flowing waves: Represent recurring/repeating payments
  - Dollar sign: Financial/payment tracking symbol
  - Modern & Clean: Professional financial app aesthetic

### Color Palette

#### Light Theme
- Background: `#f5f5f5`
- Card: `#ffffff`
- Text: `#1a1a1a`
- Primary: `#2563eb` (Blue 600)
- Border: `#f3f4f6`

#### Dark Theme
- Background: `#0f172a` (Slate 900)
- Card: `#1e293b` (Slate 800)
- Text: `#f8fafc` (Slate 50)
- Primary: `#3b82f6` (Blue 500)
- Border: `#334155` (Slate 700)

### Typography
- System font stack (platform-specific)
- Font weights: 400 (regular), 600 (semibold)
- Scale: 12px, 14px, 16px, 18px, 20px, 24px, 28px

## 🔄 Regenerating Icons

### Prerequisites
```bash
npm install sharp
```

### Generate All Icons
```bash
node scripts/generate-icons.js
```

This will create:
- `icon.png` from `icon.svg`
- `adaptive-icon.png` from `adaptive-icon.svg`
- `splash.png` from `splash.svg`
- `favicon.png` from `icon.svg`

### Manual Generation
Using npx sharp-cli:
```bash
npx sharp-cli -i assets/icon.svg -o assets/icon.png resize 1024 1024
npx sharp-cli -i assets/adaptive-icon.svg -o assets/adaptive-icon.png resize 1024 1024
npx sharp-cli -i assets/splash.svg -o assets/splash.png resize 1284 2778
npx sharp-cli -i assets/icon.svg -o assets/favicon.png resize 48 48
```

## 🎭 Customizing Icons

### Change Brand Color

1. **Edit SVG files** in `assets/`:
   - Replace `#4F46E5` with your brand color
   - Update both fill and stroke attributes

2. **Regenerate PNGs**:
   ```bash
   node scripts/generate-icons.js
   ```

3. **Update app.json**:
   ```json
   {
     "splash": {
       "backgroundColor": "#YOUR_COLOR"
     },
     "android": {
       "adaptiveIcon": {
         "backgroundColor": "#YOUR_COLOR"
       }
     }
   }
   ```

### Design Your Own Icon

1. **Create new SVGs** with these dimensions:
   - Icon: 1024x1024px
   - Adaptive Icon: 108x108px (foreground layer)
   - Splash: 1284x2778px (iOS)

2. **Replace files** in `assets/`

3. **Run generation script**:
   ```bash
   node scripts/generate-icons.js
   ```

## 🖼️ Icon Requirements

### iOS App Icon
- Size: 1024x1024px
- Format: PNG
- No transparency
- No rounded corners (iOS adds them)

### Android Adaptive Icon
- Foreground: 1024x1024px
- Background: Solid color in app.json
- Safe zone: Keep important elements in center 66%
- Format: PNG with transparency

### Splash Screen
- Size: 1284x2778px (iPhone 14 Pro Max)
- Format: PNG
- Background color in app.json
- Centered logo/branding

### Web Favicon
- Size: 48x48px minimum
- Format: PNG or ICO
- Works at small sizes

## 📐 Safe Zones

### Adaptive Icon Safe Zone
Android may crop the icon into different shapes:
- Circle
- Rounded square
- Squircle

Keep important elements within the inner 66% circle.

### Splash Screen
- Account for notches and safe areas
- Center important content
- Use solid background color

## 🛠️ Tools

### Recommended Design Tools
- **Figma**: For icon design (free)
- **Inkscape**: For SVG editing (free, open-source)
- **Adobe Illustrator**: Professional SVG creation
- **Sketch**: macOS design tool

### Online Tools
- [SVG to PNG Converter](https://cloudconvert.com/svg-to-png)
- [Icon Generator](https://icon.kitchen/)
- [App Icon Resizer](https://appicon.co/)

## 📦 Asset Checklist

When updating branding:
- [ ] Update all SVG source files
- [ ] Regenerate PNG files
- [ ] Update `app.json` background colors
- [ ] Test on iOS device/simulator
- [ ] Test on Android device/emulator
- [ ] Check web favicon
- [ ] Verify splash screen appearance
- [ ] Update README screenshots (if any)

## 🎨 Design Files

Original design files not included in repo. SVG files serve as source of truth.

To maintain design consistency:
1. Always edit SVG files
2. Use the generation script
3. Don't manually edit PNG files
4. Keep a design system document

## 📝 Credits

Logo and icons designed for FixedFlow.
- Design: Indigo theme with flowing wave motif
- Created: April 2026
- Style: Modern, minimal, professional

---

*For questions about assets, open an issue on GitHub.*
