# Firebase Authentication Kurulum Rehberi

## 1. Firebase Projesi Oluşturma

1. [Firebase Console](https://console.firebase.google.com/) adresine gidin
2. "Add project" (Proje Ekle) butonuna tıklayın
3. Proje adını girin ve "Continue" (Devam) butonuna tıklayın
4. Google Analytics'i isteğe bağlı olarak etkinleştirin
5. "Create project" (Proje Oluştur) butonuna tıklayın

## 2. Web App Ekleme

1. Firebase Console'da projenizi açın
2. Sol menüden ⚙️ (Settings) > "Project settings" (Proje ayarları) seçin
3. Aşağı kaydırın ve "Your apps" (Uygulamalarınız) bölümüne gidin
4. Web ikonu (</>) tıklayın
5. App nickname (isteğe bağlı) girin
6. "Register app" (Uygulamayı kaydet) butonuna tıklayın
7. Config bilgilerinizi kopyalayın (apiKey, authDomain, projectId, vb.)

## 3. Authentication'ı Etkinleştirme

1. Sol menüden "Authentication" (Kimlik Doğrulama) seçin
2. "Get started" (Başlayın) butonuna tıklayın
3. "Sign-in method" (Giriş yöntemi) sekmesine gidin
4. İstediğiniz giriş yöntemlerini etkinleştirin:
   - **Email/Password**: "Email/Password" seçin, "Enable" (Etkinleştir) yapın ve "Save" (Kaydet)
   - **Google**: "Google" seçin, "Enable" yapın, proje destek e-postasını girin ve "Save"
   - **Apple**: "Apple" seçin, "Enable" yapın ve gerekli bilgileri doldurun

## 4. Config Dosyasını Güncelleme

`config/firebase.ts` dosyasını açın ve Firebase Console'dan kopyaladığınız bilgileri yapıştırın:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSy...", // Firebase Console'dan kopyaladığınız apiKey
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

## 5. Test Etme

1. Uygulamayı çalıştırın: `npm start`
2. Signup sayfasından yeni bir hesap oluşturun
3. Login sayfasından giriş yapmayı deneyin
4. Şifre sıfırlama özelliğini test edin

## Önemli Notlar

- **Email/Password**: Şu anda tam olarak çalışıyor ✅
- **Google Sign-In**: Placeholder olarak eklendi, `expo-auth-session` ile implement edilebilir
- **Apple Sign-In**: Placeholder olarak eklendi, `expo-apple-authentication` ile implement edilebilir

## Sorun Giderme

### "Firebase: Error (auth/invalid-api-key)"
- Config dosyasındaki `apiKey` değerini kontrol edin
- Firebase Console'dan doğru config bilgilerini kopyaladığınızdan emin olun

### "Firebase: Error (auth/email-already-in-use)"
- Bu e-posta adresi zaten kayıtlı, normal bir durum
- Login sayfasından giriş yapmayı deneyin

### "Firebase: Error (auth/weak-password)"
- Şifre en az 6 karakter olmalıdır
- Daha güçlü bir şifre deneyin

## Sonraki Adımlar

1. Google Sign-In için `expo-auth-session` paketini ekleyin
2. Apple Sign-In için `expo-apple-authentication` paketini ekleyin
3. Kullanıcı profil sayfası oluşturun
4. Auth state'e göre routing yapın (giriş yapmış kullanıcıları ana sayfaya yönlendirin)





