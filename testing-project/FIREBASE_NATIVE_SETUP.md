# Firebase Native (@react-native-firebase) Kurulum

## ÖNEMLİ: Expo Go ile Çalışmaz!

`@react-native-firebase/auth` native modül gerektirir. Expo Go ile çalışmaz, **custom development build** gerektirir.

## Adım 1: Firebase Console'da Android/iOS App Ekleme

### Android için:
1. Firebase Console → Project Settings → "Your apps"
2. Android ikonuna tıklayın
3. Package name: `com.testingproject` (veya app.json'daki package name)
4. "Register app" → `google-services.json` dosyasını indirin

### iOS için:
1. Firebase Console → Project Settings → "Your apps"
2. iOS ikonuna tıklayın
3. Bundle ID: `com.testingproject` (veya app.json'daki bundle identifier)
4. "Register app" → `GoogleService-Info.plist` dosyasını indirin

## Adım 2: Expo Plugin Ekleme

`app.json` dosyasına plugin eklendi. Şimdi dosyaları yerleştirin:

### Android:
1. İndirdiğiniz `google-services.json` dosyasını şuraya koyun:
   ```
   android/app/google-services.json
   ```

### iOS:
1. İndirdiğiniz `GoogleService-Info.plist` dosyasını şuraya koyun:
   ```
   ios/GoogleService-Info.plist
   ```

## Adım 3: Development Build Oluşturma

Expo Go yerine custom build kullanmanız gerekiyor:

```bash
# Prebuild (native klasörleri oluşturur)
npx expo prebuild

# Android için build
npx expo run:android

# iOS için build
npx expo run:ios
```

Veya EAS Build kullanın:
```bash
# EAS CLI kurulumu
npm install -g eas-cli

# Login
eas login

# Build
eas build --profile development --platform android
eas build --profile development --platform ios
```

## Adım 4: Test

Development build yüklendikten sonra:
```bash
npx expo start --dev-client
```

---

## Notlar

- **Expo Go ile çalışmaz** - Custom build gerektirir
- **Development build** oluşturmanız gerekiyor
- Native modüller Expo Go'da desteklenmez



