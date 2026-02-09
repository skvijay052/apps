import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import useStore from '../store/useStore';

export default function PreferencesScreen({ navigation }) {
  const [lookingFor, setLookingFor] = useState('all');
  const [ageRange, setAgeRange] = useState([21, 35]);
  const [distance, setDistance] = useState(50);
  const [interests, setInterests] = useState([]);
  
  const setPreferences = useStore(state => state.setPreferences);

  const interestOptions = [
    'Travel', 'Music', 'Movies', 'Sports', 'Fitness',
    'Food', 'Art', 'Reading', 'Gaming', 'Photography',
    'Dancing', 'Yoga', 'Cooking', 'Pets', 'Adventure'
  ];

  const toggleInterest = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleComplete = () => {
    const prefs = {
      lookingFor,
      ageRange,
      distance,
      interests,
    };
    
    setPreferences(prefs);
    // Navigate to main app - the navigator will handle this based on auth state
    navigation.navigate('Main');
  };

  const GenderOption = ({ value, label, icon }) => (
    <TouchableOpacity
      style={[
        styles.genderOption,
        lookingFor === value && styles.genderOptionActive
      ]}
      onPress={() => setLookingFor(value)}
    >
      <Ionicons 
        name={icon} 
        size={24} 
        color={lookingFor === value ? '#FF6B6B' : '#999'} 
      />
      <Text style={[
        styles.genderOptionText,
        lookingFor === value && styles.genderOptionTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Set Your Preferences</Text>
          <Text style={styles.subtitle}>Help us find your perfect match</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Looking For</Text>
          <View style={styles.genderOptions}>
            <GenderOption value="male" label="Men" icon="male" />
            <GenderOption value="female" label="Women" icon="female" />
            <GenderOption value="all" label="Everyone" icon="people" />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Age Range</Text>
            <Text style={styles.rangeValue}>{ageRange[0]} - {ageRange[1]}</Text>
          </View>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={18}
              maximumValue={60}
              step={1}
              value={ageRange[0]}
              onValueChange={(value) => setAgeRange([value, ageRange[1]])}
              minimumTrackTintColor="#FF6B6B"
              maximumTrackTintColor="#E8E8E8"
              thumbTintColor="#FF6B6B"
            />
            <Slider
              style={styles.slider}
              minimumValue={18}
              maximumValue={60}
              step={1}
              value={ageRange[1]}
              onValueChange={(value) => setAgeRange([ageRange[0], value])}
              minimumTrackTintColor="#FF6B6B"
              maximumTrackTintColor="#E8E8E8"
              thumbTintColor="#FF6B6B"
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Maximum Distance</Text>
            <Text style={styles.rangeValue}>{distance} km</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={5}
            maximumValue={100}
            step={5}
            value={distance}
            onValueChange={setDistance}
            minimumTrackTintColor="#FF6B6B"
            maximumTrackTintColor="#E8E8E8"
            thumbTintColor="#FF6B6B"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.interestsContainer}>
            {interestOptions.map((interest) => (
              <TouchableOpacity
                key={interest}
                style={[
                  styles.interestChip,
                  interests.includes(interest) && styles.interestChipActive
                ]}
                onPress={() => toggleInterest(interest)}
              >
                <Text style={[
                  styles.interestChipText,
                  interests.includes(interest) && styles.interestChipTextActive
                ]}>
                  {interest}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.completeButton}
          onPress={handleComplete}
        >
          <Text style={styles.completeButtonText}>Start Matching</Text>
          <Ionicons name="heart" size={20} color="#FFF" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  rangeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  genderOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
  },
  genderOptionActive: {
    backgroundColor: '#FFE8E8',
    borderColor: '#FF6B6B',
  },
  genderOptionText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 8,
    fontWeight: '600',
  },
  genderOptionTextActive: {
    color: '#FF6B6B',
  },
  sliderContainer: {
    paddingHorizontal: 5,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestChip: {
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    margin: 4,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  interestChipActive: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  interestChipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  interestChipTextActive: {
    color: '#FFF',
  },
  completeButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  completeButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
});