import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HelpSupportScreen({ navigation, route }) {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [supportForm, setSupportForm] = useState({
    subject: '',
    message: '',
    email: '',
  });

  const faqs = [
    {
      id: 1,
      question: 'How do I create a profile?',
      answer: 'To create a profile, tap on "Sign Up" on the home screen. Enter your phone number, verify with OTP, and then fill in your profile details including photos, education, occupation, and preferences.',
    },
    {
      id: 2,
      question: 'How does the matching algorithm work?',
      answer: 'Our algorithm matches you based on multiple factors including religion, caste, education, location, age preferences, lifestyle choices, and family values. The match percentage shows how compatible you are with another profile.',
    },
    {
      id: 3,
      question: 'What are the benefits of Premium membership?',
      answer: 'Premium members get: Unlimited profile views, Send unlimited messages, See who viewed your profile, Get highlighted in search results, Advanced filters, Priority customer support, and Ad-free experience.',
    },
    {
      id: 4,
      question: 'How do I verify my profile?',
      answer: 'Go to Profile > Settings > Verify Profile. Upload a clear photo of your ID (Aadhaar/PAN/Passport) and a selfie. Our team will review and verify within 24-48 hours.',
    },
    {
      id: 5,
      question: 'Is my information secure?',
      answer: 'Yes! We use bank-level encryption to protect your data. Your phone number and personal details are never shared publicly. You control who can see your profile and photos.',
    },
    {
      id: 6,
      question: 'How do I report a fake profile?',
      answer: 'On any profile, tap the three dots menu and select "Report Profile". Choose the reason and submit. Our team will investigate and take action within 24 hours.',
    },
    {
      id: 7,
      question: 'Can I hide my profile temporarily?',
      answer: 'Yes! Go to Settings > Privacy > Hide Profile. Your profile will be invisible to others but you can still browse matches. Reactivate anytime.',
    },
    {
      id: 8,
      question: 'How do I cancel my subscription?',
      answer: 'Go to Profile > Settings > Subscription > Manage Plan. Tap "Cancel Subscription". Your premium benefits will continue until the end of the billing period.',
    },
    {
      id: 9,
      question: 'What if I don\'t receive the OTP?',
      answer: 'Check if your phone number is correct. Wait 2-3 minutes for the SMS. Check your spam folder. If still not received, tap "Resend OTP" or try "Call Me Instead" option.',
    },
    {
      id: 10,
      question: 'How do I delete my account?',
      answer: 'Go to Settings > Account > Delete Account. Note: This action is permanent and cannot be undone. All your data, matches, and conversations will be lost.',
    },
  ];

  const contactOptions = [
    {
      id: 1,
      icon: 'mail-outline',
      title: 'Email Support',
      subtitle: 'support@matrimonyapp.com',
      action: () => Linking.openURL('mailto:support@matrimonyapp.com'),
    },
    {
      id: 2,
      icon: 'call-outline',
      title: 'Phone Support',
      subtitle: '+91 1800-123-4567 (Toll Free)',
      action: () => Linking.openURL('tel:+918001234567'),
    },
    {
      id: 3,
      icon: 'logo-whatsapp',
      title: 'WhatsApp Chat',
      subtitle: 'Chat with us on WhatsApp',
      action: () => Linking.openURL('https://wa.me/918001234567'),
    },
    {
      id: 4,
      icon: 'time-outline',
      title: 'Support Hours',
      subtitle: 'Mon-Sat: 9 AM - 9 PM IST',
      action: null,
    },
  ];

  const quickLinks = [
    { id: 1, icon: 'document-text', title: 'Getting Started Guide', screen: 'Guide' },
    { id: 2, icon: 'shield-checkmark', title: 'Safety Tips', screen: 'Safety' },
    { id: 3, icon: 'card', title: 'Payment Issues', screen: 'Payment' },
    { id: 4, icon: 'chatbubbles', title: 'Chat Help', screen: 'ChatHelp' },
    { id: 5, icon: 'search', title: 'Search & Filters', screen: 'SearchHelp' },
    { id: 6, icon: 'notifications', title: 'Notifications', screen: 'NotifHelp' },
  ];

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleSubmitTicket = () => {
    if (!supportForm.subject || !supportForm.message || !supportForm.email) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // TODO: Send support ticket to backend
    Alert.alert(
      'Success',
      'Your support ticket has been submitted. We\'ll respond within 24 hours.',
      [
        {
          text: 'OK',
          onPress: () => {
            setSupportForm({ subject: '', message: '', email: '' });
          },
        },
      ]
    );
  };

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
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
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Banner */}
        <View style={styles.banner}>
          <Ionicons name="help-circle" size={50} color="#E91E63" />
          <Text style={styles.bannerTitle}>How can we help you?</Text>
          <Text style={styles.bannerSubtitle}>
            Find answers or contact our support team
          </Text>
        </View>

        {/* Quick Contact Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          {contactOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.contactOption}
              onPress={option.action}
              activeOpacity={option.action ? 0.7 : 1}
            >
              <View style={styles.contactLeft}>
                <View style={styles.contactIconContainer}>
                  <Ionicons name={option.icon} size={24} color="#E91E63" />
                </View>
                <View>
                  <Text style={styles.contactTitle}>{option.title}</Text>
                  <Text style={styles.contactSubtitle}>{option.subtitle}</Text>
                </View>
              </View>
              {option.action && (
                <Ionicons name="chevron-forward" size={20} color="#999" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Help</Text>
          <View style={styles.quickLinksGrid}>
            {quickLinks.map((link) => (
              <TouchableOpacity
                key={link.id}
                style={styles.quickLinkCard}
                onPress={() => navigation.navigate(link.screen)}
                activeOpacity={0.7}
              >
                <Ionicons name={link.icon} size={28} color="#E91E63" />
                <Text style={styles.quickLinkText}>{link.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

          {/* Search */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search FAQs..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>

          {/* FAQ List */}
          <View style={styles.faqList}>
            {filteredFAQs.map((faq) => (
              <View key={faq.id} style={styles.faqItem}>
                <TouchableOpacity
                  style={styles.faqQuestion}
                  onPress={() => toggleFAQ(faq.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.faqQuestionText}>{faq.question}</Text>
                  <Ionicons
                    name={expandedFAQ === faq.id ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
                {expandedFAQ === faq.id && (
                  <View style={styles.faqAnswer}>
                    <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            ))}
            {filteredFAQs.length === 0 && (
              <View style={styles.noResults}>
                <Ionicons name="search-outline" size={48} color="#CCC" />
                <Text style={styles.noResultsText}>No FAQs found</Text>
                <Text style={styles.noResultsSubtext}>
                  Try different keywords or contact support
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Submit Ticket */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Still Need Help?</Text>
          <Text style={styles.sectionSubtitle}>
            Submit a support ticket and we'll get back to you within 24 hours
          </Text>

          <View style={styles.form}>
            <Text style={styles.label}>Your Email</Text>
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              value={supportForm.email}
              onChangeText={(text) =>
                setSupportForm({ ...supportForm, email: text })
              }
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Subject</Text>
            <TextInput
              style={styles.input}
              placeholder="Brief description of your issue"
              value={supportForm.subject}
              onChangeText={(text) =>
                setSupportForm({ ...supportForm, subject: text })
              }
            />

            <Text style={styles.label}>Message</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your issue in detail..."
              value={supportForm.message}
              onChangeText={(text) =>
                setSupportForm({ ...supportForm, message: text })
              }
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmitTicket}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>Submit Ticket</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Live Chat Banner */}
        <TouchableOpacity
          style={styles.liveChatBanner}
          activeOpacity={0.8}
          onPress={() => Alert.alert('Live Chat', 'Live chat will be available soon!')}
        >
          <View style={styles.liveChatLeft}>
            <Ionicons name="chatbubble-ellipses" size={32} color="#FFF" />
            <View style={styles.liveChatText}>
              <Text style={styles.liveChatTitle}>Need Immediate Help?</Text>
              <Text style={styles.liveChatSubtitle}>
                Chat with our support team (Coming Soon)
              </Text>
            </View>
          </View>
          <Ionicons name="arrow-forward" size={24} color="#FFF" />
        </TouchableOpacity>

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
  banner: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingVertical: 40,
    marginBottom: 16,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 15,
    color: '#666',
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
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFE8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  quickLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  quickLinkCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  quickLinkText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    marginLeft: 8,
  },
  faqList: {
    paddingHorizontal: 20,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingVertical: 12,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    paddingRight: 12,
  },
  faqAnswer: {
    paddingTop: 8,
    paddingBottom: 12,
  },
  faqAnswerText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  form: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textArea: {
    height: 120,
    paddingTop: 14,
  },
  submitButton: {
    backgroundColor: '#E91E63',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  liveChatBanner: {
    backgroundColor: '#E91E63',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  liveChatLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  liveChatText: {
    marginLeft: 16,
    flex: 1,
  },
  liveChatTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 4,
  },
  liveChatSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
  },
});