export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: string | null;
  waitingForOperand: boolean;
  history: CalculationHistory[];
  isError: boolean;
  theme: 'light' | 'dark' | 'neon';
}

export interface CalculationHistory {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
}

export interface ButtonConfig {
  type: 'number' | 'operator' | 'function' | 'special';
  value: string;
  label: string;
  icon?: string;
  flex?: number;
}

export type Operation = '+' | '-' | '*' | '/' | '=' | 'C' | 'CE' | '±' | '%' | '√' | 'x²' | '1/x' | 'π' | 'e';
