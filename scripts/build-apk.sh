#!/bin/bash

# Script untuk build APK Kalkulator Modern
# Author: Zenzee
# Project: Mata Kuliah Bergerak

echo "🧮 Kalkulator Modern - Build APK Script"
echo "========================================"

# Check if EAS CLI is available
echo "🔍 Checking EAS CLI availability..."

# Check if user is logged in to Expo
echo "🔐 Checking Expo login status..."
if ! npx eas whoami &> /dev/null; then
    echo "❌ Belum login ke Expo. Silakan login terlebih dahulu:"
    echo "   npx eas login"
    exit 1
fi

echo "✅ Logged in to Expo as: $(npx eas whoami)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build APK
echo "🔨 Building APK..."
echo "Pilih jenis build:"
echo "1. Preview (untuk testing)"
echo "2. Production (untuk release)"
read -p "Pilihan (1/2): " choice

echo ""
echo "📝 Catatan:"
echo "- Jika EAS bertanya untuk membuat project baru, ketik 'Y'"
echo "- Build akan memakan waktu 5-15 menit"
echo "- Link download akan muncul di terminal"
echo ""

case $choice in
    1)
        echo "🚀 Building preview APK..."
        echo "Tekan Enter untuk melanjutkan..."
        read
        npx eas build --platform android --profile preview
        ;;
    2)
        echo "🚀 Building production APK..."
        echo "Tekan Enter untuk melanjutkan..."
        read
        npx eas build --platform android --profile production
        ;;
    *)
        echo "❌ Pilihan tidak valid. Building preview APK..."
        echo "Tekan Enter untuk melanjutkan..."
        read
        npx eas build --platform android --profile preview
        ;;
esac

echo "✅ Build selesai!"
echo "📱 APK dapat didownload dari Expo dashboard:"
echo "   https://expo.dev/accounts/$(npx eas whoami)/projects/kalkulator-modern/builds"
echo ""
echo "🎉 Selamat! APK Kalkulator Modern siap digunakan!"
