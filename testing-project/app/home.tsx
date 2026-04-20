import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Animated, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [menuAnimation] = useState(new Animated.Value(0));
  const [item1Animation] = useState(new Animated.Value(0));
  const [item2Animation] = useState(new Animated.Value(0));
  const [item3Animation] = useState(new Animated.Value(0));

  const toggleCategoryMenu = () => {
    if (categoryMenuVisible) {
      // Menüyü kapat
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
      // Menüyü aç
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

  const item1Anim = getItemAnimation(item1Animation);
  const item2Anim = getItemAnimation(item2Animation);
  const item3Anim = getItemAnimation(item3Animation);

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Hoşgeldin!</Text>
          <Text style={styles.subtitle}>
            {user?.email ? `Giriş yaptığın hesap: ${user.email}` : 'Başarıyla giriş yaptın!'}
          </Text>
        </View>

        {/* Alt Navigasyon Bar */}
        <View style={styles.bottomNavBar}>
          {/* Ana Sayfa */}
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="home" size={24} color="#000000" />
          </TouchableOpacity>

          {/* Kategori Butonu - Çember içinde, daha büyük */}
          <TouchableOpacity 
            style={styles.categoryButton}
            onPress={toggleCategoryMenu}
          >
            <Ionicons name="menu" size={32} color="#000000" />
          </TouchableOpacity>

          {/* Hesabım */}
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
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    padding: 28,
    paddingTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'RobotoCondensed',
  },
  subtitle: {
    fontSize: 18,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'RobotoCondensed',
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 20,
    paddingHorizontal: 28,
    paddingBottom: 40,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
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
