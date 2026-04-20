import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase yapılandırma bilgileri
const firebaseConfig = {
  apiKey: "AIzaSyA93yZf1Cx4OD1Bn9Epl71UWnfM3TAALzY",
  authDomain: "trading-app-1447a.firebaseapp.com",
  projectId: "trading-app-1447a",
  storageBucket: "trading-app-1447a.firebasestorage.app",
  messagingSenderId: "581452926399",
  appId: "1:581452926399:web:d380359b0c6cbdacb6e50a",
  measurementId: "G-EW9C5E5HYX"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Auth'u başlat (Expo'da otomatik olarak AsyncStorage kullanır)
const auth = getAuth(app);

// Firestore'u başlat
const db = getFirestore(app);

export { auth, db };
export default app;

