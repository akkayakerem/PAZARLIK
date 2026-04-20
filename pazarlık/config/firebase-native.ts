// Firebase Native SDK (@react-native-firebase) yapılandırması
// Bu dosya @react-native-firebase/auth kullanmak için hazırlanmıştır
// Mevcut firebase.ts (web SDK) ile birlikte kullanılabilir

import auth from '@react-native-firebase/auth';

// Kayıt ol
export const register = async (email: string, password: string) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    console.log('Kayıt başarılı!');
    return { success: true };
  } catch (error: any) {
    console.log('Kayıt hatası:', error.message);
    throw error;
  }
};

// Giriş yap
export const login = async (email: string, password: string) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    console.log('Giriş başarılı!');
    return { success: true };
  } catch (error: any) {
    console.log('Giriş hatası:', error.message);
    throw error;
  }
};

// Şifremi unuttum
export const resetPassword = async (email: string) => {
  try {
    await auth().sendPasswordResetEmail(email);
    console.log('Şifre sıfırlama maili gönderildi!');
    return { success: true };
  } catch (error: any) {
    console.log('Hata:', error.message);
    throw error;
  }
};

// Çıkış yap
export const logout = async () => {
  try {
    await auth().signOut();
    console.log('Çıkış başarılı!');
    return { success: true };
  } catch (error: any) {
    console.log('Çıkış hatası:', error.message);
    throw error;
  }
};

// Mevcut kullanıcıyı al
export const getCurrentUser = () => {
  return auth().currentUser;
};

// Auth state listener
export const onAuthStateChanged = (callback: (user: any) => void) => {
  return auth().onAuthStateChanged(callback);
};

// Auth instance'ı export et
export default auth;



