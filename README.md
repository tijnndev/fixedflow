# FixedFlow

<div align="center">

📱 **A simple, offline-first personal finance app for tracking recurring payments**

![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Made with Expo](https://img.shields.io/badge/Made%20with-Expo-000020?logo=expo)

</div>

## 📖 Overview

FixedFlow is a clean, minimal mobile app designed to help you track and visualize your recurring payments (subscriptions, rent, insurance, etc.). All data is stored locally on your device - no backend, no accounts, no data collection.

### ✨ Features

- **📋 List View**: Manage all your recurring payments in one place
  - Add, edit, and delete payments
  - Quick overview of all subscriptions
  - Sort and organize by category

- **📅 Agenda View**: Calendar-style monthly overview
  - Visualize payments on their due dates
  - Navigate between months
  - See daily and monthly totals
  - Highlight days with payments

- **💾 Fully Offline**: All data stored locally using AsyncStorage
- **🔒 Privacy First**: No backend, no tracking, no data collection
- **🎨 Clean UI**: Simple, intuitive design focused on usability
- **💶 EUR Currency**: Built for European users (easily customizable)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) app on your mobile device (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tijnndev/fixedflow.git
   cd fixedflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   # or
   npx expo start
   ```

4. **Run on your device**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `a` for Android emulator, `i` for iOS simulator

## 📱 Usage

### Adding a Payment

1. Navigate to the **List** tab
2. Tap **"+ Add Payment"**
3. Fill in the details:
   - **Name**: e.g., "Netflix subscription"
   - **Amount**: in EUR (e.g., 15.99)
   - **Frequency**: Monthly, Quarterly, or Yearly
   - **Due Day**: Day of month (1-31)
   - **Start Date**: When this payment started (determines quarterly/yearly schedule)
   - **Category** (optional): e.g., Subscriptions, Insurance

4. Tap **Save**

### Editing or Deleting

- In the **List** view, tap **Edit** or **Delete** on any payment card
- Confirm deletion when prompted

### Viewing the Calendar

1. Navigate to the **Agenda** tab
2. Use **‹ › buttons** to navigate between months
3. Tap any **highlighted day** to see payments due that day
4. View **monthly total** at the top of the screen

## 🔄 Recurrence Logic

FixedFlow uses a clear, predictable system for recurring payments:

### Monthly Payments
- Occur every month on the specified due day
- Example: Due day 15 → payment on the 15th of every month

### Quarterly Payments
- Occur every 3 months, based on the start date
- Example: Start date Jan 15 → payments in Jan, Apr, Jul, Oct
- Example: Start date Mar 1 → payments in Mar, Jun, Sep, Dec

### Yearly Payments
- Occur once per year in the same month as the start date
- Example: Start date Feb 15 → payment every year on Feb 15

### Edge Cases
- If due day exceeds days in month (e.g., day 31 in February), the payment is scheduled for the last day of that month

## 🏗️ Project Structure

```
fixedflow/
├── App.tsx                      # Main app component with navigation
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── EmptyState.tsx      # Empty state placeholder
│   │   ├── PaymentCard.tsx     # Payment item display
│   │   └── PaymentFormModal.tsx # Add/edit payment form
│   │
│   ├── screens/                 # Main screens
│   │   ├── ListScreen.tsx      # List view with all payments
│   │   └── AgendaScreen.tsx    # Calendar view
│   │
│   ├── services/                # Business logic
│   │   └── storage.ts          # AsyncStorage operations
│   │
│   ├── types/                   # TypeScript definitions
│   │   └── payment.ts          # Data models
│   │
│   └── utils/                   # Helper functions
│       └── recurrence.ts       # Recurrence calculation logic
│
├── package.json
├── app.json                     # Expo configuration
├── tsconfig.json               # TypeScript configuration
└── README.md
```

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Navigation**: [React Navigation](https://reactnavigation.org/)
- **Storage**: [@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage)
- **Icons**: [@expo/vector-icons](https://docs.expo.dev/guides/icons/)

## 🤝 Contributing

Contributions are welcome! This is an open-source project designed to help people track their finances.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Write clear commit messages
- Add comments for complex logic
- Test on both iOS and Android when possible
- Keep the UI simple and accessible

## 🐛 Known Issues & Limitations

- **Date Picker**: Currently uses text input for start date. A native date picker would improve UX.
- **Notifications**: No reminder notifications (could be added in future)
- **Backup**: No cloud backup feature (data is device-only)
- **Export**: No data export functionality yet

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using Expo and React Native
- Icons by [@expo/vector-icons](https://icons.expo.fyi/)
- Inspired by the need for simple, privacy-focused financial tools

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/tijnndev/fixedflow/issues)
- **Discussions**: [GitHub Discussions](https://github.com/tijnndev/fixedflow/discussions)

---

<div align="center">

**Made with ☕ for people who value simplicity and privacy**

[⭐ Star this repo](https://github.com/tijnndev/fixedflow) if you find it useful!

</div>
