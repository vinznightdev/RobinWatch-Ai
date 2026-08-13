import React from 'react';
import { motion } from 'motion/react';
import { Check, X, Sparkles, Bot, Zap, Shield, Crown } from 'lucide-react';

interface SubscriptionSectionProps {
  onOpenBotModal: () => void;
}

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  billingPeriod: string | null;
  description: string;
  badge: string | null;
  isFeatured: boolean;
  buttonText: string;
  features: PlanFeature[];
}

export const SubscriptionSection: React.FC<SubscriptionSectionProps> = ({ onOpenBotModal }) => {
  const plans: Plan[] = [
    {
      id: "basic",
      name: "BASIC",
      price: "Free",
      billingPeriod: null,
      badge: null,
      isFeatured: false,
      description: "Get started with essential token tracking and community access.",
      buttonText: "Current Plan",
      features: [
        { text: "Track 1 token per group", included: true },
        { text: "Market data (/token, /chart, /liquidity)", included: true },
        { text: "Bot status (/status)", included: true },
        { text: "5 free AI questions per group", included: true },
        { text: "Developer wallet view (/dev)", included: false },
        { text: "Buy alerts (/setbuy)", included: false },
        { text: "Verification gate (/setup)", included: false },
        { text: "Social media raids (/raid)", included: false }
      ]
    },
    {
      id: "budget",
      name: "BUDGET",
      price: "$9",
      billingPeriod: "/mo",
      badge: null,
      isFeatured: false,
      description: "For small communities that need wallet monitoring and buy alerts.",
      buttonText: "Choose Budget",
      features: [
        { text: "Track up to 3 tokens per group", included: true },
        { text: "All Basic commands", included: true },
        { text: "Developer wallet view (/dev, /activity, /risk)", included: true },
        { text: "20 AI questions per day", included: true },
        { text: "Buy alerts for 1 token (/setbuy)", included: true },
        { text: "Verification gate (/setup)", included: true },
        { text: "Social media raids (/raid)", included: false },
        { text: "Unlimited AI questions", included: false }
      ]
    },
    {
      id: "plus",
      name: "PLUS",
      price: "$29",
      billingPeriod: "/mo",
      badge: "Most Popular",
      isFeatured: true,
      description: "For active communities with multiple tokens and unlimited AI.",
      buttonText: "Choose Plus",
      features: [
        { text: "Track up to 10 tokens per group", included: true },
        { text: "All Budget commands", included: true },
        { text: "Unlimited AI questions", included: true },
        { text: "AI activity reports (/summary)", included: true },
        { text: "Buy alerts for up to 3 tokens", included: true },
        { text: "Verification gate with custom holding %", included: true },
        { text: "Social media raids (/raid)", included: true },
        { text: "Priority support", included: true }
      ]
    },
    {
      id: "pro",
      name: "PRO",
      price: "$99",
      billingPeriod: "/mo",
      badge: "Developer Tier",
      isFeatured: false,
      description: "For large communities and token teams that need it all.",
      buttonText: "Choose Pro",
      features: [
        { text: "Track unlimited tokens", included: true },
        { text: "All Plus features", included: true },
        { text: "Admin unlimited access (no limits)", included: true },
        { text: "Buy alerts for unlimited tokens", included: true },
        { text: "Custom animated emojis on alerts", included: true },
        { text: "Custom banner branding", included: true },
        { text: "Dedicated support & onboarding", included: true },
        { text: "Early access to new features", included: true }
      ]
    }
  ];

  return (
    <section id="pricing" className="relative py-20 md:py-32 overflow-hidden section-bg-pricing border-t border-slate-900/60">
      {/* Visual background enhancements */}
      <div className="absolute inset-0 cyber-grid-dense opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-semibold mb-4 shadow-[0_4px_12px_rgba(16,185,129,0.2)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>SECTION 04 // UPGRADE PROTOCOL</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-mono font-black text-white tracking-tight"
          >
            Choose Your <span className="text-emerald-400">RobinWatch AI</span> Plan
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-sans"
          >
            Every plan unlocks Telegram bot features for your community group. Upgrade anytime to track more tokens, get buy alerts, and remove AI question limits.
          </motion.p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {plans.map((plan, index) => {
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 transition-all duration-300 ${
                  plan.isFeatured
                    ? 'bg-slate-900/90 border-2 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400/40'
                    : 'bg-slate-950/80 border border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:border-slate-700'
                }`}
              >
                {/* Floating Badge */}
                {plan.badge && (
                  <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-mono font-black tracking-wider uppercase shadow-md ${
                    plan.isFeatured
                      ? 'bg-emerald-400 text-slate-950'
                      : 'bg-slate-800 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {plan.badge}
                  </span>
                )}

                {/* Plan Metadata */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-mono font-black tracking-widest text-slate-400 uppercase">
                      {plan.name}
                    </span>
                    {plan.isFeatured ? (
                      <Crown className="w-5 h-5 text-emerald-400 animate-bounce" />
                    ) : plan.id === 'pro' ? (
                      <Zap className="w-5 h-5 text-purple-400" />
                    ) : (
                      <Shield className="w-5 h-5 text-slate-500" />
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl sm:text-5xl font-mono font-black text-white">
                      {plan.price}
                    </span>
                    {plan.billingPeriod && (
                      <span className="text-sm font-mono text-slate-400">
                        {plan.billingPeriod}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  {/* Spacer or Divider */}
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-6" />

                  {/* Feature list */}
                  <div className="space-y-3.5 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs font-mono">
                        {feature.included ? (
                          <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-slate-200' : 'text-slate-500 line-through decoration-slate-800/80'}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Button */}
                <button
                  onClick={onOpenBotModal}
                  disabled={true}
                  className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold transition-all duration-300 cursor-not-allowed opacity-40 ${
                    plan.isFeatured
                      ? 'bg-gradient-to-r from-emerald-400/80 to-green-600/80 text-slate-950/80 shadow-none'
                      : 'border border-slate-900 bg-slate-950 text-slate-600'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
