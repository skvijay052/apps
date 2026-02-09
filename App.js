import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from '../src/navigation/AppNavigator';
import useStore from '../src/store/useStore';
import { requestNotificationPermissions, setupNotifications } from '../src/services/notifications';

export default function App() {
  const initializeFromStorage = useStore(state => state.initializeFromStorage);

  useEffect(() => {
    // Initialize app
    const init = async () => {
      await initializeFromStorage();
      await requestNotificationPermissions();
      setupNotifications();
    };

    init();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <AppNavigator />
    </GestureHandlerRootView>
  );
}