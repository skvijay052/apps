import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// PASTE YOUR CONFIG HERE (replace this entire object)
const firebaseConfig = {
  apiKey: "AIzaSyCPI20Wd5AcMc8HrtVtqt_LswtQP1NdXy8",
  authDomain: "com.company.bandhanaa",
  projectId: "bandhanaa-3f0b1",
  storageBucket: "bandhanaa-3f0b1.firebasestorage.app",
  messagingSenderId: "623945752736",
  appId: "1:623945752736:android:5b7da13501419cdaaca9c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;