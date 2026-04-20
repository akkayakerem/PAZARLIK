# Şifre Sıfırlama (5 Haneli Kod) Kurulum Rehberi

## Mevcut Durum

Şifre sıfırlama sistemi şu şekilde çalışıyor:

1. ✅ **Kod Gönderme**: E-posta adresine 5 haneli kod gönderiliyor (şimdilik console'da gösteriliyor)
2. ✅ **Kod Doğrulama**: Kullanıcı kodu giriyor ve doğrulanıyor
3. ✅ **Yeni Şifre Girişi**: Kullanıcı yeni şifresini giriyor
4. ⚠️ **Şifre Güncelleme**: Şu anda Firestore'da saklanıyor, gerçek güncelleme için Firebase Functions gerekli

## Production İçin Gerekli Adımlar

### 1. Email Gönderme Servisi

Şu anda kod console'da gösteriliyor. Production'da email göndermek için:

- **Firebase Functions** kullanarak email gönderebilirsiniz
- Veya **SendGrid**, **Mailgun** gibi servisler kullanabilirsiniz

### 2. Şifre Güncelleme (Firebase Functions)

Firebase Admin SDK olmadan direkt şifre güncelleme yapamayız. Bu yüzden Firebase Functions kullanmalıyız:

```javascript
// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.updatePasswordWithCode = functions.https.onCall(async (data, context) => {
  const { email, code, newPassword } = data;
  
  // Firestore'dan token'ı kontrol et
  const tokenRef = admin.firestore().doc(`passwordResetTokens/${email}`);
  const tokenDoc = await tokenRef.get();
  
  if (!tokenDoc.exists) {
    throw new functions.https.HttpsError('not-found', 'Token bulunamadı');
  }
  
  const tokenData = tokenDoc.data();
  
  // Kod doğrulama
  if (tokenData.code !== code) {
    throw new functions.https.HttpsError('invalid-argument', 'Geçersiz kod');
  }
  
  // Süre kontrolü
  if (new Date() > tokenData.expiresAt.toDate()) {
    throw new functions.https.HttpsError('deadline-exceeded', 'Token süresi dolmuş');
  }
  
  // Şifreyi güncelle
  const user = await admin.auth().getUserByEmail(email);
  await admin.auth().updateUser(user.uid, { password: newPassword });
  
  // Token'ı sil
  await tokenRef.delete();
  
  return { success: true };
});
```

### 3. Client Tarafında Güncelleme

`contexts/AuthContext.tsx` dosyasındaki `updatePasswordWithCode` fonksiyonunu Firebase Functions'ı çağıracak şekilde güncelleyin:

```typescript
import { getFunctions, httpsCallable } from 'firebase/functions';

const updatePasswordWithCode = async (email: string, code: string, newPassword: string): Promise<void> => {
  const functions = getFunctions();
  const updatePassword = httpsCallable(functions, 'updatePasswordWithCode');
  
  try {
    await updatePassword({ email, code, newPassword });
    Alert.alert('Başarılı', 'Şifreniz güncellendi!');
  } catch (error) {
    Alert.alert('Hata', 'Şifre güncellenirken bir hata oluştu.');
  }
};
```

## Test Etme (Şu Anki Durum)

1. Login sayfasından "Şifreni mi unuttun?" butonuna tıklayın
2. E-posta adresinizi girin
3. Console'da gösterilen 5 haneli kodu girin
4. Yeni şifrenizi girin
5. Şifre Firestore'da saklanacak (gerçek güncelleme için Firebase Functions gerekli)

## Notlar

- **Test Modu**: Şu anda kod console'da gösteriliyor, production'da email gönderilmeli
- **Firebase Functions**: Production için Firebase Functions kurulumu gerekli
- **Güvenlik**: Şifreler Firestore'da düz metin olarak saklanmamalı, Firebase Functions ile güvenli şekilde güncellenmeli





