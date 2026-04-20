# Firestore Kuralları (Rules)

Firestore'a yazma işlemi için Firebase Console'da kuralları ayarlamanız gerekiyor.

## Firestore Kurallarını Ayarlama

1. [Firebase Console](https://console.firebase.google.com/) → Projenizi açın
2. Sol menüden **Firestore Database** seçin
3. **Rules** sekmesine gidin
4. **TÜM ESKİ KURALLARI SİLİN** ve aşağıdaki kuralları yapıştırın:

**ÖNEMLİ:** Firebase Console'da Rules sekmesinde sadece aşağıdaki kodu yapıştırın. JSON formatı değil, özel Firestore Rules syntax'ı kullanılır.

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Signup kodları için
    match /signupCodes/{email} {
      allow read, write: if true; // Test için herkese açık (production'da değiştirin)
    }
    
    // Reset kodları için
    match /resetCodes/{email} {
      allow read, write: if true; // Test için herkese açık (production'da değiştirin)
    }
    
    // Password reset tokens için
    match /passwordResetTokens/{email} {
      allow read, write: if true; // Test için herkese açık (production'da değiştirin)
    }
    
    // Kullanıcı bilgileri için
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Diğer tüm dokümanlar için
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Production İçin Güvenli Kurallar

Production'da daha güvenli kurallar kullanın:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Signup kodları için (sadece yazma, okuma yok)
    match /signupCodes/{email} {
      allow write: if request.resource.data.email == email;
      allow read: if false; // Kodlar okunamaz
    }
    
    // Reset kodları için
    match /resetCodes/{email} {
      allow write: if request.resource.data.email == email;
      allow read: if false;
    }
    
    // Kullanıcı bilgileri için
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Diğer tüm dokümanlar için
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Önemli Notlar

- Test için `allow read, write: if true;` kullanabilirsiniz
- Production'da mutlaka güvenli kurallar kullanın
- Kuralları değiştirdikten sonra **Publish** butonuna tıklayın

