# EmailJS Kurulum Rehberi (Kolay ve Ücretsiz)

EmailJS kullanarak Gmail App Password olmadan email gönderebilirsiniz!

## Adım 1: EmailJS Hesabı Oluşturma

1. [EmailJS](https://www.emailjs.com/) adresine gidin
2. **Sign Up** (ücretsiz) → Google hesabınızla giriş yapın
3. Dashboard'a gidin

## Adım 2: Email Servisi Ekleme

1. Sol menüden **Email Services** seçin
2. **Add New Service** butonuna tıklayın
3. **Gmail** seçin
4. Gmail hesabınızla bağlanın (izin verin)
5. **Service ID**'yi kopyalayın (örn: `service_xxxxx`)

## Adım 3: Email Template Oluşturma

1. Sol menüden **Email Templates** seçin
2. **Create New Template** butonuna tıklayın
3. Template adı: "Kayıt Doğrulama Kodu"
4. **From Name**: `pazarlik`
5. **From Email**: Gmail adresiniz
6. **Subject**: `Doğrulama kodun! Pazarlık'a Hoşgeldin.`
7. **Content** (HTML):

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000000; color: #FFFFFF; padding: 20px;">
  <h2 style="color: #8B5CF6;">Doğrulama kodun! Pazarlık'a Hoşgeldin.</h2>
  <p>Merhaba,</p>
  <p>Kayıt işleminizi tamamlamak için aşağıdaki doğrulama kodunu kullanın:</p>
  <div style="background-color: #8B5CF6; color: white; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; border-radius: 8px; margin: 20px 0;">
    {{verification_code}}
  </div>
  <p>Bu kod 10 dakika geçerlidir.</p>
  <p>Eğer bu işlemi siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.</p>
  <p>Teşekkürler,<br>Pazarlık Ekibi</p>
</div>
```

8. **Save** butonuna tıklayın
9. **Template ID**'yi kopyalayın (örn: `template_xxxxx`)

## Adım 4: Public Key Alma

1. Sol menüden **Account** → **General** seçin
2. **Public Key**'i kopyalayın (örn: `xxxxxxxxxxxxx`)

## Adım 5: Config Dosyasını Güncelleme

`contexts/AuthContext.tsx` dosyasında şu satırları bulun:

```typescript
const serviceId = 'YOUR_SERVICE_ID';
const templateId = 'YOUR_TEMPLATE_ID';
const publicKey = 'YOUR_PUBLIC_KEY';
```

Bunları EmailJS'den aldığınız değerlerle değiştirin:

```typescript
const serviceId = 'service_xxxxx'; // EmailJS'den aldığınız Service ID
const templateId = 'template_xxxxx'; // EmailJS'den aldığınız Template ID
const publicKey = 'xxxxxxxxxxxxx'; // EmailJS'den aldığınız Public Key
```

## Test Etme

1. Uygulamayı çalıştırın
2. Signup sayfasından kayıt olmayı deneyin
3. Email'inizi kontrol edin - kod email'inize gönderilecek!

## Notlar

- EmailJS ücretsiz plan: Ayda 200 email
- Gmail App Password gerektirmez
- Kurulum çok kolay (5 dakika)
- Güvenli ve güvenilir





