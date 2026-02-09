// SettingsScreen.js - Complete Settings Screen
// Place this in: src/screens/SettingsScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation, route }) {
  // Settings State
  const [settings, setSettings] = useState({
    // Account Settings
    profileVisibility: true,
    showOnlineStatus: true,
    allowProfileDownload: false,
    
    // Privacy Settings
    showPhoneNumber: false,
    showEmail: false,
    whoCanViewProfile: 'everyone', // everyone, premium, mutual
    whoCanMessage: 'matches', // everyone, matches, premium
    
    // Notification Settings
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    matchNotifications: true,
    messageNotifications: true,
    profileViewNotifications: true,
    interestNotifications: true,
    
    // App Preferences
    autoPlayVideos: false,
    darkMode: false,
    languagePreference: 'English',
    
    // Safety
    blockList: [],
    twoFactorAuth: false,
  });

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

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


  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action is permanent and cannot be undone. All your data, matches, and conversations will be lost.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Confirm Deletion',
              'Type DELETE to confirm',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'I understand, Delete my account', style: 'destructive' },
              ]
            );
          },
        },
      ]
    );
  };

  const SettingSection = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const SettingItem = ({ icon, title, subtitle, onPress, showChevron = true }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={22} color="#E91E63" />
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showChevron && (
        <Ionicons name="chevron-forward" size={20} color="#999" />
      )}
    </TouchableOpacity>
  );

  const SettingToggle = ({ icon, title, subtitle, value, onToggle }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={22} color="#E91E63" />
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#D0D0D0', true: '#FFB3D1' }}
        thumbColor={value ? '#E91E63' : '#F4F3F4'}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <SettingSection title="Profile">
          <SettingItem
            icon="person-outline"
            title="Edit Profile"
            subtitle="Update your personal information"
            onPress={() => navigation.navigate('EditProfile')}
          />
          <SettingItem
            icon="images-outline"
            title="Manage Photos"
            subtitle="Add, remove, or reorder photos"
            onPress={() => navigation.navigate('ManagePhotos')}
          />
          <SettingItem
            icon="shield-checkmark-outline"
            title="Verify Profile"
            subtitle="Get verified badge"
            onPress={() => navigation.navigate('Verification')}
          />
          <SettingToggle
            icon="eye-outline"
            title="Profile Visibility"
            subtitle="Show profile in search results"
            value={settings.profileVisibility}
            onToggle={() => toggleSetting('profileVisibility')}
          />
          <SettingToggle
            icon="radio-outline"
            title="Online Status"
            subtitle="Show when you're active"
            value={settings.showOnlineStatus}
            onToggle={() => toggleSetting('showOnlineStatus')}
          />
        </SettingSection>

        {/* Privacy Section */}
        <SettingSection title="Privacy">
          <SettingItem
            icon="lock-closed-outline"
            title="Who Can View My Profile"
            subtitle="Everyone"
            onPress={() => navigation.navigate('PrivacySettings')}
          />
          <SettingItem
            icon="chatbubble-outline"
            title="Who Can Message Me"
            subtitle="Only my matches"
            onPress={() => navigation.navigate('MessagePrivacy')}
          />
          <SettingToggle
            icon="call-outline"
            title="Show Phone Number"
            subtitle="Only to mutual matches"
            value={settings.showPhoneNumber}
            onToggle={() => toggleSetting('showPhoneNumber')}
          />
          <SettingToggle
            icon="mail-outline"
            title="Show Email"
            subtitle="Only to mutual matches"
            value={settings.showEmail}
            onToggle={() => toggleSetting('showEmail')}
          />
          <SettingItem
            icon="ban-outline"
            title="Blocked Users"
            subtitle={`${settings.blockList.length} blocked`}
            onPress={() => navigation.navigate('BlockedUsers')}
          />
        </SettingSection>

        {/* Notifications Section */}
        <SettingSection title="Notifications">
          <SettingToggle
            icon="notifications-outline"
            title="Push Notifications"
            subtitle="App notifications"
            value={settings.pushNotifications}
            onToggle={() => toggleSetting('pushNotifications')}
          />
          <SettingToggle
            icon="mail-outline"
            title="Email Notifications"
            subtitle="Updates via email"
            value={settings.emailNotifications}
            onToggle={() => toggleSetting('emailNotifications')}
          />
          <SettingToggle
            icon="chatbox-outline"
            title="SMS Notifications"
            subtitle="Updates via SMS"
            value={settings.smsNotifications}
            onToggle={() => toggleSetting('smsNotifications')}
          />
          
          <View style={styles.divider} />
          
          <SettingToggle
            icon="heart-outline"
            title="New Matches"
            subtitle="When you get a new match"
            value={settings.matchNotifications}
            onToggle={() => toggleSetting('matchNotifications')}
          />
          <SettingToggle
            icon="chatbubbles-outline"
            title="Messages"
            subtitle="New message alerts"
            value={settings.messageNotifications}
            onToggle={() => toggleSetting('messageNotifications')}
          />
          <SettingToggle
            icon="eye-outline"
            title="Profile Views"
            subtitle="When someone views your profile"
            value={settings.profileViewNotifications}
            onToggle={() => toggleSetting('profileViewNotifications')}
          />
          <SettingToggle
            icon="star-outline"
            title="Interests Received"
            subtitle="When someone sends interest"
            value={settings.interestNotifications}
            onToggle={() => toggleSetting('interestNotifications')}
          />
        </SettingSection>

        {/* Subscription Section */}
        <SettingSection title="Subscription">
          <SettingItem
            icon="diamond-outline"
            title="Upgrade to Premium"
            subtitle="Unlock exclusive features"
            onPress={() => navigation.navigate('Premium')}
          />
          <SettingItem
            icon="card-outline"
            title="Manage Subscription"
            subtitle="View and manage your plan"
            onPress={() => navigation.navigate('ManageSubscription')}
          />
          <SettingItem
            icon="receipt-outline"
            title="Payment History"
            subtitle="View transaction history"
            onPress={() => navigation.navigate('PaymentHistory')}
          />
        </SettingSection>

        {/* Preferences Section */}
        <SettingSection title="App Preferences">
          <SettingItem
            icon="language-outline"
            title="Language"
            subtitle={settings.languagePreference}
            onPress={() => navigation.navigate('LanguageSettings')}
          />
          <SettingToggle
            icon="moon-outline"
            title="Dark Mode"
            subtitle="Use dark theme"
            value={settings.darkMode}
            onToggle={() => toggleSetting('darkMode')}
          />
          <SettingToggle
            icon="play-outline"
            title="Auto-play Videos"
            subtitle="Videos play automatically"
            value={settings.autoPlayVideos}
            onToggle={() => toggleSetting('autoPlayVideos')}
          />
          <SettingItem
            icon="download-outline"
            title="Data Usage"
            subtitle="Manage download settings"
            onPress={() => navigation.navigate('DataSettings')}
          />
        </SettingSection>

        {/* Safety & Security */}
        <SettingSection title="Safety & Security">
          <SettingToggle
            icon="key-outline"
            title="Two-Factor Authentication"
            subtitle="Add extra security layer"
            value={settings.twoFactorAuth}
            onToggle={() => toggleSetting('twoFactorAuth')}
          />
          <SettingItem
            icon="shield-outline"
            title="Security Tips"
            subtitle="Learn how to stay safe"
            onPress={() => navigation.navigate('SafetyTips')}
          />
          <SettingItem
            icon="warning-outline"
            title="Report a Problem"
            subtitle="Report abuse or technical issue"
            onPress={() => navigation.navigate('ReportProblem')}
          />
        </SettingSection>

        {/* Help & Support */}
        <SettingSection title="Help & Support">
          <SettingItem
            icon="help-circle-outline"
            title="Help Center"
            subtitle="FAQs and guides"
            onPress={() => navigation.navigate('HelpSupport')}
          />
          <SettingItem
            icon="chatbubble-ellipses-outline"
            title="Contact Support"
            subtitle="Get help from our team"
            onPress={() => navigation.navigate('ContactSupport')}
          />
          <SettingItem
            icon="star-outline"
            title="Rate Us"
            subtitle="Share your feedback"
            onPress={() => Alert.alert('Rate Us', 'Thank you for your support!')}
          />
          <SettingItem
            icon="share-social-outline"
            title="Share App"
            subtitle="Invite friends to join"
            onPress={() => Alert.alert('Share', 'Share link copied!')}
          />
        </SettingSection>

        {/* Legal Section */}
        <SettingSection title="Legal">
          <SettingItem
            icon="document-text-outline"
            title="Terms of Service"
            onPress={() => navigation.navigate('Terms')}
          />
          <SettingItem
            icon="shield-checkmark-outline"
            title="Privacy Policy"
            onPress={() => navigation.navigate('Privacy')}
          />
          <SettingItem
            icon="information-circle-outline"
            title="About"
            subtitle="Version 1.0.0"
            onPress={() => navigation.navigate('About')}
          />
        </SettingSection>

        {/* Account Actions */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Ionicons name="log-out-outline" size={22} color="#FF5722" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteAccount}
            activeOpacity={0.8}
          >
            <Ionicons name="trash-outline" size={22} color="#F44336" />
            <Text style={styles.deleteText}>Delete Account</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Matrimony App v1.0.0</Text>
          <Text style={styles.versionSubtext}>© 2024 All Rights Reserved</Text>
        </View>

        <View style={{ height: 40 }} />
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFF',
    marginBottom: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    paddingHorizontal: 20,
    paddingVertical: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFE8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  divider: {
    height: 8,
    backgroundColor: '#F5F5F5',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF5722',
    marginLeft: 8,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  deleteText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F44336',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    color: '#999',
  },
});