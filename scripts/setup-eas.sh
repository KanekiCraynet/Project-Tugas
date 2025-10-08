#!/bin/bash

# Script untuk setup EAS project
# Author: Zenzee
# Project: Mata Kuliah Bergerak

echo "🧮 Kalkulator Modern - EAS Setup Script"
echo "========================================"

# Check if user is logged in
echo "🔐 Checking Expo login status..."
if ! npx eas whoami &> /dev/null; then
    echo "❌ Belum login ke Expo. Silakan login terlebih dahulu:"
    echo "   npx eas login"
    exit 1
fi

echo "✅ Logged in to Expo as: $(npx eas whoami)"

# Initialize EAS project
echo "🚀 Setting up EAS project..."
echo "This will create a new EAS project for your app."
echo "Press Enter to continue..."
read

# Run EAS build with automatic project creation
echo "🔨 Starting build process..."
echo "EAS will automatically create a project for you."
echo ""

npx eas build --platform android --profile preview

echo ""
echo "✅ Build process completed!"
echo "📱 Check your Expo dashboard for the APK download link."
echo "🎉 Selamat! APK Kalkulator Modern siap digunakan!"
