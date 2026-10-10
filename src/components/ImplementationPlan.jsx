import React from 'react';
import { BrainCircuit, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ImplementationPlan() {
  const { t, lang } = useLanguage();

  const aiSolutionsData = {
    RU: [
      {
        title: 'Edge AI (TinyML) на кристалле ESP32',
        badge: 'Аппаратный нейрочип',
        desc: 'Нейросетевая модель сжата через TensorFlow Lite for Microcontrollers и исполняется прямо на ядре Xtensa. Анализирует спектрограмму шумов тока ACS712, определяя механический износ шестерен редуктора за 2-3 недели до поломки.',
        tech: 'TensorFlow Lite Micro • Fast Fourier Transform (FFT) • 32-bit Float'
      },
      {
        title: 'Предиктивная модель теплоемкости здания',
        badge: 'ИИ-термостат',
        desc: 'ИИ анализирует скорость нагрева и остывания водяной рубашки с учетом метеопрогноза (температура на улице, ветер). Котел начинает плавно снижать подачу угля заранее, экономя еще до 15% топлива без перегрева комнат.',
        tech: 'LSTM / Time-Series Regression • Weather API • Adaptive Hysteresis'
      },
      {
        title: 'Генеративный ИИ-копилот в приложении',
        badge: 'AI Diagnostic Assistant',
        desc: 'Встроенный в мобильное приложение ИИ-ассистент в реальном времени анализирует телеметрию сгорания, объясняет причины перегрузок человеческим языком и дает персональные советы по настройке наддува под текущий сорт угля.',
        tech: 'LLM Assistant • Smart Telemetry Log Parser • Real-Time Diagnostics'
      }
    ],
    UZ: [
      {
        title: 'ESP32 chipida Edge AI (TinyML)',
        badge: 'Apparat neyrochipi',
        desc: 'Neyrotarmoq modeli TensorFlow Lite for Microcontrollers orqali siqilgan bo\'lib, to\'g\'ridan-to\'g\'ri Xtensa yadrosida ishlaydi. ACS712 toki shovqinlari spektrini tahlil qilib, reduktor tishli g\'ildiraklari eskirishini sinishidan 2-3 hafta oldin aniqlaydi.',
        tech: 'TensorFlow Lite Micro • Fast Fourier Transform (FFT) • 32-bit Float'
      },
      {
        title: 'Bino issiqlik sig\'imining prediktiv modeli',
        badge: 'AI-termostat',
        desc: 'Sun\'iy intellekt suv ko\'ylagining qizish va sovish tezligini ob-havo prognozi bilan tahlil qiladi. Qozon ko\'mir uzatishni oldindan kamaytiradi va xonalar qizib ketmasdan yoqilg\'ini yana 15% tejaydi.',
        tech: 'LSTM / Time-Series Regression • Weather API • Moslashuvchan Gisterezis'
      },
      {
        title: 'Ilovadagi generativ AI-kopilot',
        badge: 'AI diagnostika yordamchisi',
        desc: 'Mobil ilovaga o\'rnatilgan AI yordamchi yonish telemetriyasini real vaqtda tahlil qiladi, ortiqcha yuklama sabablarini tushunarli tilda tushuntiradi va parrakni sozlash bo\'yicha shaxsiy tavsiyalar beradi.',
        tech: 'LLM Assistant • Telemetriya tahlili • Real-Time Diagnostics'
      }
    ],
    EN: [
      {
        title: 'Edge AI (TinyML) on ESP32 Silicon',
        badge: 'Hardware Neural Core',
        desc: 'Quantized neural network model executed directly on the 32-bit Xtensa core via TensorFlow Lite for Microcontrollers. Analyzes ACS712 current FFT noise to diagnose gearmotor mechanical wear weeks prior to catastrophic failure.',
        tech: 'TensorFlow Lite Micro • Fast Fourier Transform (FFT) • 32-bit Float'
      },
      {
        title: 'Predictive Building Thermal Mass Model',
        badge: 'AI Thermostat',
        desc: 'AI predicts heat dissipation rates based on outdoor weather telemetry and wind speed. The controller pre-emptively tapers coal dosing, saving up to an extra 15% in fuel without domestic temperature dips.',
        tech: 'LSTM / Time-Series Regression • Weather API • Adaptive Hysteresis'
      },
      {
        title: 'Generative AI Co-Pilot in Mobile App',
        badge: 'AI Diagnostic Assistant',
        desc: 'Embedded conversational assistant parses telemetry logs in real time, explaining torque anomalies in natural language and offering tailored draft calibration advice for specific coal grades.',
        tech: 'LLM Assistant • Smart Telemetry Log Parser • Real-Time Diagnostics'
      }
    ]
  };

  const aiSolutions = aiSolutionsData[lang] || aiSolutionsData.RU;

  return (
    <section id="plan" className="py-28 relative bg-obsidian-900 border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-plasma-400/10 blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-plasma-400/30 bg-plasma-400/10 text-plasma-300 text-xs font-mono">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>{t.plan.badge}</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            {t.plan.title}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-plasma-400 via-teal-300 to-amber-300">
              {t.plan.titleGradient}
            </span>
          </h2>
          <p className="text-slate-400 text-base">
            {t.plan.subtitle}
          </p>
        </div>

        {/* AI-Solutions Section */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-plasma-300 uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4 text-plasma-400" />
            <span>{t.plan.aiHeader}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiSolutions.map((ai, idx) => (
              <div 
                key={idx}
                className="p-7 rounded-3xl bg-gradient-to-b from-obsidian-850 to-obsidian-950 border border-plasma-400/30 shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-plasma-400/60 transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-plasma-400/10 border border-plasma-400/30 text-[11px] font-mono text-plasma-300">
                    {ai.badge}
                  </div>
                  <h3 className="font-display font-bold text-xl text-white">
                    {ai.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {ai.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-[10px] font-mono text-plasma-400/80">
                  {ai.tech}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
