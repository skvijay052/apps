import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function requestNotificationPermissions() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF6B6B',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Failed to get push token for push notification!');
    return;
  }

  return finalStatus === 'granted';
}

export async function getPushToken() {
  try {
    const token = await Notifications.getExpoPushTokenAsync({
      projectId: 'your-project-id', // Replace with your Expo project ID
    });
    console.log('Push token:', token);
    return token.data;
  } catch (error) {
    console.error('Error getting push token:', error);
    return null;
  }
}

export function setupNotifications() {
  // Listen for notifications when app is in foreground
  const notificationListener = Notifications.addNotificationReceivedListener(notification => {
    console.log('Notification received:', notification);
  });

  // Listen for notification responses (when user taps notification)
  const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
    console.log('Notification response:', response);
    // Handle navigation based on notification data
  });

  return () => {
    Notifications.removeNotificationSubscription(notificationListener);
    Notifications.removeNotificationSubscription(responseListener);
  };
}

export async function sendLocalNotification(title, body, data = {}) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      sound: true,
    },
    trigger: null, // Send immediately
  });
}

// Example: Send notification when you get a new match
export async function notifyNewMatch(matchName) {
  await sendLocalNotification(
    'New Match! 💘',
    `You and ${matchName} matched!`,
    { type: 'match', screen: 'Matches' }
  );
}

// Example: Send notification for new message
export async function notifyNewMessage(senderName, message) {
  await sendLocalNotification(
    senderName,
    message,
    { type: 'message', screen: 'Chat' }
  );
}

// Example: Send notification for new like
export async function notifyNewLike() {
  await sendLocalNotification(
    'Someone likes you! ❤️',
    'You have a new like. Check it out!',
    { type: 'like', screen: 'Likes' }
  );
}