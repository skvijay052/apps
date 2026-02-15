import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import useStore from '../store/useStore';

const { width } = Dimensions.get('window');

export default function ProfileScreen({ navigation, route }) {
  // Mock user data - replace with actual data from API/context
  const [user, setUser] = useState({
    id: 1,
    name: 'Priya Sharma',
    age: 27,
    gender: 'Female',
    profession: 'Software Engineer',
    company: 'Google India',
    education: 'B.Tech, Computer Science',
    college: 'IIT Delhi',
    location: 'Bangalore, Karnataka',
    height: '5\'5"',
    religion: 'Hindu',
    caste: 'Brahmin',
    motherTongue: 'Hindi',
    maritalStatus: 'Never Married',
    bio: 'Ambitious, family-oriented software engineer looking for a life partner who values both career and family. Love traveling, reading, and cooking.',
    photos: [
      'https://randomuser.me/api/portraits/women/1.jpg'
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
  const logout = useStore(state => state.logout);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout, style: 'destructive' },
      ]
    );
  };


  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
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

    const MenuItem = ({ icon, title, onPress, showBadge }) => (
      <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <View style={styles.menuItemLeft}>
          <Ionicons name={icon} size={24} color="#333" />
          <Text style={styles.menuItemText}>{title}</Text>
        </View>
        <View style={styles.menuItemRight}>
          {showBadge && <View style={styles.premiumBadge}><Text style={styles.premiumText}>PRO</Text></View>}
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
      </TouchableOpacity>
    );
    
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleSettings}
        >
          <Ionicons name="settings-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Photos Section */}
        <View style={styles.photosSection}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.photosScroll}
          >
            {user.photos.map((photo, index) => (
              <View key={index} style={styles.photoContainer}>
                <Image
                  source={{ uri: photo }}
                  style={styles.photo}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.6)']}
                  style={styles.photoGradient}
                />
              </View>
            ))}
          </ScrollView>

          {/* Photo Counter */}
          <View style={styles.photoCounter}>
            <Text style={styles.photoCounterText}>
              1 / {user.photos.length}
            </Text>
          </View>

          {/* Profile Info Overlay */}
          <View style={styles.profileOverlay}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{user.name}, {user.age}</Text>
              {user.verified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                </View>
              )}
            </View>
            <View style={styles.quickInfo}>
              <View style={styles.quickInfoItem}>
                <Ionicons name="business-outline" size={16} color="#FFF" />
                <Text style={styles.quickInfoText}>{user.profession}</Text>
              </View>
              <View style={styles.quickInfoItem}>
                <Ionicons name="location-outline" size={16} color="#FFF" />
                <Text style={styles.quickInfoText}>{user.location}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEditProfile}
          activeOpacity={0.8}
        >
          <Ionicons name="create-outline" size={20} color="#E91E63" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Premium Badge */}
        {user.premium && (
          <View style={styles.premiumBanner}>
            <Ionicons name="diamond" size={20} color="#FFD700" />
            <Text style={styles.premiumText}>Premium Member</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Premium')}
            >
              <Text style={styles.premiumLink}>Manage</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.profileViews}</Text>
            <Text style={styles.statLabel}>Profile Views</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.matchesCount}</Text>
            <Text style={styles.statLabel}>Matches</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.interestsReceived}</Text>
            <Text style={styles.statLabel}>Interests</Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
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
          
          <TouchableOpacity
            style={styles.editPreferencesButton}
            onPress={() => navigation.navigate('EditPreferences')}
            activeOpacity={0.8}
          >
            <Text style={styles.editPreferencesText}>Edit Preferences</Text>
            <Ionicons name="chevron-forward" size={20} color="#E91E63" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <SectionTitle title="Quick Actions" />
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('ManagePhotos')}
            activeOpacity={0.7}
          >
            <Ionicons name="images-outline" size={24} color="#E91E63" />
            <Text style={styles.actionText}>Manage Photos</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Verification')}
            activeOpacity={0.7}
          >
            <Ionicons name="shield-checkmark-outline" size={24} color="#E91E63" />
            <Text style={styles.actionText}>Verify Profile</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('PrivacySettings')}
            activeOpacity={0.7}
          >
            <Ionicons name="lock-closed-outline" size={24} color="#E91E63" />
            <Text style={styles.actionText}>Privacy Settings</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('BlockedUsers')}
            activeOpacity={0.7}
          >
            <Ionicons name="ban-outline" size={24} color="#E91E63" />
            <Text style={styles.actionText}>Blocked Users</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />

          {/* Menu */}
        <View style={styles.menu}>
          <MenuItem icon="settings-outline" title="Settings" onPress={() => navigation.navigate('Setting')} />
          <MenuItem icon="shield-checkmark-outline" title="Safety & Privacy" onPress={() => navigation.navigate('Setting')} />
          <MenuItem icon="heart-outline" title="My Likes" onPress={() => navigation.navigate('LikesScreen')} />
          <MenuItem icon="notifications-outline" title="Notifications" onPress={() => navigation.navigate('Notifications')} />
          <MenuItem icon="help-circle-outline" title="Help & Support" onPress={() => navigation.navigate('HelpsupportScreen')} />
          <MenuItem icon="information-circle-outline" title="About" onPress={() => navigation.navigate('AboutScreen')} />
          <MenuItem icon="log-out-outline" title="Logout" onPress={handleLogout} />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  settingsButton: {
    padding: 8,
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
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 10,
  },
  premiumText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
  },
  content: {
    flex: 1,
  },
  photosSection: {
    height: 480,
    position: 'relative',
  },
  photosScroll: {
    flex: 1,
  },
  photoContainer: {
    width: width,
    height: 480,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  photoCounter: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  photoCounterText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  profileOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginRight: 8,
  },
  verifiedBadge: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 2,
  },
  quickInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  quickInfoText: {
    color: '#FFF',
    fontSize: 14,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginTop: -24,
    marginBottom: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E91E63',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editButtonText: {
    color: '#E91E63',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  premiumText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  premiumLink: {
    color: '#FFF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E91E63',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  section: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
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
    backgroundColor: '#FFE8F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  interestText: {
    color: '#E91E63',
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
    borderColor: '#E91E63',
    borderRadius: 8,
    gap: 8,
  },
  editPreferencesText: {
    color: '#E91E63',
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
    fontSize: 16,
    color: '#333',
  },
});