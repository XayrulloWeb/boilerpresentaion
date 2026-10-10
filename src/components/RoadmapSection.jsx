import React from 'react';
import { Milestone, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function RoadmapSection() {
  const { t, lang } = useLanguage();

  const stepsData = {
    RU: [
      {
        stage: 'IDEA',
        title: 'Идея и инженерный расчет',
        timeline: 'Q3 2025',
        status: 'DONE',
        statusText: 'Выполнено 100%',
        items: [
          'Исследование статистики аварий твердотопливных котлов (сгорание моторов)',
          'Математическая модель детекции True-RMS тока ротора при блокировке',
          'Выбор архитектуры: ESP32 Dual-Core + ACS712 + шина 1-Wire DS18B20',
          'Патентный поиск по алгоритмам анти-заклинивания шнековых механизмов'
        ]
      },
      {
        stage: 'PROTOTYPE',
        title: 'Лабораторный прототип',
        timeline: 'Q4 2025 – Q1 2026',
        status: 'DONE',
        statusText: 'Выполнено 100%',
        items: [
          'Трассировка и пайка первой ревизии печатной платы с защитой от помех',
          'Написание ядра прошивки на FreeRTOS с аппаратным таймингом реле',
          'Стендовые испытания: принудительное заклинивание шнека гранитом и антрацитом',
          'Калибровка порога ACS712 и фильтра 300 мс (отсечка пусковых токов)'
        ]
      },
      {
        stage: 'MVP',
        title: 'Предсерийный MVP',
        timeline: 'Q2 – Q3 2026',
        status: 'ACTIVE',
        statusText: 'Текущий статус 🚀',
        items: [
          'Финальный корпус контроллера SB-HC-01 под DIN-рейку и настенный монтаж',
          'Кроссплатформенное мобильное приложение на Flutter (iOS/Android)',
          'Локальный Web-сервер и режим точки доступа Hotspot (Boiler-AP)',
          'Пилотное внедрение: устройство выпущено в продажу и успешно работает в 10 домохозяйствах (г. Ургенч)'
        ]
      },
      {
        stage: 'LAUNCHED',
        title: 'Серийный запуск и масштабирование',
        timeline: 'Q4 2026 – 2027',
        status: 'PLANNED',
        statusText: 'В планах 🎯',
        items: [
          'Серийный выпуск первой партии 500 комплектов на контрактном производстве',
          'Сертификация электромагнитной совместимости и электробезопасности',
          'B2B OEM-партнерства с заводами-производителями котлов (Defro, Теплодар и др.)',
          'Внедрение TinyML модели прогнозирования износа редуктора и расхода топлива'
        ]
      }
    ],
    UZ: [
      {
        stage: 'IDEA',
        title: 'G\'oya va muhandislik hisob-kitobi',
        timeline: 'Q3 2025',
        status: 'DONE',
        statusText: '100% bajarildi',
        items: [
          'Qattiq yoqilg\'i qozonlari avariyalari statistikasi tahlili (motor kuyishi)',
          'Shnek to\'xtab qolganda True-RMS tokini aniqlash matematik modeli',
          'Arxitektura tanlovi: ESP32 Dual-Core + ACS712 + 1-Wire DS18B20 shinalari',
          'Shnek tiqilishidan himoya algoritmlari bo\'yicha patent qidiruvi'
        ]
      },
      {
        stage: 'PROTOTYPE',
        title: 'Laboratoriya prototipi',
        timeline: 'Q4 2025 – Q1 2026',
        status: 'DONE',
        statusText: '100% bajarildi',
        items: [
          'Shovqin va xalaqitlardan himoyalangan ilk bosma platani yig\'ish',
          'FreeRTOS da apparat taymingli dasturiy ta\'minot yadrosini yozish',
          'Stend sinovlari: shnekni tosh va antrasit bilan sun\'iy tiqiltirish',
          'ACS712 chegarasini va 300 ms filtrni kalibrlash'
        ]
      },
      {
        stage: 'MVP',
        title: 'Seriya oldi MVP',
        timeline: 'Q2 – Q3 2026',
        status: 'ACTIVE',
        statusText: 'Joriy holat 🚀',
        items: [
          'DIN-reyka va devorga o\'rnatish uchun SB-HC-01 yakuniy korpusi',
          'Flutter da krossplatformali mobil ilova (iOS/Android)',
          'Lokal Web-server va Hotspot (Boiler-AP) sozlash rejimi',
          'Dala sinovlari: qurilma sotuvga chiqarilgan va 10 ta xonadonda to\'liq sinovdan o\'tkazilmoqda (Urganch)'
        ]
      },
      {
        stage: 'LAUNCHED',
        title: 'Seriyali ishlab chiqarish',
        timeline: 'Q4 2026 – 2027',
        status: 'PLANNED',
        statusText: 'Rejada 🎯',
        items: [
          'Kontraktli zavodda 500 dona ilk partiyani ishlab chiqarish',
          'Elektr xavfsizligi va elektromagnit moslik sertifikatsiyasi',
          'Qozon ishlab chiqaruvchi zavodlar bilan B2B OEM-hamkorlik',
          'Reduktor eskirishi va yoqilg\'i sarfini oldindan aytuvchi TinyML modeli'
        ]
      }
    ],
    EN: [
      {
        stage: 'IDEA',
        title: 'Concept & Engineering Calculations',
        timeline: 'Q3 2025',
        status: 'DONE',
        statusText: '100% Completed',
        items: [
          'Analysis of solid-fuel boiler breakdown statistics (motor burnouts)',
          'Mathematical modeling of rotor True-RMS current during mechanical lockup',
          'Hardware stack selection: Dual-core ESP32 + ACS712 + 1-Wire DS18B20',
          'Prior-art patent search on auger anti-jam reverse mechanisms'
        ]
      },
      {
        stage: 'PROTOTYPE',
        title: 'Laboratory Hardware Prototype',
        timeline: 'Q4 2025 – Q1 2026',
        status: 'DONE',
        statusText: '100% Completed',
        items: [
          'Routing and fabrication of industrial PCB revision with EMI filters',
          'FreeRTOS deterministic firmware core development with hardware timers',
          'Bench tests: intentional auger locking with granite and anthracite rock',
          'Calibration of ACS712 threshold and 300ms inrush current suppression'
        ]
      },
      {
        stage: 'MVP',
        title: 'Pre-Production MVP',
        timeline: 'Q2 – Q3 2026',
        status: 'ACTIVE',
        statusText: 'Current Phase 🚀',
        items: [
          'Final SB-HC-01 industrial enclosure for DIN-rail and wall mounting',
          'Cross-platform Flutter mobile client for iOS and Android',
          'Local WebServer and Captive Portal Hotspot mode (Boiler-AP)',
          'Commercial validation: device released and actively field-tested across 10 residential households (Urgench)'
        ]
      },
      {
        stage: 'LAUNCHED',
        title: 'Commercial Scale & Manufacturing',
        timeline: 'Q4 2026 – 2027',
        status: 'PLANNED',
        statusText: 'Planned 🎯',
        items: [
          'Initial manufacturing run of 500 units at contracted assembly facility',
          'CE / Industrial electrical safety & EMC compliance certification',
          'B2B OEM partnerships with boiler manufacturers (Defro, etc.)',
          'Integration of Edge TinyML model for predictive gearbox failure alerts'
        ]
      }
    ]
  };

  const steps = stepsData[lang] || stepsData.RU;

  return (
    <section id="roadmap" className="py-28 relative bg-obsidian-950 border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-ember-500/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-mono">
            <Milestone className="w-3.5 h-3.5" />
            <span>{t.roadmap.badge}</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            {t.roadmap.title}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-plasma-400">
              Idea → Prototype → MVP → Launched
            </span>
          </h2>
          <p className="text-slate-400 text-base">
            {t.roadmap.subtitle}
          </p>
        </div>

        {/* 4 Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, idx) => (
            <div 
              key={idx}
              className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                st.status === 'ACTIVE'
                  ? 'border-ember-500 bg-ember-500/10 shadow-2xl shadow-ember-500/20 scale-[1.02]'
                  : st.status === 'DONE'
                  ? 'border-white/10 bg-obsidian-900/80'
                  : 'border-white/5 bg-obsidian-900/40 opacity-80'
              }`}
            >
              <div className="space-y-4">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">0{idx + 1}.</span>
                  <div className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border ${
                    st.status === 'ACTIVE'
                      ? 'bg-ember-500 text-white border-ember-400 shadow-md shadow-ember-500/50'
                      : st.status === 'DONE'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-obsidian-800 text-slate-400 border-white/5'
                  }`}>
                    {st.statusText}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono text-slate-400 tracking-wider">
                    {st.timeline}
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mt-1">
                    {st.stage}: {st.title}
                  </h3>
                </div>

                {/* Items */}
                <ul className="space-y-2.5 pt-2">
                  {st.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2 text-xs text-slate-300 leading-normal">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                        st.status === 'DONE' ? 'text-emerald-400' : st.status === 'ACTIVE' ? 'text-ember-400' : 'text-slate-600'
                      }`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Progress Line */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="uppercase">{st.status}</span>
                <span className="text-white font-bold">{st.stage}</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
