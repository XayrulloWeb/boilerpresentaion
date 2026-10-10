import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Play, RotateCcw, CheckCircle, ShieldAlert, Cpu, Activity, Zap, Sliders, Film } from 'lucide-react';
import { sound } from '../utils/audio';

export default function AntiJamLab() {
  const [jammed, setJammed] = useState(false);
  const [currentAmps, setCurrentAmps] = useState(0.85);
  const [stateText, setStateText] = useState('STATE_SHNEK_WORK (Вперед)');
  const [relayFwd, setRelayFwd] = useState(true);
  const [relayRev, setRelayRev] = useState(false);
  const [reverseTimer, setReverseTimer] = useState(0);
  const [thresholdAmps, setThresholdAmps] = useState(3.5);
  const [rescuedCount, setRescuedCount] = useState(15);
  
  // 240 Frames Animation State
  const TOTAL_AUGER_FRAMES = 240;
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);
  const augerCanvasRef = useRef(null);
  const augerImagesRef = useRef([]);
  const oscCanvasRef = useRef(null);
  const waveDataRef = useRef(Array(60).fill(0.85));

  // Preload auger frames
  useEffect(() => {
    const images = [];
    for (let i = 1; i <= TOTAL_AUGER_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(4, '0');
      img.src = `/frames/auger/frame_${numStr}.webp`;
      images.push(img);
    }
    augerImagesRef.current = images;

    return () => {
      augerImagesRef.current = [];
    };
  }, []);

  // Draw current frame on Auger Canvas
  useEffect(() => {
    const canvas = augerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = augerImagesRef.current[currentFrame];

    if (img && img.complete) {
      canvas.width = 1280;
      canvas.height = 720;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    } else if (img) {
      img.onload = () => {
        canvas.width = 1280;
        canvas.height = 720;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }
  }, [currentFrame]);

  // Oscilloscope canvas animation
  useEffect(() => {
    const canvas = oscCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const render = () => {
      const w = (canvas.width = canvas.offsetWidth);
      const h = (canvas.height = canvas.offsetHeight);

      ctx.clearRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Threshold line
      const thresholdY = h - (thresholdAmps / 5.5) * h;
      ctx.strokeStyle = 'rgba(255, 42, 85, 0.6)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, thresholdY);
      ctx.lineTo(w, thresholdY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#FF2A55';
      ctx.font = '10px "JetBrains Mono"';
      ctx.fillText(`LIMIT: ${thresholdAmps}A`, 8, thresholdY - 4);

      // Shift wave data
      const noise = jammed ? (Math.random() * 0.3 - 0.15) : (Math.random() * 0.06 - 0.03);
      waveDataRef.current.push(currentAmps + noise);
      waveDataRef.current.shift();

      // Draw wave
      ctx.beginPath();
      const step = w / (waveDataRef.current.length - 1);
      waveDataRef.current.forEach((val, i) => {
        const x = i * step;
        const y = h - (val / 5.5) * h;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });

      ctx.strokeStyle = jammed ? '#FF2A55' : '#00F0FF';
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 10;
      ctx.shadowColor = jammed ? '#FF2A55' : '#00F0FF';
      ctx.stroke();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [currentAmps, jammed, thresholdAmps]);

  // Full Cinematic Jam & Reverse Simulation Sequence
  const triggerJam = () => {
    if (isPlayingAuto) return;
    setIsPlayingAuto(true);
    setCurrentFrame(0);

    // Phase 1: Forward movement towards jam point (frame 0 -> 72)
    let frame = 0;
    const fwdInterval = setInterval(() => {
      frame += 2;
      if (frame >= 72) {
        clearInterval(fwdInterval);
        setCurrentFrame(72);

        // Jam occurs!
        setJammed(true);
        setCurrentAmps(4.35);
        sound.playAlarm();

        // 300ms ACS712 debounce
        setTimeout(() => {
          sound.playRelayClick();
          setRelayFwd(false);
          setRelayRev(true);
          setStateText('TIQILDI! REV: 3.0s (Реверс PIN 19)');
          setReverseTimer(3);

          // Phase 2: Reverse 3.0s frame playback (frame 72 -> 180)
          let revFrame = 72;
          const revInterval = setInterval(() => {
            revFrame += 2;
            if (revFrame >= 180) {
              clearInterval(revInterval);
              setCurrentFrame(180);

              // Phase 3: Rock freed (frame 180 -> 239)
              sound.playRelayClick();
              sound.playSuccess();
              setRelayRev(false);
              setRelayFwd(true);
              setJammed(false);
              setCurrentAmps(0.85);
              setStateText('STATE_SHNEK_WORK (Камень сброшен, норма)');
              setRescuedCount((c) => c + 1);

              let postFrame = 180;
              const postInterval = setInterval(() => {
                postFrame += 2;
                if (postFrame >= TOTAL_AUGER_FRAMES - 1) {
                  clearInterval(postInterval);
                  setCurrentFrame(0);
                  setIsPlayingAuto(false);
                } else {
                  setCurrentFrame(postFrame);
                }
              }, 40);

            } else {
              setCurrentFrame(revFrame);
            }
          }, 45);

          // Reverse countdown timer display
          let timeLeft = 3;
          const timer = setInterval(() => {
            timeLeft -= 1;
            setReverseTimer(timeLeft);
            if (timeLeft <= 0) clearInterval(timer);
          }, 1000);

        }, 300);

      } else {
        setCurrentFrame(frame);
      }
    }, 35);
  };

  return (
    <section id="antijam-lab" className="py-28 relative bg-obsidian-900 border-t border-white/10">
      
      {/* Background flare */}
      <div className="absolute top-1/3 left-10 w-[600px] h-[600px] bg-hazard/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-hazard/40 bg-hazard/10 text-rose-300 text-xs font-mono">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>ИНТЕЛЛЕКТУАЛЬНЫЙ АНТИ-КЛИН В РЕАЛЬНОМ ВРЕМЕНИ</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Тест-лаборатория: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400">
              кинематографичный скраббинг заклинивания
            </span>
          </h2>
          <p className="text-slate-400 text-base">
            Посмотрите покадровую физику в 4K: камень зажимает виток шнека, датчик тока мгновенно фиксирует скачок нагрузки, и контроллер отводит шнек назад ровно на 3 секунды.
          </p>
        </div>

        {/* The Interactive Lab Simulator Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: 240-Frame Interactive Auger Canvas */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between relative overflow-hidden">
            
            {/* Visual Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${jammed ? 'bg-rose-500 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
                <span className="font-mono text-xs tracking-wider text-slate-300 uppercase">
                  {stateText}
                </span>
              </div>
              <div className="font-mono text-xs text-slate-400">
                Спасенных моторов: <span className="text-emerald-400 font-bold">{rescuedCount}</span>
              </div>
            </div>

            {/* Live 240-Frame WebP Canvas Player */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-obsidian-950 border border-white/10 shadow-2xl">
              <canvas
                ref={augerCanvasRef}
                className="w-full h-full object-cover"
              />

              {/* Dynamic Laser & Jam Simulation Overlay */}
              {jammed && (
                <div className="absolute inset-0 bg-rose-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-6 animate-pulse">
                  <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center mb-3 text-rose-400 shadow-2xl shadow-rose-500">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <div className="font-display font-bold text-2xl sm:text-3xl text-white tracking-wide text-glow-hazard">
                    ВНИМАНИЕ: ЗАКЛИНИВАНИЕ!
                  </div>
                  <div className="font-mono text-sm text-rose-300 mt-1">
                    Ток: {currentAmps}A (Превышение лимита {thresholdAmps}A)
                  </div>
                  <div className="mt-4 px-4 py-2 rounded-xl bg-obsidian-950/90 border border-rose-500/50 font-mono text-xs text-amber-300">
                    ОТКАТ РЕВЕРСА: <span className="font-bold text-base text-white">{reverseTimer} сек</span>
                  </div>
                </div>
              )}

              {/* Status Badges on Image */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="flex gap-2">
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono border ${
                    relayFwd ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-obsidian-900/80 text-slate-500 border-white/5'
                  }`}>
                    PIN 18: FWD {relayFwd ? 'ON' : 'OFF'}
                  </span>
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono border ${
                    relayRev ? 'bg-rose-500/30 text-rose-300 border-rose-500/50 animate-pulse' : 'bg-obsidian-900/80 text-slate-500 border-white/5'
                  }`}>
                    PIN 19: REV {relayRev ? 'ACTIVE' : 'OFF'}
                  </span>
                </div>

                <div className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-obsidian-950/80 text-slate-400 border border-white/10">
                  КАДР {currentFrame + 1} / {TOTAL_AUGER_FRAMES}
                </div>
              </div>
            </div>

            {/* Interactive Frame Timeline Scrubber */}
            <div className="pt-4 space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-plasma-400" />
                  <span>РУЧНОЙ СКРАББИНГ ПО КАДРАМ:</span>
                </span>
                <span className="text-white font-bold">{Math.round((currentFrame / TOTAL_AUGER_FRAMES) * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max={TOTAL_AUGER_FRAMES - 1}
                value={currentFrame}
                disabled={isPlayingAuto}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setCurrentFrame(val);
                  if (val > 68 && val < 175) {
                    setCurrentAmps(4.2);
                    setJammed(true);
                  } else {
                    setCurrentAmps(0.85);
                    setJammed(false);
                  }
                }}
                className="w-full accent-plasma-400 cursor-pointer h-1.5 bg-obsidian-800 rounded-lg"
              />
            </div>

            {/* Test Trigger Button */}
            <div className="pt-5">
              <button
                onClick={triggerJam}
                disabled={isPlayingAuto}
                className={`w-full py-4 px-6 rounded-2xl font-display font-semibold text-base flex items-center justify-center gap-3 transition-all ${
                  isPlayingAuto
                    ? 'bg-rose-600/40 text-rose-300 border border-rose-500/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-rose-500 via-amber-500 to-orange-500 text-white shadow-xl shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-[1.01] active:scale-95'
                }`}
              >
                <Zap className="w-5 h-5 text-amber-100 animate-bounce" />
                <span>
                  {isPlayingAuto ? `Симуляция реверса в действии...` : 'Бросить камень в шнек (Тест Анти-Клина)'}
                </span>
              </button>
            </div>

          </div>

          {/* Right: Oscilloscope & Current Diagnostics */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between space-y-6">
            
            {/* Oscilloscope Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-plasma-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-plasma-400" />
                  <span>ОСЦИЛЛОГРАФ ТОКА ACS712 (TRUE-RMS)</span>
                </span>
                <span className="font-mono text-xs text-slate-400">PIN 34 • 12-BIT</span>
              </div>
              
              {/* Live Canvas Waveform */}
              <div className="h-44 w-full bg-obsidian-950 rounded-2xl border border-white/10 p-3 relative overflow-hidden">
                <canvas ref={oscCanvasRef} className="w-full h-full" />
                <div className="absolute top-3 right-3 font-mono text-xs px-2 py-0.5 rounded bg-obsidian-900/80 border border-white/10 text-white">
                  I = <span className={jammed ? 'text-rose-400 font-bold' : 'text-plasma-400'}>{currentAmps.toFixed(2)}A</span>
                </div>
              </div>
            </div>

            {/* Threshold Slider */}
            <div className="space-y-2 p-4 rounded-2xl bg-obsidian-850 border border-white/5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300">Порог отсечки тока:</span>
                <span className="text-ember-400 font-bold">{thresholdAmps} Ампер</span>
              </div>
              <input
                type="range"
                min="1.5"
                max="5.0"
                step="0.1"
                value={thresholdAmps}
                onChange={(e) => setThresholdAmps(parseFloat(e.target.value))}
                className="w-full accent-ember-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1.5A (Мягкие пеллеты)</span>
                <span>3.5A (Стандарт)</span>
                <span>5.0A (Крупный антрацит)</span>
              </div>
            </div>

            {/* Microprocessor Logic Breakdown */}
            <div className="space-y-2.5 text-xs text-slate-300 font-mono">
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-plasma-400/20 text-plasma-300 flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                <span>True-RMS сканирование синусоиды 200 раз за цикл.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-plasma-400/20 text-plasma-300 flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                <span>Фильтр 300 мс отсекает пусковые броски электромотора.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                <span>Аппаратный реверс 3000 мс гарантированно освобождает шнек.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
