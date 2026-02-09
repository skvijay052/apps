import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStore = create((set, get) => ({
  // Auth State
  user: null,
  isAuthenticated: false,
  phoneNumber: null,
  
  // Profile State
  profile: null,
  photos: [],
  preferences: null,
  
  // Matches State
  matches: [],
  likes: [],
  receivedLikes: [],
  
  // Chat State
  conversations: [],
  messages: {},
  
  // Premium State
  isPremium: false,
  
  // Notifications
  notifications: [],
  unreadCount: 0,

  // Auth Actions
  setPhoneNumber: (phone) => set({ phoneNumber: phone }),
  
  login: async (userData) => {
    set({ 
      user: userData, 
      isAuthenticated: true 
    });
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  },
  
  logout: async () => {
    set({ 
      user: null, 
      isAuthenticated: false,
      profile: null,
      photos: [],
      preferences: null,
      matches: [],
      likes: [],
      conversations: [],
      messages: {},
      isPremium: false
    });
    await AsyncStorage.removeItem('user');
  },

  // Profile Actions
  setProfile: (profileData) => set({ profile: profileData }),
  
  updateProfile: async (updates) => {
    const currentProfile = get().profile;
    const updatedProfile = { ...currentProfile, ...updates };
    set({ profile: updatedProfile });
    await AsyncStorage.setItem('profile', JSON.stringify(updatedProfile));
  },
  
  addPhoto: (photo) => {
    const currentPhotos = get().photos;
    set({ photos: [...currentPhotos, photo] });
  },
  
  removePhoto: (photoId) => {
    const currentPhotos = get().photos;
    set({ photos: currentPhotos.filter(p => p.id !== photoId) });
  },
  
  setPreferences: (prefs) => set({ preferences: prefs }),

  // Match Actions
  addLike: (userId) => {
    const currentLikes = get().likes;
    set({ likes: [...currentLikes, userId] });
  },
  
  addMatch: (match) => {
    const currentMatches = get().matches;
    set({ matches: [...currentMatches, match] });
  },
  
  setMatches: (matches) => set({ matches }),

  // Chat Actions
  addConversation: (conversation) => {
    const currentConversations = get().conversations;
    set({ conversations: [...currentConversations, conversation] });
  },
  
  addMessage: (conversationId, message) => {
    const currentMessages = get().messages;
    const conversationMessages = currentMessages[conversationId] || [];
    set({ 
      messages: {
        ...currentMessages,
        [conversationId]: [...conversationMessages, message]
      }
    });
  },

  // Premium Actions
  setPremium: (status) => set({ isPremium: status }),

  // Notification Actions
  addNotification: (notification) => {
    const currentNotifications = get().notifications;
    set({ 
      notifications: [...currentNotifications, notification],
      unreadCount: get().unreadCount + 1
    });
  },
  
  clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
  
  markNotificationsRead: () => set({ unreadCount: 0 }),

  // Initialize from storage
  initializeFromStorage: async () => {
    try {
      const userStr = await AsyncStorage.getItem('user');
      const profileStr = await AsyncStorage.getItem('profile');
      
      if (userStr) {
        const user = JSON.parse(userStr);
        set({ user, isAuthenticated: true });
      }
      
      if (profileStr) {
        const profile = JSON.parse(profileStr);
        set({ profile });
      }
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  }
}));

export default useStore;