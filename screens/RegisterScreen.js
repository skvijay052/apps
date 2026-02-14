import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase.js';
import useStore from '../store/useStore';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = useStore(state => state.login);
  const setProfile = useStore(state => state.setProfile);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleRegister = async () => {
    // Validation
    if (!name || !email || !phone || !password || !gender) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (phone.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        email,
        phone: `+91${phone}`,
        gender,
        createdAt: new Date().toISOString(),
        profileComplete: false,
      });

      // Save to local store
      const userData = {
        id: user.uid,
        name,
        email,
        phone,
        gender,
        createdAt: new Date().toISOString(),
      };

      await login(userData);
      
      setProfile({
        name,
        gender,
        email,
        phone,
      });

      Alert.alert('Success', 'Account created successfully!');
      navigation.replace('CreateProfile');

    } catch (error) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const GenderButton = ({ value, label, icon }) => (
    <TouchableOpacity
      style={[styles.genderButton, gender === value && styles.genderButtonActive]}
      onPress={() => setGender(value)}
    >
      <Ionicons 
        name={icon} 
        size={24} 
        color={gender === value ? '#fff' : '#9CA3AF'} 
      />
      <Text style={[
        styles.genderText,
        gender === value && styles.genderTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient
        colors={['#fff', '#fff']}
        style={styles.header}
      >
        <View style={styles.headerContent}> 
           <Image
              source={require('../assets/icons/icon-transparent.png')}
              style={styles.logo}
            />
          <Text style={styles.headerTitle}>Create Account</Text>
          <Text style={styles.headerSubtitle}>Join us to find your perfect match</Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          {/* Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                placeholderTextColor="#9CA3AF"
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                editable={!loading}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                placeholder="your.email@example.com"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
              />
            </View>
          </View>

          {/* Phone */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={20} color="#9CA3AF" />
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                style={styles.input}
                placeholder="Phone number"
                value={phone}
                placeholderTextColor="#9CA3AF"
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={10}
                editable={!loading}
              />
            </View>
          </View>

          {/* Gender */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender *</Text>
            <View style={styles.genderContainer}>
              <GenderButton value="male" label="Male" icon="male" />
              <GenderButton value="female" label="Female" icon="female" />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                value={password}
                placeholderTextColor="#9CA3AF"
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                editable={!loading}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"} 
                  size={20} 
                  color="#9CA3AF" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                placeholderTextColor="#9CA3AF"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                editable={!loading}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons 
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                  size={20} 
                  color="#9CA3AF" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Register Button */}
          <TouchableOpacity 
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={loading}
          >
            <LinearGradient
              colors={['#F3F4F6', '#F3F4F6']}
              style={styles.registerGradient}
            >
              <Text style={styles.registerButtonText}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('OTPLogin')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30, 
  },
  headerContent: {
    alignItems: 'center',
  }, 
  logo: {
    width: 100,
    height: 70,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 15,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#1F2937',
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F3F4F6',
    marginLeft: 10,
  },
  countryCode: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '600',
    marginLeft: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  genderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 15,
    borderWidth: 2,
    borderColor: '#F3F4F6',
  },
  genderButtonActive: {
    backgroundColor: '#1F2937',
    borderColor: '#1F2937',
  },
  genderText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginLeft: 8,
    fontWeight: '600',
  },
  genderTextActive: {
    color: '#fff',
  },
  registerButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F3F4F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 20,
  },
  registerGradient: {
    padding: 18,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#6B7280',
    fontSize: 18,
    fontWeight: '400',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: 'bold',
  },
});