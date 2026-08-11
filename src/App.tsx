import React, { useState, useEffect } from 'react';
import { SectionId } from './types';
import { GlowingWiresCanvas } from './components/GlowingWiresCanvas';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { AboutSection } from './components/AboutSection';
import { FeaturesSection } from './components/FeaturesSection';
import { FooterSection } from './components/FooterSection';
import { TelegramBotModal } from './components/TelegramBotModal';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [isBotModalOpen, setIsBotModalOpen] = useState(false);

  // Smooth scroll handler to target section
  const scrollToSection = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // IntersectionObserver to auto update active navbar tab when scrolling
  useEffect(() => {
    const sections: SectionId[] = ['home', 'about', 'features'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 relative selection:bg-emerald-400 selection:text-slate-950 font-sans overflow-x-hidden">
      {/* Background Interactive Wire Canvas */}
      <GlowingWiresCanvas />

      {/* High-Tech Sticky Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenBotModal={() => setIsBotModalOpen(true)}
      />

      {/* Main Content Area - Strictly Home, About, Features, Footer */}
      <main className="relative">
        <HomeSection
          onNavigateToFeatures={() => scrollToSection('features')}
          onOpenBotModal={() => setIsBotModalOpen(true)}
        />

        <AboutSection />

        <FeaturesSection onOpenBotModal={() => setIsBotModalOpen(true)} />
      </main>

      {/* Footer Section */}
      <FooterSection
        onNavigate={scrollToSection}
        onOpenBotModal={() => setIsBotModalOpen(true)}
      />

      {/* Telegram Bot Connection Modal */}
      <TelegramBotModal
        isOpen={isBotModalOpen}
        onClose={() => setIsBotModalOpen(false)}
      />
    </div>
  );
}
