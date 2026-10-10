import React from 'react';
import { Check, X, AlertCircle, ShieldAlert, Award, Zap } from 'lucide-react';

export default function ComparisonTable() {
  const features = [
    {
      title: 'Защита от заклинивания шнека',
      legacy: '❌ Нет (срезает шпонку или сгорает обмотка мотора)',
      smart: '✅ Мгновенный авто-реверс на 3 сек (Датчик Холла ACS712)',
      isHighlight: true
    },
    {
      title: 'Мобильное управление со смартфона',
      legacy: '❌ Отсутствует или китайское платное облако с абонплатой',
      smart: '✅ Бесплатное Flutter-приложение (iOS/Android) без серверов',
      isHighlight: true
    },
    {
      title: 'Работа при отключении интернета',
      legacy: '⚠️ Зависает, блокирует интерфейс или требует связи',
      smart: '✅ 100% полноценный автономный режим со своим экраном 1602',
      isHighlight: false
    },
    {
      title: 'Настройка подключения к Wi-Fi',
      legacy: '❌ Сложная прошивка через кабель или программаторы',
      smart: '✅ Встроенный Hotspot (Boiler-AP) + Captive Portal за 1 клик',
      isHighlight: false
    },
    {
      title: 'Сервисный тест релейных каналов',
      legacy: '❌ Только отверткой с риском поражения 220V',
      smart: '✅ Пошаговый тест турбины и реверса прямо из приложения',
      isHighlight: false
    },
    {
      title: 'Энергонезависимая память настроек',
      legacy: '⚠️ Сброс при каждом скачке напряжения в поселке',
      smart: '✅ Память NVS (Non-Volatile Storage) сохраняет уставки навсегда',
      isHighlight: false
    },
    {
      title: 'Точность измерения температуры',
      legacy: '❌ Аналоговые терморезисторы NTC (погрешность до ±3°C)',
      smart: '✅ Прецизионный цифровой датчик DS18B20 (±0.1°C)',
      isHighlight: false
    }
  ];

  return (
    <section id="comparison" className="py-28 relative bg-obsidian-900 border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ember-500/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono">
            <Award className="w-3.5 h-3.5" />
            <span>СРАВНИТЕЛЬНЫЙ АНАЛИЗ</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Почему Smart Boiler <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-ember-400">
              опережает стандартные контроллеры
            </span>
          </h2>
          <p className="text-slate-400 text-base">
            Большинство стандартных пультов спроектированы 15 лет назад на примитивных 8-битных чипах. Мы создали контроллер на современной микропроцессорной архитектуре.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-obsidian-850/80 font-display">
                  <th className="py-5 px-6 text-sm text-slate-400 font-medium">Критерий оценки</th>
                  <th className="py-5 px-6 text-sm text-slate-400 font-medium w-1/3">Обычные польские/китайские пульты</th>
                  <th className="py-5 px-6 text-sm font-bold text-ember-400 w-1/3 bg-ember-500/10 border-l border-ember-500/30">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-ember-400" />
                      <span>Smart Boiler 2.0 (Наша разработка)</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono text-xs">
                {features.map((feat, idx) => (
                  <tr 
                    key={idx} 
                    className={`transition-colors hover:bg-white/[0.02] ${
                      feat.isHighlight ? 'bg-ember-500/[0.03]' : ''
                    }`}
                  >
                    <td className="py-4 px-6 text-slate-200 font-display text-sm font-semibold">
                      {feat.title}
                    </td>
                    <td className="py-4 px-6 text-slate-400 leading-relaxed">
                      {feat.legacy}
                    </td>
                    <td className="py-4 px-6 text-white font-medium bg-ember-500/10 border-l border-ember-500/30 leading-relaxed">
                      <span className="text-emerald-300">{feat.smart}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
