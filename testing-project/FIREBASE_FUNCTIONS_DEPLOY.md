# Firebase Functions Deploy (Basit Yöntem)

EmailJS React Native'de çalışmıyor, bu yüzden Firebase Functions kullanıyoruz.

## Adım 1: Firebase Login

Terminal'de:

```bash
cd /Users/./Desktop/kodluyom/testing-project
npx firebase-tools login
```

Tarayıcı açılacak, Google hesabınızla giriş yapın.

## Adım 2: Gmail App Password (2-Step Verification Gerekli)

1. https://myaccount.google.com/security
2. **2-Step Verification** → Açın (yoksa)
3. **App passwords** → "Mail" ve "Other" seçin
4. "Trading App" yazın
5. 16 haneli şifreyi kopyalayın

## Adım 3: Email Config

Terminal'de (kendi bilgilerinizle):

```bash
npx firebase-tools functions:config:set email.user="your-email@gmail.com" email.password="your-16-digit-app-password"
```

## Adım 4: Deploy

```bash
npx firebase-tools deploy --only functions
```

## Test

Deploy tamamlandıktan sonra:
1. Uygulamayı yeniden başlatın
2. Signup sayfasından kayıt olmayı deneyin
3. Email'inizi kontrol edin

---

**Not:** Eğer 2-Step Verification açmak istemiyorsanız, başka bir email servisi (SendGrid, Mailgun) kullanabiliriz.





