import React, { useState } from 'react';
import { Cpu, ShieldAlert, RotateCw, Wind, Thermometer, Layers, ChevronRight, Check } from 'lucide-react';
import { sound } from '../utils/audio';

export default function ExplodedScrollytelling() {
  const [selectedLayer, setSelectedLayer] = useState(0);

  const layers = [
    {
      id: 'esp32',
      title: 'Вычислительный мозг ESP32',
      badge: 'Dual-Core 240 MHz',
      icon: Cpu,
      img: '/assets/controller_pcb.jpg',
      headline: 'Двухъядерный 32-битный процессор Xtensa с нулевыми задержками',
      description: 'Одно ядро выделено исключительно под критические временные тайминги реле, датчик тока ACS712 и аппаратные прерывания. Второе ядро независимо обслуживает стек Wi-Fi, mDNS (boiler.local) и локальный REST API без малейшего влияния на безопасность котла.',
      specs: [
        { label: 'Тактовая частота', val: '240 MHz (Два ядра)' },
        { label: 'Память NVS', val: 'Энергонезависимая Flash' },
        { label: 'Опрос сенсоров', val: 'Каждые 800 мс (без задержек)' },
        { label: 'Защита от зависания', val: 'Аппаратный Watchdog' },
      ],
      pinout: 'ESP32-WROOM-32'
    },
    {
      id: 'acs712',
      title: 'Датчик Холла ACS712',
      badge: 'True-RMS 200/sec',
      icon: ShieldAlert,
      img: '/assets/controller_pcb.jpg',
      headline: 'Цифровой сторож редуктора: детекция камней за миллисекунды',
      description: 'Бесконтактное измерение тока на эффекте Холла (PIN 34, АЦП 12 бит). Анализирует реальную нагрузку мотора до 200 раз за цикл. Если ток подскакивает выше уставки (например > 3.5 А) дольше 300 мс — система мгновенно отключает ход вперед и активирует реверс.',
      specs: [
        { label: 'Диапазон тока', val: '0.5А – 5.0А (шаг 0.1А)' },
        { label: 'Частота выборки', val: '200 замеров за полупериод' },
        { label: 'Время фильтрации', val: '300 мс (отсечка пусковых токов)' },
        { label: 'Гальваноразвязка', val: 'До 2.1 кВ RMS' },
      ],
      pinout: 'PIN 34 (ADC1_CH6)'
    },
    {
      id: 'auger',
      title: 'Шнек & Силовые Реле',
      badge: 'PIN 18 / 19 Reversible',
      icon: RotateCw,
      img: '/assets/auger_mechanism.jpg',
      headline: 'Тяжелый шнековый узел с двойным реле реверса',
      description: 'Два независимых силовых реле Omron 10A с аппаратной взаимной блокировкой исключают одновременное включение фаз. Реле 1 (PIN 18) подает уголь вперед, а Реле 2 (PIN 19) включает 3-секундный аварийный откат назад при клине породы.',
      specs: [
        { label: 'Реле "Вперед"', val: 'PIN 18 (10A / 250V AC)' },
        { label: 'Реле "Реверс"', val: 'PIN 19 (10A / 250V AC)' },
        { label: 'Длительность реверса', val: 'Ровно 3000 мс' },
        { label: 'Ресурс реле', val: 'Более 100 000 коммутаций' },
      ],
      pinout: 'PIN 18 (FWD) & PIN 19 (REV)'
    },
    {
      id: 'fan',
      title: 'Наддувная Турбина',
      badge: 'PIN 4 Oxygen Control',
      icon: Wind,
      img: '/assets/hero_boiler.jpg',
      headline: 'Автоматический наддув: дожигание угля без остатка и шлака',
      description: 'Реле наддува (PIN 4) синхронизировано с циклом подачи топлива и температурой теплоносителя. Интенсивная подача кислорода в зону горения позволяет сжигать даже сырой или тяжелый штыб с максимальным КПД теплоотдачи.',
      specs: [
        { label: 'Управление вентилятором', val: 'PIN 4 (Силовое реле 10A)' },
        { label: 'Режим продувки', val: 'Удаление пиролизных газов' },
        { label: 'Отсечка по температуре', val: 'Мгновенно при Target Temp' },
        { label: 'Гистерезис', val: 'Авто-старт при -4°C от уставки' },
      ],
      pinout: 'PIN 4 (BLOWER_RELAY)'
    },
    {
      id: 'temp',
      title: 'Термозонд DS18B20',
      badge: '1-Wire Stainless Steel',
      icon: Thermometer,
      img: '/assets/boiler_kit.jpg',
      headline: 'Прецизионный цифровой датчик температуры водяной рубашки',
      description: 'Герметичный цифровой датчик в нержавеющей гильзе на шине 1-Wire (PIN 5). Никаких аналоговых погрешностей и наводок от сетевых проводов 220V: опрос по CRC-протоколу с точностью до десятых долей градуса.',
      specs: [
        { label: 'Диапазон измерения', val: 'от -55°C до +125°C' },
        { label: 'Точность замера', val: '±0.1°C в диапазоне 20..90°C' },
        { label: 'Интерфейс', val: '1-Wire с подтягивающим 4.7kΩ' },
        { label: 'Исполнение', val: 'Гильза 6x50 мм, кабель 2м' },
      ],
      pinout: 'PIN 5 (ONE_WIRE_BUS)'
    }
  ];

  const current = layers[selectedLayer];

  return (
    <section id="exploded" className="py-28 relative bg-obsidian-950/80 border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-ember-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-plasma-400/30 bg-plasma-400/10 text-plasma-300 text-xs font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>АНАТОМИЯ И АРХИТЕКТУРА СИСТЕМЫ</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Инженерный рентген: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-plasma-400 to-emerald-400">
              каждый узел спроектирован на века
            </span>
          </h2>
          <p className="text-slate-400 text-base">
            Нажимайте на узлы ниже, чтобы изучить аппаратную схему, разводку пинов и алгоритмы микросекундной защиты.
          </p>
        </div>

        {/* Layer Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          {layers.map((layer, idx) => {
            const Icon = layer.icon;
            const isSelected = selectedLayer === idx;
            return (
              <button
                key={layer.id}
                onClick={() => {
                  sound.playButtonClick();
                  setSelectedLayer(idx);
                }}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-ember-500 bg-ember-500/10 shadow-lg shadow-ember-500/20 scale-[1.02]'
                    : 'border-white/10 bg-obsidian-900/60 hover:border-white/20 hover:bg-obsidian-850'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-ember-500 text-white' : 'bg-obsidian-800 text-slate-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">0{idx + 1}</span>
                </div>
                <div>
                  <div className="font-display font-semibold text-xs sm:text-sm text-white line-clamp-1">
                    {layer.title}
                  </div>
                  <div className="text-[10px] font-mono text-ember-400/90 mt-0.5">
                    {layer.badge}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Exploded Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel p-6 sm:p-10 rounded-3xl border border-white/10">
          
          {/* Visual Showcase Box */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/10] bg-obsidian-900 border border-white/10 group">
            <img
              src={current.img}
              alt={current.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Visual Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-80" />

            {/* Microcontroller Pin Badge */}
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-obsidian-900/90 border border-plasma-400/50 backdrop-blur-md font-mono text-xs text-plasma-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-plasma-400 animate-pulse"></span>
              <span>{current.pinout}</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-obsidian-900/90 border border-white/10 backdrop-blur-md">
              <div className="text-xs font-mono text-ember-400 uppercase tracking-wider">
                АППАРАТНЫЙ УЗЕЛ: {current.title}
              </div>
              <div className="text-white font-display text-sm font-semibold mt-0.5">
                {current.headline}
              </div>
            </div>
          </div>

          {/* Technical Specs & Description */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-mono text-plasma-400 uppercase tracking-wider mb-1">
                СПЕЦИФИКАЦИЯ КОМПОНЕНТА
              </div>
              <h3 className="font-display font-bold text-2xl text-white">
                {current.title}
              </h3>
              <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {current.specs.map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-obsidian-850 border border-white/5">
                  <div className="text-[11px] text-slate-400 font-mono">{item.label}</div>
                  <div className="text-xs font-semibold text-white font-mono mt-1 text-ember-300">
                    {item.val}
                  </div>
                </div>
              ))}
            </div>

            {/* Guarantee Note */}
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
              <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-200 leading-normal">
                <span className="font-semibold">Проверено в суровых котельных:</span> Защита от перенапряжения 220V, встроенный фильтр сетевых помех и помехоустойчивая линия связи 1-Wire.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
