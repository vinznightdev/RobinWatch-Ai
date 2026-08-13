import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Send, X, Check, Copy, Bot, Shield, Sparkles, ExternalLink } from 'lucide-react';

interface TelegramBotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TelegramBotModal: React.FC<TelegramBotModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [pairingCode, setPairingCode] = useState('ROBIN-8894-RW');

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pairingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateNewCode = () => {
    const randomCode = `ROBIN-${Math.floor(1000 + Math.random() * 9000)}-RW`;
    setPairingCode(randomCode);
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-lg bg-slate-900 border-2 border-emerald-400 rounded-3xl p-5 sm:p-8 shadow-[0_0_50px_rgba(0,255,136,0.4)] relative wire-border-cyan overflow-hidden my-auto max-h-[90vh] overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-950 border border-emerald-400 flex items-center justify-center overflow-hidden text-emerald-400 shadow-[0_0_12px_rgba(0,255,136,0.3)]">
                <img
                  src="https://sf4service.site/raw/img_65bjn3q7e.png"
                  alt="RobinWatch AI Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="text-lg font-mono font-bold text-white">Connect Telegram Sentinel</h3>
                <p className="text-xs font-mono text-slate-400">@robinwatch_bot • Robinhood Chain Sentinel</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 hover:border-emerald-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Steps */}
          <div className="space-y-4 mb-6">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-300">
                <span className="font-semibold">STEP 1: GET PAIRING KEY</span>
                <button
                  onClick={generateNewCode}
                  className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> Generate New
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-emerald-500/40">
                <span className="font-mono font-bold text-base text-emerald-400 tracking-wider">
                  {pairingCode}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 text-xs font-mono flex items-center gap-1.5 border border-emerald-500/40"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Key'}</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-semibold text-emerald-300 block">
                STEP 2: ADD TO TELEGRAM GROUP
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Open Telegram, search for <strong className="text-emerald-400">@robinwatch_bot</strong>, click Start or add it to your Telegram community to track Robinhood Chain tokens, monitor developer wallets, and enable automated risk alerts.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://t.me/robinwatch_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-emerald-400 to-green-600 text-slate-950 shadow-[0_0_25px_rgba(0,255,136,0.4)] hover:shadow-[0_0_35px_rgba(0,255,136,0.7)] transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 fill-current" />
              <span>OPEN TELEGRAM BOT</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="px-5 py-3.5 rounded-xl font-mono text-xs text-slate-300 hover:bg-slate-800 border border-slate-800"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};
