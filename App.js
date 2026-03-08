import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants'; 
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './navigation/AppNavigator';
import useStore from './store/useStore';
import { requestNotificationPermissions, setupNotifications } from './services/notifications'; 
import { supabase } from '../src/config/supabase';

export default function App() {
  const initializeFromStorage = useStore(state => state.initializeFromStorage);

  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let cleanupNotifications;
    let authSubscription;

    const init = async () => {
      try {
        const isExpoGo = Constants.appOwnership === 'expo';

        // 1️⃣ Load Zustand / local storage
        await initializeFromStorage();

        // 2️⃣ Get existing session (magic link restores here)
        const { data } = await supabase.auth.getSession();
        setSession(data.session);

        // 3️⃣ Listen to auth changes (LOGIN / LOGOUT)
        authSubscription = supabase.auth.onAuthStateChange(
          (_event, session) => {
            console.log('AUTH EVENT:', _event);
            setSession(session);
          }
        );

        // 4️⃣ Notifications
        if (!isExpoGo) {
          await requestNotificationPermissions();
          cleanupNotifications = setupNotifications();
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAuthLoading(false);
      }
    };

    init();

    return () => {
      if (cleanupNotifications) cleanupNotifications();
      if (authSubscription) {
        authSubscription.data.subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <StatusBar style="light" />
      <AppNavigator session={session} authLoading={authLoading} />
    </GestureHandlerRootView>
  );
}