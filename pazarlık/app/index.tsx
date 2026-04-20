import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Welcome() {
  return (
    <>
      <StatusBar style="light" />
      <ImageBackground 
        source={require('../assets/images/photo1.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Overlay for better text readability */}
        <View style={styles.overlay} />
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.content}
          >
            <ScrollView 
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* White Handshake Image */}
              <View style={styles.imageContainer}>
                <Image 
                  source={require('../assets/images/whitehandshake.png')}
                  style={styles.handshakeImage}
                  resizeMode="contain"
                />
              </View>

              {/* Başlık */}
              <Text style={styles.title}>Takaslamaya ve pazarlık yapmaya hazır mısın?</Text>

              {/* Açıklama */}
              <Text style={styles.description}>
                Sana soracağımız ufak bir soru ve kayıt aşamasından sonra güvenilir altyapımızla insanlarla buluşup takas, alışveriş ve pazar alışverişi yapabileceksin.
              </Text>

              {/* Başlayalım Butonu */}
              <TouchableOpacity 
                style={styles.startButton}
                onPress={() => router.push('/discover')}
              >
                <Text style={styles.startButtonText}>Başlayalım!</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
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
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 28,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'flex-start',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 40,
    zIndex: 1,
  },
  handshakeImage: {
    width: 250,
    height: 250,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'RobotoCondensed',
    zIndex: 1,
  },
  description: {
    fontSize: 16,
    color: '#F0F0F0',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'RobotoCondensed',
    zIndex: 1,
  },
  startButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    marginTop: 15,
    zIndex: 1,
  },
  startButtonText: {
    color: '#000000',
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'RobotoCondensed',
  },
});

