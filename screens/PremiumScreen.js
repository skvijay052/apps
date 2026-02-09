import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import useStore from '../store/useStore';

const PLANS = [
  { id: '1month', duration: '1 Month', price: '$9.99', savings: null },
  { id: '3month', duration: '3 Months', price: '$24.99', savings: 'Save 17%' },
  { id: '6month', duration: '6 Months', price: '$44.99', savings: 'Save 25%' },
];

const FEATURES = [
  { icon: 'infinite', title: 'Unlimited Likes', description: 'Like as many profiles as you want' },
  { icon: 'rocket', title: 'Boost Profile', description: 'Be seen by 10x more people' },
  { icon: 'eye', title: 'See Who Likes You', description: 'Know who swiped right on you' },
  { icon: 'flash', title: '5 Super Likes/Day', description: 'Stand out from the crowd' },
  { icon: 'location', title: 'Change Location', description: 'Match with people anywhere' },
  { icon: 'close-circle', title: 'No Ads', description: 'Enjoy ad-free experience' },
];

export default function PremiumScreen({ navigation }) {
  const [selectedPlan, setSelectedPlan] = useState('3month');
  const setPremium = useStore(state => state.setPremium);

  const handleSubscribe = () => {
    Alert.alert(
      'Subscribe',
      `Subscribe to ${PLANS.find(p => p.id === selectedPlan)?.duration} plan?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Subscribe', 
          onPress: () => {
            setPremium(true);
            Alert.alert('Success!', 'You are now a Premium member!');
            navigation.goBack();
          }
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FFD700', '#FFA500']} style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={28} color="#FFF" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Ionicons name="star" size={60} color="#FFF" />
          <Text style={styles.headerTitle}>Upgrade to Premium</Text>
          <Text style={styles.headerSubtitle}>Unlock all premium features</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* Features */}
        <View style={styles.section}>
          {FEATURES.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name={feature.icon} size={24} color="#FF6B6B" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Plans */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Your Plan</Text>
          {PLANS.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                selectedPlan === plan.id && styles.planCardSelected
              ]}
              onPress={() => setSelectedPlan(plan.id)}
            >
              <View style={styles.planInfo}>
                <Text style={[
                  styles.planDuration,
                  selectedPlan === plan.id && styles.planTextSelected
                ]}>
                  {plan.duration}
                </Text>
                {plan.savings && (
                  <View style={styles.savingsBadge}>
                    <Text style={styles.savingsText}>{plan.savings}</Text>
                  </View>
                )}
              </View>
              <Text style={[
                styles.planPrice,
                selectedPlan === plan.id && styles.planTextSelected
              ]}>
                {plan.price}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Subscribe Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
          <LinearGradient
            colors={['#FFD700', '#FFA500']}
            style={styles.subscribeGradient}
          >
            <Text style={styles.subscribeText}>Subscribe Now</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          Subscription will auto-renew. Cancel anytime.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 15,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFF',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
  },
  planCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    marginBottom: 10,
  },
  planCardSelected: {
    borderColor: '#FFD700',
    backgroundColor: '#FFFBF0',
  },
  planInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planDuration: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  planPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  planTextSelected: {
    color: '#FFA500',
  },
  savingsBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  savingsText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  subscribeButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
  },
  subscribeGradient: {
    padding: 18,
    alignItems: 'center',
  },
  subscribeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  termsText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});