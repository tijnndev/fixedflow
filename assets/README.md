# Asset Placeholders

This directory should contain the following image assets for the app:

## Required Assets

### icon.png
- Size: 1024x1024 pixels
- Format: PNG with transparency
- Description: App icon shown on device home screen
- Suggestion: Use a simple, recognizable icon related to payments/calendar

### splash.png
- Size: 1242x2436 pixels (or larger)
- Format: PNG
- Background: White (#ffffff)
- Description: Splash screen shown when app launches
- Suggestion: App logo centered with the app name

### adaptive-icon.png (Android)
- Size: 1024x1024 pixels
- Format: PNG with transparency
- Description: Foreground layer for Android adaptive icon
- Note: Inner 768x768 safe zone should contain the icon

### favicon.png (Web)
- Size: 48x48 pixels
- Format: PNG
- Description: Favicon for web version

## Creating Your Icons

### Option 1: Use Online Tools
- [Figma](https://figma.com) - Design your icon
- [Expo Icon Tool](https://icon.kitchen/) - Generate all sizes

### Option 2: Use Simple Emoji/Text
For quick testing, you can use emoji-based icons:

```javascript
// Temporary solution: Use emoji as icon
// Install: npx expo install expo-font
// Use a large emoji character rendered as an image
```

### Option 3: Design Custom Icon

Suggested icon concepts for FixedFlow:
1. Calendar with euro symbol (€)
2. Repeating arrows with payment symbol
3. Checklist with coins
4. Calendar page with notification dot

## Color Scheme

App primary colors:
- Primary Blue: #2563eb
- Background: #f5f5f5
- White: #ffffff
- Text Dark: #1a1a1a

## Generating Assets

Once you have a base icon design (1024x1024), use:

```bash
# This will generate all necessary icon sizes
npx expo-optimize
```

Or use online tools like:
- https://easyappicon.com/
- https://appicon.co/

## Temporary Solution

For development, you can use the default Expo icons, or create simple solid-color placeholders.

---

**Note**: Remember to replace these placeholders with proper branded icons before publishing to app stores!
