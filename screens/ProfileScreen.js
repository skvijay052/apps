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
import useStore from '../store/useStore';
import { supabase } from '../config/supabase';

export default function ProfileScreen({ navigation, route }) {
  // Mock user data - replace with actual data from API/context
  const [user] = useState({
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
  
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            const { error } = await supabase.auth.signOut();

            if (error) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
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

  const MenuItem = ({ icon, title, onPress, showBadge }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Ionicons name={icon} size={20} color="#666" />
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      <View style={styles.menuItemRight}>
        {showBadge && <View style={styles.premiumBadge}><Text style={styles.premiumBadgeText}>PRO</Text></View>}
        <Ionicons name="chevron-forward" size={20} color="#666" />
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
        <View style={styles.profileCard}>
          <View style={styles.profileTopRow}>
            <Image
              source={{ uri: user.photos[0] }}
              style={styles.avatar}
              resizeMode="cover"
            />
            <View style={styles.profileStatsRow}>
              <View style={styles.profileStatCol}>
                <Text style={styles.profileStatValue}>3,022</Text>
                <Text style={styles.profileStatKey}>Posts</Text>
              </View>
              <View style={styles.profileStatCol}>
                <Text style={styles.profileStatValue}>67.6K</Text>
                <Text style={styles.profileStatKey}>Followers</Text>
              </View>
              <View style={styles.profileStatCol}>
                <Text style={styles.profileStatValue}>2,454</Text>
                <Text style={styles.profileStatKey}>Following</Text>
              </View>
            </View>
          </View>

          <View style={styles.profileNameRow}>
            <Text style={styles.profileName}>{user.name}</Text>
            {user.verified && (
              <Ionicons name="checkmark-circle" size={18} color="#2DBE60" />
            )}
          </View>
          <Text style={styles.profileRole}>Digital creator</Text>
          <Text style={styles.profileBio} numberOfLines={3}>{user.bio}</Text>

          <View style={styles.profileActionRow}>
            <TouchableOpacity style={[styles.profileActionBtn, styles.followBtn]} activeOpacity={0.8}>
              <Text style={styles.followBtnText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileActionBtn} activeOpacity={0.8}>
              <Text style={styles.profileActionText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileActionBtn} activeOpacity={0.8}>
              <Text style={styles.profileActionText}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconActionBtn}
              activeOpacity={0.8}
              onPress={handleEditProfile}
            >
              <Ionicons name="create-outline" size={18} color="#333" />
            </TouchableOpacity>
          </View>
        </View> 

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
            <Ionicons name="chevron-forward" size={20} color="#000" />
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
            <Ionicons name="images-outline" size={20} color="#666" />
            <Text style={styles.actionText}>Manage Photos</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Verification')}
            activeOpacity={0.7}
          >
            <Ionicons name="shield-checkmark-outline" size={20} color="#666" />
            <Text style={styles.actionText}>Verify Profile</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('PrivacySettings')}
            activeOpacity={0.7}
          >
            <Ionicons name="lock-closed-outline" size={20} color="#666" />
            <Text style={styles.actionText}>Privacy Settings</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('BlockedUsers')}
            activeOpacity={0.7}
          >
            <Ionicons name="ban-outline" size={20} color="#666" />
            <Text style={styles.actionText}>Blocked Users</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View> 

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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15, 
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  settingsButton: {
    padding: 4,
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
  profileCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 14,
    marginTop: 0,
    marginBottom: 14,
    marginTop: 14,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.58)',
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
    borderColor: '#ff7092',
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
  followBtn: {
    backgroundColor: '#000000',
  },
  followBtnText: {
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
  premiumBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
  },
  premiumBannerText: {
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
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  statLabel: { 
    fontSize: 15,
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
    backgroundColor: '#EFEFF1',
    borderColor: 'rgba(255, 255, 255, 0.58)',
    borderWidth: 1,
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
    '&:last-child': {
      borderBottomWidth: 0,
    },
  },
  actionText: {
    flex: 1, 
    fontSize: 15,
    color: '#666', 
  },
});
