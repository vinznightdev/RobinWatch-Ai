import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BotCommand, TrackedToken, DeveloperWallet, WalletTransaction } from '../types';
import {
  Send,
  Shield,
  Zap,
  Activity,
  Terminal,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  Radio,
  Cpu,
  Search,
  ExternalLink,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  BarChart3,
  Layers,
  Database
} from 'lucide-react';

interface HomeSectionProps {
  onNavigateToFeatures: () => void;
  onOpenBotModal: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  onNavigateToFeatures,
  onOpenBotModal,
}) => {
  // Sample Robinhood Chain Tracked Tokens
  const [sampleTokens] = useState<TrackedToken[]>([
    {
      symbol: '$HOODIE',
      name: 'RobinHoodie Sentinel',
      contractAddress: '0x71a29f8e4c1b9201934812349081239849129b42',
      chain: 'Robinhood Chain',
      priceUsd: 0.0428,
      priceChange24h: +14.2,
      fdv: 4280000,
      marketCap: 4280000,
      liquidityUsd: 685000,
      volume24h: 1240000,
      buys24h: 3120,
      sells24h: 1450,
      deployerAddress: '0x3a91829f041284910293849102934891284912ab',
      isFactoryTraced: true,
      riskScore: 12,
      riskLevel: 'LOW',
      confidenceRating: 96,
      explanation: 'Deployer wallet holds 2.1% supply. Factory resolved via Blockscout. Liquidity locked 365 days.',
    },
    {
      symbol: '$RHCHAIN',
      name: 'Robinhood Chain Ecosystem',
      contractAddress: '0x9921a8f9b2019481203948102934819203984102',
      chain: 'Robinhood Chain',
      priceUsd: 0.1850,
      priceChange24h: -3.5,
      fdv: 18500000,
      marketCap: 18500000,
      liquidityUsd: 2450000,
      volume24h: 4890000,
      buys24h: 8410,
      sells24h: 7920,
      deployerAddress: '0x88f1920394819203948192039481920394819203',
      isFactoryTraced: true,
      riskScore: 35,
      riskLevel: 'MEDIUM',
      confidenceRating: 91,
      explanation: 'Moderate transfers detected to secondary pool address. DexScreener market data active.',
    },
    {
      symbol: '$PEPEHOOD',
      name: 'Pepe Robinhood',
      contractAddress: '0x1102938491029348192039481920394819203948',
      chain: 'Robinhood Chain',
      priceUsd: 0.00000412,
      priceChange24h: -48.6,
      fdv: 412000,
      marketCap: 412000,
      liquidityUsd: 14200,
      volume24h: 310000,
      buys24h: 420,
      sells24h: 1890,
      deployerAddress: '0x44ab819203948192039481920394819203948192',
      isFactoryTraced: true,
      riskScore: 84,
      riskLevel: 'CRITICAL',
      confidenceRating: 98,
      explanation: 'ALERT: Developer wallet moved 18% of total supply to unverified DEX route within 12 mins.',
    },
  ]);

  const [selectedToken, setSelectedToken] = useState<TrackedToken>(sampleTokens[0]);

  // Telegram Commands tailored to Robinhood Chain
  const sampleCommands: BotCommand[] = [
    {
      command: '/track 0x71a2...9b42',
      description: 'Track Robinhood Chain token & resolve deployer',
      response:
        '🎯 [Robinhood Chain Sentinel]\nContract 0x71a2...9b42 added to group watch!\n• Token: $HOODIE (RobinHoodie Sentinel)\n• Deployer Wallet: 0x3a91...12ab (Factory Traced)\n• Risk Score: 12/100 (LOW RISK)\n• DexScreener Price: $0.0428 (+14.2% 24h)\n• Recurring Poller: Every 5 minutes active.',
      category: 'tracking',
    },
    {
      command: '/risk',
      description: 'Automated 0-100 dev wallet risk assessment',
      response:
        '🛡️ [Automated Risk Assessment]\nTarget: $HOODIE (Robinhood Chain)\n• Overall Risk: 12/100 [LOW]\n• Confidence Rating: 96%\n• Heuristics: Liquidity locked for 365 days. No sudden deployer dumps detected in past 72h. Dev wallet holds 2.1% of supply.',
      category: 'risk',
    },
    {
      command: '/market',
      description: 'Live DexScreener market metrics',
      response:
        '📊 [DexScreener Market Feed]\nToken: $HOODIE (Robinhood Chain)\n• Price USD: $0.0428\n• 24h Volume: $1,240,000\n• FDV / MCap: $4,280,000\n• Pooled Liquidity: $685,000\n• Buys / Sells (24h): 3,120 / 1,450',
      category: 'market',
    },
    {
      command: '/summary',
      description: 'AI summary of recent dev transactions',
      response:
        '🧠 [AI Developer Digest]\nSummary for Robinhood Chain Contract 0x71a2...9b42:\nIn the last 24 hours, the verified deployer executed 2 routine operational calls (adding liquidity & renouncing proxy owner). No sell transactions observed. Group sentiment remains positive.',
      category: 'ai',
    },
  ];

  const [chatLog, setChatLog] = useState<{ sender: 'user' | 'bot'; text: string; time: string }[]>([
    {
      sender: 'bot',
      text: '🤖 RobinWatch AI Sentinel Active!\nMonitoring Robinhood Chain tokens, developer wallets via Blockscout, and live DexScreener market streams. Click a command below or enter a contract address to test.',
      time: '23:14',
    },
  ]);
  const [customInput, setCustomInput] = useState('');
  const [activeMode, setActiveMode] = useState('tracer');

  const handleRunCommand = (cmd: BotCommand) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user' as const, text: cmd.command, time };
    const botMsg = { sender: 'bot' as const, text: cmd.response, time };
    setChatLog((prev) => [...prev, userMsg, botMsg]);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user' as const, text: customInput, time };

    let botReply = `🤖 [RobinWatch AI Response]\nRobinhood Chain RPC query for: "${customInput}"\n• Resolved Deployer: 0x3a91...12ab (Blockscout Verified)\n• Risk Score: 18/100 [LOW]\n• DexScreener Stream: ACTIVE.`;
    if (customInput.toLowerCase().includes('hello') || customInput.toLowerCase().includes('hi')) {
      botReply = '🤖 Hey team! RobinWatch AI here monitoring Robinhood Chain contracts. What token are we checking today?';
    } else if (customInput.toLowerCase().includes('/track')) {
      botReply = `🎯 [Robinhood Chain Sentinel]\nContract tracked successfully!\n• Blockscout Deployer: 0x88f1...9203 (Factory Traced)\n• 5-Min Poller: Active\n• Risk Score: 24/100 (LOW RISK)`;
    } else if (customInput.toLowerCase().includes('/risk')) {
      botReply = '🛡️ [Risk Analysis]\nScore: 14/100 | Confidence: 95%\nDeployer wallet holds 1.8% of supply with zero sell activity in last 48h.';
    }

    const botMsg = { sender: 'bot' as const, text: botReply, time };
    setChatLog((prev) => [...prev, userMsg, botMsg]);
    setCustomInput('');
  };

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Decorative Matrix Wires */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* TOP ROBOT BADGE HEADER */}
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-emerald-400/50 shadow-[0_0_20px_rgba(0,255,136,0.25)] mb-6"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
            <span className="text-xs font-mono font-semibold text-emerald-300 tracking-wide uppercase">
              ROBINHOOD CHAIN TELEGRAM AI SENTINEL
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-mono font-black tracking-tight text-white leading-tight max-w-4xl"
          >
            RobinWatch <span className="text-neon-cyan inline-block">AI</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-lime-400">
              Robinhood Chain Token & Wallet Intelligence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl font-sans leading-relaxed"
          >
            Track any token deployed on Robinhood Chain with a single Telegram command. Automatically resolve human developer wallets through factory contracts via Blockscout, score 0-100 risk heuristics, stream live DexScreener market metrics, and engage community groups with a witty AI chatter persona.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={onOpenBotModal}
              className="px-8 py-4 rounded-xl font-mono text-sm font-bold bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-600 text-slate-950 shadow-[0_0_30px_rgba(0,255,136,0.5)] hover:shadow-[0_0_45px_rgba(0,255,136,0.8)] hover:scale-105 transition-all duration-300 flex items-center gap-3 border border-emerald-300"
            >
              <Send className="w-5 h-5 fill-current text-slate-950" />
              <span>ADD BOT TO TELEGRAM GROUP</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToFeatures}
              className="px-8 py-4 rounded-xl font-mono text-sm font-bold bg-slate-900/90 text-slate-200 border border-emerald-500/40 hover:border-emerald-400 hover:text-emerald-300 hover:shadow-[0_0_20px_rgba(0,255,136,0.2)] transition-all duration-300 flex items-center gap-2"
            >
              <span>EXPLORE ALL FEATURES</span>
            </button>
          </motion.div>

          {/* WEBSITE HERO BANNER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-12 w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border-2 border-emerald-400/50 shadow-[0_0_50px_rgba(0,255,136,0.25)] wire-border-cyan relative group bg-slate-950"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent z-10" />
            <img
              src="https://sf4service.site/raw/img_dnv6z6vhv.jpg"
              alt="RobinWatch AI Banner"
              className="w-full h-auto max-h-[480px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-40 pointer-events-none" />
          </motion.div>
        </div>

        {/* ROBINHOOD CHAIN LIVE TOKEN INSPECTOR PANEL IN HOME SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 rounded-3xl p-6 sm:p-8 bg-slate-950/80 border border-emerald-500/30 shadow-[0_0_35px_rgba(0,255,136,0.1)] relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-[11px] font-mono mb-2">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>ROBINHOOD CHAIN TRACKER DEMO</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-mono font-bold text-white">
                Live Tracked Token & Dev Wallet Inspector
              </h2>
              <p className="text-xs text-slate-400 font-sans mt-1">
                Explore real-time data structures populated by Blockscout RPC resolution & DexScreener market streams.
              </p>
            </div>

            {/* Token Selector Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {sampleTokens.map((token) => (
                <button
                  key={token.symbol}
                  onClick={() => setSelectedToken(token)}
                  className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all duration-200 ${
                    selectedToken.symbol === token.symbol
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400 shadow-[0_0_15px_rgba(0,255,136,0.3)]'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span>{token.symbol}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] ${
                      token.riskLevel === 'LOW'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                        : token.riskLevel === 'MEDIUM'
                        ? 'bg-yellow-950 text-yellow-400 border border-yellow-500/30'
                        : 'bg-red-950 text-red-400 border border-red-500/30'
                    }`}
                  >
                    Risk {token.riskScore}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Token Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Token Basic & Market Data */}
            <div className="lg:col-span-7 bg-slate-900/80 rounded-2xl p-5 border border-slate-800 space-y-4 font-mono">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {selectedToken.name} <span className="text-emerald-400">({selectedToken.symbol})</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 break-all flex items-center gap-1.5 mt-0.5">
                    <span>Contract: {selectedToken.contractAddress}</span>
                    <ExternalLink className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  </p>
                </div>
                <span className="px-3 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 text-xs border border-emerald-500/30 font-semibold">
                  {selectedToken.chain}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">PRICE (USD)</span>
                  <span className="text-sm font-bold text-emerald-400">${selectedToken.priceUsd}</span>
                  <span
                    className={`text-[10px] block font-bold ${
                      selectedToken.priceChange24h >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {selectedToken.priceChange24h >= 0 ? '+' : ''}
                    {selectedToken.priceChange24h}% (24h)
                  </span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">FDV / MARKET CAP</span>
                  <span className="text-sm font-bold text-white">
                    ${(selectedToken.fdv / 1000000).toFixed(2)}M
                  </span>
                  <span className="text-[10px] text-slate-500 block">DexScreener Feed</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">POOLED LIQUIDITY</span>
                  <span className="text-sm font-bold text-emerald-400">
                    ${(selectedToken.liquidityUsd / 1000).toFixed(0)}k
                  </span>
                  <span className="text-[10px] text-slate-500 block">DEX Locked</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">24H VOLUME</span>
                  <span className="text-sm font-bold text-purple-400">
                    ${(selectedToken.volume24h / 1000000).toFixed(2)}M
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {selectedToken.buys24h}B / {selectedToken.sells24h}S
                  </span>
                </div>
              </div>

              {/* Dev Wallet Resolution Info */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">RESOLVED HUMAN DEPLOYER WALLET</span>
                    <span className="text-white font-bold break-all">{selectedToken.deployerAddress}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-300 text-[10px] border border-emerald-500/30 flex-shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>BLOCKSCOUT FACTORY TRACED</span>
                </div>
              </div>
            </div>

            {/* Risk Assessment Breakdown */}
            <div className="lg:col-span-5 bg-slate-900/80 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4 font-mono">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-400" />
                    <span>Automated Risk Scoring Engine</span>
                  </h4>
                  <span className="text-[10px] text-slate-400">0-100 Heuristics</span>
                </div>

                <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4">
                  <div
                    className={`w-16 h-16 rounded-full flex flex-col items-center justify-center font-bold border-2 ${
                      selectedToken.riskScore < 30
                        ? 'border-emerald-400 text-emerald-400 bg-emerald-950/50 shadow-[0_0_15px_rgba(0,255,136,0.3)]'
                        : selectedToken.riskScore < 70
                        ? 'border-yellow-400 text-yellow-400 bg-yellow-950/50 shadow-[0_0_15px_rgba(250,204,21,0.3)]'
                        : 'border-red-500 text-red-400 bg-red-950/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                    }`}
                  >
                    <span className="text-xl leading-none">{selectedToken.riskScore}</span>
                    <span className="text-[8px] font-normal tracking-tighter">/ 100</span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block">RISK LEVEL CLASSIFICATION</span>
                    <span
                      className={`text-base font-bold tracking-wider ${
                        selectedToken.riskLevel === 'LOW'
                          ? 'text-emerald-400'
                          : selectedToken.riskLevel === 'MEDIUM'
                          ? 'text-yellow-400'
                          : 'text-red-400'
                      }`}
                    >
                      {selectedToken.riskLevel} RISK
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Confidence Rating: <strong className="text-emerald-400">{selectedToken.confidenceRating}%</strong>
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-emerald-400 font-bold block uppercase tracking-wider">
                    Automated Plain-Language Report:
                  </span>
                  <p className="leading-relaxed font-sans text-slate-300">{selectedToken.explanation}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 text-emerald-400 animate-spin" />
                  Auto-Poller Active (~5 min)
                </span>
                <span className="text-slate-500">Not Financial Advice</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
