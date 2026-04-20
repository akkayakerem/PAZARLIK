import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Yardim() {
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Yardım</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.content}>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Nasıl ilan eklerim?</Text>
            <Text style={styles.cardText}>
              Takas ekranındaki “İlan Ekle” butonuna basarak yeni ürün
              ekleyebilirsin.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Nasıl teklif gönderirim?</Text>
            <Text style={styles.cardText}>
              Ürün detay sayfasına girip “Takas Teklifi Ver” butonunu
              kullanabilirsin.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => Alert.alert('Destek', 'Destek ekibiyle iletişim özelliği daha sonra eklenecek.')}
          >
            <Text style={styles.contactButtonText}>Destek ile İletişim</Text>
          </TouchableOpacity>
        </View>
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
  },
  card: {
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'RobotoCondensed',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 22,
    fontFamily: 'RobotoCondensed',
  },
  contactButton: {
    marginTop: 10,
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'RobotoCondensed',
  },
});