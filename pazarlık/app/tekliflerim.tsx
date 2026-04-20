import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useProducts } from '../contexts/ProductsContext';

export default function Tekliflerim() {
  const { offers } = useProducts();

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.productName}>{item.productName}</Text>
      <Text style={styles.info}>Teklif edilen ürün: {item.offeredItem}</Text>
      <Text style={styles.info}>
        Ek ödeme: {item.extraPayment ? `${item.extraPayment} TL` : 'Yok'}
      </Text>
      <Text style={styles.date}>{item.createdAt}</Text>
    </View>
  );

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#000000" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Tekliflerim</Text>

          <View style={{ width: 44 }} />
        </View>

        {offers.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="swap-horizontal-outline" size={64} color="#999999" />
            <Text style={styles.emptyTitle}>Henüz teklif yok</Text>
            <Text style={styles.emptyText}>
              Gönderdiğin teklifler burada listelenecek.
            </Text>
          </View>
        ) : (
          <FlatList
            data={offers}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#F7F7F7',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'RobotoCondensed',
  },
  listContent: {
    padding: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'RobotoCondensed',
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: '#444444',
    fontFamily: 'RobotoCondensed',
    marginBottom: 4,
  },
  date: {
    marginTop: 8,
    fontSize: 12,
    color: '#888888',
    fontFamily: 'RobotoCondensed',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'RobotoCondensed',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    fontFamily: 'RobotoCondensed',
  },
});