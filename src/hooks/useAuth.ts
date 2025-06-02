import { useEffect } from 'react';
import { User, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { setUser, clearUser, setLoading, setError } from '../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../store';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    let mounted = true;
    
    console.log('Setting up auth state listener');
    
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      if (!mounted) return;
      
      console.log('Auth state changed:', user);
      if (user) {
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        }));
      } else {
        dispatch(clearUser());
      }
    });

    return () => {
      console.log('Cleaning up auth state listener');
      mounted = false;
      unsubscribe();
    };
  }, [dispatch]);

  const login = async (email: string, password: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      console.log('Attempting to login with email:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user);
      dispatch(setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName
      }));
    } catch (error: any) {
      console.error('Login error:', error);
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logout = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      console.log('Attempting to logout');
      await auth.signOut();
      console.log('Logout successful');
      dispatch(clearUser());
    } catch (error: any) {
      console.error('Logout error:', error);
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { login, logout, loading, error };
}; 