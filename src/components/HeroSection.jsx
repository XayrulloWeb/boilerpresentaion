import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Zap, Shield, Wifi, Activity, ArrowDown, Play, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/audio';

export default function HeroSection({ onOpenOrder }) {
  const { t } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [telemetry, setTelemetry] = useState({
    temp: 62.4,
    current: 0.84,
    fan: 72,
    shnekCountdown: 18,
    isWork: true
  });
  const [activeHotspot, setActiveHotspot] = useState(null);
  const containerRef = useRef(null);

  // Real-time telemetry fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const nextTemp = +(prev.temp + (Math.random() * 0.4 - 0.2)).toFixed(1);
        const nextCurrent = +(0.82 + Math.random() * 0.08).toFixed(2);
        let nextCount = prev.shnekCountdown - 1;
        let isWork = prev.isWork;

        if (nextCount <= 0) {
          isWork = !isWork;
          nextCount = isWork ? 25 : 180;
          sound.playRelayClick();
        }

        return {
          temp: nextTemp < 58 ? 58.5 : nextTemp > 66 ? 65.8 : nextTemp,
          current: isWork ? nextCurrent : 0.00,
          fan: isWork ? 75 : 30,
          shnekCountdown: nextCount,
          isWork
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const hotspots = [
    {
      id: 'brain',
      x: 32,
      y: 35,
      title: 'ESP32 Dual-Core',
      desc: '240 MHz, Real-Time Hardware Protection'
    },
    {
      id: 'combustion',
      x: 68,
      y: 45,
      title: 'Combustion Core',
      desc: 'PWM Blower Turbine up to 100% burn efficiency'
    },
    {
      id: 'sensor',
      x: 74,
      y: 82,
      title: 'DS18B20 1-Wire',
      desc: 'Stainless probe with ±0.1°C digital precision'
    }
  ];

  return (
    <section 
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-28 pb-20 flex flex-col justify-between overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b from-ember-500/20 via-orange-600/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-plasma-400/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headings & Value Props */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Tech badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-ember-500/40 bg-ember-500/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ember-500"></span>
              </span>
              <span className="text-xs font-mono font-medium tracking-wide text-ember-300 uppercase">
                {t.hero.badge}
              </span>
            </div>

            {/* H1 Title */}
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              {t.hero.title1}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ember-400 via-orange-300 to-amber-200">
                {t.hero.titleGradient}
              </span>
              {t.hero.title2}
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              {t.hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#antijam-lab"
                onClick={() => sound.playButtonClick()}
                className="group px-6 py-3.5 rounded-xl font-display font-semibold text-white bg-gradient-to-r from-ember-500 via-orange-500 to-amber-500 shadow-xl shadow-ember-500/25 hover:shadow-ember-500/40 hover:scale-[1.02] transition-all flex items-center gap-2 text-sm"
              >
                <Zap className="w-4 h-4 text-amber-100 group-hover:rotate-12 transition-transform" />
                <span>{t.hero.ctaExplore}</span>
              </a>

              <Link
                to="/demo"
                onClick={() => sound.playButtonClick()}
                className="group px-6 py-3.5 rounded-xl font-display font-semibold text-white bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 hover:border-red-500 transition-all flex items-center gap-2 text-sm shadow-lg shadow-red-600/15 active:scale-95"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <Play className="w-4 h-4 text-red-400 fill-red-400 group-hover:scale-110 transition-transform" />
                <span>{t.hero.demoVideo || 'Видео-Демо (/demo)'}</span>
              </Link>

              <a
                href="#calculator"
                onClick={() => sound.playButtonClick()}
                className="px-6 py-3.5 rounded-xl font-display font-medium text-slate-200 glass-panel glass-panel-hover flex items-center gap-2 text-sm"
              >
                <span>{t.hero.ctaRoi}</span>
              </a>
            </div>

            {/* 4 Micro Key Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
              <div className="p-3 rounded-xl bg-obsidian-800/60 border border-white/5">
                <div className="font-display font-bold text-2xl text-ember-400">{t.hero.metric1Val}</div>
                <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{t.hero.metric1Label}</div>
              </div>

              <div className="p-3 rounded-xl bg-obsidian-800/60 border border-white/5">
                <div className="font-display font-bold text-2xl text-plasma-400">{t.hero.metric2Val}</div>
                <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{t.hero.metric2Label}</div>
              </div>

              <div className="p-3 rounded-xl bg-obsidian-800/60 border border-white/5">
                <div className="font-display font-bold text-2xl text-emerald-400">{t.hero.metric3Val}</div>
                <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{t.hero.metric3Label}</div>
              </div>

              <div className="p-3 rounded-xl bg-obsidian-800/60 border border-white/5">
                <div className="font-display font-bold text-2xl text-amber-300">{t.hero.metric4Val}</div>
                <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{t.hero.metric4Label}</div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Model Visual */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            <div 
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 14}deg) rotateX(${-mousePos.y * 14}deg)`,
                transition: 'transform 0.15s ease-out'
              }}
              className="relative w-full max-w-[540px] aspect-[16/10] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl shadow-ember-500/20 border border-white/15 bg-obsidian-900 group"
            >
              <img
                src="/assets/hero_boiler.jpg"
                alt="Smart Boiler 3D Industrial View"
                className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-60" />

              {/* Hotspots */}
              {hotspots.map((hs) => (
                <div
                  key={hs.id}
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer"
                  onMouseEnter={() => {
                    sound.playButtonClick();
                    setActiveHotspot(hs.id);
                  }}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  <div className="relative">
                    <span className="animate-ping absolute -inset-1 rounded-full bg-ember-500 opacity-60"></span>
                    <div className="w-5 h-5 rounded-full bg-ember-500 border-2 border-white flex items-center justify-center shadow-lg shadow-ember-500/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    </div>
                  </div>

                  {activeHotspot === hs.id && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3 rounded-xl bg-obsidian-900/95 border border-ember-500/50 backdrop-blur-xl shadow-2xl text-left pointer-events-none animate-in fade-in zoom-in-95 duration-200">
                      <div className="font-display font-semibold text-xs text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-ember-400" />
                        <span>{hs.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1 leading-normal">
                        {hs.desc}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {/* Telemetry Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl glass-panel border border-white/10 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-slate-300">ESP32 ON</span>
                  </div>
                  <div className="text-amber-400 font-bold">
                    {telemetry.temp}°C
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-plasma-400 font-medium">
                    I: {telemetry.current}A
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    {telemetry.isWork ? `ON: 00m${telemetry.shnekCountdown}s` : `PAUSE: ${Math.floor(telemetry.shnekCountdown/60)}m`}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="w-full flex justify-center pt-8 relative z-20">
        <a 
          href="#exploded"
          className="flex flex-col items-center gap-2 text-slate-500 hover:text-ember-400 transition-colors group text-xs font-mono"
        >
          <span>{t.hero.scrollDown}</span>
          <ArrowDown className="w-4 h-4 animate-bounce group-hover:text-ember-400" />
        </a>
      </div>

    </section>
  );
}
