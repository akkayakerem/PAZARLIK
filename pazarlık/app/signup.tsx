import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Alert, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { sendSignupCode } = useAuth();

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Uyarı', 'Lütfen e-posta ve şifre alanlarını doldurun.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Uyarı', 'Şifre en az 6 karakter olmalıdır.');
      return;
    }

    // Email format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Uyarı', 'Lütfen geçerli bir e-posta adresi girin.');
      return;
    }

    setLoading(true);
    try {
      console.log('Kayıt kodu gönderiliyor...', email);
      await sendSignupCode(email, password);
      console.log('Email gönderildi!');
      
      // Doğrulama sayfasına yönlendir (kod göndermeden)
      router.push({
        pathname: '/verify-email',
        params: { email, password },
      });
    } catch (error: any) {
      console.error('Kod gönderme hatası:', error);
      // Hata zaten AuthContext'te gösteriliyor
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <ImageBackground 
        source={require('../assets/images/photo3.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Overlay for better text readability */}
        <View style={styles.overlay} />
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.content}
          >
          {/* Geri Butonu */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={38} color="#000000" />
          </TouchableOpacity>

          {/* Başlık */}
          <Text style={styles.title}>Hesap oluştur</Text>
          <Text style={styles.subtitle}>E-Postan ile bir hesap oluşturmak için yeni hesap bilgilerinizi girin</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="E-posta adresiniz"
            placeholderTextColor="#FFFFFF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {email.length > 0 && (
            <View style={styles.checkmark}>
              <Ionicons name="checkmark" size={18} color="white" />
            </View>
          )}
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Şifreniz"
            placeholderTextColor="#FFFFFF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity 
          style={[styles.signupButton, loading && styles.signupButtonDisabled]}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.signupButtonText}>Kayıt ol</Text>
          )}
        </TouchableOpacity>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Zaten hesabın var mı? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.loginLink}>Giriş yap</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 28,
    paddingTop: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  backButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'RobotoCondensed',
    zIndex: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 35,
    fontFamily: 'RobotoCondensed',
    opacity: 0.9,
    zIndex: 1,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'RobotoCondensed',
    zIndex: 1,
  },
  checkmark: {
    position: 'absolute',
    right: 18,
    top: 18,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  eyeButton: {
    position: 'absolute',
    right: 18,
    top: 18,
  },
  signupButton: {
    backgroundColor: '#22C55E',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
    zIndex: 1,
  },
  signupButtonDisabled: {
    opacity: 0.6,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'RobotoCondensed',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  loginText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontFamily: 'RobotoCondensed',
    opacity: 0.9,
  },
  loginLink: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: 'RobotoCondensed',
    lineHeight: 30,
  },
});

