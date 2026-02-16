import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function SplashScreenAdvanced({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(100)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  // Floating hearts animation
  const heart1Y = useRef(new Animated.Value(0)).current;
  const heart2Y = useRef(new Animated.Value(0)).current;
  const heart3Y = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimations();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const startAnimations = () => {
    // Main logo animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Glow effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Slide up text
    Animated.timing(slideUpAnim, {
      toValue: 0,
      duration: 800,
      delay: 600,
      useNativeDriver: true,
    }).start();

    // Floating hearts
    animateHeart(heart1Y, 0);
    animateHeart(heart2Y, 1000);
    animateHeart(heart3Y, 2000);
  };

  const animateHeart = (heartAnim, delay) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartAnim, {
          toValue: -height,
          duration: 5000,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(heartAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  return (
    <LinearGradient
      colors={['#FFFFFF', '#F9FAFB', '#F3F4F6']}
      style={styles.container}
    >
      {/* Floating Hearts Background */}
      <Animated.View
        style={[
          styles.floatingHeart,
          { left: '20%', transform: [{ translateY: heart1Y }] },
        ]}
      >
        <Text style={styles.heartEmoji}>💕</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.floatingHeart,
          { right: '20%', transform: [{ translateY: heart2Y }] },
        ]}
      >
        <Text style={styles.heartEmoji}>💖</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.floatingHeart,
          { left: '50%', transform: [{ translateY: heart3Y }] },
        ]}
      >
        <Text style={styles.heartEmoji}>❤️</Text>
      </Animated.View>

      <View style={styles.content}>
        {/* Glow Effect Behind Logo */}
        <Animated.View
          style={[
            styles.glowCircle,
            {
              opacity: glowOpacity,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        />

        {/* Rotating Ring */}
        <Animated.View
          style={[
            styles.rotatingRing,
            {
              opacity: fadeAnim,
              transform: [{ rotate: spin }, { scale: scaleAnim }],
            },
          ]}
        />

        {/* Main Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Image
            source={require('../assets/icons/icon-transparent.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>    
        <View style={styles.textContainer}>
        <Image
            source={require('../assets/icons/text-logo-transparent.png')}
            style={styles.textlogo}
            resizeMode="contain"
        /> </View>
      </View> 
   
      {/* Bottom Text */}
      <Animated.View
        style={[
          styles.bottomText,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </Animated.View>
    </LinearGradient>
  );
}

// Animated Progress Bar
const AnimatedProgressBar = () => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  }, []);

  const width = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.progressBarContainer}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingHeart: {
    position: 'absolute',
    top: height,
  },
  heartEmoji: {
    fontSize: 40,
    opacity: 0.3,
  },
  glowCircle: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#0000000c',
  },
  rotatingRing: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 3,
    borderColor: '#000000',
    borderStyle: 'dashed',
  },
  logoContainer: { 
    zIndex: 10,
    position: 'absolute',
    top: -75,
    left: -75, 
    bottom: 0,
    margin: 'auto',
  },
  logo: {
    width: 160,
    height: 160,
  },
  textlogo: {
    width: 200,
    height: 40,
  },
  textContainer: {
    alignItems: 'center', 
    position: 'absolute',
    top: 155,
    left: -95, 
    bottom: 0,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1F2937',
    letterSpacing: 2,
    marginBottom: 8,
  },
  underline: {
    width: 100,
    height: 3,
    backgroundColor: '#1F2937',
    marginVertical: 10,
    borderRadius: 2,
  },
  tagline: {
    fontSize: 18,
    color: '#6B7280',
    letterSpacing: 1,
    fontStyle: 'italic',
  },
  progressContainer: {
    width: width * 0.6,
    marginTop: 20,
  },
  progressBarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#1F2937',
  },
  bottomText: {
    position: 'absolute',
    bottom: 40,
  },
  versionText: {
    fontSize: 12,
    color: '#9CA3AF',
    letterSpacing: 0.5,
  },
});