import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDu0Z4GMwIv6bZKPehqXgm6YZJFvIlDvZ0",
  authDomain: "portfolio-be89a.firebaseapp.com",
  projectId: "portfolio-be89a",
  storageBucket: "portfolio-be89a.firebasestorage.app",
  messagingSenderId: "134458657878",
  appId: "1:134458657878:web:5e26fcbcdcfebae3137ff7",
  measurementId: "G-2YQE58TXHR"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
