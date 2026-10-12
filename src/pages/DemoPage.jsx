import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Film, ExternalLink, ArrowLeft, CheckCircle2, Zap, Shield, Flame, Activity } from 'lucide-react';
import { sound } from '../utils/audio';

export default function DemoPage() {
  const [aspectMode, setAspectMode] = useState('shorts'); // 'shorts' (9:16) or 'wide' (16:9)

  const video = {
    title: 'Smart Boiler qurilmasi haqida — Реальная демонстрация устройства',
    embedUrl: 'https://www.youtube.com/embed/heTbtOToZdE',
    directUrl: 'https://youtube.com/shorts/heTbtOToZdE?si=7yUYinkr_JxNKDPA',
    duration: '0:59 мин',
    desc: 'Практическая видеодемонстрация готового устройства Smart Boiler: обзор изготовленного корпуса, электронного блока управления, подключения датчиков к котлу и работы силовой автоматики.',
    timeline: [
      { time: '00:00 – 00:15', title: 'Обзор корпуса и компоновки блока', detail: 'Внешний вид контроллера Smart Boiler, органы управления и эргономика.' },
      { time: '00:15 – 00:35', title: 'Подключение датчиков и силовой части', detail: 'Интеграция цифрового датчика DS18B20, сенсора ACS712 и реле шнека/турбины.' },
      { time: '00:35 – 00:59', title: 'Проверка рабочих режимов автоматики', detail: 'Подача топлива, управление наддувом и защита от аварийных ситуаций.' }
    ]
  };

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
            Раздел подготовлен в соответствии с требованиями регламента Pitch Day 3.0. Ниже представлена видеозапись испытаний системы, хронометраж инженерных процессов и доступ к работающему прототипу.
          </p>
        </div>

        {/* Active Demo Video Badge */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-red-500/40 bg-red-500/15 text-white font-display text-sm font-semibold shadow-xl shadow-red-500/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <Play className="w-4 h-4 text-red-400 fill-red-400" />
            <span>Smart Boiler qurilmasi haqida (YouTube Shorts)</span>
          </div>
        </div>

        {/* Video Player Card */}
        <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl p-3 sm:p-5 bg-obsidian-900/90 space-y-4">
          
          {/* Controls toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-2 pt-1 pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Формат отображения:</span>
              <div className="inline-flex rounded-xl bg-obsidian-950 p-1 border border-white/10 text-xs font-mono">
                <button
                  onClick={() => {
                    sound.playButtonClick();
                    setAspectMode('shorts');
                  }}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    aspectMode === 'shorts'
                      ? 'bg-red-500/30 text-white font-bold border border-red-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Shorts (9:16)
                </button>
                <button
                  onClick={() => {
                    sound.playButtonClick();
                    setAspectMode('wide');
                  }}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    aspectMode === 'wide'
                      ? 'bg-red-500/30 text-white font-bold border border-red-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Широкий (16:9)
                </button>
              </div>
            </div>

            {video.directUrl && (
              <a
                href={video.directUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playButtonClick()}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 text-xs font-mono transition-all hover:scale-[1.02] active:scale-95"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Смотреть в YouTube Shorts</span>
              </a>
            )}
          </div>

          {/* Player viewport */}
          <div className="flex justify-center bg-black/80 rounded-2xl p-2 sm:p-4">
            <div
              className={`w-full overflow-hidden rounded-2xl bg-black shadow-2xl border border-white/10 transition-all duration-300 ${
                aspectMode === 'shorts'
                  ? 'max-w-[420px] aspect-[9/16]'
                  : 'max-w-5xl aspect-video'
              }`}
            >
              <iframe
                key={`youtube-${aspectMode}`}
                src={`${video.embedUrl}?autoplay=1&rel=0&modestbranding=1`}
                title={video.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
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
              {video.title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {video.desc}
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400 border-t border-white/10 pt-4">
              <div>Длительность: <span className="text-white font-bold">{video.duration}</span></div>
              {video.directUrl && (
                <a
                  href={video.directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 underline inline-flex items-center gap-1"
                >
                  <span>Ссылка на ролик</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Right: Detailed Timestamps */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
            <div className="text-xs font-mono text-plasma-400 uppercase tracking-wider mb-2">
              ПОКАДРОВЫЙ ХРОНОМЕТРАЖ И ТАЙМКОДЫ
            </div>
            <div className="space-y-3 font-mono text-xs">
              {video.timeline.map((item, idx) => (
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
