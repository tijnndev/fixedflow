# Contributing to FixedFlow

Thank you for considering contributing to FixedFlow! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, inclusive, and collaborative. We're all here to build something useful together.

## How Can I Contribute?

### Reporting Bugs

Before creating a bug report:
- Check the [existing issues](https://github.com/tijnndev/fixedflow/issues)
- Update to the latest version to see if the issue persists

When reporting a bug, include:
- Device and OS version (iOS/Android)
- Expo version
- Steps to reproduce
- Expected vs. actual behavior
- Screenshots if applicable

### Suggesting Enhancements

Enhancement suggestions are welcome! Please:
- Check if the feature has already been suggested
- Provide a clear use case
- Explain how it fits with the app's philosophy (simple, offline-first, privacy-focused)

### Pull Requests

1. **Fork and Clone**
   ```bash
   git clone https://github.com/tijnndev/fixedflow.git
   cd fixedflow
   npm install
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Follow existing code style
   - Add comments for complex logic
   - Keep it simple and maintainable

4. **Test Thoroughly**
   - Test on both iOS and Android if possible
   - Ensure all existing features still work
   - Check edge cases

5. **Commit**
   ```bash
   git commit -m "Add feature: your feature description"
   ```

6. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a pull request on GitHub

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow existing naming conventions
- Use functional components with hooks
- Keep components small and focused
- Add JSDoc comments for complex functions

### File Structure

```
src/
├── components/     # Reusable UI components
├── screens/        # Full-screen views with navigation
├── services/       # Business logic (storage, categories, etc.)
├── theme/          # Theme management and context
├── i18n/           # Internationalization and translations
├── types/          # TypeScript type definitions
└── utils/          # Helper functions and utilities
```

### Adding a New Feature

1. **Check the Roadmap**: See [suggestions.md](suggestions.md) for planned features
2. **Create an Issue**: Discuss major features before implementing
3. **Follow the Pattern**: Look at existing code for similar functionality
4. **Update Documentation**: Update README.md and other docs as needed
5. **Add Translations**: If UI text is involved, add to all language files

### Component Guidelines

```typescript
// Example component structure
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MyComponentProps {
  title: string;
  onPress?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
```

### TypeScript

- Always define interfaces for props
- Use type inference when possible
- Avoid `any` type
- Define types in `src/types/`
- Enable strict mode in tsconfig.json

### Storage & Services

- All data operations go through services (`storageService`, `categoriesService`)
- Handle errors gracefully with try-catch
- Show user feedback for async operations
- Use AsyncStorage for persistence
- Maintain backward compatibility with storage keys

### Internationalization (i18n)

- Add new text to all language files: `en.ts`, `nl.ts`, `fr.ts`, `de.ts`
- Use the `useI18n` hook for translations
- Keep translation keys organized and descriptive
- Test with different languages

### Theme Support

- Use `useTheme` hook for colors
- Support both light and dark modes
- Test color contrast for accessibility
- Use the theme colors consistently

### UI/UX

- Keep the design clean and minimal
- Use consistent spacing (8px grid system)
- Ensure good contrast for accessibility
- Test on different screen sizes
- Use SafeAreaView for proper insets
- Add loading states for async operations
- Provide clear error messages

## Project Philosophy

When contributing, keep these principles in mind:

1. **Privacy First**: No data leaves the device, no tracking, no analytics
2. **Simplicity**: Easy to use, intuitive interface, no complexity
3. **Offline**: Works without internet, no cloud dependencies
4. **Open Source**: Transparent, community-driven, well-documented
5. **Accessibility**: Works for everyone, readable, navigable
6. **Performance**: Fast, responsive, efficient

## Feature Ideas

See [suggestions.md](suggestions.md) for a comprehensive feature roadmap. Some high-priority items:

- [x] Dark mode ✅
- [x] Custom categories ✅
- [x] Multi-language support (EN, NL, FR, DE) ✅
- [x] Floating action button ✅
- [x] Safe area support ✅
- [ ] Data export (CSV/JSON)
- [ ] Data import
- [ ] Native date picker
- [ ] Notification reminders
- [ ] Payment history tracking
- [ ] Multiple currency support
- [ ] Search functionality
- [ ] Budget tracking
- [ ] Analytics dashboard
- [ ] Backup to iCloud/Google Drive

## Questions?

Feel free to open a [GitHub Discussion](https://github.com/tijnndev/fixedflow/discussions) if you have questions!

---

Thank you for contributing! 🎉
