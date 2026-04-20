# Google Sign-In Kurulum Rehberi

## 1. Firebase Console'da OAuth Client ID Alma

1. [Firebase Console](https://console.firebase.google.com/) → Projenizi açın
2. Sol menüden **Authentication** → **Sign-in method** seçin
3. **Google** provider'ını etkinleştirin (zaten yaptıysanız atlayın)
4. **Web client ID**'yi kopyalayın (örnek: `581452926399-xxxxx.apps.googleusercontent.com`)

## 2. Config Dosyasını Güncelleme

`contexts/AuthContext.tsx` dosyasını açın ve `useAuthRequest` içindeki `webClientId` değerini güncelleyin:

```typescript
const [request, response, promptAsync] = Google.useAuthRequest({
  webClientId: '581452926399-xxxxx.apps.googleusercontent.com', // Firebase'den aldığınız Web client ID
  iosClientId: '581452926399-xxxxx.apps.googleusercontent.com', // iOS için (opsiyonel)
  androidClientId: '581452926399-xxxxx.apps.googleusercontent.com', // Android için (opsiyonel)
});
```

## 3. Test Etme

1. Uygulamayı çalıştırın: `npm start`
2. Login sayfasından "Google ile giriş yap" butonuna tıklayın
3. Google hesabınızı seçin
4. Başarılı giriş sonrası ana sayfaya yönlendirileceksiniz

## Notlar

- **Web Client ID**: Firebase Console'dan alınan Web client ID kullanılmalı
- **iOS/Android Client ID**: Native build için gerekli (Expo Go'da çalışmaz)
- **Expo Go**: Google Sign-In Expo Go'da sınırlı çalışabilir, production build gerekebilir





