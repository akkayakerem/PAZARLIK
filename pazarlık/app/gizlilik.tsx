import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Gizlilik() {
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Gizlilik</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.card}>
            <Text style={styles.title}>Gizlilik Politikası</Text>
            <Text style={styles.text}>
              Bu bölümde kullanıcı bilgilerinin nasıl işlendiği, saklandığı ve
              korunduğuna dair bilgiler yer alır.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Veri Kullanımı</Text>
            <Text style={styles.text}>
              Uygulama içerisinde girilen bazı bilgiler kullanıcı deneyimini
              geliştirmek amacıyla kullanılabilir.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Hesap Güvenliği</Text>
            <Text style={styles.text}>
              Şifrenizi kimseyle paylaşmamanız ve güvenli bir parola kullanmanız
              önerilir.
            </Text>
          </View>
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
  card: {
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'RobotoCondensed',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 22,
    fontFamily: 'RobotoCondensed',
  },
});