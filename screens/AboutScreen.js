import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen({ navigation }) {
  const appVersion = '1.0.0';
  const buildNumber = '100';

  const openLink = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Cannot open URL:', error);
    }
  };

  const InfoSection = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const InfoItem = ({ icon, title, subtitle, onPress }) => (
    <TouchableOpacity
      style={styles.infoItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.infoLeft}>
        <Ionicons name={icon} size={24} color="#E91E63" />
        <View style={styles.infoText}>
          <Text style={styles.infoTitle}>{title}</Text>
          {subtitle && <Text style={styles.infoSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {onPress && (
        <Ionicons name="chevron-forward" size={20} color="#999" />
      )}
    </TouchableOpacity>
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
        <Text style={styles.headerTitle}>About</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* App Logo & Name */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Ionicons name="heart" size={50} color="#E91E63" />
          </View>
          <Text style={styles.appName}>Matrimony App</Text>
          <Text style={styles.tagline}>Find Your Perfect Match</Text>
          <Text style={styles.version}>
            Version {appVersion} (Build {buildNumber})
          </Text>
        </View>

        {/* About Section */}
        <InfoSection title="About Us">
          <View style={styles.aboutText}>
            <Text style={styles.paragraph}>
              Matrimony App is a trusted platform designed to help you find your
              life partner. We understand that marriage is one of the most
              important decisions in life, and we're here to make your journey
              easier and more meaningful.
            </Text>
            <Text style={styles.paragraph}>
              With advanced matching algorithms, verified profiles, and a
              user-friendly interface, we connect thousands of people looking
              for genuine relationships.
            </Text>
            <Text style={styles.paragraph}>
              Our mission is to bring together compatible individuals based on
              shared values, interests, and life goals.
            </Text>
          </View>
        </InfoSection>

        {/* Features */}
        <InfoSection title="Key Features">
          <View style={styles.featuresList}>
            <FeatureItem
              icon="search"
              title="Advanced Matching"
              description="Find matches based on preferences and compatibility"
            />
            <FeatureItem
              icon="shield-checkmark"
              title="Verified Profiles"
              description="Connect with genuine, verified users"
            />
            <FeatureItem
              icon="lock-closed"
              title="Secure & Private"
              description="Your data is safe with end-to-end encryption"
            />
            <FeatureItem
              icon="chatbubbles"
              title="Real-time Chat"
              description="Connect instantly with your matches"
            />
            <FeatureItem
              icon="people"
              title="Family Values"
              description="Filter matches based on family background"
            />
            <FeatureItem
              icon="star"
              title="Premium Features"
              description="Unlock exclusive benefits with premium plans"
            />
          </View>
        </InfoSection>

        {/* Statistics */}
        <InfoSection title="Our Success">
          <View style={styles.statsContainer}>
            <StatBox number="50K+" label="Happy Couples" />
            <StatBox number="100K+" label="Active Users" />
            <StatBox number="4.8★" label="App Rating" />
          </View>
        </InfoSection>

        {/* Contact & Legal */}
        <InfoSection title="Information">
          <InfoItem
            icon="mail-outline"
            title="Contact Us"
            subtitle="support@matrimonyapp.com"
            onPress={() => openLink('mailto:support@matrimonyapp.com')}
          />
          <InfoItem
            icon="globe-outline"
            title="Website"
            subtitle="www.matrimonyapp.com"
            onPress={() => openLink('https://matrimonyapp.com')}
          />
          <InfoItem
            icon="document-text-outline"
            title="Terms of Service"
            onPress={() => navigation.navigate('Terms')}
          />
          <InfoItem
            icon="shield-outline"
            title="Privacy Policy"
            onPress={() => navigation.navigate('Privacy')}
          />
          <InfoItem
            icon="code-outline"
            title="Licenses"
            onPress={() => navigation.navigate('Licenses')}
          />
        </InfoSection>

        {/* Social Media */}
        <InfoSection title="Follow Us">
          <View style={styles.socialContainer}>
            <SocialButton
              icon="logo-facebook"
              color="#1877F2"
              onPress={() => openLink('https://facebook.com/matrimonyapp')}
            />
            <SocialButton
              icon="logo-instagram"
              color="#E4405F"
              onPress={() => openLink('https://instagram.com/matrimonyapp')}
            />
            <SocialButton
              icon="logo-twitter"
              color="#1DA1F2"
              onPress={() => openLink('https://twitter.com/matrimonyapp')}
            />
            <SocialButton
              icon="logo-linkedin"
              color="#0A66C2"
              onPress={() => openLink('https://linkedin.com/company/matrimonyapp')}
            />
          </View>
        </InfoSection>

        {/* Team Credits */}
        <InfoSection title="Credits">
          <View style={styles.creditsContainer}>
            <Text style={styles.creditsText}>
              Made with ❤️ by the Matrimony Team
            </Text>
            <Text style={styles.creditsSubtext}>
              Designed in India • Serving Worldwide
            </Text>
          </View>
        </InfoSection>

        {/* Copyright */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 Matrimony App. All rights reserved.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// Feature Item Component
const FeatureItem = ({ icon, title, description }) => (
  <View style={styles.featureItem}>
    <View style={styles.featureIconContainer}>
      <Ionicons name={icon} size={24} color="#E91E63" />
    </View>
    <View style={styles.featureContent}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

// Stat Box Component
const StatBox = ({ number, label }) => (
  <View style={styles.statBox}>
    <Text style={styles.statNumber}>{number}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

// Social Button Component
const SocialButton = ({ icon, color, onPress }) => (
  <TouchableOpacity
    style={[styles.socialButton, { backgroundColor: color }]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Ionicons name={icon} size={24} color="#FFF" />
  </TouchableOpacity>
);

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
  logoSection: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#FFF',
    marginBottom: 16,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFE8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  version: {
    fontSize: 14,
    color: '#999',
  },
  section: {
    backgroundColor: '#FFF',
    marginBottom: 16,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  aboutText: {
    paddingHorizontal: 20,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    color: '#666',
    marginBottom: 16,
    textAlign: 'justify',
  },
  featuresList: {
    paddingHorizontal: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E91E63',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    marginLeft: 16,
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  infoSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 16,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  creditsContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  creditsText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  creditsSubtext: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});