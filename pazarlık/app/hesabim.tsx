import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function Hesabim() {
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      router.replace('/login');
    } catch (error) {
      Alert.alert('Hata', 'Çıkış yapılırken bir sorun oluştu.');
    }
  };

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color="#000000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.pageTitle}>Hesabım</Text>

          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={34} color="#000000" />
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.userName}>Kerem Akkaya</Text>
              <Text style={styles.userEmail}>
                {user?.email ? user.email : 'kullanici@email.com'}
              </Text>

              <View style={styles.badge}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={14}
                  color="#FFFFFF"
                />
                <Text style={styles.badgeText}>Güvenilir Üye</Text>
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Toplam İlan</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Takas</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Favori</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hesap</Text>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push('/profilim' as any)}
            >
              <View style={styles.menuLeft}>
                <Ionicons name="person-outline" size={22} color="#000000" />
                <Text style={styles.menuText}>Profilim</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666666" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push('/benimilanlarim' as any)}
            >
              <View style={styles.menuLeft}>
                <Ionicons name="albums-outline" size={22} color="#000000" />
                <Text style={styles.menuText}>Benim İlanlarım</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666666" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push('/favorilerim' as any)}
            >
              <View style={styles.menuLeft}>
                <Ionicons name="heart-outline" size={22} color="#000000" />
                <Text style={styles.menuText}>Favorilerim</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666666" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push('/tekliflerim' as any)}
            >
              <View style={styles.menuLeft}>
                <Ionicons
                  name="swap-horizontal-outline"
                  size={22}
                  color="#000000"
                />
                <Text style={styles.menuText}>Tekliflerim</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666666" />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Diğer</Text>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push('/ayarlar' as any)}
            >
              <View style={styles.menuLeft}>
                <Ionicons name="settings-outline" size={22} color="#000000" />
                <Text style={styles.menuText}>Ayarlar</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666666" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push('/gizlilik' as any)}
            >
              <View style={styles.menuLeft}>
                <Ionicons
                  name="lock-closed-outline"
                  size={22}
                  color="#000000"
                />
                <Text style={styles.menuText}>Gizlilik</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666666" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push('/yardim' as any)}
            >
              <View style={styles.menuLeft}>
                <Ionicons
                  name="help-circle-outline"
                  size={22}
                  color="#000000"
                />
                <Text style={styles.menuText}>Yardım</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666666" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
            <Text style={styles.logoutText}>Çıkış Yap</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  headerRow: {
    marginBottom: 10,
  },
  backButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  pageTitle: {
    fontSize: 38,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'RobotoCondensed',
    marginBottom: 20,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'RobotoCondensed',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'RobotoCondensed',
    marginBottom: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#111111',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'RobotoCondensed',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 22,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'RobotoCondensed',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#666666',
    fontFamily: 'RobotoCondensed',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  sectionTitle: {
    fontSize: 15,
    color: '#777777',
    fontFamily: 'RobotoCondensed',
    marginTop: 4,
    marginBottom: 8,
  },
  menuItem: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingVertical: 6,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'RobotoCondensed',
    fontWeight: '600',
  },
  logoutButton: {
    marginTop: 4,
    backgroundColor: '#000000',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'RobotoCondensed',
  },
});