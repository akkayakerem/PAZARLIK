import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Alert, Animated, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SelectionOption {
  id: string;
  title: string;
  description: string;
}

const selectionOptions: SelectionOption[] = [
  {
    id: 'swap',
    title: 'Takas yapmak',
    description: 'Kullanmadığın eşyaları takas ederek yeni şeyler kazan',
  },
  {
    id: 'market',
    title: 'Pazar alışverişi yapmak',
    description: 'Taze sebze ve meyve al, yerel esnaflarla buluş',
  },
  {
    id: 'secondhand',
    title: 'İkinci el satın almak!',
    description: 'Uygun fiyata ikinci el ürünler bul ve satıcılarla pazarlık yap',
  },
];

export default function Discover() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const flashAnimations = useRef<{ [key: string]: Animated.Value }>({});


  const getFlashAnimation = (id: string) => {
    if (!flashAnimations.current[id]) {
      flashAnimations.current[id] = new Animated.Value(0);
    }
    return flashAnimations.current[id];
  };

  const toggleSelection = (id: string) => {
    // Parlama efekti
    const flashAnim = getFlashAnimation(id);
    flashAnim.setValue(1);
    
    Animated.sequence([
      Animated.timing(flashAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    if (selectedOptions.includes(id)) {
      setSelectedOptions(selectedOptions.filter(optionId => optionId !== id));
    } else {
      setSelectedOptions([...selectedOptions, id]);
    }
  };

  const handleDiscover = (optionId: string) => {
    // Seçeneğe özel onboarding sayfasına git
    router.push({
      pathname: '/onboarding',
      params: { option: optionId },
    });
  };

  const handleNext = () => {
    if (selectedOptions.length === 0) {
      Alert.alert(
        'Seçim Yapın',
        'Lütfen en az bir seçenek seçin!',
        [{ text: 'Tamam' }]
      );
    } else {
      router.push('/login');
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <ImageBackground 
        source={require('../assets/images/photo2.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Overlay for better text readability */}
        <View style={styles.overlay} />
        <SafeAreaView style={styles.container}>
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.content}
          >
            {/* Başlık */}
            <Text style={styles.mainTitle}>Yapmak istediklerini seç!</Text>
            <Text style={styles.subtitle}>Birden fazla seçenek seçebilirsin!</Text>

        {/* Seçenekler */}
        <View style={styles.optionsContainer}>
          {selectionOptions.map((option) => {
            const isSelected = selectedOptions.includes(option.id);
            const flashAnim = getFlashAnimation(option.id);
            const flashOpacity = flashAnim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0, 1, 0],
            });
            const flashScale = flashAnim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 1.05, 1],
            });
            
            return (
              <TouchableOpacity
                key={option.id}
                onPress={() => toggleSelection(option.id)}
                activeOpacity={0.7}
              >
                <Animated.View
                  style={[
                    styles.optionCard,
                    isSelected && styles.optionCardSelected,
                    {
                      transform: [{ scale: flashScale }],
                    },
                  ]}
                >
                  {isSelected && (
                    <View style={styles.flashOverlay} />
                  )}
                  {!isSelected && (
                    <Animated.View
                      style={[
                        styles.flashOverlay,
                        {
                          opacity: flashOpacity,
                        },
                      ]}
                    />
                  )}
                  <View style={styles.optionContent}>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    <Text style={styles.optionDescription}>{option.description}</Text>
                  </View>
                  <View style={styles.cardBottom}>
                    {isSelected && (
                      <View style={styles.checkmarkContainer}>
                        <Ionicons name="checkmark-circle" size={28} color="#FFFFFF" />
                      </View>
                    )}
                    <TouchableOpacity
                      style={styles.discoverTextButton}
                      onPress={() => handleDiscover(option.id)}
                    >
                      <Text style={styles.discoverText}>Keşfet</Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </View>
          </ScrollView>
          
          {/* Sol Alt Geri Butonu */}
          <View style={styles.backButtonContainer}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.replace('/')}
            >
              <Ionicons name="chevron-back" size={28} color="#000000" />
            </TouchableOpacity>
          </View>

          {/* Sağ Alt Ok Butonu */}
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity 
              style={[
                styles.nextButton,
                selectedOptions.length === 0 && styles.nextButtonDisabled,
              ]}
              onPress={handleNext}
              disabled={selectedOptions.length === 0}
            >
              <Ionicons name="chevron-forward" size={28} color="#000000" />
            </TouchableOpacity>
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
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 28,
    paddingTop: 20,
    paddingBottom: 120,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    fontFamily: 'RobotoCondensed',
    zIndex: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 35,
    fontFamily: 'RobotoCondensed',
    zIndex: 1,
  },
  optionsContainer: {
    gap: 16,
    marginBottom: 20,
  },
  optionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    minHeight: 120,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
  },
  optionCardSelected: {
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  flashOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    opacity: 0.2,
  },
  optionContent: {
    flex: 1,
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'RobotoCondensed',
  },
  optionDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    fontFamily: 'RobotoCondensed',
    opacity: 0.9,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
  },
  checkmarkContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  discoverTextButton: {
    paddingVertical: 1,
    paddingHorizontal: 8,
  },
  discoverText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: 'RobotoCondensed',
  },
  backButtonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 28,
  },
  backButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 40,
    right: 28,
  },
  nextButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
  },
});

