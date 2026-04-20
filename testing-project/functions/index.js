const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Email gönderme için transporter oluştur
// Gmail veya başka bir SMTP servisi kullanabilirsiniz
// Config değerleri yoksa environment variables'dan al
const getEmailConfig = () => {
  try {
    const config = functions.config().email;
    if (config && config.user && config.password) {
      return {
        user: config.user,
        password: config.password,
      };
    }
  } catch (e) {
    // Config yoksa environment variables kullan
  }
  
  // Environment variables'dan al (production için)
  return {
    user: process.env.EMAIL_USER || '',
    password: process.env.EMAIL_PASSWORD || '',
  };
};

// Kayıt doğrulama kodu gönderme
exports.sendSignupCode = functions.https.onCall(async (data, context) => {
  const { email, code } = data;

  if (!email || !code) {
    throw new functions.https.HttpsError('invalid-argument', 'Email ve kod gerekli');
  }

  const emailConfig = getEmailConfig();
  
  if (!emailConfig.user || !emailConfig.password) {
    console.error('Email config bulunamadı. Firebase Functions config veya environment variables ayarlanmalı.');
    throw new functions.https.HttpsError(
      'failed-precondition',
      'Email servisi yapılandırılmamış. Lütfen Firebase Functions config\'i ayarlayın.'
    );
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailConfig.user,
      pass: emailConfig.password,
    },
  });

  const mailOptions = {
    from: `"pazarlik" <${emailConfig.user}>`,
    to: email,
    replyTo: 'noreply@trading-app-1447a.firebaseapp.com',
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
    console.log(`Email gönderildi: ${email}`);
    return { success: true };
  } catch (error) {
    console.error('Email gönderme hatası:', error);
    throw new functions.https.HttpsError('internal', `Email gönderilemedi: ${error.message}`);
  }
});

// Şifre sıfırlama kodu gönderme
exports.sendResetCode = functions.https.onCall(async (data, context) => {
  const { email, code } = data;

  if (!email || !code) {
    throw new functions.https.HttpsError('invalid-argument', 'Email ve kod gerekli');
  }

  const emailConfig = getEmailConfig();
  
  if (!emailConfig.user || !emailConfig.password) {
    console.error('Email config bulunamadı. Firebase Functions config veya environment variables ayarlanmalı.');
    throw new functions.https.HttpsError(
      'failed-precondition',
      'Email servisi yapılandırılmamış. Lütfen Firebase Functions config\'i ayarlayın.'
    );
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailConfig.user,
      pass: emailConfig.password,
    },
  });

  const mailOptions = {
    from: `"pazarlik" <${emailConfig.user}>`,
    to: email,
    replyTo: 'noreply@trading-app-1447a.firebaseapp.com',
    subject: "Şifre Sıfırlama Kodu - Pazarlık",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000000; color: #FFFFFF; padding: 20px;">
        <h2 style="color: #8B5CF6; margin-bottom: 20px;">Şifre Sıfırlama Kodu</h2>
        <p style="color: #FFFFFF;">Merhaba,</p>
        <p style="color: #FFFFFF;">Şifrenizi sıfırlamak için aşağıdaki kodu kullanın:</p>
        <div style="background-color: #8B5CF6; color: white; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; border-radius: 8px; margin: 20px 0;">
          ${code}
        </div>
        <p style="color: #FFFFFF;">Bu kod 5 dakika geçerlidir.</p>
        <p style="color: #FFFFFF;">Eğer bu işlemi siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.</p>
        <p style="color: #FFFFFF; margin-top: 20px;">Teşekkürler,<br>Pazarlık Ekibi</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reset code email gönderildi: ${email}`);
    return { success: true };
  } catch (error) {
    console.error('Email gönderme hatası:', error);
    throw new functions.https.HttpsError('internal', `Email gönderilemedi: ${error.message}`);
  }
});

