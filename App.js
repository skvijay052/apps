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
      await initializeFromStorage();
      await requestNotificationPermissions();
      setupNotifications();
    };

    init();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar style="light" />
      <AppNavigator />
    </GestureHandlerRootView>
  );
}
