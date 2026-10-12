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
            <div className="space-y-1.5 text-slate-200">
              <div className="flex items-start gap-1.5">
                <span className="text-slate-400 shrink-0">{t.footer.location || 'Локация:'}</span>
                <span className="text-white font-bold">{t.footer.locationVal || 'г. Ургенч, Хорезмская область, Узбекистан'}</span>
              </div>
              <div>
                <span className="text-slate-400">{t.footer.techSupport} </span>
                <a href={`mailto:${t.footer.emailVal || 'xayrulloweb@gmail.com'}`} className="text-ember-400 font-bold hover:underline transition-colors">
                  {t.footer.emailVal || 'xayrulloweb@gmail.com'}
                </a>
              </div>
              <div>
                <span className="text-slate-400">{t.footer.phone} </span>
                <a href="tel:+998943198108" className="text-white font-bold hover:text-ember-400 transition-colors">
                  {t.footer.phoneVal || '+998 94 319 81 08'}
                </a>
              </div>
              <div>
                <span className="text-slate-400">{t.footer.network} </span>
                <span className="text-plasma-400 font-bold">{t.footer.networkVal || 'http://boiler.local'}</span>
              </div>
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
