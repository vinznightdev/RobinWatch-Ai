import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { FeatureItem } from '../types';
import {
  ShieldAlert,
  Eye,
  Zap,
  Globe,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  X,
  CheckCircle,
  ArrowRight,
  Bot,
  Terminal,
  Search,
  RefreshCw,
  LineChart,
  MessageSquare
} from 'lucide-react';

interface FeaturesSectionProps {
  onOpenBotModal: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onOpenBotModal }) => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);

  const features: FeatureItem[] = [
    {
      id: 'contract-tracking',
      title: 'Contract Tracking & Dev Resolution',
      shortDesc: 'Track any Robinhood Chain token & resolve human deployer via Blockscout API.',
      fullDesc:
        'コミュニティ members can track any token contract on Robinhood Chain with a single command (`/track 0x...`). RobinWatch AI queries Blockscout Explorer API to trace original contract creation transactions, uncovering the actual human deployer wallet even when launched via complex factory or bonding curve contracts.',
      iconName: 'Search',
      techTag: 'BLOCKSCOUT API',
      metrics: 'Factory Traced',
      details: [
        'Single Telegram command token tracking (`/track`)',
        'Blockscout Explorer API integration for creation tx lookup',
        'Resolves human deployer behind launcher/factory contracts',
        'Mounts ~5 minute automated wallet poller',
      ],
      wireColor: 'border-emerald-400 text-emerald-400 shadow-emerald-500/20',
    },
    {
      id: 'risk-scoring',
      title: 'Automated 0-100 Risk Scoring Engine',
      shortDesc: 'Confidence-rated risk scoring with plain-language explanation of liquidity & transfers.',
      fullDesc:
        'RobinWatch AI calculates a 0-100 risk score based on automated heuristics. It evaluates liquidity depth, dev wallet holdings, transfer frequency, and unverified code, returning a numerical score, confidence rating (%), and clear plain-language report.',
      iconName: 'ShieldAlert',
      techTag: 'RISK SCORE: 0-100',
      metrics: 'Confidence Rated',
      details: [
        'Automated 0 to 100 numerical risk scoring',
        'Confidence rating (%) for heuristic accuracy',
        'Plain-language risk explanations for non-technical users',
        'Flags unverified deployers & low liquidity pools',
      ],
      wireColor: 'border-purple-400 text-purple-400 shadow-purple-500/20',
    },
    {
      id: 'market-feeds',
      title: 'DexScreener Live Market Layer',
      shortDesc: 'Stream real-time price, FDV, market cap, pooled liquidity, and buy/sell counts.',
      fullDesc:
        'Integrated directly with DexScreener API to serve real-time market data on command (`/market`). Members get instant updates on token price (USD), 24h percentage change, FDV, market cap, pooled liquidity, volume, and buy/sell ratios.',
      iconName: 'LineChart',
      techTag: 'DEXSCREENER API',
      metrics: 'Real-time Streams',
      details: [
        'Live token price & 24h percentage change',
        'FDV & Market Cap synchronization',
        'Pooled liquidity and 24h trading volume',
        '24h Buy vs. Sell transaction counters',
      ],
      wireColor: 'border-emerald-400 text-emerald-400 shadow-emerald-500/20',
    },
    {
      id: 'wallet-poller',
      title: 'Developer Wallet Poller (~5 Min)',
      shortDesc: 'Recurring poller recording on-chain developer transactions with instant Telegram alerts.',
      fullDesc:
        'Once a token is tracked, RobinWatch AI runs a background poller on a ~5 minute schedule. Every transfer, sell, liquidity reduction, or mint executed by the developer wallet is logged and instantly broadcast as a Telegram group alert.',
      iconName: 'RefreshCw',
      techTag: 'SCHEDULE: ~5 MIN',
      metrics: 'On-Chain Alerts',
      details: [
        'Recurring 5-minute schedule developer wallet scanner',
        'Records all on-chain wallet transactions',
        'Real-time Telegram group alerts for significant dev moves',
        'Tracks realized gains and remaining token balance',
      ],
      wireColor: 'border-yellow-400 text-yellow-400 shadow-yellow-500/20',
    },
    {
      id: 'ai-persona',
      title: 'AI Community Persona & Chat',
      shortDesc: 'Witty, natural group conversation participant with typing indicators and zero chart spam.',
      fullDesc:
        'Acts as a casual, human-like member of your Telegram group. Responds intelligently to questions, welcomes new members automatically with personalized mentions, displays typing indicators for realism, and avoids unsolicited chart or advertisement spam.',
      iconName: 'MessageSquare',
      techTag: 'AI CHATTER',
      metrics: 'Zero Chart Spam',
      details: [
        'Casual, witty group chat participation',
        'Automatic welcome messages for new group members',
        'Realistic Telegram typing indicators',
        'Generates AI summaries of developer wallet activity',
      ],
      wireColor: 'border-emerald-300 text-emerald-300 shadow-emerald-400/20',
    },
    {
      id: 'web-dashboard',
      title: 'Web Dashboard & Inspector',
      shortDesc: 'Responsive web interface for reviewing tracked tokens, developer wallets, and bot logs.',
      fullDesc:
        'Complements the Telegram bot with a sleek, responsive web dashboard. Community members and admins can inspect tracked tokens on Robinhood Chain, examine wallet histories, review risk scores, and view raw bot system logs.',
      iconName: 'Cpu',
      techTag: 'WEB DASHBOARD',
      metrics: '24/7 Inspector',
      details: [
        'Responsive web interface for tracked token overview',
        'Developer wallet transaction inspector',
        'Historical risk score logs & heuristic audit trails',
        'Bot event stream and system status logs',
      ],
      wireColor: 'border-lime-400 text-lime-400 shadow-lime-500/20',
    },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search':
        return Search;
      case 'ShieldAlert':
        return ShieldAlert;
      case 'LineChart':
        return LineChart;
      case 'RefreshCw':
        return RefreshCw;
      case 'MessageSquare':
        return MessageSquare;
      default:
        return Cpu;
    }
  };

  return (
    <section id="features" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Decorative Cyber Glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-400/40 text-purple-300 text-xs font-mono font-semibold mb-4 shadow-[0_0_15px_rgba(157,0,255,0.2)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>SECTION 03 // CORE CAPABILITIES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-mono font-black text-white tracking-tight"
          >
            Features of <span className="text-emerald-400">RobinWatch AI</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base text-slate-300 leading-relaxed font-sans"
          >
            A complete suite of autonomous surveillance, dev wallet tracing, DexScreener analytics, and community group AI persona capabilities for Robinhood Chain.
          </motion.p>
        </div>

        {/* 3D DESIGNED BOXES FEATURE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => {
            const IconComponent = getIcon(item.iconName);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedFeature(item)}
                className="group cursor-pointer rounded-2xl p-7 bg-slate-950/90 border border-emerald-500/30 shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_35px_rgba(0,255,136,0.25)] transition-all duration-300 relative wire-border-cyan overflow-hidden flex flex-col justify-between"
              >
                {/* 3D Box Edge Highlights */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-emerald-400/50 rounded-tr-2xl group-hover:border-emerald-300 group-hover:shadow-[0_0_12px_#00ff88] transition-all" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-emerald-400/50 rounded-bl-2xl group-hover:border-emerald-300 group-hover:shadow-[0_0_12px_#00ff88] transition-all" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-emerald-400/60 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,255,136,0.5)] transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-900 text-emerald-300 border border-emerald-500/30">
                      {item.techTag}
                    </span>
                  </div>

                  <h3 className="text-xl font-mono font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans mb-6">
                    {item.shortDesc}
                  </p>
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 group-hover:text-emerald-400 transition-colors">
                    {item.metrics}
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Inspect Capability</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* FEATURE DETAIL MODAL */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedFeature && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="w-full max-w-2xl bg-slate-900 border-2 border-emerald-400 rounded-3xl p-5 sm:p-8 shadow-[0_0_50px_rgba(0,255,136,0.4)] relative wire-border-cyan overflow-hidden my-auto max-h-[90vh] overflow-y-auto"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-slate-950 border border-emerald-400 text-emerald-400">
                        {React.createElement(getIcon(selectedFeature.iconName), { className: 'w-6 h-6' })}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-emerald-400 block tracking-widest uppercase">
                          ROBINHOOD CHAIN SENTINEL // {selectedFeature.techTag}
                        </span>
                        <h3 className="text-xl font-mono font-bold text-white">{selectedFeature.title}</h3>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedFeature(null)}
                      className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 hover:border-emerald-400 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-200 leading-relaxed font-sans mb-6">
                    {selectedFeature.fullDesc}
                  </p>

                  {/* Specification Checklist */}
                  <div className="space-y-2 mb-8 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs font-mono text-emerald-300 block mb-2 font-semibold">
                      TECHNICAL SPECIFICATIONS:
                    </span>
                    {selectedFeature.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2.5 text-xs font-mono text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Modal Action CTA */}
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => setSelectedFeature(null)}
                      className="px-5 py-2.5 rounded-xl font-mono text-xs text-slate-300 hover:bg-slate-800 border border-slate-800"
                    >
                      Close Inspector
                    </button>

                    <button
                      onClick={() => {
                        setSelectedFeature(null);
                        onOpenBotModal();
                      }}
                      className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(0,255,136,0.4)] hover:bg-emerald-300 transition-all flex items-center gap-2"
                    >
                      <Bot className="w-4 h-4" />
                      <span>Test in Telegram</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};
