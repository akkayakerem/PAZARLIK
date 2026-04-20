# Google Cloud Console ile Cloud Functions Kurulumu

## Adım 1: Google Cloud Console'a Giriş

1. [Google Cloud Console](https://console.cloud.google.com/) → Giriş yapın
2. Proje seçin: `trading-app-1447a`
3. Sol menüden **Cloud Functions** seçin

## Adım 2: Cloud Functions Oluşturma

1. **Create Function** butonuna tıklayın
2. **Basic Settings:**
   - Function name: `sendSignupCode`
   - Region: `us-central1` (veya size yakın bir region)
   - Environment: **2nd gen** seçin
   - Authentication: **Allow unauthenticated invocations** seçin (Firebase'den çağıracağız)

3. **Runtime, build, connections and security settings** → **Runtime** sekmesi:
   - Runtime: **Node.js 20**
   - Entry point: `sendSignupCode`

4. **Source code** sekmesi:
   - Source: **Inline editor** seçin
   - Aşağıdaki kodu yapıştırın:

```javascript
const {onCall} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

exports.sendSignupCode = onCall(async (request) => {
  const {email, code} = request.data;

  if (!email || !code) {
    throw new Error("Email ve kod gerekli");
  }

  // Environment variables'dan email bilgilerini al
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;

  if (!emailUser || !emailPassword) {
    throw new Error("Email servisi yapılandırılmamış");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });

  const mailOptions = {
    from: `"pazarlik" <${emailUser}>`,
    to: email,
    replyTo: "noreply@trading-app-1447a.firebaseapp.com",
    subject: "Doğrulama kodun! Pazarlık'a Hoşgeldin.",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000000; color: #FFFFFF; padding: 20px;">
        <h2 style="color: #8B5CF6; margin-bottom: 20px;">Doğrulama kodun! Pazarlık'a Hoşgeldin.</h2>
        <p style="color: #FFFFFF;">Merhaba,</p>
        <p style="color: #FFFFFF;">Kayıt işleminizi tamamlamak için aşağıdaki doğrulama kodunu kullanın:</p>
        <div style="background-color: #8B5CF6; color: white; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; border-radius: 8px; margin: 20px 0;">
          ${code}
        </div>
        <p style="color: #FFFFFF;">Bu kod 10 dakika geçerlidir.</p>
        <p style="color: #FFFFFF;">Eğer bu işlemi siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.</p>
        <p style="color: #FFFFFF; margin-top: 20px;">Teşekkürler,<br>Pazarlık Ekibi</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {success: true};
  } catch (error) {
    throw new Error(`Email gönderilemedi: ${error.message}`);
  }
});
```

5. **Dependencies** sekmesi:
   - `package.json` dosyasına şunları ekleyin:

```json
{
  "dependencies": {
    "firebase-admin": "^12.0.0",
    "firebase-functions": "^4.5.0",
    "nodemailer": "^6.9.7"
  }
}
```

## Adım 3: Environment Variables Ayarlama

1. **Runtime, build, connections and security settings** → **Secrets and variables** sekmesi
2. **Environment variables** bölümüne tıklayın
3. **Add variable** butonuna tıklayın:
   - **EMAIL_USER**: Gmail adresiniz (örn: `your-email@gmail.com`)
   - **EMAIL_PASSWORD**: Gmail App Password (16 haneli)

## Adım 4: Gmail App Password

1. https://myaccount.google.com/security
2. **2-Step Verification** → Açın (yoksa)
3. **App passwords** → "Mail" ve "Other" seçin
4. "Trading App" yazın
5. 16 haneli şifreyi kopyalayın

## Adım 5: Deploy

1. **Deploy** butonuna tıklayın
2. Deploy tamamlanana kadar bekleyin (2-3 dakika)

## Adım 6: Function URL'ini Alma

1. Deploy tamamlandıktan sonra function'ın yanındaki **3 nokta** → **Copy function URL**
2. Bu URL'i kaydedin (gerekirse kullanacağız)

## Test

Deploy tamamlandıktan sonra:
1. Uygulamayı yeniden başlatın
2. Signup sayfasından kayıt olmayı deneyin
3. Email'inizi kontrol edin

---

**Not:** Eğer bu yöntem çok karmaşık geliyorsa, Firebase Console'dan deploy etmek daha kolay olabilir.





