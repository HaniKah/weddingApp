# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Ghamrah** — a React Native / Expo wedding planning app targeting Arabic-speaking markets (24 countries). Users can
plan weddings and browse vendors; vendors can list their services. The backend is a separate NestJS + PostgreSQL API.

## Tech Stack

This project is used in combination with the backend server, which can be found in desktop/wedding-app-server

## Commands

```bash
npm install           # Install dependencies
npx expo start        # Start dev server (press i for iOS, a for Android)
npx expo run:ios      # Build and launch on iOS simulator
npx expo run:android  # Build and launch on Android emulator
npm run lint          # ESLint + TypeScript checks
npm test              # Jest (jest-expo preset)
npm run swagger-axios # Regenerate types/open-api.ts from http://localhost:3000/swagger/json
```

CI runs on `main`: node 22 → `npm ci` → TypeScript check → Jest.

## Architecture

### Navigation (Expo Router — file-based)

```
app/_layout.tsx          ← root layout; mounts AuthProvider + LocationProvider; auth guards
app/sign-in.tsx          ← entry point (video bg, Google/Apple/email)
app/onboarding/          ← role selection (User vs Vendor)
app/(tabs)/              ← authenticated bottom-tab shell
  (planner)/             ← wedding hub
  checklist.tsx
  profile/
app/listing/[id]/        ← vendor detail
app/pick-location.tsx    ← manual country picker
```

Guards in `app/_layout.tsx` redirect based on `isLoggedIn`, `shouldCreateAccount`, `hasCompletedOnboarding`, and whether
a country is set.

### State Management

Two layers work together:

1. **React Context** (`contexts/`) — `AuthProvider` and `LocationProvider` wrap the app and expose hooks (`useAuth`,
   `useLocationContext`).
2. **Zustand stores** (`utils/authStore.ts`, `utils/locationStore.ts`) — persisted to `expo-secure-store` /
   `AsyncStorage`.

### API Layer

`utils/api.ts` exports a `useApi()` hook that returns an Axios instance pre-configured with:

- Bearer token injection from secure store
- Automatic token refresh on 401, with retry
- Logout on refresh failure

Dev base URLs: `localhost:3000` (iOS), `10.0.2.2:3000` (Android). Configured via `.env.local`.

### Authentication

Three flows — all managed in `contexts/auth-context.tsx`:

- **Google / Apple OAuth**: backend redirect endpoints (`/api/auth/google/login`, `/api/auth/apple/login`)
- **Email/password**: form-based via REST endpoints

Tokens (access + refresh) are stored in `expo-secure-store`.

### Types

`types/open-api.ts` is **auto-generated** — do not edit by hand. Run `npm run swagger-axios` after backend schema
changes.

### Styling

Design tokens live in `styles/Theme.ts` (colors, typography, spacing). `styles/Button.ts` and `styles/Common.ts` hold
shared style objects. Use these instead of inline magic values.

### Regional Data

`constants/countries.ts` contains the 24 supported Arabic countries with their cities and currencies. This is the source
of truth for location selection.

## Key Paths

| Purpose                    | Path                        |
|----------------------------|-----------------------------|
| Root layout / guards       | `app/_layout.tsx`           |
| Auth logic                 | `contexts/auth-context.tsx` |
| Auth Zustand store         | `utils/authStore.ts`        |
| HTTP client                | `utils/api.ts`              |
| Auto-generated API types   | `types/open-api.ts`         |
| Design tokens              | `styles/Theme.ts`           |
| Countries/cities data      | `constants/countries.ts`    |
| Expo config (env variants) | `app.config.ts`             |
| EAS build profiles         | `eas.json`                  |

## Path Aliases

`tsconfig.json` maps `@/*` to the project root, so imports use `@/components/...`, `@/utils/...`, etc.

## Code Style

- `components/appComponents` folder is for reusable components that wrap a basic element. e.g., we wrap the basic
  Button/Pressable component with `AppButton` in order give more structured and specification of how we use buttons in
  our app. use it when you know that a component is reusable and its has to always defined in a way that corresponds to
  our app 
