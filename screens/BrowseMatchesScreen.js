import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import useStore from '../store/useStore';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = 120;

// Mock data - replace with real API data
const MOCK_PROFILES = [
  {
    id: 1,
    name: 'Sarah',
    age: 28,
    bio: 'Adventure seeker | Coffee enthusiast ☕',
    distance: 5,
    photos: ['https://picsum.photos/400/600?random=1'],
    interests: ['Travel', 'Photography', 'Yoga'],
  },
  {
    id: 2,
    name: 'Emily',
    age: 26,
    bio: 'Artist & dreamer 🎨 Love hiking and good conversations',
    distance: 8,
    photos: ['https://picsum.photos/400/600?random=2'],
    interests: ['Art', 'Hiking', 'Music'],
  },
  {
    id: 3,
    name: 'Jessica',
    age: 30,
    bio: 'Fitness trainer | Dog mom 🐕',
    distance: 3,
    photos: ['https://picsum.photos/400/600?random=3'],
    interests: ['Fitness', 'Pets', 'Cooking'],
  },
];

export default function BrowseMatchesScreen({ navigation }) {
  const [profiles, setProfiles] = useState(MOCK_PROFILES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const addLike = useStore(state => state.addLike);
  const addMatch = useStore(state => state.addMatch);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          swipeRight();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          swipeLeft();
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const swipeRight = () => {
    Animated.timing(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => onSwipeComplete('like'));
  };

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => onSwipeComplete('pass'));
  };

  const onSwipeComplete = (action) => {
    const profile = profiles[currentIndex];
    
    if (action === 'like') {
      addLike(profile.id);
      // Simulate match (30% chance)
      if (Math.random() > 0.7) {
        addMatch(profile);
        // Show match notification
      }
    }

    position.setValue({ x: 0, y: 0 });
    setCurrentIndex(currentIndex + 1);
  };

  const handleLike = () => swipeRight();
  const handlePass = () => swipeLeft();

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: ['-30deg', '0deg', '30deg'],
      extrapolate: 'clamp',
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  const getLikeOpacity = () => {
    return position.x.interpolate({
      inputRange: [0, SWIPE_THRESHOLD],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
  };

  const getNopeOpacity = () => {
    return position.x.interpolate({
      inputRange: [-SWIPE_THRESHOLD, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
  };

  if (currentIndex >= profiles.length) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="heart-dislike-outline" size={80} color="#CCC" />
        <Text style={styles.emptyTitle}>No More Profiles</Text>
        <Text style={styles.emptySubtitle}>Check back later for new matches!</Text>
      </View>
    );
  }

  const currentProfile = profiles[currentIndex];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>💘 Dating App</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Notifications')}
          style={styles.notificationButton}
        >
          <Ionicons name="notifications-outline" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Cards Stack */}
      <View style={styles.cardContainer}>
        {profiles.slice(currentIndex, currentIndex + 2).map((profile, index) => {
          if (index === 0) {
            return (
              <Animated.View
                key={profile.id}
                style={[styles.card, getCardStyle()]}
                {...panResponder.panHandlers}
              >
                <Image source={{ uri: profile.photos[0] }} style={styles.cardImage} />
                
                {/* Like/Nope Overlays */}
                <Animated.View style={[styles.likeOverlay, { opacity: getLikeOpacity() }]}>
                  <Text style={styles.likeText}>LIKE</Text>
                </Animated.View>
                <Animated.View style={[styles.nopeOverlay, { opacity: getNopeOpacity() }]}>
                  <Text style={styles.nopeText}>NOPE</Text>
                </Animated.View>

                {/* Info Gradient */}
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.9)']}
                  style={styles.infoGradient}
                >
                  <View style={styles.infoContainer}>
                    <View style={styles.nameRow}>
                      <Text style={styles.name}>{profile.name}, {profile.age}</Text>
                      <TouchableOpacity 
                        style={styles.infoButton}
                        onPress={() => navigation.navigate('MatchDetails', { profile })}
                      >
                        <Ionicons name="information-circle" size={28} color="#FFF" />
                      </TouchableOpacity>
                    </View>
                    
                    <View style={styles.bioRow}>
                      <Ionicons name="location" size={16} color="#FFF" />
                      <Text style={styles.distance}>{profile.distance} km away</Text>
                    </View>
                    
                    <Text style={styles.bio} numberOfLines={2}>{profile.bio}</Text>
                    
                    <View style={styles.interestsRow}>
                      {profile.interests.slice(0, 3).map((interest, i) => (
                        <View key={i} style={styles.interestTag}>
                          <Text style={styles.interestText}>{interest}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </LinearGradient>
              </Animated.View>
            );
          }

          // Next card preview
          return (
            <View key={profile.id} style={[styles.card, styles.nextCard]}>
              <Image source={{ uri: profile.photos[0] }} style={styles.cardImage} />
            </View>
          );
        })}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={[styles.actionButton, styles.passButton]} onPress={handlePass}>
          <Ionicons name="close" size={32} color="#FF6B6B" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.superLikeButton]}>
          <Ionicons name="star" size={28} color="#4FC3F7" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.likeButton]} onPress={handleLike}>
          <Ionicons name="heart" size={32} color="#4CAF50" />
        </TouchableOpacity>
      </View>
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
    paddingBottom: 10,
    backgroundColor: '#FFF',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  notificationButton: {
    padding: 5,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH - 40,
    height: SCREEN_HEIGHT - 300,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextCard: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  likeOverlay: {
    position: 'absolute',
    top: 50,
    left: 30,
    transform: [{ rotate: '-20deg' }],
    borderWidth: 4,
    borderColor: '#4CAF50',
    borderRadius: 10,
    padding: 10,
  },
  likeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  nopeOverlay: {
    position: 'absolute',
    top: 50,
    right: 30,
    transform: [{ rotate: '20deg' }],
    borderWidth: 4,
    borderColor: '#FF6B6B',
    borderRadius: 10,
    padding: 10,
  },
  nopeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  infoGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 250,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  infoButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  distance: {
    fontSize: 14,
    color: '#FFF',
    marginLeft: 5,
  },
  bio: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 12,
    lineHeight: 22,
  },
  interestsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  passButton: {
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  likeButton: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  superLikeButton: {
    borderWidth: 2,
    borderColor: '#4FC3F7',
    width: 55,
    height: 55,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
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
  },
});