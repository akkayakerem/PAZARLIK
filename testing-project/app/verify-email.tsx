import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function VerifyEmail() {
  const params = useLocalSearchParams();
  const email = (params.email as string) || '';
  const password = (params.password as string) || '';
  
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [autoChecking, setAutoChecking] = useState(true);
  const { verifySignupCode, sendSignupCode, user } = useAuth();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Email verification durumunu kontrol et
  const checkEmailVerification = async (silent: boolean = false) => {
    if (!email || !password) {
      if (!silent) {
        Alert.alert('Hata', 'E-posta veya şifre bilgisi bulunamadı. Lütfen tekrar kayıt olun.');
        router.back();
      }
      return false;
    }

    if (!silent) {
      setChecking(true);
    }

    try {
      // Email verification durumunu kontrol et
      await verifySignupCode(email, password, '', silent); // Kod gerekmez, sadece durum kontrol edilir
      // Başarılı - email doğrulandı, takas sayfasına yönlendir
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      router.replace('/takas');
      return true;
    } catch (error: any) {
      // Email henüz doğrulanmamış veya başka bir hata
      // Silent modda hiçbir şey yapma, sadece false döndür
      if (!silent) {
        // Sadece manuel kontrol sırasında hata göster
        console.log('Email verification kontrolü hatası:', error.message);
      }
      return false;
    } finally {
      if (!silent) {
        setChecking(false);
      }
    }
  };

  // Otomatik kontrol (2 saniyede bir)
  useEffect(() => {
    if (autoChecking && email && password) {
      // İlk kontrolü hemen yap
      checkEmailVerification(true);

      // Sonra 2 saniyede bir kontrol et
      intervalRef.current = setInterval(() => {
        checkEmailVerification(true);
      }, 2000);

      // Cleanup
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  }, [autoChecking, email, password]);

  const handleResendEmail = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'E-posta veya şifre bilgisi bulunamadı. Lütfen tekrar kayıt olun.');
      router.back();
      return;
    }

    setLoading(true);
    try {
      // Kullanıcı zaten oluşturuldu, sadece email verification gönder
      const { sendEmailVerification } = await import('firebase/auth');
      const { auth } = await import('../config/firebase');
      
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        Alert.alert('Email Gönderildi', 'Doğrulama linki tekrar e-postanıza gönderildi.');
      } else {
        // Kullanıcı yoksa tekrar kayıt ol
        await sendSignupCode(email, password);
        Alert.alert('Email Gönderildi', 'Doğrulama linki e-postanıza gönderildi.');
      }
    } catch (error) {
      // Hata zaten AuthContext'te gösteriliyor
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={28} color="#000000" />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>E-posta Doğrulama</Text>
          <Text style={styles.subtitle}>
            {email ? `${email} adresine gönderilen doğrulama linkine tıklayın.` : 'E-posta adresinize gönderilen doğrulama linkine tıklayın.'}
          </Text>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Ionicons name="mail-outline" size={48} color="#000000" />
            <Text style={styles.infoText}>
              E-postanızı kontrol edin ve doğrulama linkine tıklayın.{'\n\n'}
              {autoChecking ? (
                'Email doğrulama durumu otomatik olarak kontrol ediliyor...'
              ) : (
                'Linke tıkladıktan sonra aşağıdaki butona basarak doğrulamayı kontrol edin.'
              )}
            </Text>
            {autoChecking && (
              <View style={styles.autoCheckIndicator}>
                <ActivityIndicator size="small" color="#000000" />
                <Text style={styles.autoCheckText}>Otomatik kontrol aktif</Text>
              </View>
            )}
          </View>

          {/* Check Verification Button */}
          <TouchableOpacity
            style={[styles.button, (loading || checking) && styles.buttonDisabled]}
            onPress={() => checkEmailVerification(false)}
            disabled={loading || checking}
          >
            {checking ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <Text style={styles.buttonText}>Doğrulamayı Kontrol Et</Text>
            )}
          </TouchableOpacity>

          {/* Resend Email Button */}
          <TouchableOpacity
            style={styles.resendButton}
            onPress={handleResendEmail}
            disabled={loading || checking}
          >
            <Text style={styles.resendButtonText}>Email'i Tekrar Gönder</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 28,
    paddingTop: 20,
  },
  backButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#000000',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
    fontFamily: 'RobotoCondensed',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
    fontFamily: 'RobotoCondensed',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  infoText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'RobotoCondensed',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 24,
  },
  autoCheckIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  autoCheckText: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'RobotoCondensed',
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'RobotoCondensed',
  },
  resendButton: {
    padding: 12,
    alignItems: 'center',
  },
  resendButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'RobotoCondensed',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

