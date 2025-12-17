/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Header } from './components/Header';
import { RetirementEngine } from './components/RetirementEngine';
import { LongevityWidget } from './components/LongevityWidget';
import { Target, Shield, Heart, TrendingUp, ArrowDown, CheckCircle2, Linkedin } from 'lucide-react';

const App: React.FC = () => {
  const engineRef = useRef<HTMLDivElement>(null);

  const scrollToEngine = () => {
    engineRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30 flex flex-col">      
      <Header />
      
      <main className="flex-grow">
        {/* --- HERO SECTION --- */}
        <section className="relative pt-20 pb-32 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-zinc-950 to-zinc-950" />
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Introducing LifePlan AI v3.0
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              Investing designed for <br />
              <span className="text-white">your life, not the market.</span>
            </h1>
            
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Traditional investing chases benchmarks. <strong>Goal-Based Investing (GBI)</strong> chases your dreams. 
              Align your wealth with your timeline, your needs, and your legacy.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={scrollToEngine}
                className="px-8 py-4 bg-white text-zinc-950 rounded-full font-bold text-lg hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-xl shadow-white/5"
              >
                Build My LifePlan <ArrowDown className="w-4 h-4" />
              </button>
              <button className="px-8 py-4 bg-zinc-900 text-white border border-white/10 rounded-full font-bold text-lg hover:bg-zinc-800 transition-colors">
                Learn the Philosophy
              </button>
            </div>
          </div>
        </section>

        {/* --- EDUCATIONAL SECTION (GBI PRINCIPLES) --- */}
        <section className="py-24 bg-zinc-900/30 border-y border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              
              <div>
                <h2 className="text-3xl font-bold mb-6">The Hierarchy of Financial Needs</h2>
                <p className="text-zinc-400 mb-8 leading-relaxed">
                  We don't just dump your money into a single pot. We separate your wealth into distinct "buckets" optimized for specific outcomes. This drastically reduces behavioral risk and anxiety during market volatility.
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <Shield className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-emerald-400">1. Essentials (Needs)</h3>
                      <p className="text-sm text-zinc-500">Low-risk assets to cover housing, healthcare, and food. <br/><em>Goal: Safety & Certainty.</em></p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                      <Target className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-blue-400">2. Lifestyle (Wants)</h3>
                      <p className="text-sm text-zinc-500">Growth assets for travel, hobbies, and upgrades. <br/><em>Goal: Inflation-beating Growth.</em></p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                      <Heart className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-amber-400">3. Legacy (Wishes)</h3>
                      <p className="text-sm text-zinc-500">Aggressive assets for inheritance and philanthropy. <br/><em>Goal: Maximum Multiplier.</em></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                {/* Abstract Visual of Buckets */}
                <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
                <div className="relative bg-zinc-950 border border-white/10 rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                    <span className="font-bold text-zinc-300">Performance vs. Purpose</span>
                    <TrendingUp className="text-indigo-500" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-zinc-900 border border-white/5 flex justify-between items-center opacity-50 grayscale">
                      <span className="text-sm font-mono text-zinc-500">S&P 500 Benchmark</span>
                      <span className="text-sm font-bold text-zinc-500">+10.2%</span>
                    </div>
                    <div className="flex justify-center text-xs text-zinc-500 my-2">vs</div>
                    <div className="p-4 rounded-lg bg-indigo-900/20 border border-indigo-500/30 flex justify-between items-center">
                      <span className="text-sm font-bold text-indigo-300">Retire at 62</span>
                      <span className="flex items-center gap-2 text-sm font-bold text-indigo-400">
                        <CheckCircle2 className="w-4 h-4" /> On Track
                      </span>
                    </div>
                    <div className="p-4 rounded-lg bg-indigo-900/20 border border-indigo-500/30 flex justify-between items-center">
                      <span className="text-sm font-bold text-indigo-300">Grandchild's Tuition</span>
                      <span className="flex items-center gap-2 text-sm font-bold text-indigo-400">
                        <CheckCircle2 className="w-4 h-4" /> Funded
                      </span>
                    </div>
                  </div>
                  <p className="mt-6 text-xs text-center text-zinc-500 italic">
                    "Benchmarks tell you what the market did. GBI tells you if you can pay for your life."
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- SIMULATION ENGINE --- */}
        <section ref={engineRef} className="py-20 px-4 scroll-mt-20">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Run the LifePlan Engine</h2>
            <p className="text-zinc-400">
              Our proprietary engine runs 7 concurrent processing modules to analyze your unique data signature 
              and map it against our goals-based framework.
            </p>
          </div>
          <RetirementEngine />
        </section>

      </main>

      {/* --- SECRET CURIOSITY WIDGET --- */}
      <LongevityWidget onExplore={scrollToEngine} />

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/10 bg-zinc-900/50 py-12 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-zinc-500 text-sm">
                &copy; 2025 Infiniai Technologies Ltd. All rights reserved.
            </div>
            <div className="flex items-center gap-8">
                <a href="#" className="text-zinc-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
                <a href="#" className="text-zinc-500 hover:text-white text-sm transition-colors">Terms of Service</a>
                <a href="https://www.linkedin.com/company/infiniai-technologies/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors">
                    <Linkedin className="w-5 h-5" />
                </a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;