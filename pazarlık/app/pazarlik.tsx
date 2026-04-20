import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Animated, FlatList, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: any;
  colors: string[];
  isFavorite: boolean;
  hasAR: boolean;
  isMembersOnly: boolean;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Taze Domates 5 Kg',
    brand: 'Yerel Çiftçi',
    price: '₺45.00',
    image: require('../assets/images/domates.png'),
    colors: ['#FF6347', '#DC143C'],
    isFavorite: false,
    hasAR: false,
    isMembersOnly: false,
  },
  {
    id: '2',
    name: 'Organik Elma Çeşitleri',
    brand: 'Doğal Bahçe',
    price: '₺65.00',
    image: require('../assets/images/elma.png'),
    colors: ['#FF6B6B', '#FFD700', '#32CD32'],
    isFavorite: true,
    hasAR: false,
    isMembersOnly: true,
  },
  {
    id: '3',
    name: 'Taze Salatalık 3 Kg',
    brand: 'Köy Ürünleri',
    price: '₺35.00',
    image: require('../assets/images/salatalik.png'),
    colors: ['#90EE90', '#32CD32'],
    isFavorite: false,
    hasAR: true,
    isMembersOnly: false,
  },
  {
    id: '4',
    name: 'Karışık Sebze Paketi',
    brand: 'Günlük Taze',
    price: '₺89.00',
    image: require('../assets/images/sebzeler.png'),
    colors: ['#FF6347', '#FFD700', '#32CD32', '#FF8C00'],
    isFavorite: false,
    hasAR: false,
    isMembersOnly: true,
  },
  {
    id: '5',
    name: 'Taze Biber Çeşitleri 2 Kg',
    brand: 'Organik Pazar',
    price: '₺55.00',
    image: require('../assets/images/biberler.png'),
    colors: ['#FF0000', '#FFA500', '#32CD32'],
    isFavorite: false,
    hasAR: false,
    isMembersOnly: false,
  },
  {
    id: '6',
    name: 'Taze Soğan 4 Kg',
    brand: 'Yerel Üretici',
    price: '₺28.00',
    image: require('../assets/images/sogan.png'),
    colors: ['#FFFFFF', '#F5F5DC'],
    isFavorite: true,
    hasAR: false,
    isMembersOnly: false,
  },
];

const categories = ['TÜMÜ', 'SEBZE', 'MEYVE', 'EL YAPIMI', 'ORGANİK', 'YEREL'];

export default function Pazarlik() {
  const [selectedCategory, setSelectedCategory] = useState('TÜMÜ');
  const [products, setProducts] = useState(mockProducts);
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [menuAnimation] = useState(new Animated.Value(0));

  const toggleFavorite = (id: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
  };

  const toggleCategoryMenu = () => {
    if (categoryMenuVisible) {
      Animated.parallel([
        Animated.timing(menuAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(item1Animation, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(item2Animation, {
          toValue: 0,
          duration: 250,
          delay: 50,
          useNativeDriver: true,
        }),
        Animated.timing(item3Animation, {
          toValue: 0,
          duration: 250,
          delay: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCategoryMenuVisible(false);
      });
    } else {
      setCategoryMenuVisible(true);
      Animated.parallel([
        Animated.timing(menuAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(item1Animation, {
          toValue: 1,
          duration: 400,
          delay: 100,
          useNativeDriver: true,
        }),
        Animated.timing(item2Animation, {
          toValue: 1,
          duration: 400,
          delay: 200,
          useNativeDriver: true,
        }),
        Animated.timing(item3Animation, {
          toValue: 1,
          duration: 400,
          delay: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleCategorySelect = (category: string) => {
    toggleCategoryMenu();
    setTimeout(() => {
      if (category === 'takas') {
        router.push('/takas');
      } else if (category === 'pazarlik') {
        router.push('/pazarlik');
      } else if (category === 'alisveris') {
        router.push('/alisveris');
      }
    }, 300);
  };

  const menuOpacity = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const getItemAnimation = (animValue: Animated.Value) => {
    const scale = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    const opacity = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    return { scale, opacity };
  };

  const [item1Animation] = useState(new Animated.Value(0));
  const [item2Animation] = useState(new Animated.Value(0));
  const [item3Animation] = useState(new Animated.Value(0));

  const item1Anim = getItemAnimation(item1Animation);
  const item2Anim = getItemAnimation(item2Animation);
  const item3Anim = getItemAnimation(item3Animation);

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <Image source={item.image} style={styles.productImage} resizeMode="cover" />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Ionicons
            name={item.isFavorite ? "heart" : "heart-outline"}
            size={20}
            color={item.isFavorite ? "#FF6B6B" : "#FFFFFF"}
          />
        </TouchableOpacity>
        {item.hasAR && (
          <View style={styles.arTag}>
            <Text style={styles.arTagText}>AR</Text>
          </View>
        )}
        {item.isMembersOnly && (
          <View style={styles.membersTag}>
            <Text style={styles.membersTagText}>1 ÜYE ÖZEL</Text>
          </View>
        )}
      </View>
      <Text style={styles.productPrice}>{item.price}</Text>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productBrand}>{item.brand}</Text>
      {item.colors.length > 0 && (
        <View style={styles.colorOptions}>
          <Text style={styles.colorOptionsText}>+{item.colors.length - 3 > 0 ? item.colors.length - 3 : ''}</Text>
          <View style={styles.colorDots}>
            {item.colors.slice(0, 3).map((color, index) => (
              <View key={index} style={[styles.colorDot, { backgroundColor: color }]} />
            ))}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#000000" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>SANAL PAZAR</Text>
            <Text style={styles.headerSubtitle}>{products.length} SONUÇ</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="search" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Category Filter Bar */}
        <View style={styles.categoryBar}>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options" size={20} color="#000000" />
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === category && styles.categoryChipTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Product Grid */}
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
        />

        {/* Alt Navigasyon Bar */}
        <View style={styles.bottomNavBar}>
          <TouchableOpacity style={styles.navButton} onPress={() => router.push('/takas')}>
            <Ionicons name="home" size={24} color="#000000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryButton}
            onPress={toggleCategoryMenu}
          >
            <Ionicons name="menu" size={32} color="#000000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={() => router.push('/hesabim')}>
            <Ionicons name="person" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Kategori Menüsü Modal */}
        <Modal
          visible={categoryMenuVisible}
          transparent={true}
          animationType="none"
          onRequestClose={toggleCategoryMenu}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={toggleCategoryMenu}
          >
            <Animated.View
              style={[
                styles.categoryMenu,
                {
                  opacity: menuOpacity,
                },
              ]}
            >
              <Animated.View
                style={[
                  styles.categoryMenuItemCircle,
                  {
                    opacity: item1Anim.opacity,
                    transform: [{ scale: item1Anim.scale }],
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.categoryCircleButton}
                  onPress={() => handleCategorySelect('takas')}
                >
                  <Text style={styles.categoryMenuText}>Takas</Text>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View
                style={[
                  styles.categoryMenuItemCircle,
                  {
                    opacity: item2Anim.opacity,
                    transform: [{ scale: item2Anim.scale }],
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.categoryCircleButton}
                  onPress={() => handleCategorySelect('pazarlik')}
                >
                  <Text style={styles.categoryMenuText}>Sanal Pazar</Text>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View
                style={[
                  styles.categoryMenuItemCircle,
                  {
                    opacity: item3Anim.opacity,
                    transform: [{ scale: item3Anim.scale }],
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.categoryCircleButton}
                  onPress={() => handleCategorySelect('alisveris')}
                >
                  <Text style={styles.categoryMenuText}>Alışveriş</Text>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          </TouchableOpacity>
        </Modal>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'RobotoCondensed',
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'RobotoCondensed',
    marginTop: 2,
  },
  categoryBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterButton: {
    marginRight: 12,
  },
  categoryScroll: {
    flex: 1,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F5F5F5',
  },
  categoryChipActive: {
    backgroundColor: '#000000',
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    fontFamily: 'RobotoCondensed',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  productList: {
    padding: 8,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#FFFFFF',
  },
  productImageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arTag: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#000000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  arTagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'RobotoCondensed',
  },
  membersTag: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#000000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  membersTagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'RobotoCondensed',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'RobotoCondensed',
    marginTop: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'RobotoCondensed',
    marginTop: 4,
  },
  productBrand: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'RobotoCondensed',
    marginTop: 2,
  },
  colorOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  colorOptionsText: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'RobotoCondensed',
    marginRight: 4,
  },
  colorDots: {
    flexDirection: 'row',
    gap: 4,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 28,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 2,
    borderColor: '#000000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryMenu: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  categoryMenuItemCircle: {
    marginVertical: 8,
  },
  categoryCircleButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  categoryMenuText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'RobotoCondensed',
  },
});
