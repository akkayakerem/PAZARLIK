# Hızlı Deploy Talimatları

## Adım 1: Firebase Login (1 dakika)

Terminal'de şu komutu çalıştırın:

```bash
cd /Users/./Desktop/kodluyom/testing-project
npx firebase-tools login
```

Tarayıcı açılacak, Google hesabınızla giriş yapın.

## Adım 2: Gmail App Password (2 dakika)

1. https://myaccount.google.com/security → 2-Step Verification
2. App passwords → "Mail" ve "Other" seçin
3. "Trading App" yazın
4. 16 haneli şifreyi kopyalayın

## Adım 3: Email Config (30 saniye)

Terminal'de (kendi bilgilerinizle):

```bash
npx firebase-tools functions:config:set email.user="your-email@gmail.com" email.password="your-16-digit-password"
```

## Adım 4: Deploy

Bana "deploy et" yazın, ben deploy edeceğim.

---

**Toplam süre: ~3-4 dakika**

Login olduktan sonra bana haber verin!





