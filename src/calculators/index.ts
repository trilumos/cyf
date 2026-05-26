import type { CalculatorModule } from '@/types/calculator';
import { emiCalculator } from './loan-emi/emi-calculator';

export const CALCULATORS_REGISTRY: Record<string, CalculatorModule> = {
  'emi-calculator': emiCalculator,
};
