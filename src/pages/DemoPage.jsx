import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Film, ExternalLink, ArrowLeft, CheckCircle2, Zap, Shield, Flame, Activity } from 'lucide-react';
import { sound } from '../utils/audio';

export default function DemoPage() {
  const [activeVideo, setActiveVideo] = useState('boiler'); // 'boiler' or 'auger'

  const videos = {
    boiler: {
      title: '3D Взрыв-схема и аппаратная архитектура Smart Boiler',
      src: '/videos/boiler_presentation.mp4',
      duration: '3:45 мин',
      desc: 'Полная кинематографическая разборка котла на компоненты: снятие внешней брони, раскрытие водяной рубашки, цифровой термозонд DS18B20, плата контроллера ESP32 и турбина наддува.',
      timeline: [
        { time: '00:00 – 00:45', title: 'Монолитный теплоизолированный корпус', detail: 'Жаропрочная котловая сталь 6 мм, гашение теплопотерь.' },
        { time: '00:45 – 01:30', title: 'Водяная рубашка и датчик DS18B20', detail: 'Цифровой 1-Wire замер без аналоговых помех с точностью 0.1°C.' },
        { time: '01:30 – 02:40', title: 'Двухъядерный вычислительный центр ESP32', detail: 'Аппаратная развязка реле, датчик Холла ACS712, память NVS.' },
        { time: '02:40 – 03:45', title: 'Турбина наддува и максимальный КПД', detail: 'Плавная регулировка подачи кислорода, сжигание угля без шлака.' }
      ]
    },
    auger: {
      title: 'Стендовые испытания: Заклинивание шнека и авто-реверс',
      src: '/videos/auger_reverse.mp4',
      duration: '2:15 мин',
      desc: 'Реальная физика заклинивания шнека камнем антрацита. Детекция броска тока датчиком ACS712, защитная пауза 300 мс и автоматический 3-секундный реверс шнека.',
      timeline: [
        { time: '00:00 – 00:30', title: 'Штатная подача топлива', detail: 'Шнек подает уголь вперед с номинальным током 0.85А.' },
        { time: '00:30 – 00:55', title: 'Попадание твердой породы в виток', detail: 'Резкая блокировка ротора, подскакивание тока до 4.35А.' },
        { time: '00:55 – 01:35', title: 'Срабатывание защиты и реверс 3 сек', detail: 'Реле PIN 18 размыкается, включается реверс PIN 19 на 3000 мс.' },
        { time: '01:35 – 02:15', title: 'Сброс камня и продолжение работы', detail: 'Порода падает в зольник, штатный цикл подачи возобновлен.' }
      ]
    }
  };

  const current = videos[activeVideo];

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 pt-24 pb-20 selection:bg-ember-500 selection:text-white">
      
      {/* Background ambient flare */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-ember-500/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 space-y-12">
        
        {/* Top Navigation & Pitch Day Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <Link
            to="/"
            onClick={() => sound.playButtonClick()}
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Вернуться на главную презентацию</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ember-500/10 border border-ember-500/30 text-ember-300 text-xs font-mono font-medium">
            <span className="w-2 h-2 rounded-full bg-ember-400 animate-ping" />
            <span>PITCH DAY 3.0 • ОФИЦИАЛЬНАЯ ДЕМОНСТРАЦИОННАЯ СТРАНИЦА (/DEMO)</span>
          </div>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Демонстрация работы: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ember-400 via-orange-300 to-amber-200">
              видео, таймлайн и интерактивный прототип
            </span>
          </h1>
          <p className="text-slate-400 text-base max-w-3xl leading-relaxed">
            Раздел подготовлен в соответствии с требованиями регламента Pitch Day 3.0. Ниже представлены видеозаписи испытаний системы, хронометраж инженерных процессов и доступ к работающему прототипу.
          </p>
        </div>

        {/* Video Switcher Tabs */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              sound.playButtonClick();
              setActiveVideo('boiler');
            }}
            className={`px-5 py-3 rounded-2xl border font-display text-sm font-semibold transition-all flex items-center gap-2.5 ${
              activeVideo === 'boiler'
                ? 'border-ember-500 bg-ember-500/20 text-white shadow-xl shadow-ember-500/20'
                : 'border-white/10 bg-obsidian-900 text-slate-400 hover:text-white'
            }`}
          >
            <Film className="w-4 h-4 text-ember-400" />
            <span>Видео 1: 3D Разбор и архитектура (3:45)</span>
          </button>

          <button
            onClick={() => {
              sound.playButtonClick();
              setActiveVideo('auger');
            }}
            className={`px-5 py-3 rounded-2xl border font-display text-sm font-semibold transition-all flex items-center gap-2.5 ${
              activeVideo === 'auger'
                ? 'border-ember-500 bg-ember-500/20 text-white shadow-xl shadow-ember-500/20'
                : 'border-white/10 bg-obsidian-900 text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Видео 2: Тест заклинивания и реверса (2:15)</span>
          </button>
        </div>

        {/* Video Player Card */}
        <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl p-3 sm:p-4 bg-obsidian-900/90">
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-black shadow-inner">
            <video
              key={current.src}
              src={current.src}
              controls
              autoPlay
              muted
              playsInline
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Section 6.2: Video Description & Timeline Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: General Description */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
            <div className="text-xs font-mono text-ember-400 uppercase tracking-wider">
              6.2. ОПИСАНИЕ ДЕМОНСТРАЦИОННОГО ВИДЕО
            </div>
            <h3 className="font-display font-bold text-2xl text-white">
              {current.title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {current.desc}
            </p>
            <div className="pt-2 text-xs font-mono text-slate-400">
              Длительность ролика: <span className="text-white font-bold">{current.duration}</span>
            </div>
          </div>

          {/* Right: Detailed Timestamps */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
            <div className="text-xs font-mono text-plasma-400 uppercase tracking-wider mb-2">
              ПОКАДРОВЫЙ ХРОНОМЕТРАЖ И ТАЙМКОДЫ
            </div>
            <div className="space-y-3 font-mono text-xs">
              {current.timeline.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-obsidian-850/80 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-ember-300 font-bold">
                    <span>{item.time}</span>
                    <span className="text-[10px] text-slate-400 uppercase">Этап {idx + 1}</span>
                  </div>
                  <div className="text-white font-semibold font-display text-sm">
                    {item.title}
                  </div>
                  <div className="text-slate-400 font-normal text-xs">
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Section 6.3: Link to Working Prototype */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-obsidian-900 to-obsidian-950 border border-emerald-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-mono text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>6.3. РАБОТАЮЩИЙ ПРОТОТИП В ОНЛАЙНЕ</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-white">
              Интерактивный симулятор Smart Boiler готов к тесту
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Вы можете протестировать живой эмулятор дисплея 1602, осциллограф токовой защиты ACS712 и мобильный клиент Flutter прямо в браузере.
            </p>
          </div>

          <Link
            to="/"
            onClick={() => sound.playButtonClick()}
            className="px-7 py-4 rounded-xl font-display font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2.5 shrink-0 text-sm"
          >
            <span>Запустить онлайн-прототип</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
