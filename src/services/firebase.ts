import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAJxcjoEGlpvbfv1d9J4yRLTTwXEOaFrjE",
  authDomain: "react-ecommerce-8c0c7.firebaseapp.com",
  projectId: "react-ecommerce-8c0c7",
  storageBucket: "react-ecommerce-8c0c7.appspot.com",
  messagingSenderId: "1092384567890",
  appId: "1:1092384567890:web:1234567890abcdef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const signUp = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export default app; 