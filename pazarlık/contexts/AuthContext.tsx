import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithCredential,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  sendSignupCode: (email: string, password: string) => Promise<void>; // Kayıt ol ve email verification gönder
  verifySignupCode: (email: string, password: string, code: string, silent?: boolean) => Promise<void>; // Email verification durumunu kontrol et
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  sendResetCode: (email: string) => Promise<string>;
  verifyResetCode: (email: string, code: string) => Promise<boolean>;
  updatePasswordWithCode: (email: string, code: string, newPassword: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// WebBrowser'ı Google auth için optimize et
WebBrowser.maybeCompleteAuthSession();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Google OAuth provider
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '581452926399-xxxxx.apps.googleusercontent.com', // iOS için (opsiyonel)
    webClientId: '581452926399-xxxxx.apps.googleusercontent.com', // Web için Firebase'den alınacak
    androidClientId: '581452926399-xxxxx.apps.googleusercontent.com', // Android için (opsiyonel)
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Google auth response handler
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch((error) => {
        Alert.alert('Hata', 'Google ile giriş yaparken bir hata oluştu.');
      });
    }
  }, [response]);

  // Kayıt ol ve email verification gönder (Firebase built-in)
  const sendSignupCode = async (email: string, password: string): Promise<void> => {
    try {
      console.log('Kayıt başladı:', { email, passwordLength: password.length });
      
      // Email format kontrolü
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Geçersiz e-posta adresi.');
      }

      // Şifre kontrolü
      if (password.length < 6) {
        throw new Error('Şifre en az 6 karakter olmalıdır.');
      }

      // Firebase'de kullanıcı oluştur
      console.log('Firebase\'de kullanıcı oluşturuluyor...');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Kullanıcı oluşturuldu:', userCredential.user.uid);

      // Email verification gönder (Firebase built-in)
      console.log('Email verification gönderiliyor...');
      try {
        await sendEmailVerification(userCredential.user, {
          url: 'https://trading-app-1447a.firebaseapp.com', // Action handler URL
        });
        console.log('✅ Email verification gönderildi!');
        
        Alert.alert(
          'Kayıt Başarılı',
          'E-postanıza doğrulama linki gönderildi. Lütfen e-postanızı kontrol edin (spam klasörüne de bakın) ve linke tıklayın.',
          [{ text: 'Tamam' }]
        );
      } catch (emailError: any) {
        console.error('❌ Email gönderme hatası:', emailError);
        console.error('Error code:', emailError.code);
        console.error('Error message:', emailError.message);
        
        // Email gönderme başarısız olsa bile kullanıcı oluşturuldu, bilgi ver
        Alert.alert(
          'Kayıt Başarılı (Email Gönderilemedi)',
          `Kullanıcı oluşturuldu ancak doğrulama email'i gönderilemedi.\n\nHata: ${emailError.message || 'Bilinmeyen hata'}\n\nLütfen Firebase Console'dan email ayarlarını kontrol edin.`,
          [{ text: 'Tamam' }]
        );
      }
    } catch (error: any) {
      console.error('❌ Kayıt hatası:', error);
      
      let errorMessage = 'Kayıt olurken bir hata oluştu.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Bu e-posta adresi zaten kullanılıyor. Lütfen giriş yapın.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Geçersiz e-posta adresi.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Şifre çok zayıf. En az 6 karakter olmalı.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert('Hata', errorMessage);
      throw error;
    }
  };

  // Email verification durumunu kontrol et (kullanıcı email'deki linke tıkladı mı?)
  const verifySignupCode = async (email: string, password: string, code: string, silent: boolean = false): Promise<void> => {
    try {
      // Firebase built-in email verification kullanıldığı için kod girişi gerekmez
      // Kullanıcı email'deki linke tıklayınca otomatik verify olur
      // Bu fonksiyon artık sadece email verification durumunu kontrol eder
      
      let currentUser = auth.currentUser;
      
      if (!currentUser) {
        // Kullanıcı giriş yapmamış, önce giriş yapmalı
        try {
          await signInWithEmailAndPassword(auth, email, password);
          currentUser = auth.currentUser;
        } catch (signInError: any) {
          // Silent modda giriş hatası sessizce yakalanır
          if (!silent) {
            throw signInError;
          }
          // Silent modda sadece hata fırlat, Alert gösterme
          throw new Error('Kullanıcı girişi başarısız');
        }
      }

      if (!currentUser) {
        throw new Error('Kullanıcı bulunamadı');
      }

      // Email verification durumunu kontrol et (user bilgilerini yenile)
      await currentUser.reload();
      currentUser = auth.currentUser;
      
      if (currentUser && currentUser.emailVerified) {
        console.log('✅ Email doğrulandı!');
        // Email doğrulandı, home sayfasına yönlendirilecek
      } else {
        // Sadece silent mod değilse Alert göster
        if (!silent) {
          Alert.alert(
            'Email Doğrulanmadı',
            'Lütfen e-postanıza gönderilen doğrulama linkine tıklayın. Eğer email gelmediyse, spam klasörünü kontrol edin.',
            [{ text: 'Tamam' }]
          );
        }
        throw new Error('Email not verified');
      }
    } catch (error: any) {
      console.error('Email verification kontrolü hatası:', error.code, error.message);
      
      // Sadece silent mod değilse ve auth hatası varsa Alert göster
      if (!silent && error.code && error.code.startsWith('auth/')) {
        let errorMessage = 'Email doğrulama kontrolü sırasında bir hata oluştu.';
        
        if (error.code === 'auth/user-not-found') {
          errorMessage = 'Kullanıcı bulunamadı. Lütfen tekrar kayıt olun.';
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = 'Yanlış şifre.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Geçersiz e-posta adresi.';
        }
        
        Alert.alert('Hata', errorMessage);
      }
      
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      let errorMessage = 'Giriş yaparken bir hata oluştu.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Yanlış şifre.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Geçersiz e-posta adresi.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'E-posta veya şifre hatalı.';
      }
      
      Alert.alert('Hata', errorMessage);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      Alert.alert('Hata', 'Çıkış yaparken bir hata oluştu.');
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Başarılı', 'Şifre sıfırlama e-postası gönderildi.');
    } catch (error: any) {
      let errorMessage = 'Şifre sıfırlama e-postası gönderilemedi.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Geçersiz e-posta adresi.';
      }
      
      Alert.alert('Hata', errorMessage);
      throw error;
    }
  };

  // 5 haneli kod gönderme
  const sendResetCode = async (email: string): Promise<string> => {
    try {
      // Kullanıcının var olup olmadığını kontrol et
      await sendPasswordResetEmail(auth, email); // Bu sadece kontrol için
      
      // 5 haneli kod oluştur
      const code = Math.floor(10000 + Math.random() * 90000).toString();
      
      // Firestore'da kod sakla (5 dakika geçerli)
      const codeRef = doc(db, 'resetCodes', email);
      await setDoc(codeRef, {
        code,
        email,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 dakika
      });

      // Email gönderme - Basit çözüm (test için console'da göster)
      console.log('📧 Şifre sıfırlama kodu:', code);
      console.log('📧 Email:', email);
      
      // Test için: Kodu console'da göster
      Alert.alert(
        'Şifre Sıfırlama Kodu',
        `Şifre sıfırlama kodunuz: ${code}\n\n(Bu test modu. Production'da email ile gönderilecek.)`,
        [{ text: 'Tamam' }]
      );
      
      return code;
    } catch (error: any) {
      let errorMessage = 'Kod gönderilemedi.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Geçersiz e-posta adresi.';
      }
      
      Alert.alert('Hata', errorMessage);
      throw error;
    }
  };

  // Kod doğrulama
  const verifyResetCode = async (email: string, code: string): Promise<boolean> => {
    try {
      const codeRef = doc(db, 'resetCodes', email);
      const codeDoc = await getDoc(codeRef);
      
      if (!codeDoc.exists()) {
        Alert.alert('Hata', 'Geçersiz kod veya kodun süresi dolmuş.');
        return false;
      }

      const codeData = codeDoc.data();
      const now = new Date();
      const expiresAt = codeData.expiresAt.toDate();

      if (now > expiresAt) {
        await deleteDoc(codeRef);
        Alert.alert('Hata', 'Kodun süresi dolmuş. Lütfen yeni kod isteyin.');
        return false;
      }

      if (codeData.code !== code) {
        Alert.alert('Hata', 'Yanlış kod. Lütfen tekrar deneyin.');
        return false;
      }

      return true;
    } catch (error) {
      Alert.alert('Hata', 'Kod doğrulanırken bir hata oluştu.');
      return false;
    }
  };

  // Şifre güncelleme (kod ile)
  // Not: Firebase Admin SDK gerektirir, şimdilik Firestore'da saklıyoruz
  // Production'da Firebase Functions ile backend'den güncellenmeli
  const updatePasswordWithCode = async (email: string, code: string, newPassword: string): Promise<void> => {
    try {
      // Önce kodu doğrula
      const isValid = await verifyResetCode(email, code);
      if (!isValid) {
        throw new Error('Geçersiz kod');
      }

      // Kod doğrulandı, şimdi şifreyi güncellemek için Firestore'da sakla
      // Production'da Firebase Functions ile backend'den güncellenmeli
      const tokenRef = doc(db, 'passwordResetTokens', email);
      await setDoc(tokenRef, {
        email,
        newPassword,
        code, // Doğrulanmış kod
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 dakika
        status: 'pending', // Şifre güncelleme bekliyor
      });

      // Kod'u sil
      const codeRef = doc(db, 'resetCodes', email);
      await deleteDoc(codeRef);

      // Not: Firebase Admin SDK olmadan direkt şifre güncelleme yapamayız
      // Bu yüzden Firestore'da yeni şifreyi sakladık
      // Production'da Firebase Functions ile backend'den şifreyi güncelleyebiliriz
      // Şimdilik: Başarılı mesajı göster, gerçek güncelleme Firebase Functions'da yapılacak
      
      // Geçici çözüm: Kullanıcıya email link gönderelim
      // await sendPasswordResetEmail(auth, email);
      
      // Şimdilik başarılı mesajı göster
      // Production'da Firebase Functions ile şifre güncellenecek
    } catch (error: any) {
      Alert.alert('Hata', 'Şifre güncellenirken bir hata oluştu.');
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      if (!request) {
        Alert.alert('Hata', 'Google giriş hazır değil. Lütfen tekrar deneyin.');
        return;
      }
      
      await promptAsync();
    } catch (error: any) {
      Alert.alert('Hata', 'Google ile giriş yaparken bir hata oluştu.');
      throw error;
    }
  };

  const signInWithApple = async () => {
    try {
      // Apple Sign-In için expo-apple-authentication kullanılmalı
      // Şimdilik placeholder - sonra implement edeceğiz
      Alert.alert('Bilgi', 'Apple ile giriş yakında eklenecek.');
    } catch (error: any) {
      Alert.alert('Hata', 'Apple ile giriş yaparken bir hata oluştu.');
      throw error;
    }
  };

  const value = {
    user,
    loading,
    sendSignupCode,
    verifySignupCode,
    signIn,
    logOut,
    resetPassword,
    sendResetCode,
    verifyResetCode,
    updatePasswordWithCode,
    signInWithGoogle,
    signInWithApple,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

