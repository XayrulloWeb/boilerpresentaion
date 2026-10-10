import React, { useState } from 'react';
import { Calculator, TrendingDown, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/audio';

export default function RoiCalculator({ onOpenOrderWithData }) {
  const { t, lang } = useLanguage();
  const [area, setArea] = useState(350);
  const [fuelType, setFuelType] = useState('anthracite');

  const fuelPrices = {
    RU: {
      brown: { name: 'Бурый уголь', pricePerTon: 75, baseTonsPer100m2: 3.5 },
      anthracite: { name: 'Антрацит (Эко-горошек)', pricePerTon: 130, baseTonsPer100m2: 2.5 },
      pellet: { name: 'Древесные пеллеты', pricePerTon: 160, baseTonsPer100m2: 2.2 }
    },
    UZ: {
      brown: { name: 'Qo\'ng\'ir ko\'mir', pricePerTon: 75, baseTonsPer100m2: 3.5 },
      anthracite: { name: 'Antrasit (Eko-no\'xot)', pricePerTon: 130, baseTonsPer100m2: 2.5 },
      pellet: { name: 'Yog\'och pelletlari', pricePerTon: 160, baseTonsPer100m2: 2.2 }
    },
    EN: {
      brown: { name: 'Brown Coal', pricePerTon: 75, baseTonsPer100m2: 3.5 },
      anthracite: { name: 'Anthracite Eco-Pea', pricePerTon: 130, baseTonsPer100m2: 2.5 },
      pellet: { name: 'Wood Pellets', pricePerTon: 160, baseTonsPer100m2: 2.2 }
    }
  }[lang] || fuelPrices.RU;

  const selectedFuel = fuelPrices[fuelType];
  const seasonTons = +( (area / 100) * selectedFuel.baseTonsPer100m2 ).toFixed(1);
  const savedTons = +(seasonTons * 0.35).toFixed(1);
  const savedFuelDollars = Math.round(savedTons * selectedFuel.pricePerTon);
  const motorProtectionValue = 180;
  const totalAnnualSavings = savedFuelDollars + motorProtectionValue;
  const controllerCost = 210;
  const paybackMonths = +( (controllerCost / totalAnnualSavings) * 6 ).toFixed(1);

  return (
    <section id="calculator" className="py-28 relative bg-obsidian-950 border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-ember-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t.calculator.badge}</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            {t.calculator.title}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-400 to-teal-300">
              {t.calculator.titleGradient}
            </span>
          </h2>
          <p className="text-slate-400 text-base">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Calculator Main Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch glass-panel p-6 sm:p-10 rounded-3xl border border-white/10">
          
          {/* Inputs Column */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Area Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-display font-medium text-slate-300">
                  {t.calculator.areaLabel}
                </label>
                <div className="px-3.5 py-1.5 rounded-xl bg-obsidian-800 border border-white/10 font-mono text-base font-bold text-ember-400">
                  {area} m²
                </div>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={area}
                onChange={(e) => setArea(parseInt(e.target.value))}
                className="w-full accent-ember-500 cursor-pointer h-2 bg-obsidian-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>100 m²</span>
                <span>500 m²</span>
                <span>2000 m²</span>
              </div>
            </div>

            {/* Fuel Type Radios */}
            <div className="space-y-3">
              <label className="text-sm font-display font-medium text-slate-300">
                {t.calculator.fuelLabel}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.entries(fuelPrices).map(([key, item]) => {
                  const isSelected = fuelType === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        sound.playButtonClick();
                        setFuelType(key);
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-amber-400 bg-amber-400/10 text-white shadow-lg shadow-amber-500/15'
                          : 'border-white/10 bg-obsidian-850 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="font-display font-semibold text-xs sm:text-sm">{item.name}</div>
                      <div className="text-[11px] font-mono text-amber-300/80 mt-1">${item.pricePerTon} / t</div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-obsidian-900 to-obsidian-950 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
            
            <div className="space-y-6 relative z-10">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4" />
                  <span>{t.calculator.totalSavingsLabel}</span>
                </span>
                <span className="text-xs font-mono text-slate-400">2026/2027</span>
              </div>

              {/* Big Savings Metric */}
              <div>
                <div className="font-display font-extrabold text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 tracking-tight mt-1">
                  ${totalAnnualSavings} <span className="text-lg font-normal text-slate-400">{t.calculator.perYear}</span>
                </div>
              </div>

              {/* Breakdown cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-obsidian-800/80 border border-white/5">
                  <div className="text-[11px] font-mono text-slate-400">{t.calculator.savedFuelTons}</div>
                  <div className="text-lg font-bold font-mono text-white mt-0.5">
                    {savedTons} t <span className="text-xs text-emerald-400 font-normal">(-35%)</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-obsidian-800/80 border border-white/5">
                  <div className="text-[11px] font-mono text-slate-400">{t.calculator.paybackPeriod}</div>
                  <div className="text-lg font-bold font-mono text-amber-300 mt-0.5">
                    ~{paybackMonths} mo.
                  </div>
                </div>
              </div>

              {/* Protected Gearbox Value */}
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-200">
                  <span className="font-semibold text-emerald-300">{t.calculator.savedGearboxTitle}</span> {t.calculator.savedGearboxDesc}
                </div>
              </div>

            </div>

            {/* Action Button */}
            <div className="pt-6 relative z-10">
              <button
                onClick={() => {
                  sound.playButtonClick();
                  onOpenOrderWithData({ area, fuelType: selectedFuel.name, savedDollars: totalAnnualSavings });
                }}
                className="w-full py-4 px-6 rounded-xl font-display font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>{t.calculator.orderCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
