import { Operation, CalculationHistory } from '../types/calculator';

interface MemoryState {
  value: number;
  isSet: boolean;
}

interface ExpressionState {
  tokens: string[];
  currentNumber: string;
  lastOperation: string | null;
}

export class CalculatorEngine {
  private static instance: CalculatorEngine;
  private memory: MemoryState = { value: 0, isSet: false };
  private expression: ExpressionState = { tokens: [], currentNumber: '', lastOperation: null };
  private precision: number = 15;
  
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
    try {
      switch (func) {
        case '√':
          if (value < 0) throw new Error('Square root of negative number');
          return this.roundToPrecision(Math.sqrt(value));
        case 'x²':
          return this.roundToPrecision(Math.pow(value, 2));
        case '1/x':
          if (value === 0) throw new Error('Division by zero');
          return this.roundToPrecision(1 / value);
        case 'sin':
          return this.roundToPrecision(Math.sin(this.toRadians(value)));
        case 'cos':
          return this.roundToPrecision(Math.cos(this.toRadians(value)));
        case 'tan':
          return this.roundToPrecision(Math.tan(this.toRadians(value)));
        case 'log':
          if (value <= 0) throw new Error('Logarithm of non-positive number');
          return this.roundToPrecision(Math.log10(value));
        case 'ln':
          if (value <= 0) throw new Error('Natural logarithm of non-positive number');
          return this.roundToPrecision(Math.log(value));
        case 'abs':
          return this.roundToPrecision(Math.abs(value));
        case 'floor':
          return Math.floor(value);
        case 'ceil':
          return Math.ceil(value);
        case 'round':
          return Math.round(value);
        case 'exp':
          return this.roundToPrecision(Math.exp(value));
        case 'factorial':
          return this.factorial(Math.floor(Math.abs(value)));
        default:
          return value;
      }
    } catch (error) {
      throw new Error(`Function error: ${error.message}`);
    }
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  private roundToPrecision(value: number): number {
    return Math.round(value * Math.pow(10, this.precision)) / Math.pow(10, this.precision);
  }

  private factorial(n: number): number {
    if (n < 0) throw new Error('Factorial of negative number');
    if (n > 170) throw new Error('Factorial too large');
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
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
      '√3': Math.sqrt(3),
      '√5': Math.sqrt(5),
      'ln2': Math.LN2,
      'ln10': Math.LN10,
      'log2e': Math.LOG2E,
      'log10e': Math.LOG10E
    };
  }

  // Memory functions
  public memoryClear(): void {
    this.memory = { value: 0, isSet: false };
  }

  public memoryRecall(): number {
    return this.memory.value;
  }

  public memoryAdd(value: number): void {
    this.memory.value += value;
    this.memory.isSet = true;
  }

  public memorySubtract(value: number): void {
    this.memory.value -= value;
    this.memory.isSet = true;
  }

  public memoryStore(value: number): void {
    this.memory.value = value;
    this.memory.isSet = true;
  }

  public isMemorySet(): boolean {
    return this.memory.isSet;
  }

  // Expression evaluation
  public evaluateExpression(expression: string): number {
    try {
      // Simple expression parser for basic operations
      const tokens = this.tokenizeExpression(expression);
      return this.evaluateTokens(tokens);
    } catch (error) {
      throw new Error(`Expression error: ${error.message}`);
    }
  }

  private tokenizeExpression(expression: string): string[] {
    const tokens: string[] = [];
    let currentToken = '';
    
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
      
      if (this.isOperator(char) || char === '(' || char === ')') {
        if (currentToken) {
          tokens.push(currentToken);
          currentToken = '';
        }
        tokens.push(char);
      } else if (char !== ' ') {
        currentToken += char;
      }
    }
    
    if (currentToken) {
      tokens.push(currentToken);
    }
    
    return tokens;
  }

  private isOperator(char: string): boolean {
    return ['+', '-', '*', '/', '^'].includes(char);
  }

  private evaluateTokens(tokens: string[]): number {
    // Simple evaluation - in a real implementation, you'd use proper parsing
    // This is a simplified version for demonstration
    let result = 0;
    let currentOperator = '+';
    
    for (const token of tokens) {
      if (this.isOperator(token)) {
        currentOperator = token;
      } else if (!isNaN(Number(token))) {
        const num = Number(token);
        switch (currentOperator) {
          case '+':
            result += num;
            break;
          case '-':
            result -= num;
            break;
          case '*':
            result *= num;
            break;
          case '/':
            if (num === 0) throw new Error('Division by zero');
            result /= num;
            break;
          case '^':
            result = Math.pow(result, num);
            break;
        }
      }
    }
    
    return this.roundToPrecision(result);
  }

  // Advanced mathematical operations
  public power(base: number, exponent: number): number {
    return this.roundToPrecision(Math.pow(base, exponent));
  }

  public nthRoot(value: number, n: number): number {
    if (n === 0) throw new Error('Cannot calculate 0th root');
    if (value < 0 && n % 2 === 0) throw new Error('Even root of negative number');
    return this.roundToPrecision(Math.pow(value, 1 / n));
  }

  public percentage(value: number, percent: number): number {
    return this.roundToPrecision((value * percent) / 100);
  }

  public modulo(dividend: number, divisor: number): number {
    if (divisor === 0) throw new Error('Modulo by zero');
    return dividend % divisor;
  }
}
