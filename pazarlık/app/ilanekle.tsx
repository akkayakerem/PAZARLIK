import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useProducts } from '../contexts/ProductsContext';

const categories = ['ELEKTRONİK', 'OTOMOBİL', 'EV EŞYASI'];
const priceOptions = ['Takas', 'Takas + Nakit'];

export default function IlanEkle() {
  const params = useLocalSearchParams();
  const { products, addProduct, updateProduct } = useProducts();

  const editId = String(params.editId ?? '');
  const isEditMode = !!editId;
  const existingProduct = products.find((item) => item.id === editId);

  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ELEKTRONİK');
  const [selectedPrice, setSelectedPrice] = useState('Takas');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  useEffect(() => {
    if (isEditMode && existingProduct) {
      setProductName(existingProduct.name);
      setBrand(existingProduct.brand);
      setSelectedCategory(existingProduct.category);
      setSelectedPrice(existingProduct.price);
      setDescription(existingProduct.description || '');
      setSelectedImage(existingProduct.image);
    }
  }, [isEditMode, existingProduct]);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('İzin Gerekli', 'Galeriden resim seçmek için izin vermelisin.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedImage({ uri: result.assets[0].uri });
    }
  };

  const handleSubmit = () => {
    if (!productName.trim() || !brand.trim() || !description.trim()) {
      Alert.alert('Uyarı', 'Lütfen tüm gerekli alanları doldurun.');
      return;
    }

    const payload = {
      name: productName,
      brand,
      category: selectedCategory,
      price: selectedPrice,
      description,
      image: selectedImage || undefined,
    };

    if (isEditMode) {
      updateProduct(editId, payload);
      Alert.alert('Başarılı', 'İlan güncellendi.');
    } else {
      addProduct(payload);
      Alert.alert('Başarılı', 'İlan oluşturuldu.');
    }

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

          <Text style={styles.headerTitle}>
            {isEditMode ? 'İLAN DÜZENLE' : 'İLAN EKLE'}
          </Text>

          <View style={{ width: 24 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.label}>Ürün Görseli</Text>
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {selectedImage ? (
              <Image source={selectedImage} style={styles.previewImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Ionicons name="image-outline" size={34} color="#666666" />
                <Text style={styles.imagePlaceholderText}>Galeriden Resim Seç</Text>
              </View>
            )}
          </TouchableOpacity>

          <Text style={styles.label}>Ürün Adı</Text>
          <TextInput
            style={styles.input}
            placeholder="Örn: iPhone 13 128 GB"
            value={productName}
            onChangeText={setProductName}
          />

          <Text style={styles.label}>Marka / Tür</Text>
          <TextInput
            style={styles.input}
            placeholder="Örn: Apple"
            value={brand}
            onChangeText={setBrand}
          />

          <Text style={styles.label}>Kategori</Text>
          <View style={styles.optionRow}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.optionButton,
                  selectedCategory === category && styles.optionButtonActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    selectedCategory === category && styles.optionButtonTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>İşlem Türü</Text>
          <View style={styles.optionRow}>
            {priceOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  selectedPrice === option && styles.optionButtonActive,
                ]}
                onPress={() => setSelectedPrice(option)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    selectedPrice === option && styles.optionButtonTextActive,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Açıklama</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Ürünün durumu, özellikleri, takas beklentisi vb."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.createButton} onPress={handleSubmit}>
            <Text style={styles.createButtonText}>
              {isEditMode ? 'İlanı Güncelle' : 'İlan Oluştur'}
            </Text>
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
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'RobotoCondensed',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
    marginTop: 12,
    fontFamily: 'RobotoCondensed',
  },
  imagePicker: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    marginBottom: 8,
  },
  imagePlaceholder: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  imagePlaceholderText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'RobotoCondensed',
  },
  previewImage: {
    width: '100%',
    height: 180,
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
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginBottom: 8,
  },
  optionButtonActive: {
    backgroundColor: '#000000',
  },
  optionButtonText: {
    color: '#555555',
    fontSize: 13,
    fontFamily: 'RobotoCondensed',
    fontWeight: '600',
  },
  optionButtonTextActive: {
    color: '#FFFFFF',
  },
  createButton: {
    marginTop: 24,
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'RobotoCondensed',
  },
});