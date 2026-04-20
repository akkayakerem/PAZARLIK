import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { ProductsProvider } from '../contexts/ProductsContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    RobotoCondensed: require('../assets/fonts/RobotoCondensed-Regular.ttf'),
    'RobotoCondensed-Bold': require('../assets/fonts/RobotoCondensed-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthProvider>
      <ProductsProvider>
        <Stack
          screenOptions={{
            animation: 'default',
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: 'Hoşgeldin',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="discover"
            options={{
              title: 'Keşfet',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="login"
            options={{
              title: 'Giriş Yap',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="onboarding"
            options={{
              title: 'Onboarding',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="signup"
            options={{
              title: 'Kayıt Ol',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="home"
            options={{
              title: 'Ana Sayfa',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="reset-password"
            options={{
              title: 'Şifre Sıfırlama',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="verify-email"
            options={{
              title: 'E-posta Doğrulama',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="takas"
            options={{
              title: 'Takas',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="pazarlik"
            options={{
              title: 'Pazarlık',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="alisveris"
            options={{
              title: 'Alışveriş',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="hesabim"
            options={{
              title: 'Hesabım',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ilanekle"
            options={{
              title: 'İlan Ekle',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="urundetay"
            options={{
              title: 'Ürün Detayı',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="teklifver"
            options={{
              title: 'Teklif Ver',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="benimilanlarim"
            options={{
              title: 'Benim İlanlarım',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="favorilerim"
            options={{
              title: 'Favorilerim',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="tekliflerim"
            options={{
              title: 'Tekliflerim',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="profilim"
            options={{
              title: 'Profilim',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ayarlar"
            options={{
              title: 'Ayarlar',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="gizlilik"
            options={{
              title: 'Gizlilik',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="yardim"
            options={{
              title: 'Yardım',
              headerShown: false,
            }}
          />
        </Stack>
      </ProductsProvider>
    </AuthProvider>
  );
}