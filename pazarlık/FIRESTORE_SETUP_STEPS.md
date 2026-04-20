# Firestore Kurulum Adımları

## 1. Firestore Database Oluşturma

Eğer Firestore Database henüz oluşturulmadıysa:

1. [Firebase Console](https://console.firebase.google.com/) → Projenizi açın
2. Sol menüden **Firestore Database** seçin
3. **Create database** butonuna tıklayın
4. **Start in test mode** seçin (test için)
5. **Enable** butonuna tıklayın

## 2. En Basit Kuralları Ekleme

Firestore Database oluşturulduktan sonra:

1. **Rules** sekmesine gidin
2. Şu anda şöyle bir şey görmelisiniz:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if false;
       }
     }
   }
   ```

3. **TÜM İÇERİĞİ SİLİN** ve şunu yapıştırın:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

4. **Publish** butonuna tıklayın

## 3. Test Etme

Kuralları ayarladıktan sonra uygulamayı tekrar deneyin.

## Not

Eğer hala parse hatası alıyorsanız:
- Firebase Console'u yenileyin (F5)
- Tarayıcı cache'ini temizleyin
- Başka bir tarayıcıda deneyin





