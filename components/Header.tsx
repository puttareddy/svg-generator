/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Target, TrendingUp } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 border-b border-white/10 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-cyan-600 rounded-lg shadow-lg shadow-indigo-500/20">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">LifePlan AI</h1>
            <p className="text-xs text-zinc-400 font-medium flex items-center gap-1">
              Goal Based Investing Engine <TrendingUp className="w-3 h-3 text-emerald-400" />
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm">
           <span className="text-zinc-500">Processing Core: <span className="text-green-400">Online</span></span>
           <span className="px-3 py-1 rounded-full bg-zinc-800 border border-white/5 text-zinc-300">v3.0.1</span>
        </div>
      </div>
    </header>
  );
};