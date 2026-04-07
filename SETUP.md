# Quick Setup Guide

Follow these steps to get FixedFlow running on your device in minutes.

## Prerequisites Check

Before starting, ensure you have:
- [ ] Node.js installed (check with `node --version`)
- [ ] A smartphone (iOS or Android)
- [ ] Internet connection for initial setup

## Step-by-Step Setup

### 1. Install Expo Go on Your Phone

**iOS**: Download from [App Store](https://apps.apple.com/app/expo-go/id982107779)
**Android**: Download from [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

### 2. Clone the Project

```bash
# Using HTTPS
git clone https://github.com/tijnndev/fixedflow.git

# Or using SSH
git clone git@github.com:tijnndev/fixedflow.git

# Navigate to project directory
cd fixedflow
```

### 3. Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

This will install all required packages including:
- React Native 0.83.4
- Expo SDK 55
- React Navigation v6
- AsyncStorage v1.21
- Safe Area Context v5.3
- TypeScript 5.3
- Sharp (for icon generation)

### 4. Start the Development Server

```bash
# Using npm
npm start

# Or using yarn
yarn start

# Or directly with Expo
npx expo start
```

You should see output like:
```
Metro waiting on exp://192.168.1.xxx:8081
Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
```

### 5. Open on Your Device

**iOS**:
1. Open the Camera app
2. Point it at the QR code
3. Tap the notification that appears
4. Expo Go will open automatically

**Android**:
1. Open Expo Go app
2. Tap "Scan QR Code"
3. Point camera at the QR code
4. Wait for the app to load

### 6. Wait for Bundle to Build

First time takes longer (1-2 minutes). You'll see:
- "Building JavaScript bundle"
- Progress percentage
- When complete, the app will appear!

## Troubleshooting

### Can't Scan QR Code?

1. Make sure phone and computer are on the same WiFi network
2. Try using "Tunnel" connection:
   ```bash
   npx expo start --tunnel
   ```

### "Unable to resolve module" Error?

Clear cache and reinstall:
```bash
# Clear cache
npx expo start -c

# Or reinstall dependencies
rm -rf node_modules
npm install
```

### App Crashes on Start?

1. Check that all dependencies installed correctly
2. Ensure you're using compatible versions:
   - Node.js 16+
   - Expo SDK 51
3. Try restarting the dev server

### Slow Performance?

This is normal in development mode. The production build will be much faster.

## Development Commands

```bash
# Start development server
npm start

# Start on Android emulator
npm run android

# Start on iOS simulator (Mac only)
npm run ios

# Start web version
npm run web

# Clear cache
npx expo start -c
```

## Project Structure Quick Reference

```
fixedflow/
├── App.tsx              # Main entry point with providers
├── src/
│   ├── components/      # UI components (PaymentCard, EmptyState, etc.)
│   ├── screens/         # Main screens (List, Agenda, Settings)
│   ├── services/        # Data storage and categories
│   ├── theme/           # Theme context (dark/light mode)
│   ├── i18n/            # Internationalization (4 languages)
│   ├── types/           # TypeScript types
│   └── utils/           # Helper functions
├── assets/              # Icons and images (PNG + SVG)
├── scripts/             # Build scripts (icon generation)
└── package.json         # Dependencies
```

## Next Steps

1. **Try Adding a Payment**
   - Open the app
   - Go to "List" tab
   - Tap the blue floating action button (+ icon)
   - Fill in details and save

2. **Explore Settings**
   - Go to "Settings" tab
   - Try switching between light/dark theme
   - Change language (English, Dutch, French, German)
   - Add or remove custom categories

3. **View the Calendar**
   - Go to "Agenda" tab
   - Browse different months using arrow buttons
   - Tap on days with payments to see details
   - View monthly totals at the top

4. **Start Developing**
   - Make changes to any file
   - Save the file
   - App will automatically reload
   - See your changes instantly (Fast Refresh)

## Customization Tips

### Change Currency
Edit `src/utils/recurrence.ts`:
```typescript
export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`; // Change € to your currency
};
```

### Add More Languages
1. Create new translation file in `src/i18n/` (e.g., `es.ts`)
2. Add to `src/i18n/index.tsx` language options
3. Follow the pattern from existing language files

### Customize Theme Colors
Edit `src/theme/ThemeContext.tsx`:
```typescript
const lightColors: ThemeColors = {
  primary: '#your-color',
  // ... other colors
};
```

## Building for Production

### Using EAS Build (Recommended)

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo account
eas login

# Configure your project
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS (requires Apple Developer account)
eas build --platform ios

# Build for both
eas build --platform all
```

### Local Builds

```bash
# Generate Android APK locally
npx expo build:android -t apk

# Generate iOS IPA (Mac only, requires Apple Developer account)
npx expo build:ios
```

### Web Deployment

```bash
# Build web version
npx expo export:web

# Output will be in web-build/ directory
# Deploy to any static hosting service (Netlify, Vercel, GitHub Pages)
```

See [Expo documentation](https://docs.expo.dev/distribution/introduction/) for detailed build instructions.

## Need Help?

- 📖 Check the main [README.md](README.md)
- 🐛 Report issues on [GitHub Issues](https://github.com/tijnndev/fixedflow/issues)
- 💬 Ask questions in [Discussions](https://github.com/tijnndev/fixedflow/discussions)
- 📚 Read [Expo docs](https://docs.expo.dev/)

---

**You're all set! Happy coding! 🚀**
