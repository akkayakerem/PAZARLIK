# Email Verification Kontrol Adımları

## Doğru Sayfaya Git

1. Firebase Console → **Authentication** → **Templates** sekmesine gidin:
   https://console.firebase.google.com/project/trading-app-1447a/authentication/emails

2. **Email address verification** template'ini bulun ve tıklayın

3. Kontrol edin:
   - ✅ Template **aktif** olmalı
   - ✅ **Sender name**: `pazarlik`
   - ✅ **From**: `noreply@trading-app-1447a.firebaseapp.com`
   - ✅ **Subject**: "Doğrulama kodun! Pazarlık'a Hoşgeldin." (veya istediğiniz başlık)

## Alternatif: Settings'den Kontrol

1. Firebase Console → **Authentication** → **Settings** (⚙️) → **Users** sekmesi
2. **Email verification** ayarının **AÇIK** olduğundan emin olun

## Test

1. Kayıt olmayı tekrar deneyin
2. Console loglarını kontrol edin:
   - "Email verification gönderiliyor..."
   - "✅ Email verification gönderildi!" veya hata mesajı
3. Email'inizi kontrol edin (spam klasörü dahil)

## Sorun Devam Ederse

Console'da hata mesajı görüyorsanız, hata kodunu ve mesajını paylaşın.



