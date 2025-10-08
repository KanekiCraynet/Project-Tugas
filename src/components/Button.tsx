import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { ButtonConfig } from '../types/calculator';

interface ButtonProps extends ButtonConfig {
  onPress: () => void;
  theme: 'light' | 'dark' | 'neon';
  isActive?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  type,
  value,
  label,
  icon,
  flex = 1,
  onPress,
  theme,
  isActive = false
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const opacityAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const getButtonStyles = () => {
    const baseStyle = [styles.button, { flex }];
    
    switch (type) {
      case 'number':
        return [...baseStyle, getThemeStyles().numberButton];
      case 'operator':
        return [...baseStyle, getThemeStyles().operatorButton];
      case 'function':
        return [...baseStyle, getThemeStyles().functionButton];
      case 'special':
        return [...baseStyle, getThemeStyles().specialButton];
      default:
        return [...baseStyle, getThemeStyles().functionButton];
    }
  };

  const getTextStyles = () => {
    const baseStyle = [styles.buttonText];
    
    switch (type) {
      case 'number':
        return [...baseStyle, getThemeStyles().numberText];
      case 'operator':
        return [...baseStyle, getThemeStyles().operatorText];
      case 'function':
        return [...baseStyle, getThemeStyles().functionText];
      case 'special':
        return [...baseStyle, getThemeStyles().specialText];
      default:
        return [...baseStyle, getThemeStyles().functionText];
    }
  };

  const getThemeStyles = () => {
    switch (theme) {
      case 'light':
        return {
          numberButton: styles.lightNumberButton,
          operatorButton: styles.lightOperatorButton,
          functionButton: styles.lightFunctionButton,
          specialButton: styles.lightSpecialButton,
          numberText: styles.lightNumberText,
          operatorText: styles.lightOperatorText,
          functionText: styles.lightFunctionText,
          specialText: styles.lightSpecialText,
        };
      case 'neon':
        return {
          numberButton: styles.neonNumberButton,
          operatorButton: styles.neonOperatorButton,
          functionButton: styles.neonFunctionButton,
          specialButton: styles.neonSpecialButton,
          numberText: styles.neonNumberText,
          operatorText: styles.neonOperatorText,
          functionText: styles.neonFunctionText,
          specialText: styles.neonSpecialText,
        };
      default:
        return {
          numberButton: styles.darkNumberButton,
          operatorButton: styles.darkOperatorButton,
          functionButton: styles.darkFunctionButton,
          specialButton: styles.darkSpecialButton,
          numberText: styles.darkNumberText,
          operatorText: styles.darkOperatorText,
          functionText: styles.darkFunctionText,
          specialText: styles.darkSpecialText,
        };
    }
  };

  const getIcon = () => {
    if (!icon) return label;
    
    const iconMap: Record<string, string> = {
      'backspace': '⌫',
      'clear': 'C',
      'clear-entry': 'CE',
      'equals': '=',
      'plus': '+',
      'minus': '−',
      'multiply': '×',
      'divide': '÷',
      'percent': '%',
      'sqrt': '√',
      'square': 'x²',
      'reciprocal': '1/x',
      'pi': 'π',
      'e': 'e',
      'plus-minus': '±',
      'decimal': '.',
    };
    
    return iconMap[icon] || label;
  };

  return (
    <Animated.View
      style={[
        { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
        isActive && styles.activeButton
      ]}
    >
      <TouchableOpacity
        style={getButtonStyles()}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <Text style={getTextStyles()}>
          {getIcon()}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 70,
    margin: 4,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
  },
  activeButton: {
    elevation: 8,
    shadowOpacity: 0.4,
  },
  
  // Dark theme styles
  darkNumberButton: {
    backgroundColor: '#374151',
  },
  darkOperatorButton: {
    backgroundColor: '#F59E0B',
  },
  darkFunctionButton: {
    backgroundColor: '#6B7280',
  },
  darkSpecialButton: {
    backgroundColor: '#3B82F6',
  },
  darkNumberText: {
    color: '#FFFFFF',
  },
  darkOperatorText: {
    color: '#FFFFFF',
  },
  darkFunctionText: {
    color: '#FFFFFF',
  },
  darkSpecialText: {
    color: '#FFFFFF',
  },
  
  // Light theme styles
  lightNumberButton: {
    backgroundColor: '#F3F4F6',
  },
  lightOperatorButton: {
    backgroundColor: '#F59E0B',
  },
  lightFunctionButton: {
    backgroundColor: '#E5E7EB',
  },
  lightSpecialButton: {
    backgroundColor: '#3B82F6',
  },
  lightNumberText: {
    color: '#1F2937',
  },
  lightOperatorText: {
    color: '#FFFFFF',
  },
  lightFunctionText: {
    color: '#374151',
  },
  lightSpecialText: {
    color: '#FFFFFF',
  },
  
  // Neon theme styles
  neonNumberButton: {
    backgroundColor: 'rgba(147, 51, 234, 0.8)',
    borderWidth: 1,
    borderColor: '#EC4899',
  },
  neonOperatorButton: {
    backgroundColor: 'rgba(236, 72, 153, 0.8)',
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  neonFunctionButton: {
    backgroundColor: 'rgba(59, 130, 246, 0.8)',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  neonSpecialButton: {
    backgroundColor: 'rgba(16, 185, 129, 0.8)',
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  neonNumberText: {
    color: '#FFFFFF',
    textShadowColor: '#EC4899',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  neonOperatorText: {
    color: '#FFFFFF',
    textShadowColor: '#F59E0B',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  neonFunctionText: {
    color: '#FFFFFF',
    textShadowColor: '#10B981',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  neonSpecialText: {
    color: '#FFFFFF',
    textShadowColor: '#F59E0B',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
});
