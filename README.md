# 🧮 Kalkulator Modern - Mobile App

Aplikasi kalkulator modern untuk Android dengan UI yang menarik dan fitur lengkap, dibangun menggunakan React Native dan Expo.

## ✨ Fitur Utama

### 🎨 UI/UX Modern
- **Design Responsif**: Tampilan yang optimal di semua ukuran layar Android
- **3 Tema**: Dark, Light, dan Neon dengan transisi yang smooth
- **Animasi Native**: Animasi yang smooth menggunakan React Native Animated API
- **Touch Feedback**: Haptic feedback dan visual feedback untuk interaksi
- **Material Design**: Mengikuti prinsip Material Design untuk Android

### 🧮 Fungsi Kalkulator
- **Operasi Dasar**: Penjumlahan, pengurangan, perkalian, pembagian
- **Fungsi Matematika**: Akar kuadrat, pangkat, reciprocal, persentase
- **Konstanta**: π (pi) dan e (euler)
- **Operasi Lanjutan**: Toggle tanda, clear entry, backspace
- **Validasi Input**: Penanganan error dan input yang tidak valid

### 📱 Fitur Mobile
- **Riwayat Perhitungan**: Simpan dan akses 50 perhitungan terakhir
- **AsyncStorage**: Data tersimpan otomatis di device
- **Haptic Feedback**: Getaran saat menekan tombol (opsional)
- **Portrait Mode**: Optimized untuk penggunaan portrait
- **Touch Optimized**: Tombol yang mudah disentuh dengan ukuran optimal

## 🚀 Teknologi yang Digunakan

- **React Native**: Framework untuk aplikasi mobile cross-platform
- **Expo**: Platform untuk development dan deployment React Native
- **TypeScript**: Type safety dan developer experience yang lebih baik
- **AsyncStorage**: Local storage untuk React Native
- **React Native Animated**: Animasi native yang performant
- **React Native Haptic Feedback**: Haptic feedback untuk Android

## 📦 Instalasi dan Setup

### Prerequisites
- Node.js (versi 16 atau lebih baru)
- npm atau yarn
- Expo CLI (akan diinstall otomatis)
- Android Studio (untuk testing di emulator, opsional)
- Expo Go app (untuk testing di device fisik)

### Langkah Instalasi

1. **Clone atau download project**
   ```bash
   cd /home/zenzee/Dokumen/GitHub/Project-Tugas/calculator-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan development server**
   ```bash
   npx expo start
   ```

4. **Testing di device**
   - Install Expo Go app di Android device
   - Scan QR code yang muncul di terminal
   - Aplikasi akan terbuka di device

### Build APK

#### Menggunakan EAS Build (Recommended)

1. **Install EAS CLI**
   ```bash
   npm install -g @expo/eas-cli
   ```

2. **Login ke Expo**
   ```bash
   eas login
   ```

3. **Configure project**
   ```bash
   eas build:configure
   ```

4. **Build APK**
   ```bash
   # Build untuk testing
   eas build --platform android --profile preview
   
   # Build untuk production
   eas build --platform android --profile production
   ```

5. **Download APK**
   - APK akan tersedia di Expo dashboard
   - Download dan install di Android device

#### Build Lokal (Advanced)

1. **Install Android Studio**
2. **Setup Android SDK**
3. **Configure environment variables**
4. **Build dengan Expo**
   ```bash
   npx expo run:android
   ```

## 🏗️ Struktur Project

```
calculator-mobile/
├── assets/                 # Static assets (icons, images)
├── src/
│   ├── components/         # Komponen React Native
│   │   ├── Button.tsx      # Komponen tombol dengan animasi
│   │   ├── ButtonGrid.tsx  # Grid layout untuk tombol
│   │   ├── Display.tsx     # Layar kalkulator
│   │   └── ThemeSelector.tsx # Pemilih tema
│   ├── hooks/              # Custom React hooks
│   │   └── useCalculator.ts # Hook utama untuk logika kalkulator
│   ├── types/              # TypeScript type definitions
│   │   └── calculator.ts   # Interface dan types
│   └── utils/              # Utility functions
│       └── calculator.ts   # Engine kalkulator
├── App.tsx                 # Komponen utama
├── app.json                # Konfigurasi Expo
├── eas.json                # Konfigurasi EAS Build
└── package.json            # Dependencies dan scripts
```

## 🎯 Fitur Detail

### Kalkulator Engine
- **Singleton Pattern**: Instance tunggal untuk konsistensi
- **Error Handling**: Penanganan error yang robust
- **Number Formatting**: Format angka yang user-friendly
- **Memory Management**: Efficient memory usage

### State Management
- **React Hooks**: useState dan useCallback untuk state management
- **AsyncStorage**: Persistensi data riwayat dan tema
- **Type Safety**: Full TypeScript support

### Animasi dan Interaksi
- **Button Animations**: Scale dan opacity animations
- **Display Transitions**: Smooth transitions untuk perubahan nilai
- **Theme Transitions**: Smooth transitions antar tema
- **Haptic Feedback**: Getaran saat interaksi (Android)

## 🎨 Tema dan Styling

### Tema yang Tersedia
1. **Dark Theme** (Default)
   - Background: Gradient gelap
   - Warna: Biru dan ungu dengan aksen

2. **Light Theme**
   - Background: Gradient terang
   - Warna: Biru dan abu-abu yang lembut

3. **Neon Theme**
   - Background: Gradient neon
   - Warna: Pink dan ungu dengan efek glow

### Styling Approach
- **StyleSheet**: Native styling untuk performa optimal
- **Theme-based**: Dynamic styling berdasarkan tema
- **Responsive**: Adaptif untuk berbagai ukuran layar
- **Accessibility**: Support untuk accessibility features

## 📱 Android Features

### Permissions
- **VIBRATE**: Untuk haptic feedback
- **INTERNET**: Untuk EAS Build (opsional)

### Performance
- **Native Animations**: Menggunakan native driver
- **Optimized Rendering**: Efficient re-rendering
- **Memory Management**: Proper cleanup dan optimization

## 🚀 Deployment

### EAS Build (Recommended)
1. Setup EAS project
2. Configure build profiles
3. Build APK/AAB
4. Download dan distribute

### Google Play Store
1. Build production APK/AAB
2. Create developer account
3. Upload ke Play Console
4. Submit untuk review

### Direct Distribution
1. Build APK
2. Share file APK
3. Install manual di device

## 🧪 Testing

### Development Testing
```bash
# Start development server
npx expo start

# Test di web browser
npx expo start --web

# Test di Android emulator
npx expo start --android
```

### Production Testing
```bash
# Build preview APK
eas build --platform android --profile preview

# Test APK di device
# Install dan test semua fitur
```

## 📈 Performance

- **Bundle Size**: Optimized dengan Expo
- **Startup Time**: Fast app startup
- **Memory Usage**: Efficient memory management
- **Battery Usage**: Optimized untuk battery life

## 🔒 Security

- **Input Validation**: Validasi input yang ketat
- **Safe Storage**: Secure local storage
- **Type Safety**: TypeScript untuk type safety
- **Error Handling**: Proper error handling

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - bebas digunakan untuk keperluan akademik dan komersial.

## 👨‍💻 Author

**Zenzee** - Project Mata Kuliah Bergerak

## 🙏 Acknowledgments

- React Native team untuk framework yang luar biasa
- Expo team untuk platform yang powerful
- React Native community untuk dukungan dan resources

## 📞 Support

Untuk pertanyaan atau masalah:
1. Check dokumentasi ini
2. Search di GitHub issues
3. Create new issue jika diperlukan

---

**Selamat menggunakan Kalkulator Modern Mobile! 🎉**

### Quick Start Commands

```bash
# Install dependencies
npm install

# Start development
npx expo start

# Build APK
eas build --platform android --profile preview

# Test di web
npx expo start --web
```

### Tips Penggunaan

1. **Testing**: Gunakan Expo Go app untuk testing cepat
2. **Build**: Gunakan EAS Build untuk build APK yang optimal
3. **Themes**: Switch tema untuk pengalaman yang berbeda
4. **History**: Akses riwayat perhitungan dengan mudah
5. **Performance**: Aplikasi dioptimalkan untuk performa yang smooth
