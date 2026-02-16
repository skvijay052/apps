import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../config/firebase';
import useStore from '../store/useStore';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileDetailScreen({ navigation, route }) {
  const selectedProfile = route?.params?.profile;
  const logout = useStore(state => state.logout);
  const currentUser = useStore(state => state.user);

  // Static user data
  const [user] = useState({
    id: selectedProfile?.id ?? currentUser?.id ?? 1,
    name: selectedProfile?.name ?? currentUser?.name ?? 'Priya Sharma',
    age: selectedProfile?.age ?? 27,
    gender: selectedProfile?.gender ?? currentUser?.gender ?? 'Female',
    profession: selectedProfile?.job ?? 'Software Engineer',
    company: 'Google India',
    education: 'B.Tech, Computer Science',
    college: 'IIT Delhi',
    location: selectedProfile ? `${selectedProfile.city}, ${selectedProfile.state}` : 'Bangalore, Karnataka',
    height: selectedProfile?.height ?? '5\'5"',
    religion: 'Hindu',
    caste: 'Brahmin',
    motherTongue: 'Hindi',
    maritalStatus: 'Never Married',
    bio: selectedProfile?.bio ?? 'Ambitious, family-oriented software engineer looking for a life partner who values both career and family. Love traveling, reading, and cooking.',
    photos: [
      selectedProfile?.photo ?? 'https://randomuser.me/api/portraits/women/1.jpg'
    ],
    verified: true,
    premium: true,
    
    // Additional Details
    familyType: 'Nuclear Family',
    fatherOccupation: 'Business',
    motherOccupation: 'Homemaker',
    siblings: '1 Sister (Married)',
    familyValues: 'Traditional',
    
    // Lifestyle
    diet: 'Vegetarian',
    drinking: 'No',
    smoking: 'No',
    
    // Interests
    interests: ['Reading', 'Traveling', 'Cooking', 'Yoga', 'Photography'],
    
    // Stats
    profileViews: 1250,
    matchesCount: 45,
    interestsReceived: 120,
    
    // Preferences
    lookingFor: {
      ageRange: '27-32',
      heightRange: '5\'8" - 6\'2"',
      education: 'Graduate & Above',
      occupation: 'Professional',
      location: 'Bangalore, Mumbai, Delhi',
    },
  }); 

  const handleEditProfile = () => {
    navigation.navigate('EditProfile', { user });
  };

  const handleSettings = () => {
    navigation.navigate('Setting');
  };

  const InfoRow = ({ icon, label, value }) => (
    <View style={styles.infoRow}>
      <View style={styles.infoLeft}>
        <Ionicons name={icon} size={20} color="#666" />
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  ); 
   
  const SectionTitle = ({ title }) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );

  const MenuItem = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Ionicons name={icon} size={20} color="#666" />
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      <View style={styles.menuItemRight}>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}> 
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('Main', { screen: 'Home' });
            }
          }}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="#666" />
        </TouchableOpacity>
        <View style={styles.headerLeft}> 
           <Image 
              source={require('../assets/icons/text-logo-transparent.png')}
              style={styles.logoText} /> 
        </View> 
      </View>

     {/* Profile Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: user.photos[0] }} style={styles.profileImage} /> 
          {/* Match Score Badge */}
          <View style={styles.matchScoreBadge}>
            <View style={styles.onlineIndicator} />
            <Text style={styles.matchScoreText}>Online</Text>
          </View> 
           
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageGradient}
          />

          {/* Profile Info on Image */}
          <View style={styles.imageOverlay}>
            <View style={styles.nameRow}>
              <Text style={styles.cardName}>{user.name}, <Text style={styles.overlayText}>{user.age} Yrs</Text></Text>
            </View>
            <View style={styles.infoOverflowRow}>
              <Ionicons name="briefcase-outline" size={12} color="#FFF" />
              <Text style={styles.overlayText}>{user.profession}</Text>
            </View>
            <View style={styles.infoOverflowRow}>
              <Ionicons name="location-outline" size={12} color="#FFF" />
              <Text style={styles.overlayText}>{user.location}</Text>
            </View>
          </View>
        </View>


      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>  
          <View style={styles.profileActionRow}>
            <TouchableOpacity 
              style={[styles.profileActionBtn, styles.editBtn]} 
              activeOpacity={0.8}
              onPress={handleEditProfile}
            >
              <Text style={styles.editBtnText}>Send Insterest</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.profileActionBtn} 
              activeOpacity={0.8}
              onPress={() => navigation.navigate('UploadPhotos')}
            >
              <Text style={styles.profileActionText}>Contact Number</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconActionBtn}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Setting')}
            >
              <Ionicons name="logo-whatsapp" size={18} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.sectionAbout}>
          <SectionTitle title="About Me" />
          <Text style={styles.bioText}>{user.bio}</Text>
        </View>

        {/* Basic Details */}
        <View style={styles.section}>
          <SectionTitle title="Basic Details" />
          <InfoRow icon="person-outline" label="Age" value={`${user.age} years`} />
          <InfoRow icon="resize-outline" label="Height" value={user.height} />
          <InfoRow icon="briefcase-outline" label="Profession" value={user.profession} />
          <InfoRow icon="business-outline" label="Company" value={user.company} />
          <InfoRow icon="school-outline" label="Education" value={user.education} />
          <InfoRow icon="location-outline" label="Location" value={user.location} />
          <InfoRow icon="heart-outline" label="Marital Status" value={user.maritalStatus} />
        </View>

        {/* Religious Background */}
        <View style={styles.section}>
          <SectionTitle title="Religious Background" />
          <InfoRow icon="moon-outline" label="Religion" value={user.religion} />
          <InfoRow icon="people-outline" label="Caste" value={user.caste} />
          <InfoRow icon="language-outline" label="Mother Tongue" value={user.motherTongue} />
        </View>

        {/* Family Details */}
        <View style={styles.section}>
          <SectionTitle title="Family Details" />
          <InfoRow icon="home-outline" label="Family Type" value={user.familyType} />
          <InfoRow icon="male-outline" label="Father's Occupation" value={user.fatherOccupation} />
          <InfoRow icon="female-outline" label="Mother's Occupation" value={user.motherOccupation} />
          <InfoRow icon="people-circle-outline" label="Siblings" value={user.siblings} />
          <InfoRow icon="heart-circle-outline" label="Family Values" value={user.familyValues} />
        </View>

        {/* Lifestyle */}
        <View style={styles.section}>
          <SectionTitle title="Lifestyle" />
          <InfoRow icon="restaurant-outline" label="Diet" value={user.diet} />
          <InfoRow icon="wine-outline" label="Drinking" value={user.drinking} />
          <InfoRow icon="cloud-outline" label="Smoking" value={user.smoking} />
        </View>

        {/* Interests & Hobbies */}
        <View style={styles.section}>
          <SectionTitle title="Interests & Hobbies" />
          <View style={styles.interestsContainer}>
            {user.interests.map((interest, index) => (
              <View key={index} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Partner Preferences */}
        <View style={styles.section}>
          <SectionTitle title="Partner Preferences" />
          <InfoRow icon="calendar-outline" label="Age" value={user.lookingFor.ageRange} />
          <InfoRow icon="resize-outline" label="Height" value={user.lookingFor.heightRange} />
          <InfoRow icon="school-outline" label="Education" value={user.lookingFor.education} />
          <InfoRow icon="briefcase-outline" label="Occupation" value={user.lookingFor.occupation} />
          <InfoRow icon="location-outline" label="Location" value={user.lookingFor.location} />
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,  
  }, 
  headerLeft:{
    display: 'flex', 
    width: 300,
  },
  logoText: {
    width: 150,
    height: 40,
  },
  backButton: {
    padding: 4,
  },
  settingsButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 14,
    marginTop: 14,
    marginBottom: 14,
    padding: 14,
    borderRadius: 14,
  },
  profileTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 98,
    height: 98,
    borderRadius: 49,
    borderWidth: 3,
    borderColor: '#000',
  },
  profileStatsRow: {
    flex: 1,
    marginLeft: 14,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  profileStatCol: {
    alignItems: 'center',
  },
  profileStatValue: {
    fontSize: 23,
    fontWeight: '700',
    color: '#1C1C1C',
  },
  profileStatKey: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  profileNameRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
  },
  premiumBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  premiumBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  profileRole: {
    marginTop: 2,
    fontSize: 16,
    color: '#6E6E6E',
  },
  profileBio: {
    marginTop: 6,
    fontSize: 16,
    color: '#2E2E2E',
    lineHeight: 22,
  },
  profileActionRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profileActionBtn: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  editBtn: {
    backgroundColor: '#000000',
  },
  editBtnText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 15,
  },
  profileActionText: {
    color: '#2D2D2D',
    fontWeight: '600',
    fontSize: 15,
  },
  iconActionBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionAbout:{
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
  },
  section: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  bioText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  infoOverflowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  }, 
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: 15,
    color: '#666',
    marginLeft: 12,
  },
  infoValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: '#EFEFF1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  interestText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  editPreferencesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    gap: 8,
  },
  editPreferencesText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    gap: 12,
  },
  actionText: {
    flex: 1,
    fontSize: 15,
    color: '#666',
  },
  menu: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 15,
    color: '#666',
    marginLeft: 15,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
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
});
