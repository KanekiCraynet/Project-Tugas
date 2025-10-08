# 🧮 Kalkulator Modern - Project Mata Kuliah Bergerak

Aplikasi kalkulator modern dengan UI yang menarik dan fitur lengkap, dibangun menggunakan React, TypeScript, dan Tailwind CSS.

## ✨ Fitur Utama

### 🎨 UI/UX Modern
- **Design Responsif**: Tampilan yang optimal di desktop dan mobile
- **3 Tema**: Dark, Light, dan Neon dengan transisi yang smooth
- **Animasi Interaktif**: Framer Motion untuk transisi dan efek visual
- **Glass Effect**: Efek kaca modern dengan backdrop blur
- **Gradient Background**: Background gradient yang dinamis

### 🧮 Fungsi Kalkulator
- **Operasi Dasar**: Penjumlahan, pengurangan, perkalian, pembagian
- **Fungsi Matematika**: Akar kuadrat, pangkat, reciprocal, persentase
- **Konstanta**: π (pi) dan e (euler)
- **Operasi Lanjutan**: Toggle tanda, clear entry, backspace
- **Validasi Input**: Penanganan error dan input yang tidak valid

### 📊 Fitur Tambahan
- **Riwayat Perhitungan**: Simpan dan akses 50 perhitungan terakhir
- **Copy to Clipboard**: Salin hasil perhitungan dengan mudah
- **Local Storage**: Data tersimpan otomatis di browser
- **Responsive Design**: Optimal di semua ukuran layar

## 🚀 Teknologi yang Digunakan

- **React 18**: Library UI modern dengan hooks
- **TypeScript**: Type safety dan developer experience yang lebih baik
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Library animasi untuk React
- **Vite**: Build tool yang cepat dan modern
- **Lucide React**: Icon library yang modern

## 📦 Instalasi dan Setup

### Prerequisites
- Node.js (versi 16 atau lebih baru)
- npm atau yarn

### Langkah Instalasi

1. **Clone atau download project**
   ```bash
   cd /home/zenzee/Dokumen/GitHub/Project-Tugas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan development server**
   ```bash
   npm run dev
   ```

4. **Buka browser**
   ```
   http://localhost:3000
   ```

### Build untuk Production

```bash
npm run build
```

File hasil build akan tersimpan di folder `dist/`.

## 🏗️ Struktur Project

```
Project-Tugas/
├── public/                 # Static assets
├── src/
│   ├── components/         # Komponen React
│   │   ├── Button.tsx      # Komponen tombol dengan animasi
│   │   ├── ButtonGrid.tsx  # Grid layout untuk tombol
│   │   ├── Display.tsx     # Layar kalkulator
│   │   ├── HistoryPanel.tsx # Panel riwayat perhitungan
│   │   └── ThemeSelector.tsx # Pemilih tema
│   ├── hooks/              # Custom React hooks
│   │   └── useCalculator.ts # Hook utama untuk logika kalkulator
│   ├── types/              # TypeScript type definitions
│   │   └── calculator.ts   # Interface dan types
│   ├── utils/              # Utility functions
│   │   └── calculator.ts   # Engine kalkulator
│   ├── App.tsx             # Komponen utama
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies dan scripts
├── tailwind.config.js      # Konfigurasi Tailwind
├── tsconfig.json           # Konfigurasi TypeScript
└── vite.config.ts          # Konfigurasi Vite
```

## 🎯 Fitur Detail

### Kalkulator Engine
- **Singleton Pattern**: Instance tunggal untuk konsistensi
- **Error Handling**: Penanganan error yang robust
- **Number Formatting**: Format angka yang user-friendly
- **Expression Parser**: Parser ekspresi matematika yang aman

### State Management
- **React Hooks**: useState dan useCallback untuk state management
- **Local Storage**: Persistensi data riwayat dan tema
- **Type Safety**: Full TypeScript support

### Animasi dan Interaksi
- **Button Animations**: Hover, tap, dan ripple effects
- **Display Transitions**: Smooth transitions untuk perubahan nilai
- **Panel Animations**: Slide dan fade animations untuk panel
- **Theme Transitions**: Smooth transitions antar tema

## 🎨 Tema dan Styling

### Tema yang Tersedia
1. **Dark Theme** (Default)
   - Background: Gradient dari slate-900 ke purple-900
   - Warna: Biru dan ungu dengan aksen

2. **Light Theme**
   - Background: Gradient dari blue-50 ke purple-50
   - Warna: Biru dan indigo yang lembut

3. **Neon Theme**
   - Background: Gradient dari purple-900 ke red-900
   - Warna: Pink dan merah dengan efek neon

### Custom CSS Classes
- `.glass-effect`: Efek kaca dengan backdrop blur
- `.button-primary`: Style untuk tombol utama
- `.button-secondary`: Style untuk tombol sekunder
- `.button-operator`: Style untuk tombol operator
- `.button-number`: Style untuk tombol angka

## 📱 Responsive Design

- **Mobile First**: Design dimulai dari mobile
- **Breakpoints**: Responsive di semua ukuran layar
- **Touch Friendly**: Tombol yang mudah disentuh
- **Viewport Meta**: Optimized untuk mobile

## 🔧 Konfigurasi

### Tailwind CSS
- Custom color palette
- Extended animations
- Custom utilities
- Responsive breakpoints

### TypeScript
- Strict mode enabled
- Path mapping
- Modern ES features
- React JSX support

### Vite
- Fast HMR (Hot Module Replacement)
- Optimized build
- Development server
- Plugin ecosystem

## 🚀 Deployment

### Vercel (Recommended)
1. Push code ke GitHub
2. Connect repository ke Vercel
3. Deploy otomatis

### Netlify
1. Build project: `npm run build`
2. Upload folder `dist/` ke Netlify
3. Configure redirects untuk SPA

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add script: `"deploy": "gh-pages -d dist"`
3. Run: `npm run build && npm run deploy`

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📈 Performance

- **Bundle Size**: Optimized dengan Vite
- **Code Splitting**: Automatic code splitting
- **Tree Shaking**: Unused code elimination
- **Minification**: Production build optimization

## 🔒 Security

- **Input Validation**: Validasi input yang ketat
- **XSS Protection**: Sanitasi input
- **Safe Evaluation**: Parser ekspresi yang aman
- **Type Safety**: TypeScript untuk type safety

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

- React team untuk framework yang luar biasa
- Tailwind CSS untuk utility-first CSS
- Framer Motion untuk animasi yang smooth
- Lucide untuk icon yang modern
- Vite untuk build tool yang cepat

---

**Selamat menggunakan Kalkulator Modern! 🎉**

Untuk pertanyaan atau feedback, silakan buat issue di repository ini.
