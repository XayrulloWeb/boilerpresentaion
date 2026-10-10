import React, { useState } from 'react';
import { Plus, Minus, Menu, Wifi, WifiOff } from 'lucide-react';
import { sound } from '../utils/audio';

export default function InteractiveLCD({ currentMode = 'work' }) {
  const [menuIndex, setMenuIndex] = useState(0); // 0: Live, 1: Temp, 2: ShnekWork, 3: ShnekPause, 4: CurrentLimit, 5: AP Mode
  const [targetTemp, setTargetTemp] = useState(60);
  const [shnekWorkSec, setShnekWorkSec] = useState(15);
  const [shnekPauseMin, setShnekPauseMin] = useState(4);
  const [maxCurrent, setMaxCurrent] = useState(3.5);
  const [isAPMode, setIsAPMode] = useState(false);

  const menuItems = ['LIVE', 'TEMP', 'WORK', 'PAUSE', 'ACS', 'AP'];

  const handleMenuClick = () => {
    sound.playButtonClick();
    setIsAPMode(false);
    setMenuIndex((prev) => (prev + 1) % menuItems.length);
  };

  const handlePlus = () => {
    sound.playButtonClick();
    if (menuIndex === 1) setTargetTemp((t) => Math.min(85, t + 1));
    if (menuIndex === 2) setShnekWorkSec((s) => Math.min(60, s + 1));
    if (menuIndex === 3) setShnekPauseMin((m) => Math.min(15, m + 1));
    if (menuIndex === 4) setMaxCurrent((c) => +(Math.min(5.0, c + 0.1)).toFixed(1));
  };

  const handleMinus = () => {
    sound.playButtonClick();
    if (menuIndex === 1) setTargetTemp((t) => Math.max(40, t - 1));
    if (menuIndex === 2) setShnekWorkSec((s) => Math.max(5, s - 1));
    if (menuIndex === 3) setShnekPauseMin((m) => Math.max(1, m - 1));
    if (menuIndex === 4) setMaxCurrent((c) => +(Math.max(1.0, c - 0.1)).toFixed(1));
  };

  // Render 1602 LCD 2 lines (16 chars each)
  const getScreenContent = () => {
    if (isAPMode || menuIndex === 5) {
      return {
        line1: 'HOTSPOT: AP MODE',
        line2: 'IP: 192.168.4.1 '
      };
    }

    if (menuIndex === 0) {
      if (currentMode === 'jam') {
        return {
          line1: 'TIQILDI! REV: 3s',
          line2: 'I: 4.35A > 3.50A'
        };
      }
      if (currentMode === 'target') {
        return {
          line1: 'HARORAT YETDI!  ',
          line2: `T: ${targetTemp}.0C TURB:OFF`
        };
      }
      if (currentMode === 'offline') {
        return {
          line1: 'OFFLAYN REJIM   ',
          line2: 'T: 58.4C NO WIFI'
        };
      }
      return {
        line1: `T: 62.4C FAN: ON `,
        line2: `ON: 00m${shnekWorkSec}s I:0.85A`
      };
    }

    if (menuIndex === 1) {
      return {
        line1: 'SET TARGET TEMP ',
        line2: `VALUE: [ ${targetTemp}°C ]  `
      };
    }
    if (menuIndex === 2) {
      return {
        line1: 'SHNEK FEED TIME ',
        line2: `RUN:   [ ${shnekWorkSec} sek ]`
      };
    }
    if (menuIndex === 3) {
      return {
        line1: 'SHNEK PAUSE TIME',
        line2: `PAUSE: [ 0${shnekPauseMin} min ]`
      };
    }
    if (menuIndex === 4) {
      return {
        line1: 'MAX ACS712 LIMIT',
        line2: `LIMIT: [ ${maxCurrent} A ]  `
      };
    }

    return { line1: 'SMART BOILER 2.0', line2: 'SYSTEM READY    ' };
  };

  const { line1, line2 } = getScreenContent();

  return (
    <div className="p-6 rounded-3xl bg-obsidian-950 border border-white/10 shadow-2xl space-y-5">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs text-slate-300 uppercase tracking-wider">
            ЛОКАЛЬНЫЙ HMI: ДИСПЛЕЙ 1602 + КНОПКИ
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-500">I2C ADAPTER PCF8574</span>
      </div>

      {/* Realistic 1602 LCD Bezel */}
      <div className="p-4 rounded-2xl bg-[#091510] border-4 border-[#1A3828] shadow-inner relative overflow-hidden">
        
        {/* Scanlines layer */}
        <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />

        {/* LCD Screen Display */}
        <div className="font-mono text-base sm:text-lg font-bold tracking-[0.16em] text-[#3BFF84] drop-shadow-[0_0_8px_rgba(59,255,132,0.8)] select-none">
          <div className="h-7 flex items-center">{line1.padEnd(16, ' ')}</div>
          <div className="h-7 flex items-center">{line2.padEnd(16, ' ')}</div>
        </div>

        {/* Backlight reflection */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#3BFF84]/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Tactile Push Buttons */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={handleMinus}
          className="flex-1 py-3 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 hover:border-white/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 font-mono text-xs text-slate-200"
        >
          <Minus className="w-4 h-4 text-slate-400" />
          <span>[-] ВНИЗ</span>
        </button>

        <button
          onClick={handlePlus}
          className="flex-1 py-3 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 hover:border-white/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 font-mono text-xs text-slate-200"
        >
          <Plus className="w-4 h-4 text-slate-400" />
          <span>[+] ВВЕРХ</span>
        </button>

        <button
          onClick={handleMenuClick}
          className="flex-1 py-3 rounded-xl bg-ember-500/20 hover:bg-ember-500/30 border border-ember-500/40 hover:border-ember-500/60 active:scale-95 transition-all flex items-center justify-center gap-1.5 font-mono text-xs text-ember-300 font-semibold"
        >
          <Menu className="w-4 h-4 text-ember-400" />
          <span>[MENU]</span>
        </button>
      </div>

      <div className="text-[11px] text-slate-400 font-mono text-center">
        Нажимайте <span className="text-ember-300 font-semibold">[MENU]</span> для навигации по энергонезависимой памяти NVS
      </div>

    </div>
  );
}
