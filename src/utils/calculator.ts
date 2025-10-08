import { Operation, CalculationHistory } from '../types/calculator';

export class CalculatorEngine {
  private static instance: CalculatorEngine;
  
  private constructor() {}
  
  public static getInstance(): CalculatorEngine {
    if (!CalculatorEngine.instance) {
      CalculatorEngine.instance = new CalculatorEngine();
    }
    return CalculatorEngine.instance;
  }

  public calculate(operation: Operation, currentValue: number, previousValue: number | null): number {
    if (previousValue === null) return currentValue;

    switch (operation) {
      case '+':
        return previousValue + currentValue;
      case '-':
        return previousValue - currentValue;
      case '*':
        return previousValue * currentValue;
      case '/':
        if (currentValue === 0) {
          throw new Error('Division by zero');
        }
        return previousValue / currentValue;
      case '%':
        return previousValue % currentValue;
      default:
        return currentValue;
    }
  }

  public performFunction(func: string, value: number): number {
    switch (func) {
      case '√':
        if (value < 0) throw new Error('Square root of negative number');
        return Math.sqrt(value);
      case 'x²':
        return Math.pow(value, 2);
      case '1/x':
        if (value === 0) throw new Error('Division by zero');
        return 1 / value;
      case 'sin':
        return Math.sin(value);
      case 'cos':
        return Math.cos(value);
      case 'tan':
        return Math.tan(value);
      case 'log':
        if (value <= 0) throw new Error('Logarithm of non-positive number');
        return Math.log10(value);
      case 'ln':
        if (value <= 0) throw new Error('Natural logarithm of non-positive number');
        return Math.log(value);
      case 'abs':
        return Math.abs(value);
      case 'floor':
        return Math.floor(value);
      case 'ceil':
        return Math.ceil(value);
      case 'round':
        return Math.round(value);
      default:
        return value;
    }
  }

  public formatNumber(num: number, precision: number = 10): string {
    if (isNaN(num) || !isFinite(num)) {
      return 'Error';
    }

    // Handle very large or very small numbers
    if (Math.abs(num) >= 1e15 || (Math.abs(num) < 1e-10 && num !== 0)) {
      return num.toExponential(precision);
    }

    // Format with appropriate decimal places
    const formatted = num.toFixed(precision);
    
    // Remove trailing zeros
    return formatted.replace(/\.?0+$/, '');
  }

  public createHistoryEntry(expression: string, result: string): CalculationHistory {
    return {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      expression,
      result,
      timestamp: new Date()
    };
  }

  public getConstants(): Record<string, number> {
    return {
      'π': Math.PI,
      'e': Math.E,
      'φ': (1 + Math.sqrt(5)) / 2, // Golden ratio
      '√2': Math.sqrt(2),
      '√3': Math.sqrt(3)
    };
  }
}
