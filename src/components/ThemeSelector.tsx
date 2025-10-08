import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ThemeSelectorProps {
  currentTheme: 'light' | 'dark' | 'neon';
  onThemeChange: (theme: 'light' | 'dark' | 'neon') => void;
  theme: 'light' | 'dark' | 'neon';
}

const themes = [
  {
    id: 'dark' as const,
    name: 'Dark',
    emoji: '🌙',
    description: 'Professional dark theme'
  },
  {
    id: 'light' as const,
    name: 'Light',
    emoji: '☀️',
    description: 'Clean light theme'
  },
  {
    id: 'neon' as const,
    name: 'Neon',
    emoji: '⚡',
    description: 'Futuristic neon theme'
  }
];

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
  theme
}) => {
  const getThemeStyles = () => {
    switch (theme) {
      case 'light':
        return {
          container: styles.lightContainer,
          button: styles.lightButton,
          activeButton: styles.lightActiveButton,
          text: styles.lightText,
          activeText: styles.lightActiveText,
        };
      case 'neon':
        return {
          container: styles.neonContainer,
          button: styles.neonButton,
          activeButton: styles.neonActiveButton,
          text: styles.neonText,
          activeText: styles.neonActiveText,
        };
      default:
        return {
          container: styles.darkContainer,
          button: styles.darkButton,
          activeButton: styles.darkActiveButton,
          text: styles.darkText,
          activeText: styles.darkActiveText,
        };
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <View style={[styles.container, themeStyles.container]}>
      {themes.map((themeOption) => {
        const isActive = currentTheme === themeOption.id;
        
        return (
          <TouchableOpacity
            key={themeOption.id}
            style={[
              styles.button,
              themeStyles.button,
              isActive && themeStyles.activeButton
            ]}
            onPress={() => onThemeChange(themeOption.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.emoji}>{themeOption.emoji}</Text>
            <Text style={[
              styles.text,
              themeStyles.text,
              isActive && themeStyles.activeText
            ]}>
              {themeOption.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  emoji: {
    fontSize: 16,
    marginRight: 6,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
  
  // Dark theme styles
  darkContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  darkButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  darkActiveButton: {
    backgroundColor: 'rgba(59, 130, 246, 0.3)',
    borderColor: '#3B82F6',
  },
  darkText: {
    color: '#9CA3AF',
  },
  darkActiveText: {
    color: '#FFFFFF',
  },
  
  // Light theme styles
  lightContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  lightButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  lightActiveButton: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderColor: '#3B82F6',
  },
  lightText: {
    color: '#6B7280',
  },
  lightActiveText: {
    color: '#1F2937',
  },
  
  // Neon theme styles
  neonContainer: {
    backgroundColor: 'rgba(147, 51, 234, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.5)',
  },
  neonButton: {
    backgroundColor: 'rgba(236, 72, 153, 0.2)',
    borderColor: 'rgba(236, 72, 153, 0.4)',
  },
  neonActiveButton: {
    backgroundColor: 'rgba(16, 185, 129, 0.4)',
    borderColor: '#10B981',
  },
  neonText: {
    color: '#FBBF24',
  },
  neonActiveText: {
    color: '#FFFFFF',
    textShadowColor: '#10B981',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
});
