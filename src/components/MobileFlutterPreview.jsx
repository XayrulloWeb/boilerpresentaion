import React, { useState } from 'react';
import { Smartphone, Flame, Wind, RotateCw, RotateCcw, Sliders, Globe, Shield, RefreshCw } from 'lucide-react';
import { sound } from '../utils/audio';

export default function MobileFlutterPreview() {
  const [lang, setLang] = useState('RU'); // RU, UZ, EN
  const [activeTab, setActiveTab] = useState('control'); // 'control' or 'service'
  const [targetTemp, setTargetTemp] = useState(62);
  const [currentTemp, setCurrentTemp] = useState(61.8);
  const [fanActive, setFanActive] = useState(true);
  const [shnekFwdActive, setShnekFwdActive] = useState(true);
  const [shnekRevActive, setShnekRevActive] = useState(false);

  // Multilingual strings for Flutter UI
  const t = {
    RU: {
      title: 'УПРАВЛЕНИЕ КОТЛОМ',
      target: 'ЦЕЛЕВАЯ ТЕМПЕРАТУРА',
      status: 'НАГРЕВ И ПОДАЧА',
      current: 'ТОК МОТОРА',
      shnekFwd: 'Шнек Вперед (18)',
      shnekRev: 'Шнек Реверс (19)',
      fan: 'Турбина Наддува (4)',
      tabCtrl: 'Дашборд',
      tabSrv: 'Сервис-Тест',
      warning: 'СИСТЕМА В НОРМЕ',
      testNotice: 'Ручной тест замыкает реле напрямую через ESP32'
    },
    UZ: {
      title: 'QOZON BOSHQARUVI',
      target: 'BELGILANGAN HARORAT',
      status: 'QIZDIRISH VA UZATISH',
      current: 'MOTOR TOKI',
      shnekFwd: 'Shnek Oldinga (18)',
      shnekRev: 'Shnek Revers (19)',
      fan: 'Dam Beruvchi Parrak (4)',
      tabCtrl: 'Asosiy',
      tabSrv: 'Xizmat-Test',
      warning: 'TIZIM NORMAL',
      testNotice: 'Qo\'lda test qilish relelarni to\'g\'ridan to\'g\'ri ulaydi'
    },
    EN: {
      title: 'SMART BOILER IOT',
      target: 'TARGET TEMPERATURE',
      status: 'HEATING & FEEDING',
      current: 'MOTOR CURRENT',
      shnekFwd: 'Auger Forward (18)',
      shnekRev: 'Auger Reverse (19)',
      fan: 'Blower Turbine (4)',
      tabCtrl: 'Dashboard',
      tabSrv: 'Service Test',
      warning: 'SYSTEM NORMAL',
      testNotice: 'Manual test controls relays via local ESP32'
    }
  }[lang];

  const handleTempChange = (e) => {
    setTargetTemp(parseInt(e.target.value));
  };

  const toggleFan = () => {
    sound.playRelayClick();
    if (!fanActive) sound.playTurbine();
    setFanActive(!fanActive);
  };

  const toggleShnekFwd = () => {
    sound.playRelayClick();
    setShnekFwdActive(!shnekFwdActive);
    if (shnekRevActive) setShnekRevActive(false);
  };

  const toggleShnekRev = () => {
    sound.playRelayClick();
    setShnekRevActive(!shnekRevActive);
    if (shnekFwdActive) setShnekFwdActive(false);
  };

  return (
    <section id="mobile-app" className="py-28 relative bg-obsidian-900 border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-ember-500/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-plasma-400/30 bg-plasma-400/10 text-plasma-300 text-xs font-mono">
            <Smartphone className="w-3.5 h-3.5" />
            <span>ЕДИНАЯ ЭКОСИСТЕМА: FLUTTER APP + WEB-UI</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Котел на ладони: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-plasma-400 via-amber-300 to-ember-400">
              попробуйте мобильное приложение прямо сейчас
            </span>
          </h2>
          <p className="text-slate-400 text-base">
            Полнофункциональный мобильный клиент на Flutter для iOS и Android. Работает напрямую с контроллером через домашний Wi-Fi или собственную точку доступа без платных подписок.
          </p>
        </div>

        {/* Presentation Grid: Hand Image + Interactive Phone Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Lifestyle Photo Showcase */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] bg-obsidian-950 border border-white/10 shadow-2xl group">
              <img
                src="/assets/mobile_app.jpg"
                alt="Smart Boiler Mobile App in Hand"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel border border-white/10">
                <div className="font-display font-bold text-white text-base">
                  Полный контроль не вставая с дивана
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Наблюдайте за температурой теплоносителя, расходом угля и состоянием реле в любой точке дома.
                </div>
              </div>
            </div>

            {/* Key App Features List */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-obsidian-850/80 border border-white/5 space-y-1">
                <div className="font-mono text-xs text-plasma-400">01. НУЛЕВАЯ АБОНПЛАТА</div>
                <div className="text-xs text-slate-300">Никаких серверов в облаке. Приложение связывается с контроллером напрямую.</div>
              </div>
              <div className="p-4 rounded-2xl bg-obsidian-850/80 border border-white/5 space-y-1">
                <div className="font-mono text-xs text-ember-400">02. СЕРВИСНЫЙ ТЕСТ</div>
                <div className="text-xs text-slate-300">Монтажники могут проверить каждое реле по отдельности за 10 секунд.</div>
              </div>
            </div>
          </div>

          {/* Right: Interactive 3D Phone Shell */}
          <div className="lg:col-span-6 flex justify-center">
            
            <div className="w-full max-w-[360px] rounded-[48px] p-4 bg-gradient-to-b from-slate-700 via-slate-900 to-obsidian-950 border-4 border-slate-600/60 shadow-[0_0_60px_-15px_rgba(255,85,0,0.3)] relative">
              
              {/* Phone Speaker & Dynamic Island */}
              <div className="absolute top-7 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-end pr-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              </div>

              {/* Inner Screen */}
              <div className="w-full rounded-[38px] bg-obsidian-950 overflow-hidden border border-white/10 flex flex-col justify-between pt-9 pb-5 px-5 text-white select-none">
                
                {/* App Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 tracking-wider">mDNS: boiler.local</div>
                    <div className="font-display font-bold text-xs tracking-wide text-white">{t.title}</div>
                  </div>

                  {/* Language Selector */}
                  <div className="flex items-center gap-1 bg-obsidian-800 rounded-lg p-1 border border-white/10">
                    {['RU', 'UZ', 'EN'].map((l) => (
                      <button
                        key={l}
                        onClick={() => {
                          sound.playButtonClick();
                          setLang(l);
                        }}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                          lang === l ? 'bg-ember-500 text-white font-bold' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub-tabs: Dashboard vs Service */}
                <div className="grid grid-cols-2 gap-2 my-4 p-1 bg-obsidian-900 rounded-xl border border-white/10 text-xs font-mono">
                  <button
                    onClick={() => {
                      sound.playButtonClick();
                      setActiveTab('control');
                    }}
                    className={`py-1.5 rounded-lg transition-all ${
                      activeTab === 'control' ? 'bg-ember-500 text-white font-bold' : 'text-slate-400'
                    }`}
                  >
                    {t.tabCtrl}
                  </button>
                  <button
                    onClick={() => {
                      sound.playButtonClick();
                      setActiveTab('service');
                    }}
                    className={`py-1.5 rounded-lg transition-all ${
                      activeTab === 'service' ? 'bg-ember-500 text-white font-bold' : 'text-slate-400'
                    }`}
                  >
                    {t.tabSrv}
                  </button>
                </div>

                {/* Tab 1: Dashboard View */}
                {activeTab === 'control' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    
                    {/* Circular Thermostat Visual */}
                    <div className="relative w-44 h-44 mx-auto flex flex-col items-center justify-center">
                      
                      {/* SVG Gauge Circle */}
                      <svg className="w-full h-full -rotate-90">
                        <circle
                          cx="88"
                          cy="88"
                          r="72"
                          stroke="rgba(255,255,255,0.08)"
                          strokeWidth="10"
                          fill="transparent"
                        />
                        <circle
                          cx="88"
                          cy="88"
                          r="72"
                          stroke="url(#amberGrad)"
                          strokeWidth="10"
                          strokeDasharray={452}
                          strokeDashoffset={452 - (452 * (targetTemp - 30)) / 60}
                          strokeLinecap="round"
                          fill="transparent"
                          className="transition-all duration-300"
                        />
                        <defs>
                          <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00F0FF" />
                            <stop offset="50%" stopColor="#FF7700" />
                            <stop offset="100%" stopColor="#FF2A55" />
                          </linearGradient>
                        </defs>
                      </svg>

                      {/* Inner Data */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <Flame className="w-5 h-5 text-ember-400 animate-pulse mb-0.5" />
                        <span className="font-display font-extrabold text-3xl text-white">
                          {targetTemp}°C
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          ФАКТ: {currentTemp}°C
                        </span>
                      </div>
                    </div>

                    {/* Temp Slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono text-slate-400">
                        <span>{t.target}:</span>
                        <span className="text-ember-400 font-bold">{targetTemp}°C</span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="85"
                        value={targetTemp}
                        onChange={handleTempChange}
                        className="w-full accent-ember-500 cursor-pointer h-1.5 bg-obsidian-800 rounded-lg"
                      />
                    </div>

                    {/* Status Chips */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="p-2.5 rounded-xl bg-obsidian-900 border border-white/5">
                        <div className="text-[10px] text-slate-400">{t.current}</div>
                        <div className="text-plasma-400 font-bold mt-0.5">0.85 A</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-obsidian-900 border border-white/5">
                        <div className="text-[10px] text-slate-400">ЦИКЛ ПОДАЧИ</div>
                        <div className="text-emerald-400 font-bold mt-0.5">ON: 15s / 04m</div>
                      </div>
                    </div>

                  </div>
                )}

                {/* Tab 2: Service / Relay Test */}
                {activeTab === 'service' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300 font-mono">
                      {t.testNotice}
                    </div>

                    {/* Fan Switch */}
                    <div className="p-3 rounded-xl bg-obsidian-900 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wind className="w-4 h-4 text-plasma-400" />
                        <span className="text-xs font-mono">{t.fan}</span>
                      </div>
                      <button
                        onClick={toggleFan}
                        className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                          fanActive ? 'bg-plasma-500 justify-end' : 'bg-slate-700 justify-start'
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full bg-white shadow-md" />
                      </button>
                    </div>

                    {/* Shnek Fwd Switch */}
                    <div className="p-3 rounded-xl bg-obsidian-900 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <RotateCw className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-mono">{t.shnekFwd}</span>
                      </div>
                      <button
                        onClick={toggleShnekFwd}
                        className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                          shnekFwdActive ? 'bg-emerald-500 justify-end' : 'bg-slate-700 justify-start'
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full bg-white shadow-md" />
                      </button>
                    </div>

                    {/* Shnek Rev Switch */}
                    <div className="p-3 rounded-xl bg-obsidian-900 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <RotateCcw className="w-4 h-4 text-rose-400" />
                        <span className="text-xs font-mono">{t.shnekRev}</span>
                      </div>
                      <button
                        onClick={toggleShnekRev}
                        className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                          shnekRevActive ? 'bg-rose-500 justify-end' : 'bg-slate-700 justify-start'
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full bg-white shadow-md" />
                      </button>
                    </div>

                  </div>
                )}

                {/* Phone Bottom Home Bar */}
                <div className="w-32 h-1 bg-slate-600 rounded-full mx-auto mt-4" />

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
