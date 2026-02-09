import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'match',
    title: 'New Match!',
    message: 'You and Sarah matched!',
    photo: 'https://picsum.photos/100/100?random=1',
    timestamp: '5 min ago',
    read: false,
  },
  {
    id: 2,
    type: 'like',
    title: 'Someone liked you!',
    message: 'You have a new like',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    type: 'message',
    title: 'New Message',
    message: 'Emily sent you a message',
    photo: 'https://picsum.photos/100/100?random=2',
    timestamp: '3 hours ago',
    read: true,
  },
];

export default function NotificationsScreen({ navigation }) {
  const renderNotification = ({ item }) => (
    <TouchableOpacity style={[styles.notificationItem, !item.read && styles.unread]}>
      <View style={styles.iconContainer}>
        {item.photo ? (
          <Image source={{ uri: item.photo }} style={styles.photo} />
        ) : (
          <View style={[styles.iconCircle, { backgroundColor: getIconColor(item.type) }]}>
            <Ionicons name={getIcon(item.type)} size={24} color="#FFF" />
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    </TouchableOpacity>
  );

  const getIcon = (type) => {
    switch (type) {
      case 'match': return 'heart';
      case 'like': return 'heart-outline';
      case 'message': return 'chatbubble';
      default: return 'notifications';
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'match': return '#FF6B6B';
      case 'like': return '#FF8E53';
      case 'message': return '#4FC3F7';
      default: return '#999';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markRead}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={MOCK_NOTIFICATIONS}
        renderItem={renderNotification}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  markRead: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  notificationItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
  },
  unread: {
    backgroundColor: '#FFF9F9',
  },
  iconContainer: {
    marginRight: 15,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
});