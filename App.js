import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
  Dimensions,
  ImageBackground
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Sample Branch Data
const BRANCHES = [
  {
    id: 'sumqayit-1',
    name: 'Sumqayıt 1-ci Məhəllə Filialı',
    address: 'Sülh küçəsi 45',
    queue: 2,
    status: 'Açıq',
    rating: '4.9',
    distance: '1.2 km'
  },
  {
    id: 'baki-koroglu',
    name: 'Bakı Koroğlu Metrosu Filialı',
    address: 'Heydər Əliyev pr. 115',
    queue: 5,
    status: 'Açıq',
    rating: '4.8',
    distance: '14.5 km'
  },
  {
    id: 'xirdalan',
    name: 'Xırdalan Dairəsi Filialı',
    address: 'Qafqaz Unv. yaxınlığı',
    queue: 1,
    status: 'Açıq',
    rating: '4.7',
    distance: '8.1 km'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedBranch, setSelectedBranch] = useState('sumqayit-1');
  const [carType, setCarType] = useState('sedan');
  const [carPlate, setCarPlate] = useState('');
  const [activeServices, setActiveServices] = useState({
    foam: true,
    interior: false,
    engine: false
  });

  // Calculate live total price
  const calculateTotal = () => {
    let total = 0;
    if (carType === 'sedan') total += 0;
    else if (carType === 'suv') total += 4;
    else if (carType === 'van') total += 8;

    if (activeServices.foam) total += 12;
    if (activeServices.interior) total += 10;
    if (activeServices.engine) total += 15;

    return total.toFixed(2);
  };

  const handleBookingConfirm = () => {
    if (!carPlate.trim()) {
      Alert.alert('Dəqiqləşdirmə', 'Xahiş olunur avtomobil nömrəsini daxil edin.');
      return;
    }
    Alert.alert(
      'Növbə Təsdiqləndi! 🚗',
      `Nömrə: ${carPlate.toUpperCase()}\nMəbləğ: ${calculateTotal()} AZN\n\nStatus bölməsindən canlı izləyə bilərsiniz.`,
      [{ text: 'Tamam', onPress: () => setActiveTab('status') }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0F19" />

      {/* Top iOS Header */}
      <View style={styles.header}>
        <View style={styles.headerBrand}>
          <View style={styles.logoBadge}>
            <FontAwesome5 name="car-wash" size={18} color="#0B0F19" />
          </View>
          <View>
            <Text style={styles.brandTitle}>ZIMEX <Text style={styles.brandSub}>AUTO WASH</Text></Text>
            <Text style={styles.locationSub}>
              <Ionicons name="location" size={10} color="#06B6D4" /> Bakı & Sumqayıt iOS App
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.profileBtn}>
          <Ionicons name="person-circle-outline" size={28} color="#00F0FF" />
        </TouchableOpacity>
      </View>

      {/* Dynamic Content Views */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <View style={styles.tabContainer}>
            {/* Active Wash Status Banner */}
            <View style={styles.activeCard}>
              <View style={styles.cardBadgeRow}>
                <View style={styles.statusBadge}>
                  <View style={styles.pulseDot} />
                  <Text style={styles.statusBadgeText}>Aktiv Yuma Seansı</Text>
                </View>
                <Text style={styles.idTag}>#ZMX-8842</Text>
              </View>

              <Text style={styles.carTitle}>BMW M4 Competition</Text>
              <Text style={styles.branchSub}>
                <Ionicons name="navigate-outline" size={12} color="#06B6D4" /> Sumqayıt 1-ci Məhəllə
              </Text>

              <View style={styles.progressSection}>
                <View style={styles.progressTextRow}>
                  <Text style={styles.progressLabel}>Status: <Text style={{ color: '#00F0FF' }}>Aktiv Köpükləmə</Text></Text>
                  <Text style={styles.progressPercent}>65%</Text>
                </View>
                <View style={styles.progressBarTrack}>
                  <View style={[styles.progressBarFill, { width: '65%' }]} />
                </View>
              </View>

              <TouchableOpacity style={styles.liveWatchBtn} onPress={() => setActiveTab('status')}>
                <Text style={styles.liveWatchText}>Canlı İzlə</Text>
                <Ionicons name="chevron-forward" size={14} color="#00F0FF" />
              </TouchableOpacity>
            </View>

            {/* Quick Action Buttons */}
            <View style={styles.actionGrid}>
              <TouchableOpacity style={styles.actionCard} onPress={() => setActiveTab('book')}>
                <View style={styles.actionIconBox}>
                  <Ionicons name="calendar" size={22} color="#00F0FF" />
                </View>
                <Text style={styles.actionTitle}>Növbəyə Yazıl</Text>
                <Text style={styles.actionSub}>Sürətli Bron Et</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionCard} onPress={() => setActiveTab('bonus')}>
                <View style={[styles.actionIconBox, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
                  <Ionicons name="qr-code" size={22} color="#F59E0B" />
                </View>
                <Text style={styles.actionTitle}>Loyallıq QR</Text>
                <Text style={styles.actionSub}>Bonus Və Keşbek</Text>
              </TouchableOpacity>
            </View>

            {/* VIP Club Widget */}
            <View style={styles.vipCard}>
              <View style={styles.vipHeader}>
                <View style={styles.vipTitleRow}>
                  <FontAwesome5 name="crown" size={14} color="#F59E0B" />
                  <Text style={styles.vipTitle}>ZIMEX VIP CLUB</Text>
                </View>
                <Text style={styles.vipBalance}>12.50 AZN</Text>
              </View>
              <Text style={styles.vipDesc}>Hər 5-ci Yuma <Text style={{ color: '#00F0FF', fontWeight: 'bold' }}>PULSUZ!</Text></Text>
              <View style={styles.stampRow}>
                <View style={styles.stampDone}><Ionicons name="checkmark" size={16} color="#0B0F19" /></View>
                <View style={styles.stampDone}><Ionicons name="checkmark" size={16} color="#0B0F19" /></View>
                <View style={styles.stampDone}><Ionicons name="checkmark" size={16} color="#0B0F19" /></View>
                <View style={styles.stampActive}><Text style={styles.stampText}>4</Text></View>
                <View style={styles.stampEmpty}><FontAwesome5 name="gift" size={14} color="#F59E0B" /></View>
              </View>
            </View>
          </View>
        )}

        {/* TAB 2: BRANCHES */}
        {activeTab === 'branches' && (
          <View style={styles.tabContainer}>
            <Text style={styles.sectionHeaderTitle}>Şəbəkə Filiallarımız</Text>
            <Text style={styles.sectionHeaderSub}>Ən yaxın filialı seçin və növbəni görün</Text>

            {BRANCHES.map((b) => (
              <View key={b.id} style={styles.branchCard}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={styles.branchCardTitle}>{b.name}</Text>
                    <View style={styles.openTag}><Text style={styles.openTagText}>{b.status}</Text></View>
                  </View>
                  <Text style={styles.branchAddress}><Ionicons name="location-outline" size={12} /> {b.address}</Text>
                  <View style={styles.branchMetaRow}>
                    <Text style={styles.metaText}><Ionicons name="people" color="#00F0FF" size={11} /> Növbə: <Text style={{ color: '#fff', fontWeight: 'bold' }}>{b.queue} Maşın</Text></Text>
                    <Text style={styles.metaText}><Ionicons name="star" color="#F59E0B" size={11} /> {b.rating}</Text>
                    <Text style={styles.metaText}><Ionicons name="navigate" color="#94A3B8" size={11} /> {b.distance}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.selectBranchBtn}
                  onPress={() => {
                    setSelectedBranch(b.id);
                    setActiveTab('book');
                  }}
                >
                  <Text style={styles.selectBranchText}>Seç</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* TAB 3: BOOKING */}
        {activeTab === 'book' && (
          <View style={styles.tabContainer}>
            <Text style={styles.sectionHeaderTitle}>Onlayn Bron Və Növbə</Text>
            <Text style={styles.sectionHeaderSub}>Parametrləri seçin, vaxt itirmədən yuyulun</Text>

            {/* Vehicle Type Selector */}
            <Text style={styles.inputLabel}>Avtomobil Növü</Text>
            <View style={styles.carTypeRow}>
              {[
                { id: 'sedan', label: 'Sedan', icon: 'car-sport-outline' },
                { id: 'suv', label: 'SUV', icon: 'car-outline' },
                { id: 'van', label: 'Mikroavtobus', icon: 'bus-outline' },
              ].map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.carTypeCard, carType === item.id && styles.carTypeActive]}
                  onPress={() => setCarType(item.id)}
                >
                  <Ionicons name={item.icon} size={24} color={carType === item.id ? '#00F0FF' : '#94A3B8'} />
                  <Text style={[styles.carTypeText, carType === item.id && { color: '#00F0FF' }]}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Services Checkboxes */}
            <Text style={styles.inputLabel}>Xidmət Seçimi</Text>
            <TouchableOpacity
              style={styles.serviceRow}
              onPress={() => setActiveServices({ ...activeServices, foam: !activeServices.foam })}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Ionicons
                  name={activeServices.foam ? "checkbox" : "square-outline"}
                  size={20}
                  color={activeServices.foam ? "#00F0FF" : "#64748B"}
                />
                <View>
                  <Text style={styles.serviceTitle}>Eksteryer Ekstra Köpük</Text>
                  <Text style={styles.serviceSub}>Kuzov yuyulması + Disklər + Qurutma</Text>
                </View>
              </View>
              <Text style={styles.servicePrice}>+12 AZN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.serviceRow}
              onPress={() => setActiveServices({ ...activeServices, interior: !activeServices.interior })}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Ionicons
                  name={activeServices.interior ? "checkbox" : "square-outline"}
                  size={20}
                  color={activeServices.interior ? "#00F0FF" : "#64748B"}
                />
                <View>
                  <Text style={styles.serviceTitle}>Əsaslı Daxili Təmizlik</Text>
                  <Text style={styles.serviceSub}>Tozsoran + Panel dəri qulluğu</Text>
                </View>
              </View>
              <Text style={styles.servicePrice}>+10 AZN</Text>
            </TouchableOpacity>

            {/* License Plate Input */}
            <Text style={styles.inputLabel}>Avtomobil Nömrəsi</Text>
            <TextInput
              style={styles.plateInput}
              placeholder="90-HJ-777"
              placeholderTextColor="#64748B"
              value={carPlate}
              onChangeText={setCarPlate}
              autoCapitalize="characters"
            />

            {/* Price Footer */}
            <View style={styles.bookingFooter}>
              <View>
                <Text style={styles.footerPriceLabel}>Yekun Məbləğ:</Text>
                <Text style={styles.footerPriceValue}>{calculateTotal()} AZN</Text>
              </View>
              <TouchableOpacity style={styles.confirmBtn} onPress={handleBookingConfirm}>
                <Text style={styles.confirmBtnText}>Bronu Təsdiqlə</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* TAB 4: LIVE STATUS */}
        {activeTab === 'status' && (
          <View style={styles.tabContainer}>
            <Text style={styles.sectionHeaderTitle}>Canlı Yuma Prosesi</Text>
            <Text style={styles.sectionHeaderSub}>Avtomobilinizin reallıqda hansı mərhələdə olduğunu izləyin</Text>

            <View style={styles.timelineBox}>
              <View style={styles.timelineItem}>
                <Ionicons name="checkmark-circle" size={20} color="#00F0FF" />
                <View style={styles.timelineTextGroup}>
                  <Text style={styles.stepTitleDone}>1. Qəbul və İlkin Durulama</Text>
                  <Text style={styles.stepSub}>Təzyiqli su ilə ilkin yuma tamamlandı</Text>
                </View>
              </View>

              <View style={styles.timelineItem}>
                <Ionicons name="time" size={20} color="#00F0FF" />
                <View style={styles.timelineTextGroup}>
                  <Text style={styles.stepTitleActive}>2. Aktiv Köpükləmə Və Şampunlama</Text>
                  <Text style={styles.stepSubActive}>pH Neytral köpük vurulub, gözlənilir...</Text>
                </View>
              </View>

              <View style={styles.timelineItem}>
                <Ionicons name="ellipse-outline" size={20} color="#64748B" />
                <View style={styles.timelineTextGroup}>
                  <Text style={styles.stepTitlePending}>3. Salondan Tozsoran Və Qurutma</Text>
                  <Text style={styles.stepSub}>Turboblower ilə qurulama seansı</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* TAB 5: BONUS / LOYALTY */}
        {activeTab === 'bonus' && (
          <View style={styles.tabContainer}>
            <Text style={styles.sectionHeaderTitle}>Loyallıq Və Keşbek</Text>
            <Text style={styles.sectionHeaderSub}>Avtoyumada xərclədiyiniz hər manata görə 5% keşbek</Text>

            <View style={styles.loyaltyCard}>
              <Text style={styles.loyaltyCardTag}>ZIMEX iOS CLUB PASS</Text>
              <Text style={styles.loyaltyName}>Cavid Əliyev</Text>

              <View style={styles.loyaltyFooterRow}>
                <View>
                  <Text style={styles.loyaltyBalanceLabel}>Aktiv Balans</Text>
                  <Text style={styles.loyaltyBalanceValue}>12.50 AZN</Text>
                </View>
                <Text style={styles.loyaltyId}>#ZX-99201</Text>
              </View>
            </View>
          </View>
        )}

      </ScrollView>

      {/* iOS Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        {[
          { id: 'home', title: 'Ana Səhifə', icon: 'home-outline' },
          { id: 'branches', title: 'Filiallar', icon: 'map-outline' },
          { id: 'book', title: 'Bron', icon: 'add-circle-outline', special: true },
          { id: 'status', title: 'Status', icon: 'time-outline' },
          { id: 'bonus', title: 'Bonus', icon: 'gift-outline' },
        ].map((nav) => (
          <TouchableOpacity
            key={nav.id}
            style={styles.navItem}
            onPress={() => setActiveTab(nav.id)}
          >
            <Ionicons
              name={nav.icon}
              size={nav.special ? 28 : 22}
              color={activeTab === nav.id ? '#00F0FF' : '#64748B'}
            />
            <Text style={[styles.navLabel, activeTab === nav.id && { color: '#00F0FF' }]}>
              {nav.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#00F0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
  },
  brandSub: {
    color: '#00F0FF',
    fontSize: 11,
    fontWeight: '400',
  },
  locationSub: {
    color: '#94A3B8',
    fontSize: 10,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  tabContainer: {
    gap: 16,
  },
  sectionHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  sectionHeaderSub: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: -10,
  },
  activeCard: {
    backgroundColor: '#161F30',
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#00F0FF',
  },
  cardBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00F0FF',
  },
  statusBadgeText: {
    color: '#00F0FF',
    fontSize: 11,
    fontWeight: '700',
  },
  idTag: {
    color: '#64748B',
    fontSize: 11,
    fontFamily: 'Courier',
  },
  carTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 10,
  },
  branchSub: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  progressSection: {
    marginVertical: 12,
    gap: 6,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    color: '#94A3B8',
    fontSize: 12,
  },
  progressPercent: {
    color: '#00F0FF',
    fontWeight: '800',
    fontSize: 12,
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: '#1E293B',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00F0FF',
    borderRadius: 3,
  },
  liveWatchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  liveWatchText: {
    color: '#00F0FF',
    fontSize: 12,
    fontWeight: '700',
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#161F30',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  actionIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  actionSub: {
    color: '#64748B',
    fontSize: 10,
  },
  vipCard: {
    backgroundColor: '#161F30',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 240, 255, 0.2)',
  },
  vipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vipTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  vipTitle: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '800',
  },
  vipBalance: {
    color: '#00F0FF',
    fontSize: 12,
    fontWeight: '800',
  },
  vipDesc: {
    color: '#94A3B8',
    fontSize: 11,
    marginVertical: 6,
  },
  stampRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  stampDone: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#00F0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampActive: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderWidth: 1,
    borderColor: '#00F0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampText: {
    color: '#00F0FF',
    fontWeight: '800',
  },
  stampEmpty: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  branchCard: {
    backgroundColor: '#161F30',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  branchCardTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  openTag: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  openTagText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '700',
  },
  branchAddress: {
    color: '#94A3B8',
    fontSize: 11,
    marginVertical: 4,
  },
  branchMetaRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metaText: {
    color: '#94A3B8',
    fontSize: 10,
  },
  selectBranchBtn: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  selectBranchText: {
    color: '#00F0FF',
    fontWeight: '700',
    fontSize: 12,
  },
  inputLabel: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 8,
  },
  carTypeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  carTypeCard: {
    flex: 1,
    backgroundColor: '#161F30',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  carTypeActive: {
    borderColor: '#00F0FF',
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
  },
  carTypeText: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 4,
  },
  serviceRow: {
    backgroundColor: '#161F30',
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  serviceSub: {
    color: '#64748B',
    fontSize: 10,
  },
  servicePrice: {
    color: '#00F0FF',
    fontWeight: '800',
    fontSize: 12,
  },
  plateInput: {
    backgroundColor: '#161F30',
    color: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
    fontSize: 14,
    fontFamily: 'Courier',
    fontWeight: 'bold',
  },
  bookingFooter: {
    backgroundColor: '#161F30',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.2)',
  },
  footerPriceLabel: {
    color: '#94A3B8',
    fontSize: 10,
  },
  footerPriceValue: {
    color: '#00F0FF',
    fontSize: 20,
    fontWeight: '900',
  },
  confirmBtn: {
    backgroundColor: '#00F0FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  confirmBtnText: {
    color: '#0B0F19',
    fontWeight: '900',
    fontSize: 12,
  },
  timelineBox: {
    backgroundColor: '#161F30',
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  timelineTextGroup: {
    flex: 1,
  },
  stepTitleDone: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  stepTitleActive: {
    color: '#00F0FF',
    fontWeight: '800',
    fontSize: 12,
  },
  stepTitlePending: {
    color: '#64748B',
    fontSize: 12,
  },
  stepSub: {
    color: '#64748B',
    fontSize: 10,
  },
  stepSubActive: {
    color: 'rgba(0,240,255,0.8)',
    fontSize: 10,
  },
  loyaltyCard: {
    backgroundColor: '#161F30',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#00F0FF',
    gap: 20,
  },
  loyaltyCardTag: {
    color: '#00F0FF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
  },
  loyaltyName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  loyaltyFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  loyaltyBalanceLabel: {
    color: '#94A3B8',
    fontSize: 10,
  },
  loyaltyBalanceValue: {
    color: '#00F0FF',
    fontSize: 24,
    fontWeight: '900',
  },
  loyaltyId: {
    color: '#64748B',
    fontSize: 12,
    fontFamily: 'Courier',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#161F30',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    color: '#64748B',
    fontSize: 10,
    marginTop: 2,
  },
});
