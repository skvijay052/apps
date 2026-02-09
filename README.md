# Dating App - React Native

A modern, feature-rich dating application built with React Native and Expo.

## 🎯 Features

### ✅ Implemented Features

1. **Authentication**
   - OTP-based phone login
   - Secure authentication flow
   - Session management with AsyncStorage

2. **Profile Management**
   - Create and edit user profile
   - Upload multiple photos (up to 6)
   - Bio and personal information
   - Interest tags

3. **Partner Preferences**
   - Set age range
   - Set maximum distance
   - Choose gender preferences
   - Select shared interests

4. **Browse Matches**
   - Tinder-style swipe cards
   - Like/Pass functionality
   - Super Like feature
   - Visual feedback on swipes
   - Match animations

5. **Chat System**
   - Real-time messaging interface
   - Conversation list
   - Unread message indicators
   - Typing indicators ready

6. **Notifications**
   - Push notification support (Firebase)
   - Local notifications
   - Match notifications
   - Message notifications
   - Like notifications

7. **Premium Features**
   - Subscription plans (1, 3, 6 months)
   - Unlimited likes
   - Profile boost
   - See who likes you
   - Location change
   - Ad-free experience

8. **Profile Screen**
   - View your profile
   - Edit settings
   - Logout functionality
   - Premium upgrade CTA

## 🏗️ Project Structure

```
dating-app/
├── src/
│   ├── screens/              # All app screens
│   │   ├── OTPLoginScreen.js
│   │   ├── CreateProfileScreen.js
│   │   ├── UploadPhotosScreen.js
│   │   ├── PreferencesScreen.js
│   │   ├── BrowseMatchesScreen.js
│   │   ├── MatchDetailsScreen.js
│   │   ├── ChatListScreen.js
│   │   ├── ChatScreen.js
│   │   ├── NotificationsScreen.js
│   │   ├── ProfileScreen.js
│   │   └── PremiumScreen.js
│   ├── navigation/           # Navigation setup
│   │   └── AppNavigator.js
│   ├── store/               # State management
│   │   └── useStore.js      # Zustand store
│   ├── services/            # External services
│   │   ├── notifications.js
│   │   └── firebaseConfig.js
│   ├── components/          # Reusable components
│   ├── utils/              # Utility functions
│   └── assets/             # Images, fonts, etc.
├── App.js                  # Root component
├── app.json               # Expo configuration
├── package.json           # Dependencies
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   cd dating-app
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
   expo start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your physical device

## 🔧 Configuration

### Firebase Setup (Required for production)

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)

2. Enable Authentication > Phone

3. Enable Firestore Database

4. Enable Storage

5. Get your Firebase config and update `src/services/firebaseConfig.js`:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

6. Install Firebase:
   ```bash
   npm install firebase
   ```

### Push Notifications Setup

1. Get your Expo Project ID from [expo.dev](https://expo.dev)

2. Update `src/services/notifications.js`:
   ```javascript
   const token = await Notifications.getExpoPushTokenAsync({
     projectId: 'your-expo-project-id'
   });
   ```

3. For iOS: Configure APNs in Apple Developer Console

4. For Android: Configure FCM in Firebase Console

## 📱 Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web browser

## 🎨 Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation v6
- **State Management**: Zustand
- **UI Components**: React Native core components
- **Icons**: @expo/vector-icons (Ionicons)
- **Animations**: React Native Reanimated
- **Image Handling**: Expo Image Picker
- **Storage**: AsyncStorage
- **Push Notifications**: Expo Notifications
- **Backend (Optional)**: Firebase

## 📦 Key Dependencies

```json
{
  "expo": "~51.0.0",
  "react": "18.2.0",
  "react-native": "0.74.5",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/stack": "^6.3.20",
  "@react-navigation/bottom-tabs": "^6.5.11",
  "zustand": "^4.4.7",
  "expo-notifications": "~0.28.1",
  "expo-image-picker": "~15.0.4",
  "react-native-reanimated": "~3.10.1"
}
```

## 🔐 Authentication Flow

1. User enters phone number
2. OTP is sent via Firebase Auth
3. User enters OTP code
4. Upon verification, user is logged in
5. New users proceed to profile creation
6. Existing users go to main app

## 💾 Data Structure

### User Profile
```javascript
{
  id: string,
  name: string,
  age: number,
  gender: string,
  bio: string,
  occupation: string,
  education: string,
  location: string,
  photos: [{ id, uri }],
  interests: [string],
  createdAt: timestamp
}
```

### Match
```javascript
{
  id: string,
  userId: string,
  matchedUserId: string,
  timestamp: timestamp,
  conversationId: string
}
```

### Message
```javascript
{
  id: string,
  conversationId: string,
  senderId: string,
  text: string,
  timestamp: timestamp,
  read: boolean
}
```

## 🎯 Next Steps / TODO

- [ ] Connect to Firebase backend
- [ ] Implement real OTP verification
- [ ] Add geolocation for distance calculation
- [ ] Implement actual matching algorithm
- [ ] Add photo verification
- [ ] Implement video calls
- [ ] Add stories feature
- [ ] Implement in-app purchases for premium
- [ ] Add analytics (Firebase Analytics)
- [ ] Add crash reporting (Firebase Crashlytics)
- [ ] Implement deep linking
- [ ] Add social media login options
- [ ] Create admin panel

## 🐛 Known Issues

- OTP verification currently uses mock code (123456)
- Matches are randomly generated
- No real backend connection yet
- Photos are not persisted to cloud storage

## 🤝 Contributing

This is a starter template. Feel free to customize and extend it for your needs.

## 📄 License

MIT License - Feel free to use this code for your projects

## 💡 Tips for Production

1. **Security**
   - Never commit Firebase config to public repos
   - Use environment variables
   - Implement proper authentication checks
   - Add rate limiting on backend

2. **Performance**
   - Implement image caching
   - Add pagination for matches
   - Optimize re-renders with memo/useMemo
   - Lazy load screens

3. **UX Improvements**
   - Add loading states
   - Implement error boundaries
   - Add offline support
   - Improve accessibility

4. **Backend**
   - Use Cloud Functions for matching algorithm
   - Implement real-time updates with Firestore
   - Add photo moderation
   - Implement reporting system

## 📞 Support

For issues and questions:
- Check the documentation
- Review Firebase docs
- Check React Navigation docs
- Review Expo documentation

---

Built with ❤️ using React Native & Expo