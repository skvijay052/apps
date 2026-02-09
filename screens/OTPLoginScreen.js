import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
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
  const otpRefs = useRef([]);

  const login = useStore(state => state.login);
  const setPhoneNumberStore = useStore(state => state.setPhoneNumber);

  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    // Mock login - In production, validate with backend
    const userData = {
      id: Date.now(),
      email,
      name: email.split('@')[0],
      createdAt: new Date().toISOString(),
    };

    await login(userData);
  };

  const handleSendOTP = () => {
    if (phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }
    
    setPhoneNumberStore(phoneNumber);
    setOtpStep('verify');
    // In production, trigger actual OTP send via Firebase/API
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
    // Simulate OTP verification
    if (otpCode === '123456') {
      const userData = {
        id: Date.now(),
        phoneNumber,
        name: 'User', // Default name, will be updated in profile
        createdAt: new Date().toISOString(),
      };
      await login(userData);
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again. (Use 123456)');
      setOtp(['', '', '', '', '', '']);
      otpRefs.current[0].focus();
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient
        colors={['#FF6B6B', '#FF8E53']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Logo/Icon */}
          <View style={styles.logoContainer}>
            <Ionicons name="heart-circle" size={100} color="#FFF" />
            <Text style={styles.appName}>Dating App</Text>
            <Text style={styles.tagline}>Find Your Perfect Match</Text>
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Login to continue</Text>

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
              >
                <Ionicons 
                  name="mail-outline" 
                  size={18} 
                  color={loginMethod === 'email' ? '#FF6B6B' : '#FFF'} 
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
              >
                <Ionicons 
                  name="phone-portrait-outline" 
                  size={18} 
                  color={loginMethod === 'otp' ? '#FF6B6B' : '#FFF'} 
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
                    <Ionicons name="mail-outline" size={20} color="rgba(255,255,255,0.8)" />
                    <TextInput
                      style={styles.input}
                      placeholder="Email Address"
                      placeholderTextColor="rgba(255,255,255,0.6)"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="rgba(255,255,255,0.8)" />
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor="rgba(255,255,255,0.6)"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Ionicons 
                        name={showPassword ? "eye-outline" : "eye-off-outline"} 
                        size={20} 
                        color="rgba(255,255,255,0.8)" 
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
                >
                  <Text style={styles.loginButtonText}>Login with Email</Text>
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
                        <Ionicons name="call-outline" size={20} color="rgba(255,255,255,0.8)" />
                        <Text style={styles.countryCode}>+91</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Phone Number"
                          placeholderTextColor="rgba(255,255,255,0.6)"
                          value={phoneNumber}
                          onChangeText={setPhoneNumber}
                          keyboardType="phone-pad"
                          maxLength={10}
                        />
                      </View>
                    </View>

                    {/* Send OTP Button */}
                    <TouchableOpacity 
                      style={styles.loginButton}
                      onPress={handleSendOTP}
                    >
                      <Text style={styles.loginButtonText}>Send OTP</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    {/* Back Button */}
                    <TouchableOpacity 
                      style={styles.backButton}
                      onPress={() => setOtpStep('phone')}
                    >
                      <Ionicons name="arrow-back" size={24} color="#FFF" />
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
                        />
                      ))}
                    </View>

                    {/* Resend OTP */}
                    <TouchableOpacity style={styles.resendButton}>
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
              <>
                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>OR</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Social Login Buttons */}
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-google" size={20} color="#FFF" />
                  <Text style={styles.socialButtonText}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-facebook" size={20} color="#FFF" />
                  <Text style={styles.socialButtonText}>Continue with Facebook</Text>
                </TouchableOpacity>
              </>
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
    marginBottom: 40,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 15,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 5,
  },
  formContainer: {
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
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
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  toggleButtonTextActive: {
    color: '#FF6B6B',
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 55,
    color: '#FFF',
    fontSize: 16,
    marginLeft: 10,
  },
  countryCode: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#FFF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FF6B6B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 8,
    textDecorationLine: 'underline',
  },
  otpInstructions: {
    color: 'rgba(255,255,255,0.9)',
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
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  resendButton: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  resendText: {
    color: '#FFF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  otpHint: {
    color: 'rgba(255,255,255,0.7)',
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
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dividerText: {
    color: 'rgba(255,255,255,0.8)',
    marginHorizontal: 10,
    fontSize: 14,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    height: 50,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  socialButtonText: {
    color: '#FFF',
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
    color: 'rgba(255,255,255,0.9)',
  },
  registerLink: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});