import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { Bot, Radio, Menu, X, Send, Twitter } from 'lucide-react';

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  onOpenBotModal: () => void;
  onOpenWhitepaper: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenBotModal,
  onOpenWhitepaper,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: SectionId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
  ];

  const handleNavClick = (id: SectionId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-emerald-500/30 shadow-[0_4px_25px_rgba(0,255,136,0.15)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      {/* Top glowing wire border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 group text-left focus:outline-none min-w-0"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 border border-emerald-400 flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(0,255,136,0.4)] group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
              <img
                src="https://sf4service.site/raw/img_65bjn3q7e.png"
                alt="RobinWatch AI Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="font-mono font-black text-lg sm:text-xl text-white tracking-wider flex items-center">
                  RobinWatch <span className="text-neon-cyan ml-1">AI</span>
                </span>
                <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1" />
                  v1 BOT
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 block tracking-widest uppercase truncate max-w-[170px] sm:max-w-none">
                Telegram Autonomous Sentinel
              </span>
            </div>
          </button>

          {/* Desktop Navigation - Strictly Home, About, Features */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-xl border border-emerald-500/30 shadow-[0_0_15px_rgba(0,255,136,0.1)]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all duration-300 relative ${
                    isActive
                      ? 'text-emerald-300 bg-emerald-950/60 shadow-[0_0_10px_rgba(0,255,136,0.3)] border border-emerald-400/50'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-emerald-400 shadow-[0_0_6px_#00ff88]" />
                  )}
                </button>
              );
            })}
            <button
              onClick={onOpenWhitepaper}
              className="px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all duration-300 text-slate-400 hover:text-emerald-300 hover:bg-emerald-950/40 hover:border-emerald-500/30 border border-transparent"
              id="desktop-whitepaper-nav-btn"
            >
              Whitepaper
            </button>
          </nav>

          {/* Right Action CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>TELEGRAM NODE: <strong className="text-emerald-400">ONLINE</strong></span>
            </div>

            {/* Social Links */}
            <a
              href="https://x.com/Robinonhoodrh"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-emerald-500/20 text-slate-400 hover:text-emerald-400 hover:border-emerald-400/50 hover:scale-105 active:scale-95 transition-all shadow-[0_0_10px_rgba(0,255,136,0.05)]"
              title="Follow us on X"
            >
              <Twitter className="w-4 h-4" />
            </a>

            <a
              href="https://t.me/robinonhoodrh"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-emerald-500/20 text-slate-400 hover:text-emerald-400 hover:border-emerald-400/50 hover:scale-105 active:scale-95 transition-all shadow-[0_0_10px_rgba(0,255,136,0.05)]"
              title="Join Telegram Community"
            >
              <Send className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenBotModal}
              className="relative group px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-emerald-400 to-green-600 text-slate-950 shadow-[0_0_20px_rgba(0,255,136,0.4)] hover:shadow-[0_0_30px_rgba(0,255,136,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-slate-950" />
              <span>CONNECT BOT</span>
              <span className="absolute -bottom-1 left-2 right-2 h-[2px] bg-emerald-200 blur-[1px]" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onOpenBotModal}
              className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400"
              aria-label="Connect Telegram Bot"
            >
              <Bot className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-400 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-emerald-500/40 backdrop-blur-xl px-4 py-4 space-y-3 mt-3 animate-fadeIn">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 text-xs font-mono text-slate-300 border border-slate-800">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>TELEGRAM NODE: ONLINE (99.9% Up)</span>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-mono font-medium flex items-center justify-between ${
                  activeSection === item.id
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWhitepaper();
              }}
              className="w-full text-left px-4 py-3 rounded-lg text-sm font-mono font-medium text-slate-300 hover:text-emerald-300 hover:bg-slate-900 flex items-center justify-between border border-transparent"
              id="mobile-whitepaper-nav-btn"
            >
              <span>Whitepaper</span>
              <span className="text-emerald-400 font-mono text-[10px]">DOC // V2</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href="https://x.com/Robinonhoodrh"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 rounded-xl text-xs font-mono font-semibold bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center gap-2"
            >
              <Twitter className="w-4 h-4" />
              <span>X / Twitter</span>
            </a>
            <a
              href="https://t.me/robinonhoodrh"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 rounded-xl text-xs font-mono font-semibold bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Community</span>
            </a>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBotModal();
            }}
            className="w-full py-3 rounded-xl text-xs font-mono font-bold bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,136,0.4)]"
          >
            <Bot className="w-4 h-4" />
            <span>LAUNCH TELEGRAM BOT</span>
          </button>
        </div>
      )}
    </header>
  );
};
