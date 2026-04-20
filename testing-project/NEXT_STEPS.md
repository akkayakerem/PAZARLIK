# Firebase Native Kurulum - Sıradaki Adımlar

## ✅ Tamamlananlar
- ✅ GoogleService-Info.plist dosyası eklendi
- ✅ app.json yapılandırıldı
- ✅ @react-native-firebase paketleri yüklü

## 📋 Yapılacaklar

### 1. Android için google-services.json (Opsiyonel - sadece Android test edecekseniz)

Eğer Android'de de test edecekseniz:
1. Firebase Console → Project Settings → Your apps
2. Android app ekleyin (package: `com.testingproject`)
3. `google-services.json` dosyasını indirin
4. Proje root'una koyun: `./google-services.json`

**Not:** Şimdilik sadece iOS test edecekseniz bu adımı atlayabilirsiniz.

### 2. Development Build Oluşturma

Expo Go ile çalışmaz! Custom build gerekiyor:

```bash
# Native klasörleri oluştur (ios/ ve android/ klasörleri)
npx expo prebuild

# iOS için build ve çalıştır (Mac gerekli)
npx expo run:ios
```

**ÖNEMLİ:** 
- Expo Go uygulamasını kullanmayın
- `npx expo run:ios` komutu otomatik olarak build edip simulator'da çalıştıracak
- İlk build 5-10 dakika sürebilir

### 3. Test

Build tamamlandıktan sonra:
1. Uygulama otomatik olarak açılacak
2. Login/Signup sayfalarını test edin
3. `config/firebase-native.ts` dosyasındaki fonksiyonları kullanabilirsiniz

## 🔄 Mevcut Kod ile Uyumluluk

Şu anda projede **iki Firebase SDK** var:
1. **Web SDK** (`firebase` paketi) - `config/firebase.ts` - Şu an kullanılıyor
2. **Native SDK** (`@react-native-firebase`) - `config/firebase-native.ts` - Hazır

İkisini de kullanabilirsiniz veya sadece birini seçebilirsiniz.

## ⚠️ Önemli Notlar

- **Expo Go çalışmaz** - Custom development build gerekiyor
- **İlk build uzun sürer** - 5-10 dakika bekleyin
- **Mac gerekli** - iOS build için Xcode ve Mac gerekli
- **Android için** - google-services.json dosyası gerekli (opsiyonel)

## 🚀 Hızlı Başlangıç

```bash
# 1. Prebuild (native klasörleri oluştur)
npx expo prebuild

# 2. iOS build ve çalıştır
npx expo run:ios
```

Build tamamlandıktan sonra uygulama otomatik açılacak!



