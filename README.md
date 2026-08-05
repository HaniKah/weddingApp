# Ghamrah - Wedding Planner App 👋

Ghamrah is a comprehensive mobile application designed to simplify wedding planning. It connects users with wedding
vendors, helps manage checklists, and provides a seamless experience for planning your special day.

The app is built using [Expo](https://expo.dev) and [React Native](https://reactnative.dev/), ensuring a high-quality
cross-platform experience.

## ✨ Features

- **Vendor Discovery:** Browse and filter wedding vendors by category, location, and price.
- **Detailed Listings:** View vendor details, images, ratings, and contact information.
- **Favorites:** Save your favorite vendors for quick access later.
- **Planner Checklist:** Manage your wedding tasks with an integrated checklist.
- **Multi-language Support:** Available in multiple languages via `i18next`.
- **Location-based Search:** Find vendors near you using GPS and Google Maps integration.
- **Vendor Tools:** Wizards for vendors to create and promote their listings.

## 🚀 Tech Stack

- **Frontend:** React Native, Expo, TypeScript, Expo Router.
- **State Management:** Zustand (for stores like auth, checklist, favorites, and location).
- **Styling:** React Native StyleSheet with a central Theme system.
- **API Interaction:** Axios with custom hooks for interceptors and token refreshing.
- **Backend (External):** NestJS, PostgreSQL.
- **Other Tools:** i18next for localization, Google Maps API, EAS for builds and updates.

## 🛠️ Get Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn
- Expo Go app on your mobile device (for development)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd weddingApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add necessary keys (refer to `app.config.ts` for expected variables
   like `EXPO_PUBLIC_API_URL`, `GOOGLE_MAPS_API_KEY`, etc.).

### Running the App

Start the Expo development server:

```bash
npx expo start
```

Use the Expo Go app to scan the QR code and run the app on your device, or press `i` for iOS simulator / `a` for Android
emulator.

## 📂 Project Structure

- `app/`: Expo Router file-based routing.
- `components/`: Reusable UI components categorized by type (modals, wizards, items, etc.).
- `contexts/`: React Contexts for global state (auth, location, etc.).
- `hooks/`: Custom React hooks.
- `utils/`: Utility functions and Zustand stores.
- `constants/`: Global constants and configurations.
- `styles/`: Centralized theme and styling definitions.
- `locales/`: Translation files for i18n.

## 🔐 Authentication

The app uses JWT-based authentication with automatic token refreshing. Authentication state is managed via
`useAuthStore` (Zustand) and `auth-context`.

## 📦 Building and Updates

This project uses EAS (Expo Application Services) for builds and Over-the-Air (OTA) updates.

- **Build Preview:** `npm run build:preview`
- **Build Production:** `npm run build:production`
- **Push Updates:** `npm run update:production`

---
*Ghamrah - Making wedding planning easier, one step at a time.*
