import React, { useState } from 'react';
import { Cpu, RotateCcw, Flame, ShieldAlert, WifiOff, CheckCircle2, ArrowRight } from 'lucide-react';
import InteractiveLCD from './InteractiveLCD';
import { sound } from '../utils/audio';

export default function FourScenarios() {
  const [activeScenario, setActiveScenario] = useState(0);

  const scenarios = [
    {
      id: 'work',
      title: '1. Идеальный цикл (Работа / Пауза)',
      badge: 'Экономия до 40%',
      icon: Flame,
      color: 'ember',
      headline: 'Порционная подача угля удерживает тепло без перерасхода',
      desc: 'Вентилятор наддува раздувает жар в чаше горелки. Шнек включается на 15 секунд, подавая свежую порцию угля, затем засыпает на 4 минуты в режим экономного тления. Никакого вылета тепла в дымоход и образования шлака.',
      modeKey: 'work',
      relays: { pin18: true, pin19: false, pin4: true },
      stateCode: 'STATE_SHNEK_WORK'
    },
    {
      id: 'jam',
      title: '2. Камень в шнеке (Анти-Клин)',
      badge: 'Реакция 0.3 сек',
      icon: ShieldAlert,
      color: 'rose',
      headline: 'Датчик Холла ACS712 предотвращает поломку мотора',
      desc: 'В шнек попал камень твердого антрацита. Ротор стопорится, ток подскакивает до 4.2А. Контроллер мгновенно размыкает ход вперед и включает реверс на 3000 мс (PIN 19). Камень сбрасывается, работа продолжается без вызова мастера.',
      modeKey: 'jam',
      relays: { pin18: false, pin19: true, pin4: false },
      stateCode: 'ANTI_JAM_REVERSE'
    },
    {
      id: 'target',
      title: '3. Температура достигнута (Гистерезис)',
      badge: 'Защита от закипания',
      icon: CheckCircle2,
      color: 'emerald',
      headline: 'Анти-закипание: отключение турбины при 60°C',
      desc: 'Датчик DS18B20 фиксирует достижение заданной уставки 60°C. Контроллер мгновенно выключает турбину наддува и останавливает подачу угля. Котел переходит в режим пассивного тления. При остывании на 4°C (до 56°C) наддув плавно возобновляется.',
      modeKey: 'target',
      relays: { pin18: false, pin19: false, pin4: false },
      stateCode: 'TEMPERATURE_REACHED'
    },
    {
      id: 'offline',
      title: '4. Роутер выключен (100% Офлайн)',
      badge: 'Автономия 24/7',
      icon: WifiOff,
      color: 'plasma',
      headline: 'Независимость от интернета, серверов и провайдера',
      desc: 'Даже если в поселке пропал интернет или сгорел Wi-Fi роутер — Smart Boiler не остановится ни на секунду. Все циклы работают автономно на базе микроконтроллера ESP32 и энергонезависимой памяти NVS.',
      modeKey: 'offline',
      relays: { pin18: true, pin19: false, pin4: true },
      stateCode: 'OFFLINE_MODE'
    }
  ];

  const current = scenarios[activeScenario];

  return (
    <section id="scenarios" className="py-28 relative bg-obsidian-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ember-500/30 bg-ember-500/10 text-ember-300 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>4 РЕАЛЬНЫХ ТЕХНОЛОГИЧЕСКИХ СЦЕНАРИЯ</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Интерактивная симуляция: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ember-400 to-amber-200">
              как Smart Boiler ведет себя в жизни
            </span>
          </h2>
          <p className="text-slate-400 text-base">
            Переключайте сценарии, чтобы увидеть мгновенную реакцию релейной группы, физического экрана 1602 и алгоритмов безопасности.
          </p>
        </div>

        {/* 4 Scenario Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {scenarios.map((sc, index) => {
            const Icon = sc.icon;
            const isSelected = activeScenario === index;
            return (
              <button
                key={sc.id}
                onClick={() => {
                  sound.playButtonClick();
                  sound.playRelayClick();
                  setActiveScenario(index);
                }}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-ember-500 bg-ember-500/15 shadow-xl shadow-ember-500/20 scale-[1.02]'
                    : 'border-white/10 bg-obsidian-900/60 hover:border-white/20 hover:bg-obsidian-850'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-ember-500 text-white shadow-lg shadow-ember-500/50' : 'bg-obsidian-800 text-slate-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-slate-400">0{index + 1}</span>
                  </div>

                  <h3 className="font-display font-semibold text-base text-white">
                    {sc.title}
                  </h3>
                  <div className="text-xs font-mono text-ember-400 mt-1">
                    {sc.badge}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>{isSelected ? 'АКТИВЕН' : 'Протестировать'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-ember-400' : 'text-slate-600'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Scenario Detailed Live Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel p-6 sm:p-10 rounded-3xl border border-white/10">
          
          {/* Left: Narrative Explanation & State Machine */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-obsidian-800 border border-white/10 font-mono text-xs text-plasma-400">
              <span>STATE MACHINE:</span>
              <span className="text-white font-bold">{current.stateCode}</span>
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
              {current.headline}
            </h3>

            <p className="text-slate-300 text-base leading-relaxed">
              {current.desc}
            </p>

            {/* Relays Live Status Group */}
            <div className="pt-2">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                СОСТОЯНИЕ СИЛОВЫХ РЕЛЕ (220V / 10A)
              </div>
              <div className="grid grid-cols-3 gap-3">
                
                {/* Relay 1 */}
                <div className={`p-3 rounded-xl border font-mono text-xs transition-all ${
                  current.relays.pin18
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                    : 'bg-obsidian-900 border-white/5 text-slate-500'
                }`}>
                  <div className="text-[10px] text-slate-400">PIN 18 (Шнек Вперед)</div>
                  <div className="text-sm font-bold mt-1">
                    {current.relays.pin18 ? 'ЗАМКНУТО (ON)' : 'РАЗОМКНУТО'}
                  </div>
                </div>

                {/* Relay 2 */}
                <div className={`p-3 rounded-xl border font-mono text-xs transition-all ${
                  current.relays.pin19
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse'
                    : 'bg-obsidian-900 border-white/5 text-slate-500'
                }`}>
                  <div className="text-[10px] text-slate-400">PIN 19 (Реверс Шнека)</div>
                  <div className="text-sm font-bold mt-1">
                    {current.relays.pin19 ? 'РЕВЕРС 3с' : 'РАЗОМКНУТО'}
                  </div>
                </div>

                {/* Relay 3 */}
                <div className={`p-3 rounded-xl border font-mono text-xs transition-all ${
                  current.relays.pin4
                    ? 'bg-plasma-500/15 border-plasma-500/40 text-plasma-300'
                    : 'bg-obsidian-900 border-white/5 text-slate-500'
                }`}>
                  <div className="text-[10px] text-slate-400">PIN 4 (Турбина Наддува)</div>
                  <div className="text-sm font-bold mt-1">
                    {current.relays.pin4 ? 'НАДДУВ 100%' : 'ОСТАНОВ'}
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right: Authentic 1602 LCD Console */}
          <div className="lg:col-span-5">
            <InteractiveLCD currentMode={current.modeKey} />
          </div>

        </div>

      </div>
    </section>
  );
}
