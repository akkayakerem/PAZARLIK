import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useProducts } from '../contexts/ProductsContext';

export default function UrunDetay() {
  const params = useLocalSearchParams();
  const { products } = useProducts();

  const id = String(params.id ?? '');
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ÜRÜN DETAYI</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Ürün bulunamadı.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#000000" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>ÜRÜN DETAYI</Text>

          <View style={{ width: 24 }} />
        </View>

        <View style={styles.content}>
          <Image
            source={product.image}
            style={styles.productImage}
            resizeMode="cover"
          />

          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productBrand}>{product.brand}</Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Kategori</Text>
            <Text style={styles.infoValue}>{product.category}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>İşlem Türü</Text>
            <Text style={styles.infoValue}>{product.price}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Ürün No</Text>
            <Text style={styles.infoValue}>{product.id}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Açıklama</Text>
            <Text style={styles.infoValue}>
              {product.description ? product.description : 'Açıklama girilmemiş.'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.push(
                `/teklifver?productId=${product.id}&productName=${encodeURIComponent(product.name)}` as any
              )
            }
          >
            <Text style={styles.buttonText}>Takas Teklifi Ver</Text>
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
    flex: 1,
    padding: 20,
  },
  productImage: {
    width: '100%',
    height: 260,
    borderRadius: 16,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'RobotoCondensed',
    marginBottom: 6,
  },
  productBrand: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'RobotoCondensed',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 13,
    color: '#777777',
    fontFamily: 'RobotoCondensed',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
    fontFamily: 'RobotoCondensed',
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
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 18,
    color: '#666666',
    fontFamily: 'RobotoCondensed',
  },
});