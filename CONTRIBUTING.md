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
├── screens/        # Full-screen views
├── services/       # Business logic (storage, etc.)
├── types/          # TypeScript type definitions
└── utils/          # Helper functions and utilities
```

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

### Storage

- All data operations go through `storageService`
- Handle errors gracefully
- Show user feedback for async operations

### UI/UX

- Keep the design clean and minimal
- Use consistent spacing and colors
- Ensure good contrast for accessibility
- Test on different screen sizes

## Project Philosophy

When contributing, keep these principles in mind:

1. **Privacy First**: No data leaves the device
2. **Simplicity**: Easy to use, no complexity
3. **Offline**: Works without internet
4. **Open Source**: Transparent and community-driven

## Feature Ideas

Potential features to contribute:

- [ ] Data export (CSV/JSON)
- [ ] Data import
- [ ] Native date picker
- [ ] Notification reminders
- [ ] Custom categories
- [ ] Dark mode
- [ ] Multiple currency support
- [ ] Payment history/archive
- [ ] Search functionality
- [ ] Backup to iCloud/Google Drive

## Questions?

Feel free to open a [GitHub Discussion](https://github.com/tijnndev/fixedflow/discussions) if you have questions!

---

Thank you for contributing! 🎉
