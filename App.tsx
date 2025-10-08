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
    setTheme,
    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract,
    memoryStore,
    power,
    nthRoot
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

  const getGradientStyle = () => {
    switch (state.theme) {
      case 'light':
        return styles.lightGradient;
      case 'neon':
        return styles.neonGradient;
      default:
        return styles.darkGradient;
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
        <View style={[styles.header, getGradientStyle()]}>
          <View style={styles.headerContent}>
            <View style={styles.titleContainer}>
              <Text style={[styles.title, getTextStyle()]}>
                Kalkulator Pro
              </Text>
              <Text style={[styles.subtitle, getTextStyle()]}>
                Scientific Calculator
              </Text>
            </View>
            <View style={styles.statusIndicator}>
              <View style={[styles.statusDot, { backgroundColor: state.isError ? '#EF4444' : '#10B981' }]} />
              <Text style={[styles.statusText, getTextStyle()]}>
                {state.isError ? 'Error' : 'Ready'}
              </Text>
            </View>
          </View>
        </View>

        {/* Theme Selector */}
        <ThemeSelector
          currentTheme={state.theme}
          onThemeChange={setTheme}
          theme={state.theme}
        />

        {/* Calculator Container */}
        <View style={[styles.calculatorContainer, getGradientStyle()]}>
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
        <View style={[styles.footer, getGradientStyle()]}>
          <Text style={[styles.footerText, getTextStyle()]}>
            Professional Calculator v2.0
          </Text>
          <Text style={[styles.footerSubtext, getTextStyle()]}>
            Advanced Scientific Computing
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
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginHorizontal: 16,
    marginTop: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
    fontWeight: '500',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  calculatorContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
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
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  footerText: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 4,
    fontWeight: '600',
  },
  footerSubtext: {
    fontSize: 12,
    opacity: 0.6,
    fontWeight: '500',
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
  
  // Gradient styles
  darkGradient: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.1)',
  },
  lightGradient: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  neonGradient: {
    backgroundColor: '#312E81',
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.3)',
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