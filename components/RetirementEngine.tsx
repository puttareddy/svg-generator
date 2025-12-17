/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Heart, Wallet, Users, Plane, 
  Settings, Activity, PieChart, TrendingUp, 
  ArrowRight, CheckCircle, Shield, Target, Rocket,
  Hourglass, Filter, ArrowLeftRight, X, BarChart3,
  Search, Utensils, UserCircle, Cpu
} from 'lucide-react';
import { EngineState, EngineLog, StrategyDetails } from '../types';

/* --- MOCK DATA FOR STRATEGIES --- */
const STRATEGIES: Record<string, StrategyDetails> = {
  conservative: {
    id: 'conservative',
    title: 'Principal Protection',
    description: 'Prioritizes capital preservation with stable, inflation-adjusted income streams. Ideal for risk-averse legacy planning.',
    color: 'emerald',
    riskLevel: 'Low',
    successRate: 99.8,
    monthlyIncome: '$6,200',
    endAge: 89,
    assets: [
      { name: 'Bonds/Fixed Income', value: 60, color: '#10b981' },
      { name: 'Blue Chip Stocks', value: 30, color: '#34d399' },
      { name: 'Cash Reserves', value: 10, color: '#6ee7b7' },
    ],
    projection: [
      { year: '2025', value: 100, baseline: 100 },
      { year: '2030', value: 125, baseline: 135 },
      { year: '2035', value: 145, baseline: 180 },
      { year: '2040', value: 160, baseline: 240 },
      { year: '2045', value: 170, baseline: 310 },
      { year: '2050', value: 165, baseline: 390 },
    ]
  },
  balanced: {
    id: 'balanced',
    title: 'Balanced Growth',
    description: 'The optimal blend of growth and income. Dynamically adjusts allocation based on market volatility and personal health events.',
    color: 'blue',
    riskLevel: 'Medium',
    successRate: 94.5,
    monthlyIncome: '$8,400',
    endAge: 92,
    assets: [
      { name: 'Global Equities', value: 50, color: '#3b82f6' },
      { name: 'Real Estate / REITS', value: 20, color: '#60a5fa' },
      { name: 'Govt Bonds', value: 25, color: '#93c5fd' },
      { name: 'Crypto/Alt', value: 5, color: '#bfdbfe' },
    ],
    projection: [
      { year: '2025', value: 100, baseline: 100 },
      { year: '2030', value: 140, baseline: 135 },
      { year: '2035', value: 190, baseline: 180 },
      { year: '2040', value: 250, baseline: 240 },
      { year: '2045', value: 310, baseline: 310 },
      { year: '2050', value: 290, baseline: 390 },
    ]
  },
  aggressive: {
    id: 'aggressive',
    title: 'Legacy Builder',
    description: 'Maximum growth potential for leaving a substantial inheritance or charitable foundation. High volatility tolerance required.',
    color: 'amber',
    riskLevel: 'High',
    successRate: 88.2,
    monthlyIncome: '$11,200',
    endAge: 96,
    assets: [
      { name: 'Growth Stocks', value: 60, color: '#f59e0b' },
      { name: 'Emerging Markets', value: 25, color: '#fbbf24' },
      { name: 'Venture/PE', value: 15, color: '#fcd34d' },
    ],
    projection: [
      { year: '2025', value: 100, baseline: 100 },
      { year: '2030', value: 160, baseline: 135 },
      { year: '2035', value: 240, baseline: 180 },
      { year: '2040', value: 380, baseline: 240 },
      { year: '2045', value: 550, baseline: 310 },
      { year: '2050', value: 720, baseline: 390 },
    ]
  }
};

export const RetirementEngine: React.FC = () => {
  const [state, setState] = useState<EngineState>('idle');
  const [logs, setLogs] = useState<EngineLog[]>([]);
  const [activeEngine, setActiveEngine] = useState<string | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<StrategyDetails | null>(null);
  const [inputStep, setInputStep] = useState(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  
  // Only scroll the terminal into view if the simulation is actually running
  // This prevents the whole page from focusing down to the component on load.
  useEffect(() => {
    if (state === 'processing' && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [logs, state]);

  const addLog = (message: string, type: 'info' | 'success' | 'process' = 'info') => {
    setLogs(prev => [...prev.slice(-4), { id: Date.now().toString(), message, type }]);
  };

  const runSimulation = () => {
    if (state === 'processing') return;
    if (state === 'complete') {
      setState('idle');
      setLogs([]);
      setActiveEngine(null);
      setInputStep(0);
      setSelectedStrategy(null);
      return;
    }

    setState('processing');
    addLog("Initializing LifePlan Core System...", "info");

    const timeline = [
      { t: 500, action: () => { setInputStep(1); addLog("Reading Personal Bio (Age, ZIP, Family History)...", "process"); } },
      { t: 1200, action: () => { setInputStep(2); addLog("Analyzing Lifestyle: Diet, Exercise, Sleep patterns...", "process"); } },
      { t: 2000, action: () => { setInputStep(3); addLog("Syncing Financials: Income, 401k, Debts...", "process"); } },
      { t: 2800, action: () => { setInputStep(4); addLog("Data Stream Verified & Normalized.", "success"); } },
      { t: 3200, action: () => { setActiveEngine('lookup'); addLog("Lookup Engine: Fetching actuarial tables & market data...", "process"); } },
      { t: 4000, action: () => { setActiveEngine('mortality'); addLog("Mortality Engine: Calculating biological longevity...", "process"); } },
      { t: 4800, action: () => { setActiveEngine('income'); addLog("Income Engine: Projecting salary growth curves...", "process"); } },
      { t: 5600, action: () => { setActiveEngine('expenses'); addLog("Expenses Engine: Modeling healthcare & lifestyle inflation...", "process"); } },
      { t: 6400, action: () => { setActiveEngine('fees'); addLog("Fee Engine: Optimizing tax-drag & expense ratios...", "process"); } },
      { t: 7200, action: () => { setActiveEngine('peers'); addLog("Peer Engine: Benchmarking against top 10% cohort...", "process"); } },
      { t: 8000, action: () => { setActiveEngine('decum'); addLog("Decumulation Engine: Generating withdrawal strategies...", "process"); } },
      { t: 9000, action: () => { setState('complete'); setActiveEngine(null); addLog("Strategic Roadmap Generated.", "success"); } },
    ];

    timeline.forEach(({ t, action }) => setTimeout(action, t));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 relative pb-20">
      
      {/* --- DASHBOARD OVERLAY --- */}
      {selectedStrategy && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-5xl bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className={`p-6 border-b border-white/10 bg-zinc-900 flex justify-between items-center relative overflow-hidden`}>
              <div className={`absolute top-0 left-0 w-1 h-full bg-${selectedStrategy.color}-500`} />
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  {selectedStrategy.title}
                  <span className={`px-3 py-1 rounded-full text-xs font-mono bg-${selectedStrategy.color}-500/10 text-${selectedStrategy.color}-400 border border-${selectedStrategy.color}-500/20`}>
                    Recommended Match
                  </span>
                </h2>
                <p className="text-zinc-400 text-sm mt-1">{selectedStrategy.description}</p>
              </div>
              <button 
                onClick={() => setSelectedStrategy(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-zinc-400" />
              </button>
            </div>

            {/* Modal Content Grid */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Col: Key Metrics */}
              <div className="space-y-4">
                <div className="bg-zinc-950/50 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm font-medium text-zinc-300">Success Probability</span>
                  </div>
                  <div className={`text-3xl font-bold text-${selectedStrategy.color}-400`}>
                    {selectedStrategy.successRate}%
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 mt-3 rounded-full overflow-hidden">
                    <div className={`h-full bg-${selectedStrategy.color}-500`} style={{ width: `${selectedStrategy.successRate}%` }} />
                  </div>
                </div>

                <div className="bg-zinc-950/50 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm font-medium text-zinc-300">Proj. Monthly Income</span>
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {selectedStrategy.monthlyIncome}
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">Inflation adjusted (2025 dollars)</p>
                </div>

                <div className="bg-zinc-950/50 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Hourglass className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm font-medium text-zinc-300">Plan Funded Until Age</span>
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {selectedStrategy.endAge}
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">Based on Mortality Engine v2.4</p>
                </div>
              </div>

              {/* Center Col: Wealth Projection Chart */}
              <div className="lg:col-span-2 bg-zinc-950/30 rounded-xl border border-white/5 p-6 flex flex-col min-h-[300px]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-zinc-200 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-indigo-400" /> Wealth Projection
                  </h3>
                  <div className="flex gap-4 text-xs">
                     <div className="flex items-center gap-1.5">
                        <div className={`w-3 h-3 rounded-full bg-${selectedStrategy.color}-500`} />
                        <span className="text-zinc-300">Your Plan</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-zinc-700" />
                        <span className="text-zinc-500">Benchmark</span>
                     </div>
                  </div>
                </div>
                
                {/* DYNAMIC CHART RENDERING */}
                <div className="flex-1 w-full relative">
                  <WealthChart strategy={selectedStrategy} />
                </div>
              </div>

              {/* Bottom Row: Allocation */}
              <div className="lg:col-span-3 bg-zinc-950/30 rounded-xl border border-white/5 p-6">
                <h3 className="font-semibold text-zinc-200 flex items-center gap-2 mb-4">
                  <PieChart className="w-4 h-4 text-purple-400" /> Strategic Allocation
                </h3>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* CSS Donut Chart */}
                  <div className="relative w-32 h-32 rounded-full shrink-0" 
                    style={{ 
                      background: `conic-gradient(
                        ${selectedStrategy.assets.map((a, i, arr) => {
                          const prev = arr.slice(0, i).reduce((acc, curr) => acc + curr.value, 0);
                          return `${a.color} ${prev}% ${prev + a.value}%`;
                        }).join(', ')}
                      )`
                    }}
                  >
                    <div className="absolute inset-4 bg-zinc-900 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-zinc-500">MIX</span>
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                    {selectedStrategy.assets.map((asset, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded bg-zinc-900/50 border border-white/5">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: asset.color }} />
                          <span className="text-sm text-zinc-300">{asset.name}</span>
                        </div>
                        <span className="text-sm font-mono text-white">{asset.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
            
            {/* Modal Footer */}
            <div className="p-4 border-t border-white/10 bg-zinc-950/50 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedStrategy(null)}
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Close View
              </button>
              <button className={`px-6 py-2 rounded-lg bg-${selectedStrategy.color}-600 hover:bg-${selectedStrategy.color}-500 text-white text-sm font-bold shadow-lg transition-all`}>
                Activate This Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Control Bar */}
      <div className="flex justify-center mb-12">
        <button
          onClick={runSimulation}
          className={`
            relative group px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-2xl overflow-hidden
            ${state === 'idle' ? 'bg-indigo-600 hover:bg-indigo-500 text-white hover:scale-105' : 'bg-zinc-800 text-zinc-400'}
          `}
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span className="relative flex items-center gap-3">
            {state === 'idle' ? <><Activity className="w-5 h-5" /> Launch Simulation</> : 'Reset System'}
          </span>
        </button>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ================= SVG CONNECTOR LAYER ================= */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-visible z-0">
          <svg className="w-full h-full opacity-50" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
                <stop offset="50%" stopColor="#818cf8" stopOpacity="1" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {state !== 'idle' && (
              <>
                {/* Input Streams converging to Center Core */}
                <path d="M 300 100 C 400 100, 400 350, 600 350" fill="none" stroke="url(#pipeGradient)" strokeWidth="2" className="animate-pulse" />
                <path d="M 300 200 C 400 200, 400 350, 600 350" fill="none" stroke="url(#pipeGradient)" strokeWidth="2" className="animate-pulse delay-75" />
                <path d="M 300 300 C 400 300, 400 350, 600 350" fill="none" stroke="url(#pipeGradient)" strokeWidth="2" className="animate-pulse delay-150" />
                <path d="M 300 400 C 400 400, 400 350, 600 350" fill="none" stroke="url(#pipeGradient)" strokeWidth="2" className="animate-pulse delay-200" />
                
                {/* Output Streams diverging from Center Core */}
                <path d="M 600 350 C 800 350, 800 150, 900 150" fill="none" stroke={state === 'complete' ? '#10b981' : '#3f3f46'} strokeWidth={state === 'complete' ? 3 : 1} className="transition-all duration-1000" />
                <path d="M 600 350 C 800 350, 800 300, 900 300" fill="none" stroke={state === 'complete' ? '#3b82f6' : '#3f3f46'} strokeWidth={state === 'complete' ? 3 : 1} className="transition-all duration-1000" />
                <path d="M 600 350 C 800 350, 800 450, 900 450" fill="none" stroke={state === 'complete' ? '#f59e0b' : '#3f3f46'} strokeWidth={state === 'complete' ? 3 : 1} className="transition-all duration-1000" />
              </>
            )}
          </svg>
        </div>


        {/* ================= COLUMN 1: LIVE DATA INGESTION ================= */}
        <div className="lg:col-span-3 flex flex-col gap-4 z-10 sticky top-24">
          <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
             <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
               <div className={`w-2 h-2 rounded-full ${state === 'idle' ? 'bg-zinc-600' : 'bg-green-500 animate-pulse'}`} />
               <span className="font-mono text-sm text-zinc-400 uppercase tracking-widest">Data Stream</span>
             </div>

             <div className="space-y-6">
                <IngestionItem 
                  label="Personal Profile" 
                  sub="Bio, Zip, History" 
                  icon={UserCircle} 
                  status={inputStep > 0 ? 'active' : 'waiting'}
                  done={inputStep > 1}
                />
                 <IngestionItem 
                  label="Lifestyle & Habits" 
                  sub="Food, Sleep, Gym" 
                  icon={Utensils} 
                  status={inputStep > 1 ? 'active' : 'waiting'}
                  done={inputStep > 2}
                />
                <IngestionItem 
                  label="Financial Assets" 
                  sub="Banking & 401(k)" 
                  icon={Wallet} 
                  status={inputStep > 2 ? 'active' : 'waiting'}
                  done={inputStep > 3}
                />
                <IngestionItem 
                  label="Goals & Risks" 
                  sub="Retirement Desires" 
                  icon={Shield} 
                  status={inputStep > 3 ? 'active' : 'waiting'}
                  done={inputStep > 3}
                />
             </div>
             
             {inputStep === 0 && (
               <div className="mt-6 text-center text-xs text-zinc-500 bg-zinc-950/50 p-3 rounded-lg border border-dashed border-zinc-800">
                 System Standby.
               </div>
             )}
          </div>
        </div>

        {/* ================= COLUMN 2: PROCESSING MOTHERBOARD (7 ENGINES) ================= */}
        <div className="lg:col-span-6 relative z-10">
          
          <div className={`
            relative w-full rounded-3xl border border-white/10 
            bg-zinc-900/90 backdrop-blur-xl shadow-2xl transition-all duration-700
            flex flex-col overflow-hidden group
            ${state === 'idle' ? 'scale-95 opacity-80' : 'scale-100 opacity-100 ring-1 ring-indigo-500/50 shadow-indigo-500/20'}
          `}>
            
            {/* Core Header */}
            <div className="p-4 border-b border-white/5 bg-zinc-950/80 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Settings className={`w-5 h-5 text-indigo-400 ${state === 'processing' ? 'animate-spin' : ''}`} />
                <span className="font-bold text-zinc-200 tracking-wider">CORE ORCHESTRATOR</span>
              </div>
              <div className="flex gap-2 text-[10px] uppercase font-mono text-zinc-500">
                <span className="bg-zinc-950 px-2 py-1 rounded border border-white/5">7 Modules</span>
                <span className="bg-zinc-950 px-2 py-1 rounded border border-white/5 flex items-center gap-1">
                   <div className={`w-1.5 h-1.5 rounded-full ${state === 'processing' ? 'bg-green-500 animate-pulse' : 'bg-zinc-700'}`} />
                   {state === 'processing' ? 'Running' : 'Ready'}
                </span>
              </div>
            </div>

            {/* MOTHERBOARD GRID: 3x3 Layout with Central Brain */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 relative">
              
              {/* Row 1 */}
              <EngineBlock 
                title="Lookup Engine" 
                icon={Search} 
                isActive={activeEngine === 'lookup'} 
                description="Market & Actuarial"
                stats="S&P 500"
                color="text-zinc-400"
              />
              <EngineBlock 
                title="Mortality" 
                icon={Heart} 
                isActive={activeEngine === 'mortality'} 
                description="Longevity Calc"
                stats="Est: 92.4y"
                color="text-pink-400"
              />
              <EngineBlock 
                title="Income" 
                icon={TrendingUp} 
                isActive={activeEngine === 'income'} 
                description="Earning Proj."
                stats="+3.2%"
                color="text-emerald-400"
              />

              {/* Row 2 */}
              <EngineBlock 
                title="Expenses" 
                icon={PieChart} 
                isActive={activeEngine === 'expenses'} 
                description="Lifestyle Inf."
                stats="High Med"
                color="text-red-400"
              />
              
              {/* CENTRAL BRAIN UNIT */}
              <div className="relative aspect-square rounded-full border border-white/10 bg-black flex items-center justify-center shadow-inner overflow-hidden">
                <div className={`absolute inset-0 bg-indigo-500/10 ${state === 'processing' ? 'animate-pulse' : ''}`} />
                {/* Spinning Rings */}
                <div className={`absolute w-[80%] h-[80%] rounded-full border border-indigo-500/30 transition-all duration-[3000ms] ${state === 'processing' ? 'rotate-180 scale-100 border-t-indigo-400' : 'rotate-0'}`} />
                <div className={`absolute w-[60%] h-[60%] rounded-full border border-cyan-500/30 transition-all duration-[2000ms] ${state === 'processing' ? '-rotate-180 scale-95 border-b-cyan-400' : 'rotate-0'}`} />
                
                {/* Center Icon */}
                <div className="relative z-10 bg-zinc-900 p-3 rounded-full border border-white/10 shadow-xl">
                  <Cpu className={`w-8 h-8 text-indigo-100 ${state === 'processing' ? 'animate-pulse' : 'text-zinc-700'}`} />
                </div>

                {/* Connection Beams (simulated) */}
                {state === 'processing' && (
                  <>
                     <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-gradient-to-b from-transparent to-indigo-500 animate-pulse origin-bottom" style={{ transform: 'rotate(0deg)' }} />
                     <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-gradient-to-b from-transparent to-indigo-500 animate-pulse origin-bottom" style={{ transform: 'rotate(45deg)' }} />
                     <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-gradient-to-b from-transparent to-indigo-500 animate-pulse origin-bottom" style={{ transform: 'rotate(90deg)' }} />
                     <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-gradient-to-b from-transparent to-indigo-500 animate-pulse origin-bottom" style={{ transform: 'rotate(135deg)' }} />
                     <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-gradient-to-b from-transparent to-indigo-500 animate-pulse origin-bottom" style={{ transform: 'rotate(180deg)' }} />
                     <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-gradient-to-b from-transparent to-indigo-500 animate-pulse origin-bottom" style={{ transform: 'rotate(225deg)' }} />
                     <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-gradient-to-b from-transparent to-indigo-500 animate-pulse origin-bottom" style={{ transform: 'rotate(270deg)' }} />
                     <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-gradient-to-b from-transparent to-indigo-500 animate-pulse origin-bottom" style={{ transform: 'rotate(315deg)' }} />
                  </>
                )}
              </div>

              <EngineBlock 
                title="Fees" 
                icon={Filter} 
                isActive={activeEngine === 'fees'} 
                description="Expense Ratios"
                stats="0.04% Opt."
                color="text-orange-400"
              />

              {/* Row 3 */}
              <EngineBlock 
                title="Peer Comp." 
                icon={Users} 
                isActive={activeEngine === 'peers'} 
                description="Cohort Analysis"
                stats="Top 15%"
                color="text-purple-400"
              />
              <EngineBlock 
                title="Decumulation" 
                icon={ArrowLeftRight} 
                isActive={activeEngine === 'decum'} 
                description="Withdrawal Strat"
                stats="4% Rule"
                color="text-cyan-400"
              />
              <div className="flex flex-col items-center justify-center p-2 rounded-xl border border-white/5 bg-zinc-950/30">
                 <div className="text-[10px] text-zinc-600 font-mono text-center">
                    System Latency<br/><span className="text-zinc-400">12ms</span>
                 </div>
              </div>

            </div>

            {/* Terminal Output - Integrated at bottom */}
            <div className="h-32 bg-black/50 p-4 font-mono text-[10px] md:text-xs overflow-y-auto border-t border-white/10 scrollbar-hide">
              {logs.length === 0 && <span className="text-zinc-700 animate-pulse">Waiting for neural link...</span>}
              {logs.map((log) => (
                <div key={log.id} className="mb-1.5 animate-in slide-in-from-left-2 fade-in duration-300 flex gap-2">
                  <span className="text-zinc-600 shrink-0">[{new Date(parseInt(log.id)).toLocaleTimeString().split(' ')[0]}]</span>
                  <span className={`
                    break-words
                    ${log.type === 'process' ? 'text-indigo-300' : ''}
                    ${log.type === 'success' ? 'text-emerald-400 font-bold' : ''}
                    ${log.type === 'info' ? 'text-zinc-400' : ''}
                  `}>
                    {log.type === 'process' && '> '}{log.message}
                  </span>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>
        </div>

        {/* ================= COLUMN 3: INTERACTIVE RESULTS ================= */}
        <div className="lg:col-span-3 flex flex-col gap-4 z-10 pl-4 sticky top-24">
          
          <div className={`transition-all duration-700 ${state === 'complete' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Target className="w-4 h-4" /> Recommended Paths
            </h3>
            
            <div className="space-y-4">
              <StrategyCard 
                strategy={STRATEGIES.conservative}
                delay={0}
                onClick={() => setSelectedStrategy(STRATEGIES.conservative)}
              />
              <StrategyCard 
                strategy={STRATEGIES.balanced}
                delay={200}
                highlight
                onClick={() => setSelectedStrategy(STRATEGIES.balanced)}
              />
              <StrategyCard 
                strategy={STRATEGIES.aggressive}
                delay={400}
                onClick={() => setSelectedStrategy(STRATEGIES.aggressive)}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

/* --- Sub Components --- */

const WealthChart = ({ strategy }: { strategy: StrategyDetails }) => {
  const data = strategy.projection;
  const maxVal = Math.max(...data.map(d => Math.max(d.value, d.baseline))) * 1.1;
  const height = 250;
  const width = 500;
  const padding = 20;

  const getX = (index: number) => padding + (index * (width - 2 * padding) / (data.length - 1));
  const getY = (value: number) => height - padding - (value / maxVal) * (height - 2 * padding);

  // --- CHART TYPE: BAR (Comparison) ---
  if (strategy.id === 'conservative') {
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
         {data.map((point, i) => {
           const x = getX(i);
           const barWidth = 30;
           return (
             <g key={i}>
                {/* Baseline Bar */}
                <rect 
                  x={x - barWidth/2 - 2} 
                  y={getY(point.baseline)} 
                  width={barWidth} 
                  height={height - padding - getY(point.baseline)} 
                  fill="#3f3f46"
                  opacity={0.5}
                  rx={4}
                />
                {/* Strategy Bar */}
                <rect 
                  x={x - barWidth/2 + 2} 
                  y={getY(point.value)} 
                  width={barWidth} 
                  height={height - padding - getY(point.value)} 
                  className="fill-emerald-500"
                  opacity={0.9}
                  rx={4}
                />
                <text x={x} y={height - 2} fill="#71717a" fontSize="12" textAnchor="middle">{point.year}</text>
             </g>
           )
         })}
      </svg>
    )
  }

  // --- CHART TYPE: STACKED AREA (Volume) ---
  if (strategy.id === 'balanced') {
    const areaPath = `
      M ${getX(0)} ${getY(data[0].value)}
      ${data.map((p, i) => `L ${getX(i)} ${getY(p.value)}`).join(' ')}
      L ${getX(data.length - 1)} ${height - padding}
      L ${getX(0)} ${height - padding}
      Z
    `;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Baseline Line */}
        <polyline 
           points={data.map((p, i) => `${getX(i)},${getY(p.baseline)}`).join(' ')}
           fill="none"
           stroke="#3f3f46"
           strokeWidth="2"
           strokeDasharray="4 4"
        />

        {/* Area Fill */}
        <path d={areaPath} fill="url(#areaGradient)" />
        
        {/* Main Line */}
        <polyline 
           points={data.map((p, i) => `${getX(i)},${getY(p.value)}`).join(' ')}
           fill="none"
           stroke="#60a5fa"
           strokeWidth="3"
        />

        {data.map((point, i) => (
          <g key={i}>
             <circle cx={getX(i)} cy={getY(point.value)} r="4" className="fill-blue-500" />
             <text x={getX(i)} y={height - 2} fill="#71717a" fontSize="12" textAnchor="middle">{point.year}</text>
          </g>
        ))}
      </svg>
    );
  }

  // --- CHART TYPE: CURVED LINE (Growth) ---
  if (strategy.id === 'aggressive') {
    const linePath = data.reduce((acc, point, i, arr) => {
      if (i === 0) return `M ${getX(i)} ${getY(point.value)}`;
      // Simple Bezier control point logic for smoothing
      const prev = arr[i - 1];
      const cx = (getX(i) + getX(i - 1)) / 2;
      return `${acc} C ${cx} ${getY(prev.value)}, ${cx} ${getY(point.value)}, ${getX(i)} ${getY(point.value)}`;
    }, "");

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
         {/* Baseline */}
         <polyline 
           points={data.map((p, i) => `${getX(i)},${getY(p.baseline)}`).join(' ')}
           fill="none"
           stroke="#3f3f46"
           strokeWidth="2"
        />

         <path d={linePath} fill="none" stroke="#f59e0b" strokeWidth="4" className="drop-shadow-lg" />
         
         {data.map((point, i) => (
          <g key={i}>
             <circle cx={getX(i)} cy={getY(point.value)} r="5" className="fill-zinc-900 stroke-amber-500 stroke-2" />
             <text x={getX(i)} y={height - 2} fill="#71717a" fontSize="12" textAnchor="middle">{point.year}</text>
          </g>
        ))}
      </svg>
    )
  }

  return null;
}

const IngestionItem = ({ label, sub, icon: Icon, status, done }: any) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className={`
        p-2 rounded-lg transition-colors duration-500
        ${done ? 'bg-emerald-500/20 text-emerald-400' : status === 'active' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-zinc-800 text-zinc-600'}
      `}>
        <Icon className={`w-5 h-5 ${status === 'active' && !done ? 'animate-pulse' : ''}`} />
      </div>
      <div>
        <div className={`text-sm font-medium ${done ? 'text-zinc-200' : 'text-zinc-500'}`}>{label}</div>
        <div className="text-xs text-zinc-600">
          {done ? 'Synced' : status === 'active' ? sub : 'Pending'}
        </div>
      </div>
    </div>
    {done && <CheckCircle className="w-4 h-4 text-emerald-500 animate-in zoom-in spin-in-90 duration-300" />}
    {status === 'active' && !done && <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />}
  </div>
);

const EngineBlock = ({ title, icon: Icon, isActive, description, stats, color }: any) => (
  <div className={`
    relative p-3 rounded-xl border transition-all duration-500 overflow-hidden
    ${isActive 
      ? 'bg-zinc-800 border-indigo-500/50 shadow-lg shadow-indigo-500/10 scale-[1.02] z-10' 
      : 'bg-zinc-900/50 border-white/5 opacity-50 grayscale hover:opacity-70'}
  `}>
    {isActive && (
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent animate-pulse" />
    )}
    <div className="flex items-start justify-between mb-2">
      <div className={`p-1.5 rounded-lg bg-zinc-950 ${color}`}>
        <Icon className={`w-4 h-4 ${isActive ? 'animate-bounce' : ''}`} />
      </div>
      {isActive && <Activity className="w-3 h-3 text-green-400 animate-pulse" />}
    </div>
    <div className="flex justify-between items-end">
        <div>
            <h4 className="text-xs font-bold text-zinc-200 mb-0.5">{title}</h4>
            <p className="text-[10px] text-zinc-500 leading-tight">{description}</p>
        </div>
        <div className={`text-xs font-mono font-medium ${color}`}>
            {isActive ? stats : '---'}
        </div>
    </div>
  </div>
);

const StrategyCard = ({ strategy, delay, highlight, onClick }: { strategy: StrategyDetails, delay: number, highlight?: boolean, onClick: () => void }) => {
  const Icon = strategy.id === 'conservative' ? Shield : strategy.id === 'balanced' ? Target : Rocket;
  const color = strategy.color; // e.g. 'emerald'

  return (
    <div 
      onClick={onClick}
      className={`
        group relative p-5 rounded-2xl border transition-all duration-500 cursor-pointer
        hover:scale-[1.02] hover:shadow-xl
        ${highlight ? 'bg-zinc-800 border-blue-500/50 ring-1 ring-blue-500/20' : 'bg-zinc-900/50 border-white/10 hover:border-white/20 hover:bg-zinc-800'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Connector Dot */}
      <div className={`absolute left-0 top-1/2 -translate-x-[22px] w-3 h-3 rounded-full bg-${color}-500 ring-4 ring-zinc-950 shadow-[0_0_10px_rgba(255,255,255,0.2)]`} />
      
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-${color}-500/20 text-${color}-400`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-zinc-100">{strategy.title}</h3>
            <p className="text-xs text-zinc-500 font-mono">{strategy.riskLevel} Risk</p>
          </div>
        </div>
        {highlight && <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500 text-white">REC</div>}
      </div>

      <div className="grid grid-cols-2 gap-2 py-3 border-t border-white/5">
        <div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Target Age</div>
          <div className="font-mono text-sm text-zinc-200 font-bold">{strategy.endAge}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Income</div>
          <div className={`font-mono text-sm text-${color}-400 font-bold`}>{strategy.monthlyIncome}</div>
        </div>
      </div>
      
      <div className="mt-2 text-xs text-zinc-500 group-hover:text-white transition-colors flex items-center justify-between">
         <span>Explore Dashboard</span>
         <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};