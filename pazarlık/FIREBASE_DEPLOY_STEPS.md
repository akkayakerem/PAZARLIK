# Firebase Functions Deploy Adımları

## Adım 1: Firebase Login (İlk Kez)

Terminal'de şu komutu çalıştırın:

```bash
cd /Users/./Desktop/kodluyom/testing-project
npx firebase-tools login
```

Tarayıcı açılacak, Google hesabınızla giriş yapın.

## Adım 2: Proje Seçimi

```bash
npx firebase-tools use trading-app-1447a
```

## Adım 3: Gmail App Password (2-Step Verification Gerekli)

1. https://myaccount.google.com/security
2. **2-Step Verification** → Açın (yoksa)
3. **App passwords** → "Mail" ve "Other" seçin
4. "Trading App" yazın
5. 16 haneli şifreyi kopyalayın

## Adım 4: Email Config Ayarlama

Terminal'de (kendi bilgilerinizle):

```bash
npx firebase-tools functions:config:set email.user="your-email@gmail.com" email.password="your-16-digit-app-password"
```

**Örnek:**
```bash
npx firebase-tools functions:config:set email.user="xxxxx@hotmail.com" email.password="abcd efgh ijkl mnop"
```

## Adım 5: Functions'ı Deploy Etme

```bash
npx firebase-tools deploy --only functions
```

Deploy 2-3 dakika sürebilir.

## Adım 6: Test

Deploy tamamlandıktan sonra:
1. Uygulamayı yeniden başlatın
2. Signup sayfasından kayıt olmayı deneyin
3. Email'inizi kontrol edin

---

## Sorun Giderme

### "functions/not-found" hatası
- Functions henüz deploy edilmemiş, Adım 5'i tekrar deneyin

### "Email servisi yapılandırılmamış" hatası
- Adım 4'ü tekrar yapın, email config'i doğru ayarlandığından emin olun

### Login hatası
- `npx firebase-tools login` komutunu tekrar çalıştırın





