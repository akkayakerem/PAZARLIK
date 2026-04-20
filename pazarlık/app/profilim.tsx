import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function Profilim() {
  const { user } = useAuth();

  const [fullName, setFullName] = useState('Kerem Akkaya');
  const [city, setCity] = useState('İstanbul');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');

  const handleSave = () => {
    Alert.alert('Başarılı', 'Profil bilgileri güncellendi.');
  };

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profilim</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.avatarBox}>
            <Ionicons name="person" size={42} color="#000000" />
          </View>

          <Text style={styles.label}>Ad Soyad</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Ad Soyad"
          />

          <Text style={styles.label}>E-posta</Text>
          <View style={styles.readonlyBox}>
            <Text style={styles.readonlyText}>
              {user?.email ? user.email : 'kullanici@email.com'}
            </Text>
          </View>

          <Text style={styles.label}>Şehir</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
            placeholder="Şehir"
          />

          <Text style={styles.label}>Telefon</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Telefon numarası"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Hakkımda</Text>
          <TextInput
            style={styles.textArea}
            value={bio}
            onChangeText={setBio}
            placeholder="Kendin hakkında kısa bilgi"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Kaydet</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'RobotoCondensed',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  avatarBox: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
    marginTop: 12,
    fontFamily: 'RobotoCondensed',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: '#000000',
    fontFamily: 'RobotoCondensed',
    backgroundColor: '#FFFFFF',
  },
  readonlyBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  readonlyText: {
    fontSize: 15,
    color: '#666666',
    fontFamily: 'RobotoCondensed',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    minHeight: 120,
    fontSize: 15,
    color: '#000000',
    fontFamily: 'RobotoCondensed',
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'RobotoCondensed',
  },
});