import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from './Button';
import { ButtonConfig } from '../types/calculator';

interface ButtonGridProps {
  onButtonPress: (config: ButtonConfig) => void;
  theme: 'light' | 'dark' | 'neon';
}

const buttonConfigs: ButtonConfig[] = [
  // Row 1 - Functions
  { type: 'function', value: 'C', label: 'Clear', icon: 'clear' },
  { type: 'function', value: 'CE', label: 'Clear Entry', icon: 'clear-entry' },
  { type: 'function', value: '⌫', label: 'Backspace', icon: 'backspace' },
  { type: 'operator', value: '/', label: '÷', icon: 'divide' },
  
  // Row 2 - Functions
  { type: 'function', value: '√', label: '√', icon: 'sqrt' },
  { type: 'function', value: 'x²', label: 'x²', icon: 'square' },
  { type: 'function', value: '1/x', label: '1/x', icon: 'reciprocal' },
  { type: 'operator', value: '*', label: '×', icon: 'multiply' },
  
  // Row 3 - Numbers and operations
  { type: 'number', value: '7', label: '7' },
  { type: 'number', value: '8', label: '8' },
  { type: 'number', value: '9', label: '9' },
  { type: 'operator', value: '-', label: '−', icon: 'minus' },
  
  // Row 4 - Numbers and operations
  { type: 'number', value: '4', label: '4' },
  { type: 'number', value: '5', label: '5' },
  { type: 'number', value: '6', label: '6' },
  { type: 'operator', value: '+', label: '+', icon: 'plus' },
  
  // Row 5 - Numbers and operations
  { type: 'number', value: '1', label: '1' },
  { type: 'number', value: '2', label: '2' },
  { type: 'number', value: '3', label: '3' },
  { type: 'special', value: '=', label: '=', icon: 'equals', flex: 1 },
  
  // Row 6 - Bottom row
  { type: 'number', value: '0', label: '0', flex: 2 },
  { type: 'number', value: '.', label: '.', icon: 'decimal' },
  
  // Additional function row
  { type: 'function', value: '±', label: '±', icon: 'plus-minus' },
  { type: 'function', value: '%', label: '%', icon: 'percent' },
  { type: 'function', value: 'π', label: 'π', icon: 'pi' },
  { type: 'function', value: 'e', label: 'e', icon: 'e' },
];

export const ButtonGrid: React.FC<ButtonGridProps> = ({ onButtonPress, theme }) => {
  const renderRow = (startIndex: number, endIndex: number) => {
    return (
      <View style={styles.row}>
        {buttonConfigs.slice(startIndex, endIndex).map((config, index) => (
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

  return (
    <View style={styles.container}>
      {/* Function buttons row 1 */}
      {renderRow(0, 4)}
      
      {/* Function buttons row 2 */}
      {renderRow(4, 8)}
      
      {/* Numbers row 1 */}
      {renderRow(8, 12)}
      
      {/* Numbers row 2 */}
      {renderRow(12, 16)}
      
      {/* Numbers row 3 */}
      {renderRow(16, 20)}
      
      {/* Bottom row */}
      {renderRow(20, 24)}
      
      {/* Additional functions row */}
      {renderRow(24, 28)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
});
