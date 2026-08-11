import React from 'react';
import { SectionId } from '../types';
import { Bot, Send, Radio, Shield, Heart } from 'lucide-react';

interface FooterSectionProps {
  onNavigate: (section: SectionId) => void;
  onOpenBotModal: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onNavigate,
  onOpenBotModal,
}) => {
  return (
    <footer className="relative bg-slate-950 border-t border-emerald-500/30 pt-16 pb-12 overflow-hidden">
      {/* Top glowing electric wire track */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#00ff88]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-10 pb-12 border-b border-slate-900">
          {/* BRAND COLUMN */}
          <div className="sm:col-span-2 md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-emerald-400 flex items-center justify-center overflow-hidden text-emerald-400 shadow-[0_0_15px_rgba(0,255,136,0.4)] flex-shrink-0">
                <img
                  src="https://sf4service.site/raw/img_65bjn3q7e.png"
                  alt="RobinWatch AI Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-mono font-black text-xl sm:text-2xl text-white tracking-wider">
                RobinWatch <span className="text-emerald-400">AI</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-md">
              Autonomous Telegram AI Sentinel for Robinhood Chain. Track contract deployments, resolve human developer wallets via Blockscout API, compute 0-100 risk scores, stream DexScreener market data, and engage community groups with a witty AI persona.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs font-mono text-slate-300">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse flex-shrink-0" />
              <span>ROBINHOOD CHAIN RPC: <strong className="text-emerald-400">ACTIVE & SYNCED</strong></span>
            </div>
          </div>

          {/* QUICK SECTIONS NAVIGATION - Strictly Home, About, Features */}
          <div className="sm:col-span-1 md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-300 transition-all duration-200 flex items-center gap-2 group text-left"
                >
                  <span className="text-emerald-500 group-hover:translate-x-0.5 transition-transform">›</span> Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-300 transition-all duration-200 flex items-center gap-2 group text-left"
                >
                  <span className="text-emerald-500 group-hover:translate-x-0.5 transition-transform">›</span> About
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('features')}
                  className="hover:text-emerald-300 transition-all duration-200 flex items-center gap-2 group text-left"
                >
                  <span className="text-emerald-500 group-hover:translate-x-0.5 transition-transform">›</span> Features
                </button>
              </li>
            </ul>
          </div>

          {/* BOT CONNECT COLUMN */}
          <div className="sm:col-span-1 md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Telegram Sentinel Node
            </h4>
            <p className="text-xs font-mono text-slate-400">
              Robinhood Chain Bot: <span className="text-emerald-300 font-bold block sm:inline mt-0.5 sm:mt-0">@robinchain_bot</span>
            </p>
            <button
              onClick={onOpenBotModal}
              className="w-full py-3 px-4 rounded-xl font-mono text-xs font-bold bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-[0_0_20px_rgba(0,255,136,0.4)] hover:shadow-[0_0_25px_rgba(0,255,136,0.6)] transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 fill-current flex-shrink-0" />
              <span>CONNECT TELEGRAM BOT</span>
            </button>
          </div>
        </div>

        {/* BOTTOM LEGAL & STATUS TICKER */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-4">
          <p>© 2026 RobinWatch AI. Autonomous Robinhood Chain Community Sentinel. Not Financial Advice.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Blockscout & DexScreener Verifications</span>
            </span>
            <span className="text-slate-700">•</span>
            <span className="text-emerald-400">Robinhood Chain Sentinel</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
