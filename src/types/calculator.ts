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
  className?: string;
  icon?: string;
}

export interface CalculatorTheme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export type Operation = '+' | '-' | '*' | '/' | '=' | 'C' | 'CE' | '±' | '%' | '√' | 'x²' | '1/x' | 'π' | 'e';

export interface CalculatorSettings {
  precision: number;
  showHistory: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  autoSave: boolean;
}
