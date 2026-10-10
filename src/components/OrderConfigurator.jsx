import React, { useState } from 'react';
import { Package, Check, Phone, User, MapPin, Send, ShieldCheck, Home, Building } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/audio';

export default function OrderConfigurator({ initialData = null }) {
  const { t, lang } = useLanguage();
  const [role, setRole] = useState('b2c');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    note: initialData ? `Area: ${initialData.area}m², Fuel: ${initialData.fuelType}, Saved: $${initialData.savedDollars}` : ''
  });
  const [submitted, setSubmitted] = useState(false);

  const kitItems = {
    RU: [
      'Главный микропроцессорный блок Smart Boiler SB-HC-01',
      'Прецизионный цифровой зонд DS18B20 в гильзе (2 метра)',
      'Высокоскоростной токовый модуль ACS712',
      'Символьный ЖК-экран LCD 1602 с адаптером I2C',
      'Кнопочная панель локального управления [MENU, +, -]',
      'Мобильное приложение Smart Boiler (Android APK / iOS)',
      'Монтажная DIN-рейка и колодки клемм WAGO',
      'Инженерный паспорт изделия и электросхема подключения'
    ],
    UZ: [
      'Smart Boiler SB-HC-01 bosh mikroprotsessor bloki',
      'Zanglamaydigan g\'ilofli DS18B20 raqamli zondi (2 metr)',
      'Tezkor ACS712 tok o\'lchash moduli',
      'I2C adapterli LCD 1602 belgili ekrani',
      'Mahalliy boshqaruv tugmalar paneli [MENU, +, -]',
      'Smart Boiler mobil ilovasi (Android APK / iOS)',
      'Montaj uchun DIN-reyka va WAGO klemmasi',
      'Muhandislik pasporti va elektr ulanish sxemasi'
    ],
    EN: [
      'Smart Boiler SB-HC-01 Main Microprocessor Unit',
      'High-Precision Digital DS18B20 Probe in Stainless Sleeve (2m)',
      'Integrated High-Speed ACS712 Current Module',
      '1602 LCD Alphanumeric Display with I2C PCF8574',
      'Tactile Local Control Buttons [MENU, +, -]',
      'Smart Boiler Mobile Client (Android APK / iOS)',
      'DIN-Rail Bracket and WAGO Wiring Terminal Blocks',
      'Engineering User Manual and Electrical Wiring Schematic'
    ]
  }[lang] || kitItems.RU;

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playSuccess();
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setSubmitted(true);
  };

  return (
    <section id="order" className="py-28 relative bg-obsidian-900 border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-ember-500/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-mono">
            <Package className="w-3.5 h-3.5" />
            <span>{t.order.badge}</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            {t.order.title}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
              {t.order.titleGradient}
            </span>
          </h2>
          <p className="text-slate-400 text-base">
            {t.order.subtitle}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Unboxing Flatlay Photo & Checklist */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] bg-obsidian-950 border border-white/10 shadow-2xl group">
              <img
                src="/assets/boiler_kit.jpg"
                alt="Smart Boiler Complete Hardware Kit"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl glass-panel border border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-display font-bold text-white text-sm">
                    Smart Boiler SB-HC-01
                  </div>
                  <div className="text-[11px] text-slate-300 font-mono">
                    {t.order.warranty}
                  </div>
                </div>
                <div className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
                  {t.order.inStock}
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {kitItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-obsidian-850/60 border border-white/5 text-xs text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right: Order Form */}
          <div className="lg:col-span-6">
            
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
              
              {submitted ? (
                <div className="text-center py-10 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/30">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">
                    {t.order.successTitle}
                  </h3>
                  <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
                    {t.order.successDesc}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-obsidian-800 text-slate-300 hover:text-white border border-white/10 text-xs font-mono"
                  >
                    {t.order.sendAgain}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  <div>
                    <h3 className="font-display font-bold text-2xl text-white">
                      {t.order.formTitle}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {t.order.formDesc}
                    </p>
                  </div>

                  {/* Role Selector */}
                  <div className="grid grid-cols-2 gap-3 p-1.5 bg-obsidian-950 rounded-2xl border border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playButtonClick();
                        setRole('b2c');
                      }}
                      className={`py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-display text-xs font-semibold transition-all ${
                        role === 'b2c'
                          ? 'bg-ember-500 text-white shadow-lg shadow-ember-500/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Home className="w-4 h-4" />
                      <span>{t.order.forHome}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        sound.playButtonClick();
                        setRole('b2b');
                      }}
                      className={`py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-display text-xs font-semibold transition-all ${
                        role === 'b2b'
                          ? 'bg-plasma-500 text-white shadow-lg shadow-plasma-500/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Building className="w-4 h-4" />
                      <span>{t.order.forB2B}</span>
                    </button>
                  </div>

                  {/* Form Inputs */}
                  <div className="space-y-4">
                    
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{t.order.nameLabel}</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Alex / Sardor"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-ember-500 text-sm"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{t.order.phoneLabel}</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+998 90 000 00 00 / +7 999 000 00 00"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-ember-500 text-sm"
                      />
                    </div>

                    {/* City */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{t.order.cityLabel}</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Tashkent / Moscow / Almaty"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-ember-500 text-sm"
                      />
                    </div>

                    {/* Note */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">
                        {t.order.noteLabel}
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Defro 25 kW / custom boiler"
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-ember-500 text-sm"
                      />
                    </div>

                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-display font-bold text-white bg-gradient-to-r from-ember-500 via-orange-500 to-amber-500 hover:shadow-xl hover:shadow-ember-500/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 text-base"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.order.submitBtn}</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono text-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t.order.privacy}</span>
                  </div>

                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
