import React, { useState } from 'react';
import { Cpu, ShieldCheck, Zap, Activity } from 'lucide-react';

interface Box3DTransitionProps {
  onModeChange?: (mode: string) => void;
}

export const Box3DTransition: React.FC<Box3DTransitionProps> = ({ onModeChange }) => {
  const [activeFace, setActiveFace] = useState<number>(0);

  const faces = [
    {
      id: 0,
      title: 'Robinhood Chain Tracer',
      mode: 'tracer',
      icon: Cpu,
      color: 'border-cyan-400 text-cyan-400 bg-cyan-950/40',
      tag: 'MODE: BLOCKSCOUT RESOLVER',
      desc: 'Resolves actual human deployer wallets even when deployed via complex factory or launcher contracts.',
      stat: 'Robinhood Chain RPC',
    },
    {
      id: 1,
      title: 'Automated Risk Scoring',
      mode: 'risk',
      icon: ShieldCheck,
      color: 'border-purple-400 text-purple-400 bg-purple-950/40',
      tag: 'MODE: 0-100 RISK MATRIX',
      desc: 'Confidence-rated risk analysis (0-100) detailing liquidity, unverified deployers, and sudden transfer anomalies.',
      stat: 'Real-time Alerts',
    },
    {
      id: 2,
      title: 'DexScreener Market Layer',
      mode: 'market',
      icon: Zap,
      color: 'border-emerald-400 text-emerald-400 bg-emerald-950/40',
      tag: 'MODE: LIVE MARKET FEEDS',
      desc: 'Streams real-time price, FDV, market cap, pooled liquidity, volume, and buy/sell ratios.',
      stat: 'DexScreener API',
    },
    {
      id: 3,
      title: 'AI Group Persona',
      mode: 'ai_persona',
      icon: Activity,
      color: 'border-cyan-300 text-cyan-300 bg-slate-900/60',
      tag: 'MODE: CHAT PARTICIPANT',
      desc: 'Engages casually as a community group member with witty replies, typing indicators, and zero chart spam.',
      stat: 'Human-like AI',
    },
  ];

  const handleNextFace = (index: number) => {
    setActiveFace(index);
    if (onModeChange) {
      onModeChange(faces[index].mode);
    }
  };

  const getTransform = () => {
    switch (activeFace) {
      case 0:
        return 'rotateY(0deg) rotateX(0deg)';
      case 1:
        return 'rotateY(-90deg) rotateX(0deg)';
      case 2:
        return 'rotateY(-180deg) rotateX(0deg)';
      case 3:
        return 'rotateY(90deg) rotateX(0deg)';
      default:
        return 'rotateY(0deg)';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto py-4">
      {/* Mode Selectors */}
      <div className="flex items-center justify-center gap-2 mb-6 flex-wrap z-10">
        {faces.map((f, idx) => {
          const IconComponent = f.icon;
          const isActive = activeFace === idx;
          return (
            <button
              key={f.id}
              onClick={() => handleNextFace(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-all duration-300 ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <IconComponent className="w-3.5 h-3.5" />
              <span>Face 0{idx + 1}</span>
            </button>
          );
        })}
      </div>

      {/* 3D Box Scene Container */}
      <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] perspective-1000 relative my-4">
        {/* Glowing Wire Track Around 3D Box */}
        <div className="absolute -inset-4 rounded-2xl border border-cyan-500/20 pointer-events-none animate-pulse">
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#00f0ff]" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_10px_#9d00ff]" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_10px_#00ff88]" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#00f0ff]" />
        </div>

        {/* 3D Rotating Box */}
        <div
          className="w-full h-full relative transform-style-3d transition-transform duration-700 ease-out"
          style={{ transform: getTransform() }}
        >
          {/* FACE 0: FRONT */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between border-2 border-cyan-500/50 bg-slate-950/90 backdrop-blur-md shadow-[0_0_30px_rgba(0,240,255,0.25)]"
            style={{ transform: 'translateZ(140px)' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/40">
                {faces[0].tag}
              </span>
              <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
            <div className="my-auto">
              <h3 className="text-xl font-bold text-white mb-2 font-mono flex items-center gap-2">
                {faces[0].title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{faces[0].desc}</p>
            </div>
            <div className="pt-3 border-t border-cyan-500/30 flex items-center justify-between text-xs font-mono text-cyan-300">
              <span>STATUS: RESOLVED</span>
              <span className="font-bold text-cyan-400">{faces[0].stat}</span>
            </div>
          </div>

          {/* FACE 1: RIGHT */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between border-2 border-purple-500/50 bg-slate-950/90 backdrop-blur-md shadow-[0_0_30px_rgba(157,0,255,0.25)]"
            style={{ transform: 'rotateY(90deg) translateZ(140px)' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/40">
                {faces[1].tag}
              </span>
              <ShieldCheck className="w-6 h-6 text-purple-400 animate-pulse" />
            </div>
            <div className="my-auto">
              <h3 className="text-xl font-bold text-white mb-2 font-mono flex items-center gap-2">
                {faces[1].title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{faces[1].desc}</p>
            </div>
            <div className="pt-3 border-t border-purple-500/30 flex items-center justify-between text-xs font-mono text-purple-300">
              <span>SECURITY: ACTIVE</span>
              <span className="font-bold text-purple-400">{faces[1].stat}</span>
            </div>
          </div>

          {/* FACE 2: BACK */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between border-2 border-emerald-500/50 bg-slate-950/90 backdrop-blur-md shadow-[0_0_30px_rgba(0,255,136,0.25)]"
            style={{ transform: 'rotateY(180deg) translateZ(140px)' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                {faces[2].tag}
              </span>
              <Zap className="w-6 h-6 text-emerald-400 animate-pulse" />
            </div>
            <div className="my-auto">
              <h3 className="text-xl font-bold text-white mb-2 font-mono flex items-center gap-2">
                {faces[2].title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{faces[2].desc}</p>
            </div>
            <div className="pt-3 border-t border-emerald-500/30 flex items-center justify-between text-xs font-mono text-emerald-300">
              <span>FEEDS: STREAMING</span>
              <span className="font-bold text-emerald-400">{faces[2].stat}</span>
            </div>
          </div>

          {/* FACE 3: LEFT */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between border-2 border-cyan-400/50 bg-slate-950/90 backdrop-blur-md shadow-[0_0_30px_rgba(0,240,255,0.25)]"
            style={{ transform: 'rotateY(-90deg) translateZ(140px)' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-400/40">
                {faces[3].tag}
              </span>
              <Activity className="w-6 h-6 text-cyan-300 animate-pulse" />
            </div>
            <div className="my-auto">
              <h3 className="text-xl font-bold text-white mb-2 font-mono flex items-center gap-2">
                {faces[3].title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{faces[3].desc}</p>
            </div>
            <div className="pt-3 border-t border-cyan-500/30 flex items-center justify-between text-xs font-mono text-cyan-300">
              <span>PERSONA: ONLINE</span>
              <span className="font-bold text-cyan-300">{faces[3].stat}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
