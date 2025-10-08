import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalculator } from './hooks/useCalculator';
import { Display } from './components/Display';
import { ButtonGrid } from './components/ButtonGrid';
import { HistoryPanel } from './components/HistoryPanel';
import { ThemeSelector } from './components/ThemeSelector';
import { ButtonConfig } from './types/calculator';
import { History, Settings, Calculator } from 'lucide-react';

function App() {
  const {
    state,
    isAnimating,
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
    setTheme
  } = useCalculator();

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleButtonClick = useCallback((config: ButtonConfig) => {
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

  const handleHistorySelect = useCallback((expression: string) => {
    // Extract the result from the expression
    const result = expression.split(' = ')[1];
    if (result) {
      // Set the display to the result
      inputNumber(result);
    }
    setIsHistoryOpen(false);
  }, [inputNumber]);

  const getThemeClasses = () => {
    switch (state.theme) {
      case 'light':
        return 'bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50 text-gray-900';
      case 'neon':
        return 'bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 text-white';
      default:
        return 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white';
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${getThemeClasses()}`}>
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Header */}
        <motion.div
          className="w-full max-w-md mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Calculator className="w-6 h-6 text-blue-400" />
              <h1 className="text-xl font-bold text-shadow">
                Kalkulator Modern
              </h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <ThemeSelector
                currentTheme={state.theme}
                onThemeChange={setTheme}
              />
              
              <motion.button
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                onClick={() => setIsHistoryOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Riwayat Perhitungan"
              >
                <History className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                onClick={() => setShowSettings(!showSettings)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Pengaturan"
              >
                <Settings className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Calculator Container */}
        <motion.div
          className="w-full max-w-md glass-effect rounded-3xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Display */}
          <div className="p-6">
            <Display state={state} isAnimating={isAnimating} />
          </div>

          {/* Button Grid */}
          <ButtonGrid
            onButtonClick={handleButtonClick}
            isAnimating={isAnimating}
          />
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-gray-400">
            Project Mata Kuliah Bergerak
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Dibuat dengan React + TypeScript + Tailwind CSS
          </p>
        </motion.div>
      </div>

      {/* History Panel */}
      <HistoryPanel
        history={state.history}
        onClearHistory={clearHistory}
        onSelectHistory={handleHistorySelect}
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              className="glass-effect rounded-2xl p-6 max-w-sm w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">Pengaturan</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tema
                  </label>
                  <ThemeSelector
                    currentTheme={state.theme}
                    onThemeChange={setTheme}
                  />
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <button
                    className="w-full button-primary"
                    onClick={() => {
                      clearHistory();
                      setShowSettings(false);
                    }}
                  >
                    Hapus Riwayat
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
