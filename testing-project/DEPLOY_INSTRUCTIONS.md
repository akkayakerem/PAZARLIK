# Firebase Functions Deploy Talimatları

## Adım 1: Firebase Login (Sizin Yapmanız Gereken)

Terminal'de şu komutu çalıştırın:

```bash
cd /Users/./Desktop/kodluyom/testing-project
npx firebase-tools login
```

Bu komut tarayıcınızı açacak ve Google hesabınızla giriş yapmanızı isteyecek.

## Adım 2: Gmail App Password Oluşturma

1. Google Account → Security → 2-Step Verification
2. App passwords → "Mail" ve "Other" seçin
3. "Trading App" yazın
4. Oluşturulan 16 haneli şifreyi kopyalayın

## Adım 3: Email Config Ayarlama

Login olduktan sonra, terminal'de şu komutu çalıştırın (Gmail adresiniz ve app password'unuz ile):

```bash
npx firebase-tools functions:config:set email.user="your-email@gmail.com" email.password="your-16-digit-app-password"
```

## Adım 4: Deploy

Sonra bana "deploy et" deyin, ben deploy edeceğim.





