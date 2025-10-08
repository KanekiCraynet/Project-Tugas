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
        <Text style={[styles.subText, themeStyles.subText]}>
          {state.previousValue} {state.operation}
        </Text>
      )}

      {/* Main display */}
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

      {/* Status indicators */}
      <View style={styles.statusContainer}>
        <View style={styles.statusItem}>
          {state.waitingForOperand && (
            <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
          )}
          <Text style={[styles.statusText, themeStyles.statusText]}>
            {state.waitingForOperand ? 'Waiting' : 'Ready'}
          </Text>
        </View>
        
        <View style={styles.statusItem}>
          <View style={[styles.statusDot, { backgroundColor: '#3B82F6' }]} />
          <Text style={[styles.statusText, themeStyles.statusText]}>
            v1.0
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderRadius: 20,
    margin: 16,
    minHeight: 140,
    justifyContent: 'flex-end',
  },
  darkContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  lightContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  neonContainer: {
    backgroundColor: 'rgba(147, 51, 234, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.5)',
  },
  subText: {
    fontSize: 16,
    marginBottom: 8,
    opacity: 0.7,
  },
  darkSubText: {
    color: '#9CA3AF',
  },
  lightSubText: {
    color: '#6B7280',
  },
  neonSubText: {
    color: '#FBBF24',
  },
  mainText: {
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 8,
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
