import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import useStore from '../store/useStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = Math.min(320, SCREEN_WIDTH * 0.82);

const MOCK_PROFILES = [
  {
    id: 1,
    name: 'Elon Musk',
    age: 53,
    gender: 'male',
    role: 'Entrepreneur',
    distance: 5,
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    interests: ['Technology', 'Business', 'Space'],
    isOnline: true,
  },
  {
    id: 2,
    name: 'Lady Gaga',
    age: 38,
    gender: 'female',
    role: 'Singer',
    distance: 8,
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    interests: ['Music', 'Art', 'Fashion'],
    isOnline: false,
  },
  {
    id: 3,
    name: 'Robert',
    age: 32,
    gender: 'male',
    role: 'Architect',
    distance: 5,
    photo: 'https://randomuser.me/api/portraits/men/4.jpg',
    interests: ['Architecture', 'Art', 'Travel'],
    isOnline: true,
  },
  {
    id: 4,
    name: 'Sophia',
    age: 25,
    gender: 'female',
    role: 'Model',
    distance: 2,
    photo: 'https://randomuser.me/api/portraits/women/4.jpg',
    interests: ['Fashion', 'Travel', 'Dance'],
    isOnline: true,
  },
];

const USE_CASES = [
  { id: 'education', label: 'Education', icon: 'school-outline' },
  { id: 'mentions', label: 'Public Mentions', icon: 'hash' },
  { id: 'business', label: 'Business', icon: 'business-outline' },
  { id: 'reviews', label: 'Reviews', icon: 'star-outline' },
];

export default function HomeScreen({ navigation }) {
  const profile = useStore(state => state.profile);
  const [profiles, setProfiles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    loadProfiles();
  }, [profile]);

  const loadProfiles = () => {
    let filtered = MOCK_PROFILES;
    if (profile?.gender === 'male') {
      filtered = MOCK_PROFILES.filter(p => p.gender === 'female');
    } else if (profile?.gender === 'female') {
      filtered = MOCK_PROFILES.filter(p => p.gender === 'male');
    }
    setProfiles(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadProfiles();
      setRefreshing(false);
    }, 700);
  };

  const visibleProfiles = useMemo(() => {
    if (!query.trim()) return profiles;
    const search = query.toLowerCase();
    return profiles.filter(item => item.name.toLowerCase().includes(search));
  }, [profiles, query]);

  const renderPopularCard = item => (
    <TouchableOpacity
      key={item.id}
      style={styles.popularCard}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('MatchDetails', { profile: item })}
    >
      <Image source={{ uri: item.photo }} style={styles.popularImage} />
      <View style={styles.popularTextWrap}>
        <Text style={styles.popularName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.popularRole} numberOfLines={1}>
          {item.role}
        </Text>
      </View>
      <Ionicons name="arrow-forward" size={24} color="#2A2A33" />
    </TouchableOpacity>
  );

  const renderUseCase = item => (
    <TouchableOpacity
      key={item.id}
      style={styles.useCaseCard}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Browse')}
    >
      <Ionicons name={item.icon} size={34} color="#1E1E25" />
      <Text style={styles.useCaseText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.header}>
          <View style={styles.brandIcon}>
            <Ionicons name="people-outline" size={24} color="#A7A7AE" />
          </View>

          <Text style={styles.brandTitle}>DeepSearch</Text>

          <View style={styles.headerActions}>
            <LinearGradient colors={['#8B8CFF', '#4B70F5']} style={styles.proBadge}>
              <Text style={styles.proText}>PRO</Text>
            </LinearGradient>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => navigation.navigate('Setting')}
            >
              <Ionicons name="settings-outline" size={28} color="#1E1E25" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.heroWrap}>
          <Text style={styles.heroText}>Who are you</Text>
          <Text style={styles.heroText}>looking for?</Text>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={30} color="#2C2C33" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Type full name..."
            placeholderTextColor="#BCBCC1"
            style={styles.searchInput}
          />
        </View>

        <Text style={styles.sectionTitle}>Popular celebrity search queries</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.popularRow}
        >
          {visibleProfiles.map(renderPopularCard)}
        </ScrollView>

        <Text style={[styles.sectionTitle, styles.useCaseTitle]}>Top Usecases</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.useCaseRow}
        >
          {USE_CASES.map(renderUseCase)}
        </ScrollView>

        <Text style={[styles.sectionTitle, styles.reviewsTitle]}>Reviews</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECECEF',
  },
  scrollContent: {
    paddingTop: 56,
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
  },
  brandIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#E3E3E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 50 / 1.6,
    fontWeight: '800',
    color: '#1F1F29',
    letterSpacing: 0.2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  proBadge: {
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 14,
  },
  proText: {
    color: '#FFFFFF',
    fontSize: 26 / 1.6,
    fontWeight: '800',
  },
  settingsButton: {
    padding: 2,
  },
  heroWrap: {
    marginTop: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: {
    fontSize: 62 / 1.6,
    fontWeight: '800',
    color: '#1F1F29',
    lineHeight: 72 / 1.6,
  },
  searchBar: {
    marginTop: 82,
    marginHorizontal: 22,
    minHeight: 68,
    borderRadius: 36,
    backgroundColor: '#F6F6F7',
    borderWidth: 1,
    borderColor: '#DDDEE2',
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#9A9AA4',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 6,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 36 / 1.6,
    color: '#1F1F29',
  },
  sectionTitle: {
    marginTop: 38,
    marginHorizontal: 22,
    fontSize: 28 / 1.6,
    color: '#686871',
    fontWeight: '600',
  },
  popularRow: {
    paddingTop: 18,
    paddingHorizontal: 22,
    paddingBottom: 2,
  },
  popularCard: {
    width: CARD_WIDTH,
    borderRadius: 30,
    backgroundColor: '#EFEFF1',
    borderWidth: 1,
    borderColor: '#E4E4E8',
    padding: 14,
    marginRight: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularImage: {
    width: 92,
    height: 92,
    borderRadius: 24,
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
    marginTop: 4,
    fontSize: 26 / 1.6,
    color: '#73737C',
    fontWeight: '500',
  },
  useCaseTitle: {
    marginTop: 38,
  },
  useCaseRow: {
    paddingTop: 16,
    paddingHorizontal: 22,
    paddingBottom: 2,
  },
  useCaseCard: {
    width: 180,
    borderRadius: 30,
    backgroundColor: '#EFEFF1',
    borderWidth: 1,
    borderColor: '#E4E4E8',
    padding: 20,
    marginRight: 14,
    justifyContent: 'space-between',
    minHeight: 150,
  },
  useCaseText: {
    marginTop: 24,
    fontSize: 34 / 1.6,
    fontWeight: '700',
    color: '#20202A',
  },
  reviewsTitle: {
    marginTop: 48,
  },
});

