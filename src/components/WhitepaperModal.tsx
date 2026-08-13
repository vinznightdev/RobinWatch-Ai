import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, BookOpen, Terminal, ShieldAlert, Cpu, Database, 
  HelpCircle, ChevronRight, Copy, Check, Search, FileText, Info
} from 'lucide-react';

interface WhitepaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandDoc {
  cmd: string;
  role: 'All Members' | 'Admins Only';
  syntax: string;
  purpose: string;
  output: string;
}

export const WhitepaperModal: React.FC<WhitepaperModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const sections = [
    { id: 'overview', title: '1. Overview', icon: BookOpen },
    { id: 'capabilities', title: '2. Core Capabilities', icon: Info },
    { id: 'architecture', title: '3. System Architecture', icon: Cpu },
    { id: 'datasources', title: '4. Data Sources', icon: Database },
    { id: 'resolution', title: '5. Wallet Resolution', icon: Terminal },
    { id: 'risk', title: '6. Automated Risk Scoring', icon: ShieldAlert },
    { id: 'commands', title: '7. Telegram Commands', icon: Terminal },
    { id: 'deepdives', title: '8. Feature Deep Dives', icon: Info },
    { id: 'persona', title: '9. AI Persona & Gate', icon: HelpCircle },
    { id: 'datamodel', title: '10. Data Model', icon: Database },
    { id: 'disclaimer', title: '11. Disclaimer', icon: ShieldAlert },
  ];

  const commands: CommandDoc[] = [
    {
      cmd: '/start',
      role: 'All Members',
      syntax: '/start',
      purpose: 'Introduces the bot, explains its purpose, and points users to /help for the full command list.',
      output: 'A welcome message describing RobinWatch AI as an automated bot that tracks developer wallet activity on Robinhood Chain and BNB Smart Chain, and answers community questions using verified on-chain and market data.'
    },
    {
      cmd: '/help',
      role: 'All Members',
      syntax: '/help',
      purpose: 'Lists every available command with a short description, grouped by category (tracking, market data, developer activity, admin tools).',
      output: 'A formatted command menu showing all bot commands and a note mentioning that replying to its messages triggers AI conversation.'
    },
    {
      cmd: '/track',
      role: 'Admins Only',
      syntax: '/track <contract_address> [chain]',
      purpose: 'Starts tracking a token. The bot auto-detects the chain (Robinhood Chain or BSC) from DexScreener or on-chain code checks, resolves the real deployer wallet (tracing through factory contracts if needed), reads token metadata (name, symbol, decimals) directly from the contract, fetches live market data, and creates developer wallet records for monitoring.',
      output: 'A rich token info card with name, price, FDV, liquidity, volume, 1h/24h stats, dev wallet balance, token holdings, realized gains, and an automated risk score. Sent with the configured banner image if one is set.'
    },
    {
      cmd: '/untrack',
      role: 'Admins Only',
      syntax: '/untrack',
      purpose: 'Stops tracking the currently linked token in the group. The token record is marked as untracked and the bot no longer polls its developer wallets.',
      output: 'Confirmation message naming the token that was untracked.'
    },
    {
      cmd: '/token',
      role: 'All Members',
      syntax: '/token [contract_address]',
      purpose: 'Shows live market data for the tracked token. If a contract address is provided, displays data for that specific tracked token. The bot refreshes data from DexScreener before replying so figures are never stale.',
      output: 'Price, market cap, FDV, liquidity, 24h volume, 24h price change, 24h buys/sells, DEX name, chart link, and social links (website, Telegram, Discord).'
    },
    {
      cmd: '/dev',
      role: 'All Members',
      syntax: '/dev',
      purpose: 'Lists all verified developer wallets for the tracked token with their on-chain role (deployer, owner). Fetches live native coin and token balances from the chain — not cached values — and shows realized native coin gains from buy/sell activity.',
      output: 'Each wallet\'s address, role, native balance, token holdings, and realized native gain (positive or negative).'
    },
    {
      cmd: '/activity',
      role: 'All Members',
      syntax: '/activity',
      purpose: 'Shows the 5 most recent developer wallet transactions recorded by the poller, sorted by block time descending.',
      output: 'A list of recent transactions with action type, short transaction hash, and a clickable explorer link for each.'
    },
    {
      cmd: '/chart',
      role: 'All Members',
      syntax: '/chart',
      purpose: 'Sends the DexScreener chart image for the tracked token along with a price and market cap snapshot. Falls back to the token\'s logo image if the live chart screenshot is unreachable.',
      output: 'A chart image with a caption showing token name, price, market cap, 24h change, and a link to the live chart.'
    },
    {
      cmd: '/liquidity',
      role: 'All Members',
      syntax: '/liquidity',
      purpose: 'Reports the current USD liquidity for the tracked token.',
      output: 'A single line showing the liquidity in USD, or an unavailable message if no data exists.'
    },
    {
      cmd: '/risk',
      role: 'All Members',
      syntax: '/risk',
      purpose: 'Displays the latest automated risk assessment for the tracked token\'s most recent transaction.',
      output: 'Risk score (0–100), confidence score (0–100), and a plain-language risk explanation — always labeled as automated analysis, never a claim of developer intent.'
    },
    {
      cmd: '/summary',
      role: 'All Members',
      syntax: '/summary',
      purpose: 'Uses AI to generate a concise, factual summary of the 15 most recent developer wallet transactions for the tracked token.',
      output: 'An AI-generated activity report grounded only in verified transaction data.'
    },
    {
      cmd: '/status',
      role: 'All Members',
      syntax: '/status',
      purpose: 'Reports the bot\'s operational status including RPC connectivity, current block number, tracked token, number of monitored wallets, and alert state.',
      output: 'A status summary showing RPC connection state, tracked token name, monitored wallet count, and whether alerts are enabled.'
    },
    {
      cmd: '/setup',
      role: 'Admins Only',
      syntax: '/setup [min%]',
      purpose: 'Enables a verification gate for new members. New members are muted and must prove they hold a minimum percentage of a specified token before they can chat. The admin provides the contract address, then for the minimum holding percentage. The bot auto-detects the chain and token decimals. Requires the bot to be a group admin with ban-user permissions. Send /setup off to disable.',
      output: 'Step-by-step prompts: first for the contract address, then for the minimum percentage. On completion, a confirmation with the token symbol, chain, and threshold. New joiners receive a private DM and a group welcome with a verification button.'
    },
    {
      cmd: '/setbuy',
      role: 'Admins Only',
      syntax: '/setbuy',
      purpose: 'Configures real-time buy alerts for a token. The admin provides the contract address, then optionally a banner image (or /skip), then a single emoji for the alert. The bot resolves all DEX pair addresses during setup so the poller never needs to call DexScreener during active scanning. Buy alerts are delivered in near real-time (every ~30 seconds). Send /setbuy off to disable.',
      output: 'Step-by-step prompts for contract, banner, and emoji. On completion, a confirmation showing the token symbol, emoji, banner status, and number of DEX pairs found. Thereafter, every on-chain buy triggers a formatted alert with USD cost, ticker, animated emoji (scaling with buy size), token amount, position percentage, a hyperlinked transaction hash, and market cap.'
    },
    {
      cmd: '/settings',
      role: 'Admins Only',
      syntax: '/settings alerts_on|alerts_off|ai_on|ai_off',
      purpose: 'Toggles bot behavior for the group: enable/disable developer wallet alerts, and enable/disable AI conversational replies.',
      output: 'A confirmation that the setting was updated.'
    },
    {
      cmd: '/admin',
      role: 'All Members',
      syntax: '/admin',
      purpose: 'Lists the admin-only commands and notes that only group admins can run them.',
      output: 'A short summary of admin commands: /track, /untrack, /settings.'
    }
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const filteredCommands = commands.filter(cmd => 
    cmd.cmd.toLowerCase().includes(searchQuery.toLowerCase()) || 
    cmd.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.syntax.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            id="whitepaper-backdrop"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-6xl h-[85vh] bg-[#090d16] border border-emerald-500/40 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.25)] flex flex-col z-10"
            id="whitepaper-modal-card"
          >
            {/* Header */}
            <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-mono font-black text-white text-base tracking-wider flex items-center gap-2">
                    ROBINWATCH AI <span className="text-emerald-400">// TECHNICAL WHITEPAPER</span>
                  </h3>
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    Version 2.0 • August 2026 • Robinhood Chain Sentinel
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all border border-transparent hover:border-slate-700 active:scale-95"
                id="close-whitepaper-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split Screen Content */}
            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar Tabs - Left */}
              <div className="w-64 border-r border-slate-800/80 bg-slate-950/40 overflow-y-auto hidden md:block flex-shrink-0">
                <div className="p-4 border-b border-slate-800/50">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase block">
                    TABLE OF CONTENTS
                  </span>
                </div>
                <nav className="p-2 space-y-1">
                  {sections.map((sect) => {
                    const Icon = sect.icon;
                    const isActive = activeTab === sect.id;
                    return (
                      <button
                        key={sect.id}
                        onClick={() => setActiveTab(sect.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left font-mono text-xs transition-all ${
                          isActive
                            ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border border-transparent'
                        }`}
                        id={`wp-tab-${sect.id}`}
                      >
                        <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                        <span className="truncate">{sect.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Main Document Content - Right */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#070a11] relative">
                {/* Visual grid overlay for sentinel aesthetic */}
                <div className="absolute inset-0 cyber-grid-dense opacity-5 pointer-events-none" />

                <div className="relative max-w-4xl mx-auto space-y-8 pb-12 font-sans">
                  
                  {/* Active Tab rendering */}
                  {activeTab === 'overview' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="border-l-4 border-emerald-400 pl-4 py-1">
                        <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block">Section 01</span>
                        <h2 className="text-2xl font-mono font-black text-white">Overview</h2>
                      </div>
                      
                      <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                        <strong>RobinWatch AI</strong> is an advanced, autonomous Telegram assistant built specifically to provide automated real-time tracking, risk intelligence, and on-chain analytics for communities deploying on the <strong>Robinhood Chain</strong> and <strong>BNB Smart Chain</strong>.
                      </p>
                      
                      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 font-mono text-xs leading-relaxed text-slate-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                        <span className="text-emerald-400 font-bold block mb-2">// ABSTRACT FRAMEWORK</span>
                        Once any token contract is registered via community commands, the system initiates deep deployer tracing and transaction poller cycles. It serves market indices directly in the group chat, automates holding verification to gate spam accounts, and participates as a natural conversational AI backed securely by on-chain telemetry.
                      </div>

                      <p className="text-slate-400 leading-relaxed text-sm">
                        With standard tools often misrepresenting developer creations or returning stale metrics, RobinWatch AI uses a multi-layered verification system to isolate the authentic human controller of a token, score transactions, and maintain direct connectivity via fully automated hooks.
                      </p>
                    </motion.div>
                  )}

                  {activeTab === 'capabilities' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="border-l-4 border-emerald-400 pl-4 py-1">
                        <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block">Section 02</span>
                        <h2 className="text-2xl font-mono font-black text-white">Core Capabilities</h2>
                      </div>

                      <p className="text-slate-300 text-sm leading-relaxed">
                        RobinWatch AI delivers a comprehensive suite of security features and utility tools directly inside your Telegram community chat group:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { title: 'Deployer Resolution', desc: 'Traces through complex factory launcher and deployment routines to isolate the authentic deployer wallet address.' },
                          { title: 'Automated Wallet Polling', desc: 'Runs scheduled background balances and transfer checks on verified developer addresses.' },
                          { title: 'Confidence-Rated Risk Scores', desc: 'Calculates a 0-100 hazard quotient based on wallet behaviors, smart contract triggers, and liquidity movements.' },
                          { title: 'Sub-30s Buy Signals', desc: 'Monitors decentralized exchange liquidity pairs to format immediate buy graphics and transaction reports.' },
                          { title: 'On-Chain Access Gating', desc: 'Locks chat permissions for new members until they verify ownership of a minimum token percentage threshold.' },
                          { title: 'AI-Enhanced Summaries', desc: 'Converts complex wallet sequences into highly readable summaries using structured model intelligence.' }
                        ].map((cap, i) => (
                          <div key={i} className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 hover:border-slate-700 transition-all">
                            <h4 className="font-mono text-xs font-bold text-white mb-1.5 flex items-center gap-2">
                              <span className="text-emerald-400">›</span> {cap.title}
                            </h4>
                            <p className="text-xs text-slate-400 leading-relaxed">{cap.desc}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'architecture' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="border-l-4 border-emerald-400 pl-4 py-1">
                        <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block">Section 03</span>
                        <h2 className="text-2xl font-mono font-black text-white">System Architecture</h2>
                      </div>

                      <p className="text-slate-300 text-sm leading-relaxed">
                        The platform relies on an event-driven, decoupled layer structure to process smart contracts, scan RPC logs, and serve chat communities with near-zero latency.
                      </p>

                      {/* Visual Flow Chart */}
                      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 md:p-6 font-mono text-[11px] text-slate-400 space-y-4">
                        <span className="text-emerald-400 font-bold text-xs block">// BLOCKFLOW SCHEMATIC</span>
                        
                        <div className="flex flex-col gap-3 max-w-md mx-auto">
                          <div className="border border-slate-700 bg-slate-900 rounded p-2.5 text-center text-white">
                            🚀 Telegram Webhook Receiver
                            <div className="text-[9px] text-slate-500">Filters Commands, Messages, & Chat Join events</div>
                          </div>
                          <div className="text-center text-emerald-400">⬇️</div>
                          <div className="border border-slate-700 bg-slate-900 rounded p-2.5 text-center text-white">
                            ⚙️ Message Routing / Command Dispatcher
                            <div className="text-[9px] text-slate-500">Authenticates permissions (Admins vs. Members)</div>
                          </div>
                          <div className="text-center text-emerald-400">⬇️</div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="border border-emerald-500/20 bg-emerald-950/10 rounded p-2 text-center text-emerald-300">
                              📡 RPC Engine (Balances)
                            </div>
                            <div className="border border-purple-500/20 bg-purple-950/10 rounded p-2 text-center text-purple-300">
                              📊 DEX Feed (Token Prices)
                            </div>
                          </div>
                          <div className="text-center text-emerald-400">⬇️</div>
                          <div className="border border-slate-700 bg-slate-900 rounded p-2.5 text-center text-white">
                            🤖 AI Logic Engine (Gemini Pro Node)
                            <div className="text-[9px] text-slate-500">Maintains 5-min context buffer & conversational flow</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 font-mono text-xs">
                        {[
                          { title: 'Telegram Webhook', text: 'Routes every chat update and inline group prompt to the processing thread instantly.' },
                          { title: 'Wallet Poller', text: 'Scans resolved developer addresses on a robust 5-minute background routine to register transfers.' },
                          { title: 'Buy Alert Poller', text: 'A dedicated low-latency loop scanning DEX pairs every 30 seconds to catch market movements.' },
                          { title: 'Verification Gate', text: 'Mutes new joiners, scans balances, and runs 5-minute rechecks up to 3 times to prevent group spam.' }
                        ].map((item, index) => (
                          <div key={index} className="flex gap-4 border-b border-slate-800/60 pb-3">
                            <span className="text-emerald-400 font-bold min-w-[120px]">{item.title}</span>
                            <span className="text-slate-400">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'datasources' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="border-l-4 border-emerald-400 pl-4 py-1">
                        <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block">Section 04</span>
                        <h2 className="text-2xl font-mono font-black text-white">Data Sources</h2>
                      </div>

                      <p className="text-slate-300 text-sm leading-relaxed">
                        RobinWatch AI maintains strict cryptographic groundings by pulling solely from verified RPC and API endpoints:
                      </p>

                      <div className="space-y-4">
                        {[
                          { name: 'Robinhood Chain & BSC RPC Node', role: 'Fetches raw smart contract constants, verifies balances, queries token decimals, and decodes total supply data directly from the network block headers.' },
                          { name: 'Blockscout Explorer API', role: 'Retrieves contract creation parameters, traces factory transactions to isolate creators, logs block times, and processes historic transfer registers.' },
                          { name: 'DexScreener API Layer', role: 'Streams real-time pricing grids, FDV, decentralized liquidity amounts, 24-hour trade statistics, and chart imagery on demand.' }
                        ].map((src, i) => (
                          <div key={i} className="bg-slate-900/30 border border-slate-800 rounded-xl p-4 flex gap-4 items-start">
                            <div className="w-6 h-6 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-[10px] font-mono text-emerald-400 font-bold">0{i+1}</span>
                            </div>
                            <div>
                              <h4 className="font-mono text-xs font-bold text-white mb-1">{src.name}</h4>
                              <p className="text-xs text-slate-400 leading-relaxed">{src.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'resolution' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="border-l-4 border-emerald-400 pl-4 py-1">
                        <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block">Section 05</span>
                        <h2 className="text-2xl font-mono font-black text-white">Developer Wallet Resolution</h2>
                      </div>

                      <p className="text-slate-300 text-sm leading-relaxed">
                        A major exploit vector in modern meme coin tracking is contract launchpad routing. Token creators frequently deploy contracts via launchpads or automated factory contracts, causing traditional explorers to mark the factory itself as the "Creator."
                      </p>

                      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 font-mono text-xs text-slate-300 space-y-3">
                        <span className="text-emerald-400 font-black tracking-widest uppercase block">// SENTINEL TRACING ALGORITHM</span>
                        <p>
                          RobinWatch AI employs a recursive transaction trace. Upon executing <code className="text-emerald-400 bg-slate-950 px-1 py-0.5 rounded text-[10px]">/track</code>, the resolution engine inspects the contract's generation transactions to check if it matches known factory signatures.
                        </p>
                        <p>
                          If a factory pattern is found, the engine queries the internal call-tree until it isolates the genuine human address that initiated the launch. The authentic wallet is then bound and persistently recorded, bypassing any transient RPC errors.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'risk' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="border-l-4 border-emerald-400 pl-4 py-1">
                        <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block">Section 06</span>
                        <h2 className="text-2xl font-mono font-black text-white">Automated Risk Scoring</h2>
                      </div>

                      <p className="text-slate-300 text-sm leading-relaxed">
                        To help community members spot bad actors early, RobinWatch AI analyzes and calculates a risk quotient (0 to 100) for every developer transaction.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { range: '0 - 30', level: 'LOW HAZARD', bg: 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400', desc: 'Standard behavior. Developer wallets show regular holdings or standard liquidity pools.' },
                          { range: '31 - 70', level: 'ELEVATED RISK', bg: 'bg-yellow-950/20 border-yellow-500/30 text-yellow-400', desc: 'Large wallet transfers detected, missing token deployer lockups, or low trading liquidity.' },
                          { range: '71 - 100', level: 'CRITICAL WARNING', bg: 'bg-red-950/20 border-red-500/30 text-red-400', desc: 'Unverified creator wallet activity, sudden liquidity drains, or high-volume transfers to unlinked addresses.' }
                        ].map((tier, i) => (
                          <div key={i} className={`border rounded-xl p-4 font-mono text-xs ${tier.bg}`}>
                            <span className="font-black block text-base">{tier.range}</span>
                            <span className="font-bold uppercase tracking-wider block mb-2 text-[10px]">{tier.level}</span>
                            <p className="text-slate-400 text-[11px] leading-relaxed font-sans">{tier.desc}</p>
                          </div>
                        ))}
                      </div>

                      <p className="text-xs text-slate-500 italic font-mono leading-relaxed">
                        Note: Risk calculations are automated heuristics based on public blockchain activity and never constitute legal declarations or claims of intent. Always complete your own research (DYOR).
                      </p>
                    </motion.div>
                  )}

                  {activeTab === 'commands' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="border-l-4 border-emerald-400 pl-4 py-1">
                        <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block">Section 07</span>
                        <h2 className="text-2xl font-mono font-black text-white">Telegram Commands Documentation</h2>
                      </div>

                      <p className="text-slate-300 text-sm leading-relaxed">
                        Search and inspect the complete catalog of terminal instructions supported by the Sentinel bot.
                      </p>

                      {/* Search bar */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          placeholder="Search command or utility..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="space-y-4">
                        {filteredCommands.length > 0 ? (
                          filteredCommands.map((command, idx) => (
                            <div key={idx} className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
                              <div className="flex items-center justify-between flex-wrap gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-mono text-xs font-black text-emerald-400">
                                    {command.cmd}
                                  </span>
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono border ${
                                    command.role === 'Admins Only' 
                                      ? 'border-red-500/30 bg-red-950/10 text-red-400' 
                                      : 'border-slate-800 bg-slate-900 text-slate-400'
                                  }`}>
                                    {command.role}
                                  </span>
                                </div>
                                <button
                                  onClick={() => handleCopy(command.syntax)}
                                  className="p-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white flex items-center gap-1 text-[10px] font-mono transition-all"
                                  title="Copy syntax"
                                >
                                  {copiedText === command.syntax ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-400" />
                                      <span className="text-emerald-400">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                                <div className="space-y-1">
                                  <span className="text-slate-500 text-[10px] block">// SYNTAX</span>
                                  <code className="text-slate-300 block bg-slate-900/60 p-2 rounded border border-slate-900">
                                    {command.syntax}
                                  </code>
                                </div>
                                <div className="space-y-1">
                                  <span className="text-slate-500 text-[10px] block">// PURPOSE</span>
                                  <p className="text-slate-400 font-sans leading-relaxed">
                                    {command.purpose}
                                  </p>
                                </div>
                              </div>

                              <div className="pt-2 border-t border-slate-900 font-mono text-xs text-slate-400">
                                <span className="text-slate-500 text-[10px] block">// SENTINEL OUTPUT EXPECTATION</span>
                                <p className="font-sans text-slate-300 mt-1 leading-relaxed">
                                  {command.output}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 font-mono text-xs text-slate-500">
                            No commands found matching "{searchQuery}"
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'deepdives' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="border-l-4 border-emerald-400 pl-4 py-1">
                        <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block">Section 08</span>
                        <h2 className="text-2xl font-mono font-black text-white">Feature Deep Dives</h2>
                      </div>

                      <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
                        <div>
                          <h4 className="font-mono text-xs font-bold text-white mb-2 flex items-center gap-2">
                            <span className="text-emerald-400">■</span> Real-Time Buy Alerts
                          </h4>
                          <p className="text-slate-400">
                            Once configured via the <code className="text-emerald-400 bg-slate-950 px-1 py-0.5 rounded text-[10px]">/setbuy</code> protocol, the system maps decentralized liquidity pairs. It monitors transactions on-chain every 30 seconds, generating high-contrast graphics with formatted emojis scaling dynamically based on the buy volume.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-mono text-xs font-bold text-white mb-2 flex items-center gap-2">
                            <span className="text-emerald-400">■</span> Member Verification Gate
                          </h4>
                          <p className="text-slate-400">
                            Protects group activity from auto-spammers by requiring new members to hold a specified threshold. Upon entering the chat, the bot restricts their messaging permissions and delivers a private DM verification portal. The user links their wallet privately without exposing keys or balances to other group members.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-mono text-xs font-bold text-white mb-2 flex items-center gap-2">
                            <span className="text-emerald-400">■</span> Webhook Auto-Reconnect
                          </h4>
                          <p className="text-slate-400">
                            To maintain 100% server uptime, a background daemon registers the Telegram webhook every 30 minutes. If communication with the primary cloud node drops, the daemon resolves alternate tunnels and re-establishes synchronization automatically.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'persona' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="border-l-4 border-emerald-400 pl-4 py-1">
                        <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block">Section 09</span>
                        <h2 className="text-2xl font-mono font-black text-white">AI Community Persona & Gating</h2>
                      </div>

                      <p className="text-slate-300 text-sm leading-relaxed">
                        Unlike traditional clinical data monitors, RobinWatch AI participates organically in group conversations. It reads chat contexts, replies casually in the user's language, and triggers typing prompts to look like an authentic member of the community.
                      </p>

                      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                        <h4 className="font-mono text-xs font-bold text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          THE 1% TOKEN HOLDING GATE
                        </h4>
                        
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">
                          To protect computing power resources and reward active holders, regular group members get 5 free AI queries. Once depleted, they must hold at least 1% of the group's verification token to continue interacting. The sentinel scans holdings every 5 minutes—unlocking access automatically the moment their token balance is satisfied.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'datamodel' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="border-l-4 border-emerald-400 pl-4 py-1">
                        <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block">Section 10</span>
                        <h2 className="text-2xl font-mono font-black text-white">Core Data Model</h2>
                      </div>

                      <p className="text-slate-300 text-sm leading-relaxed">
                        RobinWatch AI persists and syncs key records inside its secure database layers:
                      </p>

                      <div className="space-y-3 font-mono text-xs">
                        {[
                          { schema: 'TrackedToken', details: 'Holds token metadata, deployer addresses, socials, and growth metrics.' },
                          { schema: 'DeveloperWallet', details: 'Maintains wallet roles (deployer, owner), balances, and realized coin gains.' },
                          { schema: 'WalletTransaction', details: 'Stores transaction hashes, decoded action types, and automated risk scoring.' },
                          { schema: 'TelegramGroup', details: 'Configures group specific gates, buy-alert emoji parameters, and contract targets.' },
                          { schema: 'PendingVerification', details: 'Logs pending wallet verification status and kick checklists.' },
                          { schema: 'HoldingRecheck', details: 'Schedules 5-minute recurrent balance polls for restricted accounts.' }
                        ].map((model, idx) => (
                          <div key={idx} className="bg-slate-900/20 border border-slate-800/80 rounded-lg p-3 hover:border-slate-800 flex flex-col md:flex-row md:items-center gap-2">
                            <span className="font-bold text-emerald-400 min-w-[150px]">{model.schema}</span>
                            <span className="text-slate-400 font-sans text-xs">{model.details}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'disclaimer' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="border-l-4 border-emerald-400 pl-4 py-1">
                        <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block">Section 11</span>
                        <h2 className="text-2xl font-mono font-black text-white">Disclaimer</h2>
                      </div>

                      <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl text-slate-400 text-xs leading-relaxed space-y-3">
                        <p>
                          RobinWatch AI compiles and formats public ledger activity on Robinhood Chain and BNB Smart Chain. Any data provided, including risk metrics, developer wallet indices, and trading graphs, is served purely for educational and community coordination purposes.
                        </p>
                        <p>
                          Automated risk assessments are generated programmatically based on heuristic flags and never constitute legal advice or allegations of malicious intent. Developers can hold various legitimate reasons for moving assets. Always do your own research (DYOR) and evaluate token contracts independently.
                        </p>
                      </div>
                    </motion.div>
                  )}

                </div>
              </div>
            </div>

            {/* Bottom Sticky Status */}
            <div className="px-6 py-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ROBINWATCH SECURE PROTOCOL INTEGRATED</span>
              </div>
              <span className="hidden sm:inline">ROBINHOOD CHAIN SENTINEL SUITE © 2026</span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
