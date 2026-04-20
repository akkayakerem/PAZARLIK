# Firestore Database Oluşturma ve Kuralları Ayarlama

## ÖNEMLİ: Realtime Database DEĞİL, Firestore Database!

Kodumuz **Firestore Database** kullanıyor, **Realtime Database** değil!

## Adımlar

### 1. Firestore Database Oluşturma

1. [Firebase Console](https://console.firebase.google.com/) → Projenizi açın
2. Sol menüde **Firestore Database** seçeneğini arayın
   - Eğer görmüyorsanız, sol menüde **Build** altında olabilir
   - Veya **Database** yazıp arayın
3. **Firestore Database**'e tıklayın
4. Eğer "Create database" butonu görüyorsanız:
   - **Create database** butonuna tıklayın
   - **Start in test mode** seçin
   - Location seçin (örn: `europe-west1` veya size yakın bir bölge)
   - **Enable** butonuna tıklayın

### 2. Firestore Rules Ayarlama

Firestore Database oluşturulduktan sonra:

1. Firestore Database sayfasında üstte **Rules** sekmesine tıklayın
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
3. **Sadece `if false` kısmını `if true` olarak değiştirin:**
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

## Realtime Database vs Firestore Database

- **Realtime Database**: Eski Firebase veritabanı, JSON formatında
- **Firestore Database**: Yeni Firebase veritabanı, doküman tabanlı (biz bunu kullanıyoruz)

Kodumuzda `getFirestore()` kullanıyoruz, bu **Firestore Database** demektir!

## Kontrol

Firestore Database oluşturulduktan sonra:
- Sol menüde **Firestore Database** görünmeli
- **Data** sekmesinde boş bir koleksiyon listesi görmelisiniz
- **Rules** sekmesinde kuralları ayarlayabilirsiniz





