import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Cpu,
  Shield,
  Zap,
  Radio,
  Activity,
  Server,
  Network,
  CheckCircle,
  Layers,
  Sparkles,
  Lock,
  Database,
  Search,
  Bot,
  AlertTriangle,
  RefreshCw,
  LineChart,
  HelpCircle
} from 'lucide-react';
import { ArchitectureLayerItem, DataSourceItem } from '../types';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'datasources' | 'risk'>('architecture');

  const architectureLayers: ArchitectureLayerItem[] = [
    {
      name: 'Telegram Webhook Gateway',
      description: 'Receives group messages and command events, instantly routing payload to RobinWatch AI handlers.',
      schedule: 'Instant / Sub-second',
      icon: 'Radio',
      color: 'border-emerald-400 text-emerald-400 bg-emerald-950/40',
    },
    {
      name: 'Wallet Poller (~5 Min Schedule)',
      description: 'Periodically polls tracked Robinhood Chain developer wallets for new transfer or DEX activity.',
      schedule: 'Every ~5 minutes',
      icon: 'RefreshCw',
      color: 'border-purple-400 text-purple-400 bg-purple-950/40',
    },
    {
      name: 'Automated Risk Analysis Engine',
      description: 'Computes a 0-100 score, confidence rating, and plain-language explanation of on-chain risk factors.',
      schedule: 'On-demand & Alert driven',
      icon: 'Shield',
      color: 'border-emerald-400 text-emerald-400 bg-emerald-950/40',
    },
    {
      name: 'Market Data Layer (DexScreener)',
      description: 'Fetches price, FDV, market cap, pooled liquidity, volume, and buy/sell transaction counts.',
      schedule: 'Real-time streams',
      icon: 'LineChart',
      color: 'border-yellow-400 text-yellow-400 bg-yellow-950/40',
    },
    {
      name: 'AI Group Persona & Summary Layer',
      description: 'Handles natural group conversations, typing indicators, welcome messages, and wallet digests.',
      schedule: 'Contextual triggering',
      icon: 'Bot',
      color: 'border-emerald-300 text-emerald-300 bg-slate-900/60',
    },
    {
      name: 'Web Dashboard & Inspector',
      description: 'Responsive web interface for communities to review tracked tokens, wallets, and bot system logs.',
      schedule: '24/7 Web Access',
      icon: 'Database',
      color: 'border-green-400 text-green-400 bg-green-950/40',
    },
  ];

  const dataSources: DataSourceItem[] = [
    {
      name: 'Robinhood Chain RPC',
      type: 'Blockchain Node Provider',
      description: 'Public JSON-RPC endpoint for querying token code, balances, and smart contract state on Robinhood Chain.',
      endpoints: ['eth_call', 'eth_getBalance', 'eth_getCode', 'eth_getBlockByNumber'],
      badge: 'RPC NODE',
    },
    {
      name: 'Blockscout Explorer API',
      type: 'Block Explorer Indexer',
      description: 'Primary data source for contract creation transactions, factory/launcher tracing, and developer wallet tx history.',
      endpoints: ['api?module=contract', 'api?module=account&action=txlist', 'api?module=transaction'],
      badge: 'EXPLORER API',
    },
    {
      name: 'DexScreener API',
      type: 'DEX Aggregator & Analytics',
      description: 'Provides live liquidity pool stats, token pricing, FDV, 24h volume, and real-time buy/sell ratios.',
      endpoints: ['/latest/dex/tokens/{address}', '/latest/dex/pairs/robinhood'],
      badge: 'MARKET API',
    },
  ];

  return (
    <section id="about" className="relative py-20 md:py-28 bg-slate-950/70 border-t border-b border-emerald-500/20 overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* SECTION TITLE HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-semibold mb-4 shadow-[0_0_15px_rgba(0,255,136,0.2)]"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>SECTION 02 // ABOUT ROBINWATCH AI</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-mono font-black text-white tracking-tight"
          >
            Robinhood Chain Sentinel Architecture
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base text-slate-300 leading-relaxed font-sans"
          >
            RobinWatch AI is a dedicated Telegram bot engineered for community token tracking on Robinhood Chain. Once a contract is added, the bot resolves the underlying human deployer wallet, continuously polls developer transactions, computes 0-100 risk scores, streams DexScreener market data, and participates naturally in group discussions.
          </motion.p>
        </div>

        {/* TAB SELECTOR */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-emerald-500/30 font-mono text-xs">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'architecture'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400 shadow-[0_0_15px_rgba(0,255,136,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>System Architecture</span>
            </button>
            <button
              onClick={() => setActiveTab('datasources')}
              className={`px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'datasources'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400 shadow-[0_0_15px_rgba(0,255,136,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Data Sources (RPC & APIs)</span>
            </button>
            <button
              onClick={() => setActiveTab('risk')}
              className={`px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'risk'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400 shadow-[0_0_15px_rgba(0,255,136,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Deployer Tracing & Risk Engine</span>
            </button>
          </div>
        </div>

        {/* TAB CONTENT: SYSTEM ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Visual Pipeline Circuit Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-emerald-500/30 wire-border-cyan relative overflow-hidden">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="lg:w-1/2 space-y-4">
                  <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase block">
                    [ END-TO-END PIPELINE ]
                  </span>
                  <h3 className="text-2xl font-mono font-bold text-white">
                    Sub-Second Robinhood Chain Sentinel Engine
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    When a Telegram user issues `/track 0x...`, RobinWatch AI parses the Robinhood Chain contract via Blockscout API, resolves the original human deployer, mounts a 5-minute recurring poller, and streams DexScreener market metrics into the group.
                  </p>
                  <div className="space-y-2 pt-2">
                    {[
                      'Blockscout Explorer API for factory deployer resolution',
                      '5-Minute recurring poller for dev wallet transactions',
                      'Automated 0-100 confidence-rated risk heuristics',
                      'DexScreener API live market price & liquidity feed',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-mono text-slate-200">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Diagram Box */}
                <div className="lg:w-1/2 w-full bg-slate-950 p-6 rounded-2xl border border-emerald-500/40 font-mono text-xs">
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                        <span className="font-bold text-white">1. Telegram Webhook</span>
                      </div>
                      <span className="text-[10px] text-emerald-300">Incoming `/track`</span>
                    </div>

                    <div className="text-center text-emerald-400">↓</div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-purple-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-purple-400" />
                        <span className="font-bold text-white">2. Blockscout Deployer Tracer</span>
                      </div>
                      <span className="text-[10px] text-purple-300">Factory Resolved</span>
                    </div>

                    <div className="text-center text-purple-400">↓</div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-emerald-400" />
                        <span className="font-bold text-white">3. 0-100 Risk & Market Engine</span>
                      </div>
                      <span className="text-[10px] text-emerald-300">DexScreener Synced</span>
                    </div>

                    <div className="text-center text-emerald-400">↓</div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-emerald-400 flex items-center justify-between shadow-[0_0_15px_rgba(0,255,136,0.2)]">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-emerald-400" />
                        <span className="font-bold text-white">4. AI Group Telegram Alert</span>
                      </div>
                      <span className="text-[10px] text-emerald-300">Natural Chat & Alert</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid of 6 Architecture Components */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {architectureLayers.map((layer, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                        {layer.schedule}
                      </span>
                      <span className="text-xs font-mono text-slate-500">LAYER 0{idx + 1}</span>
                    </div>
                    <h4 className="text-base font-mono font-bold text-white mb-2">{layer.name}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">{layer.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Status: OPERATIONAL</span>
                    <span className="text-emerald-400 font-bold">100% Active</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB CONTENT: DATA SOURCES */}
        {activeTab === 'datasources' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dataSources.map((ds, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/30 shadow-[0_0_20px_rgba(0,255,136,0.05)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 text-[10px] font-mono border border-emerald-500/40">
                        {ds.badge}
                      </span>
                      <Database className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-mono font-bold text-white mb-1">{ds.name}</h3>
                    <span className="text-xs font-mono text-emerald-400 block mb-3">{ds.type}</span>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">{ds.description}</p>

                    <div className="space-y-1.5 pt-3 border-t border-slate-800 font-mono text-[11px]">
                      <span className="text-[10px] text-slate-400 block uppercase">Sample Endpoints:</span>
                      {ds.endpoints.map((ep, eIdx) => (
                        <div key={eIdx} className="p-1.5 rounded bg-slate-950 text-emerald-300 border border-slate-800 break-all">
                          {ep}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>ROBINHOOD CHAIN</span>
                    <span className="text-emerald-400">CONNECTED</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB CONTENT: DEPLOYER TRACING & RISK SCORING */}
        {activeTab === 'risk' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Deployer Resolution Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-purple-500/40 shadow-[0_0_25px_rgba(157,0,255,0.15)] font-mono">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-purple-950 text-purple-400 border border-purple-500/40">
                    <Search className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Developer Wallet Resolution</h3>
                    <p className="text-xs text-purple-300">Factory / Launcher Contract Tracing</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                  When tokens are launched through token deployment factories or bonding curve launchers on Robinhood Chain, the direct `creator` of the contract is often a factory contract address. RobinWatch AI queries the Blockscout Explorer API to trace back the original transaction origin (`tx.from`), accurately identifying the actual human developer wallet.
                </p>
                <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/30 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Token Contract:</span>
                    <span className="text-white">0x71a2...9b42</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Raw Creator (Factory):</span>
                    <span className="text-yellow-400">0xFA70...8192</span>
                  </div>
                  <div className="flex justify-between text-purple-300 font-bold pt-1 border-t border-slate-800">
                    <span>Resolved Human Wallet:</span>
                    <span className="text-emerald-400">0x3a91...12ab</span>
                  </div>
                </div>
              </div>

              {/* Automated Risk Scoring Breakdown */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/40 shadow-[0_0_25px_rgba(0,255,136,0.15)] font-mono">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Automated Risk Scoring Engine</h3>
                    <p className="text-xs text-emerald-300">0-100 Score + Confidence Rating</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                  Calculates a numerical risk score between 0 (Very Safe) and 100 (Critical Risk), accompanied by a confidence score (%) and plain-language explanation.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Unverified / Anonymous Deployer</span>
                    <span className="text-yellow-400 font-bold">+15 Risk</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Low or Shrinking Pooled Liquidity</span>
                    <span className="text-orange-400 font-bold">+35 Risk</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Sudden Large Dev Token Transfers</span>
                    <span className="text-red-400 font-bold">+45 Risk</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* DISCLAIMER BOX */}
        <div className="mt-16 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
          <HelpCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-slate-400 font-sans leading-relaxed">
            <strong className="text-slate-200 block font-mono mb-1">AUTOMATED HEURISTICS & DISCLAIMER</strong>
            RobinWatch AI uses automated heuristics to evaluate on-chain data for community awareness. Risk scores and transaction flags are based purely on observable on-chain parameters and do not assert developer intent or constitute financial advice. Always perform independent due diligence before trading tokens on Robinhood Chain.
          </div>
        </div>
      </div>
    </section>
  );
};
