import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { CalculatorState } from '../types/calculator';

interface DisplayProps {
  state: CalculatorState;
  theme: 'light' | 'dark' | 'neon';
}

export const Display: React.FC<DisplayProps> = ({ state, theme }) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [state.display]);

  const formatDisplayValue = (value: string) => {
    if (value === 'Error') return value;
    
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    
    if (Math.abs(num) >= 1000 && !value.includes('e')) {
      return num.toLocaleString('id-ID', {
        maximumFractionDigits: 10,
        minimumFractionDigits: 0
      });
    }
    
    return value;
  };

  const getDisplayText = () => {
    if (state.isError) return 'Error';
    return formatDisplayValue(state.display);
  };

  const getFontSize = () => {
    const length = getDisplayText().length;
    if (length <= 8) return 48;
    if (length <= 12) return 36;
    if (length <= 16) return 28;
    if (length <= 20) return 24;
    return 20;
  };

  const getThemeStyles = () => {
    switch (theme) {
      case 'light':
        return {
          container: styles.lightContainer,
          text: styles.lightText,
          subText: styles.lightSubText,
          statusText: styles.lightStatusText,
        };
      case 'neon':
        return {
          container: styles.neonContainer,
          text: styles.neonText,
          subText: styles.neonSubText,
          statusText: styles.neonStatusText,
        };
      default:
        return {
          container: styles.darkContainer,
          text: styles.darkText,
          subText: styles.darkSubText,
          statusText: styles.darkStatusText,
        };
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <View style={[styles.container, themeStyles.container]}>
      {/* Previous operation display */}
      {state.previousValue !== null && state.operation && (
        <View style={styles.operationContainer}>
          <Text style={[styles.subText, themeStyles.subText]}>
            {state.previousValue} {state.operation}
          </Text>
        </View>
      )}

      {/* Main display */}
      <View style={styles.displayContainer}>
        <Animated.Text
          style={[
            styles.mainText,
            themeStyles.text,
            { fontSize: getFontSize() },
            { transform: [{ scale: scaleAnim }] }
          ]}
        >
          {getDisplayText()}
        </Animated.Text>
      </View>

      {/* Status indicators */}
      <View style={styles.statusContainer}>
        <View style={styles.statusItem}>
          <View style={[styles.statusDot, { 
            backgroundColor: state.waitingForOperand ? '#F59E0B' : '#10B981' 
          }]} />
          <Text style={[styles.statusText, themeStyles.statusText]}>
            {state.waitingForOperand ? 'Input' : 'Ready'}
          </Text>
        </View>
        
        <View style={styles.statusItem}>
          <View style={[styles.statusDot, { backgroundColor: '#3B82F6' }]} />
          <Text style={[styles.statusText, themeStyles.statusText]}>
            v2.0
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 28,
    borderRadius: 24,
    margin: 20,
    minHeight: 160,
    justifyContent: 'space-between',
  },
  darkContainer: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  lightContainer: {
    backgroundColor: 'rgba(248, 250, 252, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.3)',
  },
  neonContainer: {
    backgroundColor: 'rgba(49, 46, 129, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.4)',
  },
  operationContainer: {
    marginBottom: 8,
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  subText: {
    fontSize: 18,
    opacity: 0.8,
    fontWeight: '500',
  },
  darkSubText: {
    color: '#94A3B8',
  },
  lightSubText: {
    color: '#64748B',
  },
  neonSubText: {
    color: '#FBBF24',
  },
  mainText: {
    fontWeight: '700',
    textAlign: 'right',
    letterSpacing: 1,
  },
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
    textShadowRadius: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
  },
  darkStatusText: {
    color: '#6B7280',
  },
  lightStatusText: {
    color: '#9CA3AF',
  },
  neonStatusText: {
    color: '#FBBF24',
  },
});
