import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface OnboardingPage {
  title: string;
  description: string;
  image: any;
}

const onboardingPages: OnboardingPage[] = [
  {
    title: 'Takas Et!',
    description: 'Kullanmadığın eşyalar başkası için değerli olabilir!\n\nPazarlık sayesinde dolabında, evinde veya garajında unuttuğun eşyaları takas ederek yeni şeyler kazan.\n\nÜrününü ekle, yapay zekân sana en uygun takas tekliflerini göstersin.\n\nHem yer aç, hem kazanç sağla!',
    image: require('../assets/images/tanitim1.png'),
  },
  {
    title: 'Pazar evine gelsin!',
    description: 'Torba torba meyve ve sebze kapına gelsin!\n\nSana en yakın esnafların ürünlerini gör, taze sebzeden el emeği eşyaya kadar birçok satıcıyla mesajlaş, dilersen buluş veya kapına gelsin!\n\nUygulama, yapay zekâ ile konumuna göre sana en uygun pazarcıları listeler — hem zamandan kazan hem yerel ekonomiyi destekle!',
    image: require('../assets/images/tanitim2.png'),
  },
  {
    title: 'Ucuza Satın Al!',
    description: 'İhtiyacın olan ürünleri en uygun fiyata bul, satıcılarla doğrudan pazarlık yap!\n\nİkinci el eşyadan taze meyveye kadar her şey bir tık uzağında.\n\nPazarlık, sana en yakın güvenilir satıcıları ve fırsatları sunar — bütçeni korurken akıllı alışveriş yapmanın en kolay yolu!',
    image: require('../assets/images/tanitim3.png'),
  },
];

export default function Onboarding() {
  const [currentPage, setCurrentPage] = useState(0);
  const params = useLocalSearchParams();
  const option = params.option as string;

  // Seçeneğe göre hangi sayfaları göstereceğini belirle
  const getPagesForOption = () => {
    switch (option) {
      case 'swap':
        return [onboardingPages[0]]; // Takas Et!
      case 'market':
        return [onboardingPages[1]]; // Pazar evine gelsin!
      case 'secondhand':
        return [onboardingPages[2]]; // Ucuza Satın Al!
      default:
        return onboardingPages; // Tüm sayfalar
    }
  };

  const pagesToShow = getPagesForOption();

  // Her ekrana geldiğinde ilk sayfaya dön
  useFocusEffect(
    useCallback(() => {
      setCurrentPage(0);
    }, [])
  );

  const handleNext = async () => {
    if (currentPage < pagesToShow.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Son sayfadan giriş ekranına git
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      router.replace('/login');
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      // İlk sayfada discover ekranına dön (index.tsx)
      router.back();
    }
  };

  const currentPageData = pagesToShow[currentPage];

  return (
    <>
      <StatusBar style="light" />
      <ImageBackground 
        source={currentPageData.image}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Geri Butonu - Sadece 2. ve 3. sayfada */}
          {currentPage > 0 && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Ionicons name="chevron-back" size={28} color="#000000" />
            </TouchableOpacity>
          )}

          {/* İçerik */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{currentPageData.title}</Text>
            <Text style={styles.description}>{currentPageData.description}</Text>
          </View>

          {/* Alt Kısım */}
          <View style={styles.bottomContainer}>
            {/* Sol Alt Geri Butonu */}
            <TouchableOpacity style={styles.backButtonBottom} onPress={handleBack}>
              <Ionicons name="chevron-back" size={28} color="#000000" />
            </TouchableOpacity>

            {/* Sayfa Göstergeleri */}
            {pagesToShow.length > 1 && (
              <View style={styles.indicatorContainer}>
                {pagesToShow.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.indicator,
                      index === currentPage ? styles.indicatorActive : styles.indicatorInactive,
                    ]}
                  />
                ))}
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    padding: 28,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonBottom: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'RobotoCondensed',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  description: {
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 32,
    fontFamily: 'RobotoCondensed',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  indicatorContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  indicator: {
    width: 30,
    height: 4,
    borderRadius: 2,
  },
  indicatorActive: {
    backgroundColor: '#8B5CF6',
  },
  indicatorInactive: {
    backgroundColor: 'white',
    opacity: 0.5,
  },
  nextButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

