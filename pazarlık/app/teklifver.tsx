import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useProducts } from '../contexts/ProductsContext';

export default function TeklifVer() {
  const params = useLocalSearchParams();
  const { addOffer } = useProducts();

  const productId = String(params.productId ?? '');
  const productName = String(params.productName ?? '');

  const [offeredItem, setOfferedItem] = useState('');
  const [extraPayment, setExtraPayment] = useState('');

  const handleSubmit = () => {
    if (!offeredItem.trim()) {
      Alert.alert('Uyarı', 'Lütfen teklif edeceğiniz ürünü yazın.');
      return;
    }

    addOffer({
      productId,
      productName,
      offeredItem,
      extraPayment,
    });

    Alert.alert(
      'Teklif Gönderildi',
      `${productName} ürünü için teklifiniz oluşturuldu.`
    );

    setOfferedItem('');
    setExtraPayment('');
    router.back();
  };

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#000000" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>TAKAS TEKLİFİ</Text>

          <View style={{ width: 24 }} />
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>Seçilen ürün</Text>
          <View style={styles.readonlyBox}>
            <Text style={styles.readonlyText}>{productName}</Text>
          </View>

          <Text style={styles.label}>Teklif edeceğiniz ürün</Text>
          <TextInput
            style={styles.input}
            placeholder="Örn: iPhone 12 128 GB"
            value={offeredItem}
            onChangeText={setOfferedItem}
          />

          <Text style={styles.label}>Ek ödeme (isteğe bağlı)</Text>
          <TextInput
            style={styles.input}
            placeholder="Örn: 2500"
            value={extraPayment}
            onChangeText={setExtraPayment}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Teklifi Gönder</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
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
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'RobotoCondensed',
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    color: '#444444',
    marginBottom: 8,
    fontFamily: 'RobotoCondensed',
  },
  readonlyBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
  },
  readonlyText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'RobotoCondensed',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 18,
    fontSize: 15,
    fontFamily: 'RobotoCondensed',
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'RobotoCondensed',
  },
});