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
import { count } from 'firebase/firestore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 30) / 1; // 2 columns with padding

// Mock profiles database - In production, fetch from backend
const MOCK_PROFILES = [
  {
    id: 1,
    name: 'Sarah',
    age: 28,
    gender: 'female',
    bio: 'Adventure seeker | Coffee enthusiast ☕',
    city: 'Chennai',
    state: 'Andhra Pradesh',
    country: 'India',
    height: '5.5',    
    job: 'Software Engineer',
    caste: 'Naidu',
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
    city: 'Chennai',
    state: 'Andhra Pradesh',
    country: 'India',
    height: '5.5',    
    job: 'Software Engineer',
    caste: 'Naidu',
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
    city: 'Chennai',
    state: 'Andhra Pradesh',
    country: 'India',
    height: '5.5',    
    job: 'Software Engineer',
    caste: 'Naidu',
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
    city: 'Chennai',
    state: 'Andhra Pradesh',
    country: 'India',
    height: '5.5',    
    job: 'Software Engineer',
    caste: 'Naidu',
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
    city: 'Chennai',
    state: 'Andhra Pradesh',
    country: 'India',
    height: '5.5',    
    job: 'Software Engineer',
    caste: 'Naidu',
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
    city: 'Chennai',
    state: 'Andhra Pradesh',
    country: 'India',
    height: '5.5',    
    job: 'Software Engineer',
    caste: 'Naidu',
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
    city: 'Chennai',
    state: 'Andhra Pradesh',
    country: 'India',
    height: '5.5',    
    job: 'Software Engineer',
    caste: 'Naidu',
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
    city: 'Chennai',
    state: 'Andhra Pradesh',
    country: 'India',
    height: '5.5',    
    job: 'Software Engineer',
    caste: 'Naidu',
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
    city: 'Chennai',
    state: 'Andhra Pradesh',
    country: 'India',
    height: '5.5',    
    job: 'Software Engineer',
    caste: 'Naidu',
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
    city: 'Chennai',
    state: 'Andhra Pradesh',
    country: 'India',
    height: '5.5',    
    job: 'Software Engineer',
    caste: 'Naidu',
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
      key={item.id}
      onPress={() => navigation.navigate('MatchDetails', { profile: item })}
      style={styles.popularCard}
      activeOpacity={0.9} 
    > 
      <View>
        <Image source={{ uri: item.photo }} style={styles.popularImage} /> 
        {item.isOnline && (
          <View style={styles.onlineBadge}>
            <View style={styles.onlineDot} />
          </View>
        )}
      </View>
      <View style={styles.popularTextWrap}>
        <Text style={styles.popularName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.cardName}>{item.age} Yrs, {item.height} cm</Text> 
        <View style={styles.locationRow}> 
            <Text style={styles.cardPlace}>{item.job}, {item.city}</Text>
        </View> 
        <View style={styles.locationRow}> 
            <Text style={styles.cardPlace}>{item.state}, {item.country}</Text>
        </View> 
      </View> 
       <TouchableOpacity style={styles.likeButton}>
         <Ionicons name="heart-outline" size={14} color="#000" />
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
        color={filter === value ? '#1F2937' : '#1F2937'} 
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
           <Image 
              source={require('../assets/icons/text-logo-transparent.png')}
              style={styles.logoText} /> 
        </View>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Notifications')}
          style={styles.notificationButton}
        >
          <Ionicons name="notifications-outline" size={24} color="#333" />
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
          numColumns={1}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )} 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECECEF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#ECECEF',
  }, 
  logoText: {
    width: 120,
    height: 30,
  },
  popularCard: {
    width: CARD_WIDTH,
    height: 'auto',
    borderRadius: 15,
    backgroundColor: '#EFEFF1',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.58)',
    padding: 14,
    marginRight: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
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
  popularImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  popularTextWrap: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
  },
  popularName: {
    fontSize: 32 / 1.6,
    fontWeight: '700',
    color: '#21212A',
  },
  popularRole: { 
    fontSize: 26 / 1.6,
    color: '#73737C',
    fontWeight: '500',
  }, 
  notificationButton: {
    position: 'relative',
    padding: 4,
    backgroundColor: 'transparent',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#000',
    borderRadius: 10,
    width: 16,
    height: 16,
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
    backgroundColor: '#ECECEF',
    gap: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#dfdfe5ff',
    borderWidth: 1,
    borderColor: '#dfdfe5ff',
  },
  filterButtonActive: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 6,
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: '#1F2937',
  },
  listContent: {
    padding: 15,
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  }, 
  cardImage: {
    width: '100%',
    height: '100%',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
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
    fontSize: 12,
    fontWeight: '400',
    color: '#000',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2, 
  }, 
  cardPlace: {
    fontSize: 12,
    color: '#000', 
    fontWeight: 400,
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
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 30,
    backgroundColor: '#fff',
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
  }
});