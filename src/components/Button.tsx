import React from 'react';
import { motion } from 'framer-motion';
import { ButtonConfig } from '../types/calculator';

interface ButtonProps extends ButtonConfig {
  onClick: () => void;
  isActive?: boolean;
  isAnimating?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  type,
  value,
  label,
  className = '',
  icon,
  onClick,
  isActive = false,
  isAnimating = false,
  disabled = false
}) => {
  const getButtonClass = () => {
    const baseClass = 'relative overflow-hidden rounded-xl font-semibold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed';
    
    switch (type) {
      case 'number':
        return `${baseClass} button-number ${className}`;
      case 'operator':
        return `${baseClass} button-operator ${className}`;
      case 'function':
        return `${baseClass} button-secondary ${className}`;
      case 'special':
        return `${baseClass} button-primary ${className}`;
      default:
        return `${baseClass} button-secondary ${className}`;
    }
  };

  const getIcon = () => {
    if (!icon) return null;
    
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
    
    return iconMap[icon] || icon;
  };

  return (
    <motion.button
      className={getButtonClass()}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ 
        scale: disabled ? 1 : 1.05,
        y: disabled ? 0 : -2
      }}
      whileTap={{ 
        scale: disabled ? 1 : 0.95,
        y: disabled ? 0 : 0
      }}
      animate={{
        boxShadow: isActive 
          ? '0 0 20px rgba(59, 130, 246, 0.6)' 
          : '0 4px 15px rgba(0, 0, 0, 0.2)',
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl" />
      
      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Active state glow */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{
            boxShadow: [
              '0 0 0px rgba(59, 130, 246, 0.4)',
              '0 0 20px rgba(59, 130, 246, 0.6)',
              '0 0 0px rgba(59, 130, 246, 0.4)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Button content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        {icon ? (
          <span className="text-xl font-bold">{getIcon()}</span>
        ) : (
          <span className="text-lg font-semibold">{label}</span>
        )}
      </div>
      
      {/* Ripple effect */}
      {isAnimating && (
        <motion.div
          className="absolute inset-0 bg-white/30 rounded-xl"
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </motion.button>
  );
};
