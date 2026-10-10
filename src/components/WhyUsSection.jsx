import React from 'react';
import { ShieldCheck, Award, Wrench, Flame, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WhyUsSection() {
  const { t, lang } = useLanguage();

  const points = {
    RU: [
      {
        icon: Wrench,
        title: '1. Полевой опыт в реальных котельных',
        desc: 'Мы не теоретики из лаборатории. Наша команда более 9 лет лично монтирует, обслуживает и модернизирует котлы в условиях суровых зим Центральной Азии и СНГ, где качество угля нестабильно, а порода и шлам встречаются в каждом мешке.'
      },
      {
        icon: Zap,
        title: '2. Полная вертикальная интеграция (HW + SW)',
        desc: 'Мы контролируем 100% стека: от схемотехники печатной платы с защитой от бросков напряжения 220V и микроконтроллера ESP32 на FreeRTOS до мобильного приложения Flutter и Web-UI. Никаких сторонних ненадежных модулей.'
      },
      {
        icon: Flame,
        title: '3. Физический прототип уже прошел испытания',
        desc: 'У нас есть не просто концепт или 3D-модели — готовая плата SB-HC-01 собрана, протестирована на стенде с искусственным заклиниванием булыжниками и успешно отработала на реальном котле длительного горения.'
      },
      {
        icon: ShieldCheck,
        title: '4. Архитектурная независимость от облака',
        desc: 'Мы изначально проектировали продукт под условия нестабильной связи. Котел сохраняет 100% функционала и безопасности даже при полном обрыве интернета, управляясь аппаратно с кнопок и экрана 1602.'
      }
    ],
    UZ: [
      {
        icon: Wrench,
        title: '1. Haqiqiy qozonxonalardagi amaliy tajriba',
        desc: 'Biz nazariyotchi emasmiz. Jamoamiz 9 yildan ortiq vaqt davomida O\'rta Osiyo va MDH qahraton qish sharoitida qozonlarni shaxsan o\'rnatadi va xizmat ko\'rsatadi. Bu yerda ko\'mir sifati beqaror bo\'lib, tosh va qattiq jinslar har bir qopda uchraydi.'
      },
      {
        icon: Zap,
        title: '2. To\'liq vertikal integratsiya (HW + SW)',
        desc: 'Biz texnologik zanjirning 100% qismini o\'zimiz nazorat qilamiz: 220V kuchlanish sakrashidan himoyalangan plata sxemotexnikasidan tortib, FreeRTOS dagi ESP32 yadrosi, Flutter ilovasi va Web-UI gacha.'
      },
      {
        icon: Flame,
        title: '3. Jismoniy prototip sinovlardan o\'tdi',
        desc: 'Bizda shunchaki 3D-model yoki tushuncha emas — tayyor SB-HC-01 platasi yig\'ilgan, toshlar bilan sun\'iy tiqilish stendida sinovdan o\'tkazilgan va uzoq yonuvchi haqiqiy qozonda muvaffaqiyatli ishladi.'
      },
      {
        icon: ShieldCheck,
        title: '4. Bulutga bog\'liq bo\'lmagan avtonomiya',
        desc: 'Biz mahsulotni aloqa beqaror bo\'lgan sharoitlar uchun loyihalashtirdik. Qozon internet to\'liq uzilgan taqdirda ham 100% xavfsizlik va funksionallikni saqlab qoladi.'
      }
    ],
    EN: [
      {
        icon: Wrench,
        title: '1. In-the-Trenches Field Experience',
        desc: 'We are not theoretical academics. Our team has over 9 years of hands-on experience retrofitting and repairing boilers during sub-zero -30°C winters where coal quality is abrasive and unwashed.'
      },
      {
        icon: Zap,
        title: '2. Full Vertical Integration (HW + SW)',
        desc: 'We own 100% of the stack: from custom industrial PCB layout with 220V surge suppressors to deterministic FreeRTOS ESP32 firmware, Flutter app, and local Web-UI.'
      },
      {
        icon: Flame,
        title: '3. Validated Physical Hardware Prototype',
        desc: 'We hold more than 3D renders. The pre-production SB-HC-01 PCB is physically fabricated, bench-tested with heavy rock jams, and operating smoothly on active solid-fuel boilers.'
      },
      {
        icon: ShieldCheck,
        title: '4. Architectural Cloud Independence',
        desc: 'We engineered the system for resilient offline operation. The boiler retains 100% functionality and safety even without an internet connection, controllable via hardware buttons and LCD.'
      }
    ]
  }[lang] || points.RU;

  return (
    <section id="why-us" className="py-28 relative bg-obsidian-900 border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-ember-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono">
            <Award className="w-3.5 h-3.5" />
            <span>{t.whyUs.badge}</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            {t.whyUs.title}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-ember-400">
              {t.whyUs.titleGradient}
            </span>
          </h2>
          <p className="text-slate-400 text-base">
            {t.whyUs.subtitle}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {points.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx}
                className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4 hover:border-amber-500/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-white">
                  {p.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
