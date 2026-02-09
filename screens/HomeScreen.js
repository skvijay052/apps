import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import useStore from '../store/useStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 45) / 2; // 2 columns with padding

// Mock profiles database - In production, fetch from backend
const MOCK_PROFILES = [
  {
    id: 1,
    name: 'Sarah',
    age: 28,
    gender: 'female',
    bio: 'Adventure seeker | Coffee enthusiast ☕',
    distance: 5,
    photo: 'https://randomuser.me/api/portraits/women/1.jpg',
    interests: ['Travel', 'Photography', 'Yoga'],
    isOnline: true,
  },
  {
    id: 2,
    name: 'Emily',
    age: 26,
    gender: 'female',
    bio: 'Artist & dreamer 🎨',
    distance: 8,
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    interests: ['Art', 'Hiking', 'Music'],
    isOnline: false,
  },
  {
    id: 3,
    name: 'Jessica',
    age: 30,
    gender: 'female',
    bio: 'Fitness trainer | Dog mom 🐕',
    distance: 3,
    photo: 'https://randomuser.me/api/portraits/women/3.jpg',
    interests: ['Fitness', 'Pets', 'Cooking'],
    isOnline: true,
  },
  {
    id: 4,
    name: 'Michael',
    age: 29,
    gender: 'male',
    bio: 'Tech enthusiast | Love coding 💻',
    distance: 7,
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    interests: ['Technology', 'Gaming', 'Travel'],
    isOnline: true,
  },
  {
    id: 5,
    name: 'David',
    age: 31,
    gender: 'male',
    bio: 'Entrepreneur | Gym freak 💪',
    distance: 4,
    photo: 'https://randomuser.me/api/portraits/men/2.jpg',
    interests: ['Business', 'Fitness', 'Food'],
    isOnline: false,
  },
  {
    id: 6,
    name: 'James',
    age: 27,
    gender: 'male',
    bio: 'Musician | Nature lover 🎸',
    distance: 6,
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    interests: ['Music', 'Hiking', 'Photography'],
    isOnline: true,
  },
  {
    id: 7,
    name: 'Sophia',
    age: 25,
    gender: 'female',
    bio: 'Model | Fashionista 👗',
    distance: 2,
    photo: 'https://randomuser.me/api/portraits/women/4.jpg',
    interests: ['Fashion', 'Travel', 'Dance'],
    isOnline: true,
  },
  {
    id: 8,
    name: 'Olivia',
    age: 29,
    gender: 'female',
    bio: 'Chef | Foodie at heart 🍕',
    distance: 9,
    photo: 'https://randomuser.me/api/portraits/women/5.jpg',
    interests: ['Cooking', 'Food', 'Wine'],
    isOnline: false,
  },
  {
    id: 9,
    name: 'Robert',
    age: 32,
    gender: 'male',
    bio: 'Architect | Design lover 📐',
    distance: 5,
    photo: 'https://randomuser.me/api/portraits/men/4.jpg',
    interests: ['Architecture', 'Art', 'Travel'],
    isOnline: true,
  },
  {
    id: 10,
    name: 'William',
    age: 28,
    gender: 'male',
    bio: 'Doctor | Saving lives ⚕️',
    distance: 12,
    photo: 'https://randomuser.me/api/portraits/men/5.jpg',
    interests: ['Medicine', 'Reading', 'Tennis'],
    isOnline: false,
  },
];

export default function HomeScreen({ navigation }) {
  const profile = useStore(state => state.profile);
  const [profiles, setProfiles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all'); // all, nearby, online

  useEffect(() => {
    loadProfiles();
  }, [profile]);

  const loadProfiles = () => {
    // Filter based on user's gender
    // If user is male, show female profiles and vice versa
    let filtered = MOCK_PROFILES;

    if (profile?.gender) {
      if (profile.gender === 'male') {
        filtered = MOCK_PROFILES.filter(p => p.gender === 'female');
      } else if (profile.gender === 'female') {
        filtered = MOCK_PROFILES.filter(p => p.gender === 'male');
      }
    }

    // Apply additional filters
    if (filter === 'nearby') {
      filtered = filtered.filter(p => p.distance <= 5);
    } else if (filter === 'online') {
      filtered = filtered.filter(p => p.isOnline);
    }

    setProfiles(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadProfiles();
      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    loadProfiles();
  }, [filter]);

  const renderProfileCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MatchDetails', { profile: item })}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.photo }} style={styles.cardImage} />
      
      {/* Online Indicator */}
      {item.isOnline && (
        <View style={styles.onlineBadge}>
          <View style={styles.onlineDot} />
        </View>
      )}

      {/* Gradient Overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.cardGradient}
      >
        <View style={styles.cardInfo}>
          <Text style={styles.cardName}>{item.name}, {item.age}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={14} color="#FFF" />
            <Text style={styles.cardDistance}>{item.distance} km away</Text>
          </View>
          {item.interests && item.interests.length > 0 && (
            <View style={styles.interestTag}>
              <Text style={styles.interestText}>{item.interests[0]}</Text>
            </View>
          )}
        </View>
      </LinearGradient>

      {/* Like Button */}
      <TouchableOpacity style={styles.likeButton}>
        <Ionicons name="heart-outline" size={20} color="#FFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const FilterButton = ({ label, value, icon }) => (
    <TouchableOpacity
      style={[styles.filterButton, filter === value && styles.filterButtonActive]}
      onPress={() => setFilter(value)}
    >
      <Ionicons 
        name={icon} 
        size={16} 
        color={filter === value ? '#FFF' : '#666'} 
      />
      <Text style={[
        styles.filterButtonText,
        filter === value && styles.filterButtonTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {profile?.name || 'Guest'}! 👋</Text>
          <Text style={styles.subGreeting}>
            {profiles.length} {profile?.gender === 'male' ? 'women' : 'men'} around you
          </Text>
        </View>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Notifications')}
          style={styles.notificationButton}
        >
          <Ionicons name="notifications-outline" size={28} color="#333" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <FilterButton label="All" value="all" icon="grid-outline" />
        <FilterButton label="Nearby" value="nearby" icon="location-outline" />
        <FilterButton label="Online" value="online" icon="radio-outline" />
      </View>

      {/* Profile Grid */}
      {profiles.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="people-outline" size={80} color="#CCC" />
          <Text style={styles.emptyTitle}>No Profiles Found</Text>
          <Text style={styles.emptySubtitle}>
            Try adjusting your filters or check back later
          </Text>
        </View>
      ) : (
        <FlatList
          data={profiles}
          renderItem={renderProfileCard}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      {/* Floating Browse Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Browse')}
      >
        <LinearGradient
          colors={['#FF6B6B', '#FF8E53']}
          style={styles.floatingGradient}
        >
          <Ionicons name="flame" size={24} color="#FFF" />
          <Text style={styles.floatingButtonText}>Browse</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#FFF',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subGreeting: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  notificationButton: {
    position: 'relative',
    padding: 5,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    gap: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  filterButtonActive: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: '#FFF',
  },
  listContent: {
    padding: 15,
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.4,
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  onlineBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 4,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    justifyContent: 'flex-end',
  },
  cardInfo: {
    padding: 12,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardDistance: {
    fontSize: 12,
    color: '#FFF',
    marginLeft: 4,
  },
  interestTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  interestText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '600',
  },
  likeButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 107, 107, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  floatingButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});