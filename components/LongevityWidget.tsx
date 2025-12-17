/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Skull, Clock, Zap, ChevronRight, Fingerprint, Activity } from 'lucide-react';

interface LongevityWidgetProps {
  onExplore: () => void;
}

export const LongevityWidget: React.FC<LongevityWidgetProps> = ({ onExplore }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const triggerScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onExplore();
    }, 1500);
  };

  return (
    <div 
      className="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-4 pointer-events-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Expansion Panel (Conditional UI hints) */}
      <div className={`
        pointer-events-auto transition-all duration-500 
        ${isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}
        w-72 p-5 rounded-3xl bg-zinc-950 border border-indigo-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl
        relative overflow-hidden
      `}>
        {/* Subtle background glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-600/20 blur-[50px] rounded-full" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-indigo-500/10">
              <Clock className="w-4 h-4 text-indigo-400" />
            </div>
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-300">
              Biometric Projection
            </h4>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed mb-5">
            Our <span className="text-zinc-100 font-bold">Neural Engine</span> analyzes actuarial cohorts and lifestyle markers to define your financial horizon.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col items-center">
              <div className="text-[10px] text-zinc-600 uppercase font-bold mb-1">Actuarial</div>
              <div className="text-lg font-mono font-bold text-zinc-400">82.4y</div>
            </div>
            <div className="p-3 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 flex flex-col items-center">
              <div className="text-[10px] text-indigo-400 uppercase font-bold mb-1">Projected</div>
              <div className="text-lg font-mono font-bold text-indigo-100">96.8y</div>
            </div>
          </div>

          <button 
            onClick={triggerScan}
            disabled={isScanning}
            className={`
              w-full py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2
              ${isScanning ? 'bg-red-500/20 text-red-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'}
            `}
          >
            {isScanning ? (
              <>
                <Activity className="w-4 h-4 animate-pulse" />
                Processing Helix...
              </>
            ) : (
              <>
                <Zap className="w-3 h-3 fill-current" />
                Initialize Simulation
              </>
            )}
          </button>
        </div>
      </div>

      {/* Floating Curiosity Teaser */}
      <div 
        className={`
          pointer-events-auto group relative flex items-center gap-4 p-1.5 pr-5 rounded-full 
          bg-zinc-900 border border-white/10 shadow-2xl transition-all duration-500
          ${isHovered ? 'border-indigo-500/50 bg-zinc-800' : ''}
        `}
      >
        {/* Glow Effect */}
        <div className={`absolute inset-0 rounded-full bg-indigo-500/20 blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        <div className={`
          p-3 rounded-full transition-all duration-500
          ${isScanning ? 'bg-red-500 animate-pulse text-white' : isHovered ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-indigo-400'}
        `}>
          {isScanning ? <Activity className="w-5 h-5" /> : <Fingerprint className="w-5 h-5" />}
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-indigo-400 transition-colors">
            {isScanning ? 'Syncing...' : 'Longevity Intelligence'}
          </span>
          <span className="text-xs font-semibold text-zinc-200">
            {isScanning ? 'Analyzing genetic markers...' : "Dare to know your 'Death Age'?"}
          </span>
        </div>

        <button 
          onClick={triggerScan}
          disabled={isScanning}
          className={`
            ml-2 p-1.5 rounded-full transition-all
            ${isHovered ? 'bg-indigo-500 text-white scale-110' : 'bg-white/5 text-zinc-400'}
          `}
        >
          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-0.5' : ''}`} />
        </button>

        {/* Secret Label Tag */}
        <div className="absolute -top-7 right-4 px-2.5 py-1 bg-red-600 text-[9px] font-black text-white rounded shadow-xl animate-bounce tracking-tighter">
          TOP SECRET
        </div>
      </div>
    </div>
  );
};