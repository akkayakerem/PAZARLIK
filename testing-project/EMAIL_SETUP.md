# Email Gönderme Kurulum Rehberi

## 1. Firebase Functions Kurulumu

### Gereksinimler
- Node.js 18 veya üzeri
- Firebase CLI: `npm install -g firebase-tools`

### Adımlar

1. **Firebase CLI ile giriş yapın:**
   ```bash
   firebase login
   ```

2. **Firebase Functions'ı başlatın:**
   ```bash
   cd functions
   npm install
   ```

3. **Gmail App Password oluşturun:**
   - Google Account → Security → 2-Step Verification → App passwords
   - "Mail" ve "Other (Custom name)" seçin
   - "Trading App" yazın
   - Oluşturulan 16 haneli şifreyi kopyalayın

4. **Email config'i ayarlayın:**
   ```bash
   firebase functions:config:set email.user="your-email@gmail.com" email.password="your-app-password"
   ```

5. **Functions'ı deploy edin:**
   ```bash
   firebase deploy --only functions
   ```

## 2. Alternatif: SendGrid Kullanma (Daha Kolay)

SendGrid kullanmak daha kolay olabilir:

1. [SendGrid](https://sendgrid.com/) hesabı oluşturun
2. API Key oluşturun
3. `functions/index.js` dosyasını SendGrid için güncelleyin

## 3. Client Tarafında Güncelleme

`contexts/AuthContext.tsx` dosyasında `sendSignupCode` fonksiyonunu güncelleyin:

```typescript
import { getFunctions, httpsCallable } from 'firebase/functions';

const sendSignupCode = async (email: string, password: string): Promise<string> => {
  // ... kod oluşturma kodu ...
  
  // Firebase Functions ile email gönder
  const functions = getFunctions();
  const sendEmail = httpsCallable(functions, 'sendSignupCode');
  
  try {
    await sendEmail({ email, code: verificationCode });
    console.log('Email gönderildi!');
  } catch (error) {
    console.error('Email gönderme hatası:', error);
    // Hata olsa bile kodu döndür (test için)
  }
  
  return verificationCode;
};
```

## 4. Test Etme

1. Functions'ı deploy edin
2. Uygulamayı çalıştırın
3. Signup sayfasından kayıt olmayı deneyin
4. Email'inizi kontrol edin

## Notlar

- Gmail günlük 500 email limiti vardır
- Production'da SendGrid veya Mailgun gibi servisler kullanın
- Email gönderme başarısız olursa, kod console'da gösterilmeye devam eder (test için)





