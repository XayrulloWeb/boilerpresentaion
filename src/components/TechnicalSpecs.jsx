import React from 'react';
import { Cpu, Zap, Wifi, Terminal, Shield, Thermometer, Sliders } from 'lucide-react';

export default function TechnicalSpecs() {
  const specs = [
    {
      category: 'Вычислительная платформа',
      icon: Cpu,
      items: [
        { label: 'Микроконтроллер', val: 'ESP32 Dual-Core 32-bit Xtensa LX6' },
        { label: 'Тактовая частота', val: '240 MHz (Аппаратный Real-Time)' },
        { label: 'Энергонезависимая память', val: 'NVS Flash (сохранение настроек при отключении 220V)' },
        { label: 'Аппаратный сторож', val: 'Hardware Watchdog Timer (защита от зависаний)' },
      ]
    },
    {
      category: 'Силовая часть и коммутация',
      icon: Zap,
      items: [
        { label: 'Входное питание', val: '220V AC ± 15%, 50 Hz (импульсный БП)' },
        { label: 'Количество реле', val: '3 независимых силовых канала (Omron / Songle)' },
        { label: 'Коммутируемый ток', val: '10A / 250V AC на канал (до 2.2 кВт каждый)' },
        { label: 'Защита от КЗ и бросков', val: 'Варисторная защита + RC-снабберы' },
      ]
    },
    {
      category: 'Сенсоры и измерения',
      icon: Thermometer,
      items: [
        { label: 'Датчик температуры', val: 'DS18B20 Digital 1-Wire (PIN 5)' },
        { label: 'Точность замера', val: '±0.1°C (диапазон -55°C ... +125°C)' },
        { label: 'Датчик тока мотора', val: 'ACS712 Hall-Effect (PIN 34, АЦП 12 бит)' },
        { label: 'Порог защиты по току', val: '0.5 А – 5.0 А с шагом 0.1 А' },
      ]
    },
    {
      category: 'Связь и Человеко-Машинный Интерфейс',
      icon: Wifi,
      items: [
        { label: 'Беспроводная сеть', val: 'Wi-Fi 802.11 b/g/n (2.4 GHz)' },
        { label: 'Сетевое имя', val: 'mDNS responder: boiler.local' },
        { label: 'Локальный экран', val: 'LCD 1602 с адаптером I2C (PCF8574)' },
        { label: 'Органы управления', val: '3 тактовые кнопки с аппаратным антидребезгом' },
      ]
    }
  ];

  return (
    <section id="specs" className="py-28 relative bg-obsidian-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-plasma-400/30 bg-plasma-400/10 text-plasma-300 text-xs font-mono">
            <Terminal className="w-3.5 h-3.5" />
            <span>ДЛЯ ИНЖЕНЕРОВ, МОНТАЖНИКОВ И ПРОИЗВОДИТЕЛЕЙ</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Полный паспорт <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-plasma-400 to-amber-300">
              технических характеристик
            </span>
          </h2>
          <p className="text-slate-400 text-base">
            Сертифицированная схемотехника промышленного класса, готовая к установке в щиты автоматики на DIN-рейку или непосредственно на корпус котла.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specs.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div 
                key={idx}
                className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6"
              >
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-obsidian-800 border border-white/10 flex items-center justify-center text-plasma-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">
                    {group.category}
                  </h3>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {group.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-start gap-4 py-1.5 border-b border-white/5 last:border-0">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="text-white font-semibold text-right">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
