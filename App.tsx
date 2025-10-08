import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useCalculator } from './src/hooks/useCalculator';
import { Display } from './src/components/Display';
import { ButtonGrid } from './src/components/ButtonGrid';
import { ThemeSelector } from './src/components/ThemeSelector';
import { ButtonConfig } from './src/types/calculator';

export default function App() {
  const {
    state,
    inputNumber,
    inputDecimal,
    performOperation,
    performFunction,
    clear,
    clearEntry,
    toggleSign,
    percentage,
    insertConstant,
    deleteLastChar,
    clearHistory,
    setTheme
  } = useCalculator();

  const [showHistory, setShowHistory] = useState(false);

  const handleButtonPress = useCallback((config: ButtonConfig) => {
    const { type, value } = config;

    switch (type) {
      case 'number':
        if (value === '.') {
          inputDecimal();
        } else {
          inputNumber(value);
        }
        break;
      
      case 'operator':
        performOperation(value as any);
        break;
      
      case 'function':
        switch (value) {
          case 'C':
            clear();
            break;
          case 'CE':
            clearEntry();
            break;
          case '⌫':
            deleteLastChar();
            break;
          case '±':
            toggleSign();
            break;
          case '%':
            percentage();
            break;
          case '√':
          case 'x²':
          case '1/x':
            performFunction(value);
            break;
          case 'π':
            insertConstant('π');
            break;
          case 'e':
            insertConstant('e');
            break;
        }
        break;
      
      case 'special':
        if (value === '=') {
          performOperation('=');
        }
        break;
    }
  }, [
    inputNumber,
    inputDecimal,
    performOperation,
    performFunction,
    clear,
    clearEntry,
    toggleSign,
    percentage,
    insertConstant,
    deleteLastChar
  ]);

  const handleClearHistory = () => {
    Alert.alert(
      'Hapus Riwayat',
      'Apakah Anda yakin ingin menghapus semua riwayat perhitungan?',
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Hapus', 
          style: 'destructive',
          onPress: clearHistory
        }
      ]
    );
  };

  const getBackgroundStyle = () => {
    switch (state.theme) {
      case 'light':
        return styles.lightBackground;
      case 'neon':
        return styles.neonBackground;
      default:
        return styles.darkBackground;
    }
  };

  const getTextStyle = () => {
    switch (state.theme) {
      case 'light':
        return styles.lightText;
      case 'neon':
        return styles.neonText;
      default:
        return styles.darkText;
    }
  };

  const getStatusBarStyle = () => {
    switch (state.theme) {
      case 'light':
        return 'dark-content';
      default:
        return 'light-content';
    }
  };

  return (
    <SafeAreaView style={[styles.container, getBackgroundStyle()]}>
      <StatusBar 
        barStyle={getStatusBarStyle()} 
        backgroundColor="transparent" 
        translucent 
      />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, getTextStyle()]}>
            🧮 Kalkulator Modern
          </Text>
          <Text style={[styles.subtitle, getTextStyle()]}>
            Project Mata Kuliah Bergerak
          </Text>
        </View>

        {/* Theme Selector */}
        <ThemeSelector
          currentTheme={state.theme}
          onThemeChange={setTheme}
          theme={state.theme}
        />

        {/* Calculator Container */}
        <View style={[styles.calculatorContainer, getBackgroundStyle()]}>
          {/* Display */}
          <Display state={state} theme={state.theme} />

          {/* Button Grid */}
          <ButtonGrid
            onButtonPress={handleButtonPress}
            theme={state.theme}
          />
        </View>

        {/* History Section */}
        {state.history.length > 0 && (
          <View style={styles.historySection}>
            <View style={styles.historyHeader}>
              <Text style={[styles.historyTitle, getTextStyle()]}>
                📊 Riwayat Perhitungan
              </Text>
              <TouchableOpacity
                style={[styles.clearButton, getBackgroundStyle()]}
                onPress={handleClearHistory}
              >
                <Text style={[styles.clearButtonText, getTextStyle()]}>
                  Hapus
                </Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              style={styles.historyList}
              showsVerticalScrollIndicator={false}
            >
              {state.history.slice(0, 5).map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.historyItem, getBackgroundStyle()]}
                  onPress={() => inputNumber(item.result)}
                >
                  <Text style={[styles.historyExpression, getTextStyle()]}>
                    {item.expression}
                  </Text>
                  <Text style={[styles.historyResult, getTextStyle()]}>
                    = {item.result}
                  </Text>
                  <Text style={[styles.historyTime, getTextStyle()]}>
                    {item.timestamp.toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, getTextStyle()]}>
            Dibuat dengan React Native + TypeScript
          </Text>
          <Text style={[styles.footerSubtext, getTextStyle()]}>
            Versi 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  calculatorContainer: {
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  historySection: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  historyList: {
    maxHeight: 200,
  },
  historyItem: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  historyExpression: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 4,
  },
  historyResult: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  historyTime: {
    fontSize: 12,
    opacity: 0.6,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  footerText: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 10,
    opacity: 0.5,
  },
  
  // Background styles
  darkBackground: {
    backgroundColor: '#0F172A',
  },
  lightBackground: {
    backgroundColor: '#F8FAFC',
  },
  neonBackground: {
    backgroundColor: '#1E1B4B',
  },
  
  // Text styles
  darkText: {
    color: '#FFFFFF',
  },
  lightText: {
    color: '#1F2937',
  },
  neonText: {
    color: '#FFFFFF',
    textShadowColor: '#EC4899',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
});