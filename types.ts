/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export type EngineState = 'idle' | 'processing' | 'complete';

export interface EngineLog {
  id: string;
  message: string;
  type: 'info' | 'success' | 'process';
}

export interface StrategyDetails {
  id: string;
  title: string;
  description: string;
  color: string; // Tailwind color class base (e.g. 'emerald', 'blue')
  riskLevel: 'Low' | 'Medium' | 'High';
  successRate: number;
  monthlyIncome: string;
  endAge: number;
  assets: { name: string; value: number; color: string }[];
  projection: { year: string; value: number; baseline: number }[];
}
