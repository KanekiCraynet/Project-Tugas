import React from 'react';
import { motion } from 'framer-motion';
import { CalculatorState } from '../types/calculator';

interface DisplayProps {
  state: CalculatorState;
  isAnimating: boolean;
}

export const Display: React.FC<DisplayProps> = ({ state, isAnimating }) => {
  const formatDisplayValue = (value: string) => {
    if (value === 'Error') return value;
    
    // Add thousand separators for large numbers
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

  const getDisplayLength = () => {
    return getDisplayText().length;
  };

  const getFontSize = () => {
    const length = getDisplayLength();
    if (length <= 8) return 'text-5xl';
    if (length <= 12) return 'text-4xl';
    if (length <= 16) return 'text-3xl';
    if (length <= 20) return 'text-2xl';
    return 'text-xl';
  };

  return (
    <motion.div
      className="display-screen relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl" />
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Main display content */}
      <div className="relative z-10 flex flex-col justify-end h-full">
        {/* Previous operation display */}
        {state.previousValue !== null && state.operation && (
          <motion.div
            className="text-sm text-gray-400 mb-2 opacity-70"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.7, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {state.previousValue} {state.operation}
          </motion.div>
        )}

        {/* Main display */}
        <motion.div
          className={`font-mono font-bold text-right text-shadow ${
            state.isError ? 'text-red-400' : 'text-white'
          } ${getFontSize()} transition-all duration-300`}
          key={state.display}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ 
            scale: isAnimating ? 1.05 : 1, 
            opacity: 1 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            duration: 0.2 
          }}
        >
          {getDisplayText()}
        </motion.div>

        {/* Status indicators */}
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            {state.waitingForOperand && (
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
            <span>{state.waitingForOperand ? 'Waiting' : 'Ready'}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-blue-400 rounded-full" />
            <span>Calculator v1.0</span>
          </div>
        </div>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0"
        animate={{
          opacity: isAnimating ? 0.3 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))',
          filter: 'blur(10px)',
        }}
      />
    </motion.div>
  );
};
