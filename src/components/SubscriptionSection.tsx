import React from 'react';
import { motion } from 'motion/react';
import { Check, X, Sparkles, Zap, Shield, Crown } from 'lucide-react';

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
  priceSuffix: string | null;
  description: string;
  badge: string | null;
  isFeatured: boolean;
  buttonText: string;
  isDisabled: boolean;
  features: PlanFeature[];
}

export const SubscriptionSection: React.FC<SubscriptionSectionProps> = ({ onOpenBotModal }) => {
  const plans: Plan[] = [
    {
      id: "basic",
      name: "BASIC",
      price: "Free",
      priceSuffix: null,
      badge: null,
      isFeatured: false,
      isDisabled: true,
      buttonText: "Current Plan",
      description: "Essential token tracking and limited community access for any group.",
      features: [
        { text: "Track 1 token per group (/track)", included: true },
        { text: "Live market data (/token, /chart, /liquidity)", included: true },
        { text: "Bot status check (/status)", included: true },
        { text: "5 free AI questions per member", included: true },
        { text: "Welcome messages for new members", included: true },
        { text: "Developer wallet monitoring (/dev, /activity)", included: false },
        { text: "Automated risk scoring (/risk)", included: false },
        { text: "Buy alerts (/setbuy)", included: false },
        { text: "Member verification gate (/setup)", included: false },
        { text: "Social media raids (/raid)", included: false },
        { text: "AI activity reports (/summary)", included: false },
        { text: "Unlimited AI questions", included: false }
      ]
    },
    {
      id: "pro",
      name: "PRO",
      price: "1%",
      priceSuffix: "/holding",
      badge: "Most Popular",
      isFeatured: true,
      isDisabled: false,
      buttonText: "Hold 1% to Unlock",
      description: "Full bot access with no limits. Requires holding at least 1% of the group's verification token to unlock unlimited usage.",
      features: [
        { text: "Track multiple tokens per group (/track)", included: true },
        { text: "All Basic commands included", included: true },
        { text: "Developer wallet monitoring (/dev, /activity)", included: true },
        { text: "Automated risk scoring (/risk)", included: true },
        { text: "Real-time buy alerts (/setbuy)", included: true },
        { text: "Member verification gate (/setup)", included: true },
        { text: "Social media raids (/raid)", included: true },
        { text: "AI activity reports (/summary)", included: true },
        { text: "Unlimited AI questions (with 1% holding)", included: true },
        { text: "Admin unlimited access — no limits", included: true },
        { text: "Custom banner & emoji on buy alerts", included: true },
        { text: "Automatic holding re-check every 5 min", included: true }
      ]
    }
  ];

  return (
    <section id="pricing" className="relative py-20 md:py-32 overflow-hidden section-bg-pricing border-t border-slate-900/60">
      {/* Visual background enhancements */}
      <div className="absolute inset-0 cyber-grid-dense opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            RobinWatch AI Plans
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-sans"
          >
            Start free with Basic, or unlock the full bot with PRO. PRO members must hold at least 1% of their group's verification token to use the bot with no limits.
          </motion.p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          {plans.map((plan, index) => {
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative flex flex-col justify-between rounded-2xl p-6 sm:p-8 transition-all duration-300 ${
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
                    ) : (
                      <Shield className="w-5 h-5 text-slate-500" />
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl sm:text-5xl font-mono font-black text-white">
                      {plan.price}
                    </span>
                    {plan.priceSuffix && (
                      <span className="text-sm font-mono text-emerald-400 font-semibold">
                        {plan.priceSuffix}
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
                  disabled={plan.isDisabled}
                  className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold transition-all duration-300 ${
                    plan.isDisabled
                      ? 'border border-slate-900 bg-slate-950/40 text-slate-600 cursor-not-allowed opacity-50'
                      : plan.isFeatured
                      ? 'active:scale-95 bg-gradient-to-r from-emerald-400 to-green-600 text-slate-950 shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:shadow-[0_0_30px_rgba(0,255,136,0.6)] hover:scale-[1.02]'
                      : 'active:scale-95 border border-slate-800 bg-slate-900/40 text-slate-300 hover:text-white hover:border-slate-600 hover:bg-slate-900'
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

