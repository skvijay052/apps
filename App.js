import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './navigation/AppNavigator';
import useStore from './store/useStore';
import { requestNotificationPermissions, setupNotifications } from './services/notifications';

export default function App() {
  const initializeFromStorage = useStore(state => state.initializeFromStorage);

  useEffect(() => {
    // Initialize app
    const init = async () => {
      try {
        await initializeFromStorage();
        await requestNotificationPermissions();
        setupNotifications();
      } catch (e) {
        console.warn(e);
      } finally {
        // Hide the native splash screen immediately after initialization
        await SplashScreen.hideAsync();
      }
    };

    init();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <StatusBar style="light" />
      <AppNavigator />
    </GestureHandlerRootView>
  );
}
