import { useState, useCallback, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CalculatorState, Operation, CalculationHistory } from '../types/calculator';
import { CalculatorEngine } from '../utils/calculator';

const initialState: CalculatorState = {
  display: '0',
  previousValue: null,
  operation: null,
  waitingForOperand: false,
  history: [],
  isError: false,
  theme: 'dark'
};

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>(initialState);
  const calculator = useRef(CalculatorEngine.getInstance());

  // Load data from AsyncStorage on mount
  useEffect(() => {
    loadData();
  }, []);

  // Save data to AsyncStorage whenever state changes
  useEffect(() => {
    saveData();
  }, [state.history, state.theme]);

  const loadData = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem('calculator-history');
      const savedTheme = await AsyncStorage.getItem('calculator-theme');
      
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        setState(prev => ({
          ...prev,
          history: parsed.map((item: any) => ({
            ...item,
            timestamp: new Date(item.timestamp)
          }))
        }));
      }
      
      if (savedTheme) {
        setState(prev => ({ ...prev, theme: savedTheme as 'light' | 'dark' | 'neon' }));
      }
    } catch (error) {
      console.error('Error loading calculator data:', error);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('calculator-history', JSON.stringify(state.history));
      await AsyncStorage.setItem('calculator-theme', state.theme);
    } catch (error) {
      console.error('Error saving calculator data:', error);
    }
  };

  const addToHistory = useCallback((expression: string, result: string) => {
    const historyEntry = calculator.current.createHistoryEntry(expression, result);
    setState(prev => ({
      ...prev,
      history: [historyEntry, ...prev.history.slice(0, 49)] // Keep last 50 entries
    }));
  }, []);

  const clearHistory = useCallback(() => {
    setState(prev => ({ ...prev, history: [] }));
    AsyncStorage.removeItem('calculator-history');
  }, []);

  const inputNumber = useCallback((num: string) => {
    setState(prev => {
      if (prev.isError) {
        return {
          ...prev,
          display: num,
          isError: false
        };
      }

      if (prev.waitingForOperand) {
        return {
          ...prev,
          display: num,
          waitingForOperand: false
        };
      }

      const newDisplay = prev.display === '0' ? num : prev.display + num;
      return {
        ...prev,
        display: newDisplay
      };
    });
  }, []);

  const inputDecimal = useCallback(() => {
    setState(prev => {
      if (prev.isError) {
        return {
          ...prev,
          display: '0.',
          isError: false
        };
      }

      if (prev.waitingForOperand) {
        return {
          ...prev,
          display: '0.',
          waitingForOperand: false
        };
      }

      if (prev.display.indexOf('.') === -1) {
        return {
          ...prev,
          display: prev.display + '.'
        };
      }

      return prev;
    });
  }, []);

  const performOperation = useCallback((nextOperation: Operation) => {
    setState(prev => {
      const inputValue = parseFloat(prev.display);

      if (prev.previousValue === null) {
        return {
          ...prev,
          previousValue: inputValue,
          operation: nextOperation,
          waitingForOperand: true
        };
      }

      if (prev.operation && !prev.waitingForOperand) {
        try {
          const currentValue = prev.previousValue || 0;
          const result = calculator.current.calculate(prev.operation, inputValue, currentValue);
          const formattedResult = calculator.current.formatNumber(result);

          // Add to history if it's a calculation
          if (prev.operation !== '=') {
            addToHistory(
              `${calculator.current.formatNumber(currentValue)} ${prev.operation} ${calculator.current.formatNumber(inputValue)}`,
              formattedResult
            );
          }

          return {
            ...prev,
            display: formattedResult,
            previousValue: result,
            operation: nextOperation,
            waitingForOperand: true,
            isError: false
          };
        } catch (error) {
          return {
            ...prev,
            display: 'Error',
            isError: true,
            previousValue: null,
            operation: null,
            waitingForOperand: false
          };
        }
      }

      return {
        ...prev,
        operation: nextOperation,
        waitingForOperand: true
      };
    });
  }, [addToHistory]);

  const performFunction = useCallback((func: string) => {
    setState(prev => {
      const inputValue = parseFloat(prev.display);

      try {
        const result = calculator.current.performFunction(func, inputValue);
        const formattedResult = calculator.current.formatNumber(result);

        addToHistory(`${func}(${calculator.current.formatNumber(inputValue)})`, formattedResult);

        return {
          ...prev,
          display: formattedResult,
          waitingForOperand: true,
          isError: false
        };
      } catch (error) {
        return {
          ...prev,
          display: 'Error',
          isError: true
        };
      }
    });
  }, [addToHistory]);

  const clear = useCallback(() => {
    setState(initialState);
  }, []);

  const clearEntry = useCallback(() => {
    setState(prev => ({
      ...prev,
      display: '0',
      isError: false
    }));
  }, []);

  const toggleSign = useCallback(() => {
    setState(prev => {
      if (prev.isError) return prev;

      const value = parseFloat(prev.display);
      if (value !== 0) {
        return {
          ...prev,
          display: calculator.current.formatNumber(-value)
        };
      }
      return prev;
    });
  }, []);

  const percentage = useCallback(() => {
    setState(prev => {
      if (prev.isError) return prev;

      const value = parseFloat(prev.display);
      const result = value / 100;
      return {
        ...prev,
        display: calculator.current.formatNumber(result),
        waitingForOperand: true
      };
    });
  }, []);

  const insertConstant = useCallback((constant: string) => {
    const constants = calculator.current.getConstants();
    const value = constants[constant];
    
    if (value !== undefined) {
      setState(prev => ({
        ...prev,
        display: calculator.current.formatNumber(value),
        waitingForOperand: true,
        isError: false
      }));
    }
  }, []);

  const deleteLastChar = useCallback(() => {
    setState(prev => {
      if (prev.isError) return prev;

      if (prev.display.length > 1) {
        return {
          ...prev,
          display: prev.display.slice(0, -1)
        };
      } else {
        return {
          ...prev,
          display: '0'
        };
      }
    });
  }, []);

  const setTheme = useCallback((theme: 'light' | 'dark' | 'neon') => {
    setState(prev => ({ ...prev, theme }));
  }, []);

  return {
    state,
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
  };
};
