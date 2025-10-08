import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { ButtonConfig } from '../types/calculator';

interface ButtonGridProps {
  onButtonClick: (config: ButtonConfig) => void;
  isAnimating: boolean;
}

const buttonConfigs: ButtonConfig[] = [
  // Row 1 - Functions
  { type: 'function', value: 'C', label: 'Clear', icon: 'clear' },
  { type: 'function', value: 'CE', label: 'Clear Entry', icon: 'clear-entry' },
  { type: 'function', value: '⌫', label: 'Backspace', icon: 'backspace' },
  { type: 'operator', value: '/', label: '÷', icon: 'divide' },
  
  // Row 2 - Numbers and operations
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
  { type: 'special', value: '=', label: '=', icon: 'equals', className: 'row-span-2' },
  
  // Row 6 - Bottom row
  { type: 'number', value: '0', label: '0', className: 'col-span-2' },
  { type: 'number', value: '.', label: '.', icon: 'decimal' },
  
  // Additional function row
  { type: 'function', value: '±', label: '±', icon: 'plus-minus' },
  { type: 'function', value: '%', label: '%', icon: 'percent' },
  { type: 'function', value: 'π', label: 'π', icon: 'pi' },
  { type: 'function', value: 'e', label: 'e', icon: 'e' },
];

export const ButtonGrid: React.FC<ButtonGridProps> = ({ onButtonClick, isAnimating }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      className="grid grid-cols-4 gap-3 p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {buttonConfigs.map((config, index) => (
        <motion.div
          key={`${config.value}-${index}`}
          variants={buttonVariants}
          className={config.className || ''}
        >
          <Button
            {...config}
            onClick={() => onButtonClick(config)}
            isAnimating={isAnimating}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
