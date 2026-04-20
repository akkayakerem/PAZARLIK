import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function ResetPassword() {
  const params = useLocalSearchParams();
  const email = (params.email as string) || '';
  
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'code' | 'password'>('code');
  
  const { sendResetCode, verifyResetCode, updatePasswordWithCode } = useAuth();

  const handleSendCode = async () => {
    if (!email) {
      Alert.alert('Uyarı', 'E-posta adresi bulunamadı.');
      return;
    }

    setLoading(true);
    try {
      const sentCode = await sendResetCode(email);
      Alert.alert(
        'Kod Gönderildi',
        `E-postanıza 5 haneli kod gönderildi.\n\nTest için kod: ${sentCode}\n\n(Production'da bu kod gösterilmeyecek)`,
        [{ text: 'Tamam', onPress: () => setStep('code') }]
      );
    } catch (error) {
      // Hata zaten AuthContext'te gösteriliyor
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code || code.length !== 5) {
      Alert.alert('Uyarı', 'Lütfen 5 haneli kodu girin.');
      return;
    }

    setLoading(true);
    try {
      const isValid = await verifyResetCode(email, code);
      if (isValid) {
        setStep('password');
      }
    } catch (error) {
      // Hata zaten AuthContext'te gösteriliyor
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Uyarı', 'Lütfen tüm alanları doldurun.');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Uyarı', 'Şifre en az 6 karakter olmalıdır.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Uyarı', 'Şifreler eşleşmiyor.');
      return;
    }

    setLoading(true);
    try {
      await updatePasswordWithCode(email, code, newPassword);
      Alert.alert(
        'Başarılı',
        'Şifreniz güncellendi! Giriş sayfasına yönlendiriliyorsunuz...',
        [{ text: 'Tamam', onPress: () => router.replace('/login') }]
      );
    } catch (error) {
      // Hata zaten AuthContext'te gösteriliyor
    } finally {
      setLoading(false);
    }
  };

  if (step === 'code') {
    return (
      <>
        <StatusBar style="light" />
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
              <Ionicons name="chevron-back" size={28} color="white" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>Şifre Sıfırlama</Text>
            <Text style={styles.subtitle}>
              {email ? `${email} adresine gönderilen 5 haneli kodu girin.` : 'E-posta adresinize gönderilen 5 haneli kodu girin.'}
            </Text>

            {/* Code Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.codeInput}
                placeholder="5 haneli kod"
                placeholderTextColor="#8B5CF6"
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                maxLength={5}
                autoFocus
              />
            </View>

            {/* Send Code Button (if code not sent yet) */}
            {!code && (
              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSendCode}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>Kod Gönder</Text>
                )}
              </TouchableOpacity>
            )}

            {/* Verify Code Button */}
            {code.length === 5 && (
              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleVerifyCode}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>Kodu Doğrula</Text>
                )}
              </TouchableOpacity>
            )}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setStep('code')}
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>Yeni Şifre</Text>
          <Text style={styles.subtitle}>Yeni şifrenizi girin.</Text>

          {/* New Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Yeni şifre"
              placeholderTextColor="#8B5CF6"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowNewPassword(!showNewPassword)}
            >
              <Ionicons name={showNewPassword ? "eye" : "eye-off"} size={24} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Yeni şifre (tekrar)"
              placeholderTextColor="#8B5CF6"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons name={showConfirmPassword ? "eye" : "eye-off"} size={24} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Update Password Button */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleUpdatePassword}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Şifreyi Güncelle</Text>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
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
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#8B5CF6',
    marginBottom: 12,
    fontFamily: 'RobotoCondensed',
  },
  subtitle: {
    fontSize: 16,
    color: '#999999',
    marginBottom: 35,
    fontFamily: 'RobotoCondensed',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#8B5CF6',
    borderRadius: 16,
    padding: 18,
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'RobotoCondensed',
  },
  codeInput: {
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#8B5CF6',
    borderRadius: 16,
    padding: 18,
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'RobotoCondensed',
    textAlign: 'center',
    letterSpacing: 8,
  },
  eyeButton: {
    position: 'absolute',
    right: 18,
    top: 18,
  },
  button: {
    backgroundColor: '#8B5CF6',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'RobotoCondensed',
  },
});





