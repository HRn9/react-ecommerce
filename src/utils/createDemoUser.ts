import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

export const createDemoUser = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      'demo@fooddelivery.com',
      'demo123'
    );
    
    console.log('Demo user created successfully:', userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('Demo user already exists');
      return null;
    }
    console.error('Error creating demo user:', error);
    throw error;
  }
};

// Функция для проверки и создания демо-пользователя при необходимости
export const ensureDemoUserExists = async () => {
  try {
    // Попробуем войти под демо-пользователем
    await createDemoUser();
  } catch (error: any) {
    if (error.code !== 'auth/email-already-in-use') {
      console.error('Failed to ensure demo user exists:', error);
    }
  }
}; 