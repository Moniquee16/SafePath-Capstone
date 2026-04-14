# SafePath 🚨

Expo React Native app for Marulas flood road monitoring.

## Features
- User/Admin dashboards
- Real-time street status
- Firebase Auth (REST API)
- Dark/Light theme
- LinearGradient UI, Feather icons

## Quick Setup (5 mins)

1. **Clone**
   ```
   git clone https://github.com/[YOUR_USERNAME]/SafePath.git
   cd SafePath
   ```

2. **Install Dependencies** (handles gradients, icons, nav, etc.)
   ```
   npm install
   ```

3. **Globals** (one-time)
   ```
   npm install -g @expo/cli
   ```

4. **Firebase Setup**
   - Create project: [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication → Email/Password
   - Copy **Web API Key** & **Project ID** (Project Settings)
   - Edit `utils/firebase.js`:
     ```
     const API_KEY = 'YOUR_WEB_API_KEY';
     const PROJECT_ID = 'your-project-id';
     ```

5. **Run**
   ```
   npx expo start
   ```
   Scan QR with **Expo Go** app (App Store/Google Play).

## Scripts
```
npm start          # expo start
npm run android    # expo run:android
npm run ios        # expo run:ios (Mac)
npm run web        # expo start --web
```

## Build for Stores
```
npm install -g eas-cli
eas build --platform all
```

## Dependencies (auto via npm install)
- expo@54 • react-native@0.81
- expo-linear-gradient • @expo/vector-icons (Feather)
- @react-navigation/native
- react-native-linear-gradient

## Troubleshooting
- `npx expo doctor` → fix issues
- Clear cache: `npx expo start -c`
- Firebase errors? Check API_KEY/PROJECT_ID

Happy coding! 👥
