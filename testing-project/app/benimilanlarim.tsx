import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useProducts } from '../contexts/ProductsContext';

export default function BenimIlanlarim() {
  const { products, deleteProduct } = useProducts();

  const myProducts = products.filter((item) => item.isUserCreated);

  const handleDelete = (id: string) => {
    Alert.alert(
      'İlanı Sil',
      'Bu ilanı silmek istediğine emin misin?',
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => deleteProduct(id),
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardMain}
        onPress={() =>
          router.push(
            `/urundetay?id=${item.id}&name=${encodeURIComponent(item.name)}&brand=${encodeURIComponent(item.brand)}&category=${encodeURIComponent(item.category)}&price=${encodeURIComponent(item.price)}` as any
          )
        }
      >
        <Image source={item.image} style={styles.image} resizeMode="cover" />

        <View style={styles.cardContent}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.brand}>{item.brand}</Text>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push(`/ilanekle?editId=${item.id}` as any)}
        >
          <Ionicons name="create-outline" size={18} color="#FFFFFF" />
          <Text style={styles.editButtonText}>Düzenle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Ionicons name="trash-outline" size={18} color="#FFFFFF" />
          <Text style={styles.deleteButtonText}>Sil</Text>
        </TouchableOpacity>
      </View>
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

          <Text style={styles.headerTitle}>Benim İlanlarım</Text>

          <View style={{ width: 44 }} />
        </View>

        {myProducts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="albums-outline" size={64} color="#999999" />
            <Text style={styles.emptyTitle}>Henüz ilan eklemedin</Text>
            <Text style={styles.emptyText}>
              Yeni bir ilan oluşturduğunda burada görünecek.
            </Text>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push('/ilanekle' as any)}
            >
              <Text style={styles.addButtonText}>İlan Ekle</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={myProducts}
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
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  cardMain: {
    flexDirection: 'row',
  },
  image: {
    width: 110,
    height: 110,
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'RobotoCondensed',
    marginBottom: 4,
  },
  brand: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'RobotoCondensed',
    marginBottom: 4,
  },
  category: {
    fontSize: 13,
    color: '#888888',
    fontFamily: 'RobotoCondensed',
    marginBottom: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'RobotoCondensed',
  },
  actionRow: {
    flexDirection: 'row',
  },
  editButton: {
    flex: 1,
    backgroundColor: '#1565C0',
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'RobotoCondensed',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#C62828',
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
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
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'RobotoCondensed',
  },
});