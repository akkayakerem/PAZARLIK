# Email Verification Sorun Giderme

## Email Gitmiyor - Kontrol Listesi

### 1. Firebase Console - Authentication Ayarları

1. Firebase Console'a gidin: https://console.firebase.google.com/project/trading-app-1447a/authentication
2. **Settings** (⚙️) → **Users** sekmesine gidin
3. **Email verification** ayarının **AÇIK** olduğundan emin olun

### 2. Firebase Console - Email Templates

1. Firebase Console → **Authentication** → **Templates** sekmesine gidin
2. **Email address verification** template'ini kontrol edin
3. **Sender name**: `pazarlik` olmalı
4. **From**: `noreply@trading-app-1447a.firebaseapp.com` olmalı
5. **Subject**: "Doğrulama kodun! Pazarlık'a Hoşgeldin." olmalı

### 3. Email Klasörlerini Kontrol Edin

- ✅ **Inbox** (Gelen Kutusu)
- ✅ **Spam/Junk** (İstenmeyen)
- ✅ **Promotions** (Gmail'de)
- ✅ **Social** (Gmail'de)

### 4. Email Adresini Kontrol Edin

- Email adresinin doğru yazıldığından emin olun
- Test için farklı bir email adresi deneyin

### 5. Firebase Console - Logs

1. Firebase Console → **Functions** → **Logs** sekmesine gidin
2. Email gönderme ile ilgili hataları kontrol edin

### 6. Test Email Gönderme

Firebase Console'dan manuel olarak test email gönderebilirsiniz:

1. **Authentication** → **Users** sekmesine gidin
2. Kullanıcıyı bulun
3. **Send email verification** butonuna tıklayın

### 7. Firebase Project Settings

1. Firebase Console → **Project Settings** (⚙️)
2. **General** sekmesinde **Authorized domains** kontrol edin
3. Email göndermek için domain'in authorized olması gerekir

## Hızlı Test

Terminal'de console logları kontrol edin:
```bash
# Expo server çalışırken console'da şunları arayın:
# "Email verification gönderiliyor..."
# "✅ Email verification gönderildi!"
# veya
# "❌ Email gönderme hatası:"
```

## Alternatif Çözüm

Eğer Firebase'in built-in email verification çalışmıyorsa:
- Firebase Functions ile custom email gönderme (Blaze plan gerekir)
- Veya başka bir email servisi (Resend, SendGrid, vb.)



