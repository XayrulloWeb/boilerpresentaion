import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/audio';

export default function Navbar({ onOpenOrder }) {
  const { lang, setLang, t } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    const newState = sound.toggle();
    setSoundEnabled(newState);
    if (newState) sound.playButtonClick();
  };

  const handleLangChange = (newLang) => {
    sound.playButtonClick();
    setLang(newLang);
  };

  return (
    <header className="fixed top-5 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-4xl mx-auto h-13 rounded-full border border-white/10 bg-obsidian-950/75 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] px-3.5 sm:px-6 flex items-center justify-between pointer-events-auto transition-all duration-300">
        
        {/* Minimal Clean Logo */}
        <Link to="/" onClick={() => sound.playButtonClick()} className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-full bg-ember-500/20 border border-ember-500/40 flex items-center justify-center text-ember-400 group-hover:scale-105 transition-transform">
            <Flame className="w-3.5 h-3.5 fill-ember-400 text-ember-400 animate-pulse" />
          </div>
          <span className="font-display font-bold text-sm tracking-wide text-white">
            Smart Boiler
          </span>
        </Link>

        {/* Minimal Clean Links */}
        <nav className="hidden sm:flex items-center gap-5 text-xs font-medium text-slate-400">
          <a href="/#problem-solution" className="hover:text-white transition-colors">{t.nav.problem}</a>
          <a href="/#team" className="hover:text-white transition-colors">{t.nav.team}</a>
          <a href="/#roadmap" className="hover:text-white transition-colors">{t.nav.roadmap}</a>
          <a href="/#plan" className="hover:text-white transition-colors">{t.nav.plan}</a>
          <Link 
            to="/demo" 
            onClick={() => sound.playButtonClick()}
            className="text-ember-400 hover:text-ember-300 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-ember-400 animate-ping" />
            <span>{t.nav.demo}</span>
          </Link>
          <a href="/#api" className="hover:text-white transition-colors">{t.nav.api}</a>
        </nav>

        {/* Right Controls: Language Selector + Audio + Order CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Tri-Language Toggle */}
          <div className="flex items-center p-0.5 rounded-full bg-obsidian-900 border border-white/10 text-[10px] font-mono">
            {['RU', 'UZ', 'EN'].map((l) => (
              <button
                key={l}
                onClick={() => handleLangChange(l)}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  lang === l
                    ? 'bg-ember-500 text-white font-bold shadow-md shadow-ember-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Sound Toggle */}
          <button 
            onClick={toggleSound}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            title={soundEnabled ? "Выключить звук" : "Включить звук"}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-ember-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>

          {/* Order CTA */}
          <button
            onClick={() => {
              sound.playButtonClick();
              onOpenOrder();
            }}
            className="px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-ember-500 border border-white/15 hover:border-ember-500 transition-all duration-300 flex items-center gap-1.5 active:scale-95"
          >
            <span>{t.nav.order}</span>
            <ArrowRight className="w-3 h-3 opacity-70" />
          </button>
        </div>

      </div>
    </header>
  );
}
