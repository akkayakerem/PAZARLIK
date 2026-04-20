import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Alert, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, resetPassword, signInWithGoogle, signInWithApple } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Uyarı', 'Lütfen e-posta ve şifre alanlarını doldurun.');
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      // Başarılı giriş sonrası takas sayfasına yönlendir
      router.replace('/takas');
    } catch (error) {
      // Hata zaten AuthContext'te gösteriliyor
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      // Başarılı giriş sonrası takas sayfasına yönlendir
      router.replace('/takas');
    } catch (error) {
      // Hata zaten AuthContext'te gösteriliyor
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithApple();
      // Başarılı giriş sonrası takas sayfasına yönlendir
      router.replace('/takas');
    } catch (error) {
      // Hata zaten AuthContext'te gösteriliyor
    } finally {
      setLoading(false);
    }
  };

  const handleGuestContinue = () => {
    router.replace('/takas');
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
          {/* Discover Butonu */}
          <TouchableOpacity 
            style={styles.onboardingButton}
            onPress={() => router.push('/discover')}
          >
            <Ionicons name="chevron-back" size={38} color="#000000" />
          </TouchableOpacity>

          {/* Başlık */}
          <Text style={styles.title}>Hemen giriş yap, takas et!</Text>


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

        {/* Forgot Password */}
        <TouchableOpacity onPress={() => {
          if (email) {
            router.push({
              pathname: '/reset-password',
              params: { email },
            });
          } else {
            Alert.alert('Uyarı', 'Lütfen önce e-posta adresinizi girin.');
          }
        }}>
          <Text style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Şifreni mi unuttun? </Text>
            <Text style={styles.recoverText}>Kurtar</Text>
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity 
          style={[styles.loginButton, loading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.loginButtonText}>Giriş yap</Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <Text style={styles.divider}>veya</Text>

        {/* Apple Sign In */}
        <TouchableOpacity 
          style={styles.socialButton}
          onPress={handleAppleSignIn}
        >
          <Ionicons name="logo-apple" size={24} color="black" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Apple ile giriş yap</Text>
        </TouchableOpacity>

        {/* Google Sign In */}
        <TouchableOpacity 
          style={styles.socialButton}
          onPress={handleGoogleSignIn}
        >
          <View style={styles.googleIconContainer}>
            <Svg width={24} height={24} viewBox="0 0 24 24">
              <Path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <Path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <Path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <Path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </Svg>
          </View>
          <Text style={styles.socialButtonText}>Google ile giriş yap</Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>E-postan ile katılmak ister misin? </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.signupLink}>Kayıt ol</Text>
          </TouchableOpacity>
        </View>

        {/* Misafir Olarak Devam Et */}
        <TouchableOpacity 
          style={styles.guestButton}
          onPress={handleGuestContinue}
        >
          <Text style={styles.guestButtonText}>Misafir olarak devam et</Text>
        </TouchableOpacity>
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
  onboardingButton: {
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
    marginBottom: 18,
    fontFamily: 'RobotoCondensed',
    zIndex: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 35,
    fontFamily: 'RobotoCondensed',
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
  forgotPassword: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
    fontFamily: 'RobotoCondensed',
  },
  forgotPasswordText: {
    color: '#999999',
  },
  recoverText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  loginButton: {
    backgroundColor: '#22C55E',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    zIndex: 1,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'RobotoCondensed',
  },
  divider: {
    textAlign: 'center',
    color: '#999999',
    fontSize: 16,
    marginBottom: 12,
    fontWeight: '600',
    fontFamily: 'RobotoCondensed',
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  socialIcon: {
    marginRight: 12,
  },
  googleIconContainer: {
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  signupText: {
    fontSize: 15,
    color: '#999999',
    fontFamily: 'RobotoCondensed',
  },
  signupLink: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: 'RobotoCondensed',
    lineHeight: 30,
  },
  guestButton: {
    marginTop: 20,
    marginBottom: 20,
    paddingVertical: 16,
    alignItems: 'center',
    zIndex: 1,
  },
  guestButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'RobotoCondensed',
    textDecorationLine: 'underline',
  },
});