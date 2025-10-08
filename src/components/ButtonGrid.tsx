import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button } from './Button';
import { ButtonConfig } from '../types/calculator';

interface ButtonGridProps {
  onButtonPress: (config: ButtonConfig) => void;
  theme: 'light' | 'dark' | 'neon';
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Responsive button configurations based on screen size
const getButtonConfigs = (isCompact: boolean): ButtonConfig[] => {
  const baseConfigs: ButtonConfig[] = [
    // Row 1 - Primary functions
    { type: 'function', value: 'C', label: 'C', icon: 'clear' },
    { type: 'function', value: 'CE', label: 'CE', icon: 'clear-entry' },
    { type: 'function', value: '⌫', label: '⌫', icon: 'backspace' },
  { type: 'operator', value: '/', label: '÷', icon: 'divide' },
  
    // Row 2 - Scientific functions
  { type: 'function', value: '√', label: '√', icon: 'sqrt' },
  { type: 'function', value: 'x²', label: 'x²', icon: 'square' },
  { type: 'function', value: '1/x', label: '1/x', icon: 'reciprocal' },
  { type: 'operator', value: '*', label: '×', icon: 'multiply' },
  
    // Row 3 - Numbers
  { type: 'number', value: '7', label: '7' },
  { type: 'number', value: '8', label: '8' },
  { type: 'number', value: '9', label: '9' },
  { type: 'operator', value: '-', label: '−', icon: 'minus' },
  
    // Row 4 - Numbers
  { type: 'number', value: '4', label: '4' },
  { type: 'number', value: '5', label: '5' },
  { type: 'number', value: '6', label: '6' },
  { type: 'operator', value: '+', label: '+', icon: 'plus' },
  
    // Row 5 - Numbers and equals
  { type: 'number', value: '1', label: '1' },
  { type: 'number', value: '2', label: '2' },
  { type: 'number', value: '3', label: '3' },
  { type: 'special', value: '=', label: '=', icon: 'equals', flex: 1 },
  
  // Row 6 - Bottom row
  { type: 'number', value: '0', label: '0', flex: 2 },
  { type: 'number', value: '.', label: '.', icon: 'decimal' },
    { type: 'function', value: '±', label: '±', icon: 'plus-minus' },
  ];
  
  // Add advanced functions for larger screens
  if (!isCompact) {
    baseConfigs.push(
  { type: 'function', value: '%', label: '%', icon: 'percent' },
  { type: 'function', value: 'π', label: 'π', icon: 'pi' },
  { type: 'function', value: 'e', label: 'e', icon: 'e' },
      { type: 'function', value: 'sin', label: 'sin', icon: 'sin' },
      { type: 'function', value: 'cos', label: 'cos', icon: 'cos' },
      { type: 'function', value: 'tan', label: 'tan', icon: 'tan' },
      { type: 'function', value: 'log', label: 'log', icon: 'log' },
      { type: 'function', value: 'ln', label: 'ln', icon: 'ln' }
    );
  }

  return baseConfigs;
};

export const ButtonGrid: React.FC<ButtonGridProps> = ({ onButtonPress, theme }) => {
  const [isCompact, setIsCompact] = useState(screenWidth < 400 || screenHeight < 700);
  const [buttonConfigs, setButtonConfigs] = useState<ButtonConfig[]>([]);

  useEffect(() => {
    const updateLayout = () => {
      const newIsCompact = screenWidth < 400 || screenHeight < 700;
      setIsCompact(newIsCompact);
      setButtonConfigs(getButtonConfigs(newIsCompact));
    };

    updateLayout();
    
    const subscription = Dimensions.addEventListener('change', updateLayout);
    return () => subscription?.remove();
  }, []);

  const renderRow = (startIndex: number, endIndex: number, isAdvanced = false) => {
    const rowConfigs = buttonConfigs.slice(startIndex, endIndex);
    if (rowConfigs.length === 0) return null;

    return (
      <View style={[styles.row, isAdvanced && styles.advancedRow]}>
        {rowConfigs.map((config, index) => (
          <Button
            key={`${config.value}-${startIndex + index}`}
            {...config}
            onPress={() => onButtonPress(config)}
            theme={theme}
          />
        ))}
      </View>
    );
  };

  const renderBasicGrid = () => (
    <>
      {/* Primary function buttons */}
      {renderRow(0, 4)}
      
      {/* Scientific function buttons */}
      {renderRow(4, 8)}
      
      {/* Number rows */}
      {renderRow(8, 12)}
      {renderRow(12, 16)}
      {renderRow(16, 20)}
      
      {/* Bottom row */}
      {renderRow(20, 23)}
    </>
  );

  const renderAdvancedGrid = () => (
    <>
      {renderBasicGrid()}
      
      {/* Advanced functions row 1 */}
      {renderRow(23, 27, true)}
      
      {/* Advanced functions row 2 */}
      {renderRow(27, 31, true)}
    </>
  );

  if (buttonConfigs.length === 0) {
    return <View style={styles.container} />;
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {isCompact ? renderBasicGrid() : renderAdvancedGrid()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: screenHeight * 0.6,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  advancedRow: {
    marginTop: 4,
    opacity: 0.9,
  },
});
