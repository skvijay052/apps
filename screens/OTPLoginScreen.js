import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { 
  signInWithEmailAndPassword,
  PhoneAuthProvider,
  signInWithCredential
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import useStore from '../store/useStore';

export default function LoginScreen({ navigation }) {
  // Login method toggle
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'otp'
  
  // Email/Password fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // OTP fields
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpStep, setOtpStep] = useState('phone'); // 'phone' or 'verify'
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [verificationId, setVerificationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef([]);

  const login = useStore(state => state.login);
  const setPhoneNumberStore = useStore(state => state.setPhoneNumber);

  // Email/Password Login with Firebase
  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);

    try {
      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (userDoc.exists()) {
        const userData = {
          id: user.uid,
          ...userDoc.data()
        };

        await login(userData);
        Alert.alert('Success', 'Login successful!');
        
        // Check if profile is complete
        if (userData.profileComplete) {
          navigation.replace('Main');
        } else {
          navigation.replace('CreateProfile');
        }
      } else {
        Alert.alert('Error', 'User data not found. Please register again.');
      }

    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many attempts. Please try again later.';
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Phone OTP Login (Note: Phone auth requires additional setup)
  const handleSendOTP = async () => {
    if (phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    setLoading(true);

    try {
      // For demo purposes - in production, use Firebase Phone Auth
      // Firebase Phone Auth requires reCAPTCHA setup for web
      // For React Native, you need @react-native-firebase/auth
      
      Alert.alert(
        'Demo Mode',
        'Phone authentication is in demo mode. Use OTP: 123456',
        [{ text: 'OK', onPress: () => {
          setPhoneNumberStore(`+91${phoneNumber}`);
          setOtpStep('verify');
        }}]
      );

    } catch (error) {
      console.error('OTP send error:', error);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }

    // Auto-verify when all filled
    if (index === 5 && value) {
      verifyOTP(newOtp.join(''));
    }
  };

  const handleBackspace = (value, index) => {
    if (!value && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const verifyOTP = async (otpCode) => {
    setLoading(true);

    try {
      // Demo verification - replace with actual Firebase Phone Auth
      if (otpCode === '123456') {
        // Create a mock user for demo
        const userData = {
          id: Date.now().toString(),
          phoneNumber: `+91${phoneNumber}`,
          name: 'User',
          createdAt: new Date().toISOString(),
        };
        
        await login(userData);
        Alert.alert('Success', 'Login successful!');
        navigation.replace('CreateProfile');
      } else {
        Alert.alert('Error', 'Invalid OTP. Please try again. (Use 123456)');
        setOtp(['', '', '', '', '', '']);
        otpRefs.current[0].focus();
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      Alert.alert('Error', 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient
        colors={['#fff', '#fff']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Logo/Icon */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/icons/transparent-logo.png')}
              style={styles.logo}
            />
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
           
            {/* Login Method Toggle */}
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  loginMethod === 'email' && styles.toggleButtonActive
                ]}
                onPress={() => {
                  setLoginMethod('email');
                  setOtpStep('phone');
                }}
                disabled={loading}
              >
                <Ionicons 
                  name="mail-outline" 
                  size={18} 
                  color={loginMethod === 'email' ? '#1F2937' : '#1F2937'} 
                />
                <Text style={[
                  styles.toggleButtonText,
                  loginMethod === 'email' && styles.toggleButtonTextActive
                ]}>
                  Email
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  loginMethod === 'otp' && styles.toggleButtonActive
                ]}
                onPress={() => {
                  setLoginMethod('otp');
                  setOtpStep('phone');
                }}
                disabled={loading}
              >
                <Ionicons 
                  name="phone-portrait-outline" 
                  size={18} 
                  color={loginMethod === 'otp' ? '#1F2937' : '#1F2937'} 
                />
                <Text style={[
                  styles.toggleButtonText,
                  loginMethod === 'otp' && styles.toggleButtonTextActive
                ]}>
                  Phone OTP
                </Text>
              </TouchableOpacity>
            </View>

            {/* EMAIL/PASSWORD LOGIN */}
            {loginMethod === 'email' && (
              <>
                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
                    <TextInput
                      style={styles.input}
                      placeholder="Email Address"
                      placeholderTextColor="#9CA3AF"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      editable={!loading}
                    />
                  </View>
                </View>

                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor="#9CA3AF"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      editable={!loading}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Ionicons 
                        name={showPassword ? "eye-outline" : "eye-off-outline"} 
                        size={20} 
                        color="rgba(000,000,000,0.8)" 
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Forgot Password */}
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity 
                  style={styles.loginButton}
                  onPress={handleEmailLogin}
                  disabled={loading}
                >
                  <Text style={styles.loginButtonText}>
                    {loading ? 'Logging in...' : 'Login with Email'}
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* OTP LOGIN */}
            {loginMethod === 'otp' && (
              <>
                {otpStep === 'phone' ? (
                  <>
                    {/* Phone Input */}
                    <View style={styles.inputGroup}>
                      <View style={styles.inputContainer}>
                        <Ionicons name="call-outline" size={20} color="#9CA3AF" />
                        <Text style={styles.countryCode}>+91</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Phone Number"
                          placeholderTextColor="#9CA3AF"
                          value={phoneNumber}
                          onChangeText={setPhoneNumber}
                          keyboardType="phone-pad"
                          maxLength={10}
                          editable={!loading}
                        />
                      </View>
                    </View>

                    {/* Send OTP Button */}
                    <TouchableOpacity 
                      style={styles.loginButton}
                      onPress={handleSendOTP}
                      disabled={loading}
                    >
                      <Text style={styles.loginButtonText}>
                        {loading ? 'Sending...' : 'Send OTP'}
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    {/* Back Button */}
                    <TouchableOpacity 
                      style={styles.backButton}
                      onPress={() => setOtpStep('phone')}
                      disabled={loading}
                    >
                      <Ionicons name="arrow-back" size={24} color="#1F2937" />
                      <Text style={styles.backButtonText}>Change Number</Text>
                    </TouchableOpacity>

                    {/* OTP Instructions */}
                    <Text style={styles.otpInstructions}>
                      Enter the 6-digit code sent to{'\n'}+91 {phoneNumber}
                    </Text>

                    {/* OTP Input */}
                    <View style={styles.otpContainer}>
                      {otp.map((digit, index) => (
                        <TextInput
                          key={index}
                          ref={ref => otpRefs.current[index] = ref}
                          style={styles.otpInput}
                          value={digit}
                          onChangeText={(value) => handleOTPChange(value, index)}
                          onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === 'Backspace') {
                              handleBackspace(digit, index);
                            }
                          }}
                          keyboardType="number-pad"
                          maxLength={1}
                          editable={!loading}
                        />
                      ))}
                    </View>

                    {/* Resend OTP */}
                    <TouchableOpacity 
                      style={styles.resendButton}
                      onPress={handleSendOTP}
                      disabled={loading}
                    >
                      <Text style={styles.resendText}>Didn't receive? Resend OTP</Text>
                    </TouchableOpacity>

                    {/* Hint */}
                    <Text style={styles.otpHint}>Demo OTP: 123456</Text>
                  </>
                )}
              </>
            )}

            {/* OR Divider - Only show for email login */}
            {loginMethod === 'email' && (
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>
            )}

            {/* Register Link */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center', 
  },
  logo: {
    width: 200,
    height: 140,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 15,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.9)',
    marginTop: 5,
  },
  formContainer: {
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.9)',
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  toggleButtonActive: {
    backgroundColor: '#FFF',
  },
  toggleButtonText: {
    color: '#1F2937',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  toggleButtonTextActive: {
    color: '#1F2937',
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 55,
    color: '#1F2937',
    backgroundColor: '#F3F4F6',
    fontSize: 16,
    marginLeft: 10,
  },
  countryCode: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#1F2937',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  loginButton: {
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
  loginButtonText: {
    color: '#6B7280',
    fontSize: 18,
    fontWeight: '400',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#1F2937',
    fontSize: 16,
    marginLeft: 8,
    textDecorationLine: 'underline',
  },
  otpInstructions: {
    color: 'rgba(0,0,0,0.9)',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 60,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  resendButton: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  resendText: {
    color: '#1F2937',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  otpHint: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(000,000,000,0.3)',
  },
  dividerText: {
    color: 'rgba(0,0,0,0.8)',
    marginHorizontal: 10,
    fontSize: 14,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    height: 50,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  socialButtonText: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.9)',
  },
  registerLink: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
