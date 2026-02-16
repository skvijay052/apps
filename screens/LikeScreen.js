import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 30) / 1; // 2 columns with padding

export default function LikesScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('received'); // 'received' or 'sent'
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for received likes
  const [receivedLikes, setReceivedLikes] = useState([
    {
      id: 1,
      name: 'Ananya Reddy',
      age: 26,
      photo: 'https://randomuser.me/api/portraits/women/5.jpg',
      country: 'India',
      caste: 'Naidu',
      state: 'Andhra Pradesh',
      job: 'Doctor',
      city: 'Hyderabad',
      matchScore: 92,
      education: 'MBBS',
      height: '5\'4"',
      isPremium: true,
      isOnline: true,
      likedAt: '2 hours ago',
      bio: 'Passionate about healthcare and helping people...',
    },
    {
      id: 2,
      name: 'Priya Singh',
      age: 25,
      photo: 'https://randomuser.me/api/portraits/women/6.jpg',
      country: 'India',
      caste: 'Naidu',
      state: 'Andhra Pradesh',
      job: 'Teacher',
      city: 'Delhi',
      matchScore: 88,
      education: 'B.Ed, M.A.',
      height: '5\'3"',
      isPremium: false,
      isOnline: false,
      likedAt: '5 hours ago',
      bio: 'Love teaching and making a difference...',
    },
    {
      id: 3,
      name: 'Divya Patel',
      age: 27,
      photo: 'https://randomuser.me/api/portraits/women/7.jpg',
      country: 'India',
      caste: 'Naidu',
      state: 'Andhra Pradesh',
      job: 'Software Engineer',
      city: 'Bangalore',
      matchScore: 95,
      education: 'B.Tech, IIT',
      height: '5\'5"',
      isPremium: true,
      isOnline: true,
      likedAt: '1 day ago',
      bio: 'Tech enthusiast, love coding and innovation...',
    },
    {
      id: 4,
      name: 'Neha Sharma',
      age: 24,
      photo: 'https://randomuser.me/api/portraits/women/8.jpg',
      country: 'India',
      caste: 'Naidu',
      state: 'Andhra Pradesh',
      job: 'Marketing Manager',
      city: 'Mumbai',
      matchScore: 85,
      education: 'MBA',
      height: '5\'6"',
      isPremium: false,
      isOnline: false,
      likedAt: '2 days ago',
      bio: 'Creative marketer with passion for brands...',
    },
    {
      id: 5,
      name: 'Riya Gupta',
      age: 28,
      photo: 'https://randomuser.me/api/portraits/women/9.jpg',
      country: 'India',
      caste: 'Naidu',
      state: 'Andhra Pradesh',
      job: 'Architect',
      city: 'Pune',
      matchScore: 90,
      education: 'B.Arch',
      height: '5\'5"',
      isPremium: true,
      isOnline: true,
      likedAt: '3 days ago',
      bio: 'Designing spaces that inspire...',
    },
  ]);

  // Mock data for sent likes
  const [sentLikes, setSentLikes] = useState([
    {
      id: 6,
      name: 'Rahul Verma',
      age: 29,
      photo: 'https://randomuser.me/api/portraits/men/1.jpg',
      country: 'India',
      caste: 'Naidu',
      state: 'Andhra Pradesh',
      job: 'Business Analyst',
      city: 'Bangalore',
      matchScore: 87,
      education: 'MBA',
      height: '5\'10"',
      isPremium: false,
      isOnline: false,
      likedAt: '1 hour ago',
      status: 'pending', // pending, accepted, rejected
    },
    {
      id: 7,
      name: 'Arjun Kumar',
      age: 30,
      photo: 'https://randomuser.me/api/portraits/men/2.jpg',
      country: 'India',
      caste: 'Naidu',
      state: 'Andhra Pradesh',
      job: 'Product Manager',
      city: 'Delhi',
      matchScore: 91,
      education: 'B.Tech, IIT',
      height: '6\'0"',
      isPremium: true,
      isOnline: true,
      likedAt: '6 hours ago',
      status: 'pending',
    },
    {
      id: 8,
      name: 'Vikram Shah',
      age: 28,
      photo: 'https://randomuser.me/api/portraits/men/3.jpg',
      country: 'India',
      caste: 'Naidu',
      state: 'Andhra Pradesh',
      job: 'Consultant',
      city: 'Mumbai',
      matchScore: 89,
      education: 'MBA',
      height: '5\'11"',
      isPremium: false,
      isOnline: false,
      likedAt: '2 days ago',
      status: 'accepted',
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleAcceptLike = (profileId) => {
    // TODO: Call API to accept like/interest
    console.log('Accepted:', profileId);
    
    // Show match animation
    navigation.navigate('MatchAnimation', { profileId });
  };

  const handleRejectLike = (profileId) => {
    // TODO: Call API to reject like
    setReceivedLikes(receivedLikes.filter(like => like.id !== profileId));
  };

  const handleViewProfile = (profile) => {
    navigation.navigate('ViewProfile', { profile });
  };

  const handleSendMessage = (profileId) => {
    navigation.navigate('Chat', { conversationId: profileId });
  };

  const renderReceivedLikeCard = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handleViewProfile(item)}
      >
        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.photo }} style={styles.profileImage} />
          
          {/* Match Score Badge */}
          <View style={styles.matchScoreBadge}>
            <View style={styles.onlineIndicator} />
            <Text style={styles.matchScoreText}>Online</Text>
          </View>

          {/* Online Status */}
          {item.isOnline && (
            <View style={styles.onlineIndicator} />
          )} 

          {/* Gradient Overlay */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageGradient}
          />

          {/* Profile Info on Image */}
          <View style={styles.imageOverlay}>
            <View style={styles.nameRow}>
              <Text style={styles.cardName}>{item.name}, {item.age}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="briefcase-outline" size={12} color="#FFF" />
              <Text style={styles.overlayText}>{item.job}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={12} color="#FFF" />
              <Text style={styles.overlayText}>{item.city}</Text>
            </View>
          </View>
        </View>

        {/* Card Details */}
        <View style={styles.cardDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="school-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.education}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="resize-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.height}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.detailText}>Liked {item.likedAt}</Text>
          </View>
        </View>

        {/* Bio Preview */}
        <Text style={styles.bioPreview} numberOfLines={2}>
          {item.bio}
        </Text>
      </TouchableOpacity>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => handleRejectLike(item.id)}
          activeOpacity={0.8}
        >
          <Ionicons name="close" size={28} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewProfileButton}
          onPress={() => handleViewProfile(item)}
          activeOpacity={0.8}
        >
          <Ionicons name="person-outline" size={20} color="#000000" />
          <Text style={styles.viewProfileText}>View Full Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => handleAcceptLike(item.id)}
          activeOpacity={0.8}
        >
          <Ionicons name="heart-outline" size={28} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSentLikeCard = ({ item }) => (
    // <View style={styles.sentCard}>
    //   <TouchableOpacity
    //     style={styles.sentCardContent}
    //     activeOpacity={0.7}
    //     onPress={() => handleViewProfile(item)}
    //   >
    //       
    //     <View style={styles.sentCardInfo}> 
    //       <View style={styles.sentDetailRow}>
    //         <Ionicons name="briefcase-outline" size={12} color="#666" />
    //         <Text style={styles.sentDetailText}>{item.job}</Text>
    //       </View>
          
    //       <View style={styles.sentDetailRow}>
    //         <Ionicons name="location-outline" size={12} color="#666" />
    //         <Text style={styles.sentDetailText}>{item.location}</Text>
    //       </View>

    //       <View style={styles.sentDetailRow}>
    //         <Ionicons name="heart" size={12} color="#000000" />
    //         <Text style={styles.sentDetailText}>{item.matchScore}% Match</Text>
    //       </View>

    //       <View style={styles.statusContainer}>
    //         {item.status === 'pending' && (
    //           <View style={styles.statusBadge}>
    //             <Ionicons name="time-outline" size={12} color="#FF9800" />
    //             <Text style={[styles.statusText, { color: '#FF9800' }]}>
    //               Pending
    //             </Text>
    //           </View>
    //         )}
    //         {item.status === 'accepted' && (
    //           <View style={[styles.statusBadge, { backgroundColor: '#E8F5E9' }]}>
    //             <Ionicons name="checkmark-circle" size={12} color="#4CAF50" />
    //             <Text style={[styles.statusText, { color: '#4CAF50' }]}>
    //               Matched!
    //             </Text>
    //           </View>
    //         )}
    //       </View>
    //     </View>

    //     {item.status === 'accepted' && (
    //       <TouchableOpacity
    //         style={styles.messageButton}
    //         onPress={() => handleSendMessage(item.id)}
    //       >
    //         <Ionicons name="chatbubble" size={20} color="#000000" />
    //       </TouchableOpacity>
    //     )}
    //   </TouchableOpacity>

    //   <Text style={styles.sentTime}>Sent {item.likedAt}</Text>
    // </View>
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
        <Text style={styles.descContent}>{item.age} Yrs, {item.height} cm</Text> 
           <View style={styles.sentNameRow}> 
         </View>
        <View style={styles.locationRow}> 
            <Text style={styles.cardPlace}>{item.job}, {item.city}</Text>
        </View> 
        <View style={styles.locationRow}> 
            <Text style={styles.cardPlace}>{item.state}, {item.country}</Text>
        </View>  
        <View><Text style={styles.sentTime}>Sent {item.likedAt}</Text></View>
      </View> 
       <View style={styles.statusContainer}>
        {item.status === 'pending' && (
          <View style={styles.statusBadge}>
            <Ionicons name="time-outline" size={12} color="#FF9800" />
            <Text style={[styles.statusText, { color: '#FF9800' }]}>
              Pending
            </Text>
          </View>
        )}
        {item.status === 'accepted' && (
          <View style={[styles.statusBadge, { backgroundColor: '#E8F5E9' }]}>
            <Ionicons name="checkmark-circle" size={12} color="#4CAF50" />
            <Text style={[styles.statusText, { color: '#4CAF50' }]}>
              Matched!
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Likes & Interests</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'received' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('received')}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'received' && styles.activeTabText,
            ]}
          >
            Received ({receivedLikes.length})
          </Text>
          {activeTab === 'received' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'sent' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('sent')}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'sent' && styles.activeTabText,
            ]}
          >
            Sent ({sentLikes.length})
          </Text>
          {activeTab === 'sent' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'received' ? (
        receivedLikes.length > 0 ? (
          <FlatList
            data={receivedLikes}
            renderItem={renderReceivedLikeCard}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#000000']}
                tintColor="#000000"
              />
            }
          />
        ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="people-outline" size={80} color="#CCC" />
          <Text style={styles.emptyTitle}>No Profiles Found</Text>
          <Text style={styles.emptySubtitle}>
            Try adjusting your filters or check back later
          </Text>
        </View>
        )
      ) : (
        sentLikes.length > 0 ? (
          <FlatList
            data={sentLikes}
            renderItem={renderSentLikeCard}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.sentListContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#000000']}
                tintColor="#000000"
              />
            }
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="send-outline" size={80} color="#DDD" />
            <Text style={styles.emptyTitle}>No Likes Sent</Text>
            <Text style={styles.emptySubtitle}>
              Start exploring and send likes to profiles you're interested in
            </Text>
            <TouchableOpacity
              style={styles.exploreButton}
              onPress={() => navigation.navigate('Browse')}
              activeOpacity={0.8}
            >
              <Ionicons name="search" size={20} color="#FFF" />
              <Text style={styles.exploreButtonText}>
                Explore Matches
              </Text>
            </TouchableOpacity>
          </View>
        )
      )} 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, 
    paddingTop: 50,
    paddingBottom: 15, 
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  filterButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5', 
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {
    // Active tab styling
  },
  tabText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000000',
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#000000',
  },
  listContent: {
    padding: 16,
  }, 
  popularCard: {
    width: CARD_WIDTH,
    height: 'auto',
    borderRadius: 15, 
    backgroundColor: '#ffffffe6',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.58)',
    padding: 14,
    marginRight: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
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
  card: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.58)',
    borderRadius: 16,
    marginBottom: 20,  
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 400,
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  matchScoreBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
  },
  matchScoreText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  onlineIndicator: { 
    width: 8,
    height: 8,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  premiumBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  }, 
  descContent: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000',
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  overlayText: {
    color: '#FFF',
    fontSize: 14,
  },
  cardDetails: {
    padding: 16,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  bioPreview: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 12,
  },
  rejectButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    borderColor: '#66666627',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  acceptButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    borderColor: '#66666627',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  viewProfileButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#66666627',
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 28,
    gap: 8,
  },
  viewProfileText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '600',
  },
  sentListContent: {
    padding: 16,
  },
  sentCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sentCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sentProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  sentOnlineIndicator: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  sentCardInfo: {
    flex: 1,
    gap: 4,
  },
  sentNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  sentDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sentDetailText: {
    fontSize: 13,
    color: '#666',
  },
  statusContainer: {
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  messageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sentTime: {
    fontSize: 12,
    color: '#999', 
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 24,
    gap: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  upgradeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 24,
    gap: 8,
  },
  exploreButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  premiumBanner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  premiumBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  premiumBannerText: {
    flex: 1,
  },
  premiumBannerTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  premiumBannerSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    marginTop: 2,
  },
  premiumBannerButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  premiumBannerButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
});