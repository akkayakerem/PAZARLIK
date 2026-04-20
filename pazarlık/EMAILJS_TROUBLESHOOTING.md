# EmailJS Sorun Giderme

## Terminal'de Kontrol Edilecekler

Kayıt ol butonuna tıkladığınızda terminal'de şunları görmelisiniz:

1. `📧 EmailJS ile email gönderiliyor...`
2. `📤 EmailJS request:` (gönderilen veri)
3. `📥 EmailJS response status:` (200, 400, 401, vb.)
4. `✅ Email gönderildi!` veya `❌ EmailJS error response:`

## EmailJS Template Değişken Kontrolü

EmailJS template'inizde şu değişkenlerin olduğundan emin olun:

1. **To Email** alanında: `{{email}}` veya `{{to_email}}`
2. **Email içeriğinde** (kodun gösterileceği yerde): `{{verification_code}}`

## Yaygın Hatalar

### 1. Template'de Yanlış Değişken İsmi
- Template'de `{{code}}` kullanıyorsanız, kodda `verification_code` yerine `code` göndermeliyiz
- Template'de `{{to_email}}` kullanıyorsanız, kodda `email` yerine `to_email` göndermeliyiz

### 2. Public Key Yanlış
- Public Key'in doğru olduğundan emin olun
- EmailJS Dashboard → Account → General → Public Key

### 3. Service ID veya Template ID Yanlış
- Service ID: `service_fudmjr3` ✓
- Template ID: `0mtxh2m` ✓
- Public Key: `tXieCWkPPxKR7oIKP` ✓

## Test

1. Uygulamayı yeniden başlatın
2. Signup sayfasından kayıt olmayı deneyin
3. Terminal'deki tüm log'ları kontrol edin
4. Hata mesajını paylaşın





