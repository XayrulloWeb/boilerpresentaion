import React from 'react';
import { Flame, ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/audio';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    sound.playButtonClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-obsidian-950 border-t border-white/10 pt-16 pb-12 relative z-20 font-mono text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ember-500 to-amber-600 flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white tracking-wider">
                SMART BOILER
              </span>
            </div>
            <p className="text-slate-400 text-xs font-normal leading-relaxed max-w-sm">
              {t.footer.slogan}
            </p>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span>{t.footer.madeBy}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-display font-bold text-white text-xs uppercase tracking-wider">
              {t.footer.sectionsTitle}
            </div>
            <ul className="space-y-2">
              <li><a href="/#problem-solution" className="hover:text-ember-400 transition-colors">01. {t.nav.problem}</a></li>
              <li><a href="/#team" className="hover:text-ember-400 transition-colors">02. {t.nav.team}</a></li>
              <li><a href="/#roadmap" className="hover:text-ember-400 transition-colors">03. {t.nav.roadmap}</a></li>
              <li><a href="/#plan" className="hover:text-ember-400 transition-colors">04. {t.nav.plan}</a></li>
              <li><a href="/demo" className="text-ember-400 hover:text-ember-300 transition-colors">05. {t.nav.demo}</a></li>
              <li><a href="/#api" className="hover:text-ember-400 transition-colors">06. {t.nav.api}</a></li>
            </ul>
          </div>

          {/* Engineering Contacts */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-display font-bold text-white text-xs uppercase tracking-wider">
              {t.footer.engTitle}
            </div>
            <p className="text-slate-400 leading-normal">
              {t.footer.supportText}
            </p>
            <div className="space-y-1 text-slate-200">
              <div>{t.footer.techSupport} <span className="text-ember-400 font-bold">support@smartboiler.tech</span></div>
              <div>{t.footer.phone} <span className="text-white font-bold">+7 (800) 555-32-18 / +998 (90) 000-00-00</span></div>
              <div>{t.footer.network} <span className="text-plasma-400 font-bold">http://boiler.local</span></div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            {t.footer.rights}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-ember-400 transition-colors text-slate-400"
          >
            <span>{t.footer.toTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
