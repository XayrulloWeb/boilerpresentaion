import React, { useEffect, useRef, useState } from 'react';
import { ShieldAlert, Zap, Activity } from 'lucide-react';
import { gsap, ScrollTrigger } from '../utils/smoothScroll';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/audio';

export default function AugerCinemaScroller() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const oscCanvasRef = useRef(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const imagesRef = useRef([]);
  const hasTriggeredAlarmRef = useRef(false);
  const hasTriggeredSuccessRef = useRef(false);

  const TOTAL_FRAMES = 240;

  useEffect(() => {
    let loadedCount = 0;
    const images = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(4, '0');
      img.src = `/frames/auger/frame_${numStr}.webp`;
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      imagesRef.current = [];
    };
  }, []);

  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[index];

    if (!img || !img.complete) return;

    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);

    const imgRatio = img.width / img.height;
    const screenRatio = w / h;
    let renderW, renderH, offsetX, offsetY;

    if (screenRatio > imgRatio) {
      renderW = w;
      renderH = w / imgRatio;
      offsetX = 0;
      offsetY = (h - renderH) / 2;
    } else {
      renderH = h;
      renderW = h * imgRatio;
      offsetX = (w - renderW) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

    // Pulse red vignette if in jam phase
    if (index >= 68 && index <= 175) {
      const pulseOpacity = 0.25 + 0.15 * Math.sin(Date.now() / 150);
      const radGrad = ctx.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, w * 0.7);
      radGrad.addColorStop(0, 'rgba(255, 42, 85, 0)');
      radGrad.addColorStop(1, `rgba(255, 42, 85, ${pulseOpacity})`);
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, w, h);
    }

    const gradTop = ctx.createLinearGradient(0, 0, 0, h * 0.24);
    gradTop.addColorStop(0, 'rgba(8, 9, 12, 0.98)');
    gradTop.addColorStop(1, 'rgba(8, 9, 12, 0)');
    ctx.fillStyle = gradTop;
    ctx.fillRect(0, 0, w, h * 0.24);

    const gradBottom = ctx.createLinearGradient(0, h * 0.72, 0, h);
    gradBottom.addColorStop(0, 'rgba(8, 9, 12, 0)');
    gradBottom.addColorStop(1, 'rgba(8, 9, 12, 0.98)');
    ctx.fillStyle = gradBottom;
    ctx.fillRect(0, h * 0.72, w, h * 0.28);
  };

  useEffect(() => {
    const canvas = oscCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let wave = Array(50).fill(0.85);

    const renderOsc = () => {
      const w = (canvas.width = canvas.offsetWidth);
      const h = (canvas.height = canvas.offsetHeight);

      ctx.clearRect(0, 0, w, h);

      const isJammed = currentFrameIndex >= 68 && currentFrameIndex <= 175;
      const targetAmps = isJammed ? 4.35 : 0.85;
      const noise = isJammed ? (Math.random() * 0.4 - 0.2) : (Math.random() * 0.05 - 0.025);

      wave.push(targetAmps + noise);
      wave.shift();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let y = 0; y < h; y += 15) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const threshY = h - (3.5 / 5.5) * h;
      ctx.strokeStyle = 'rgba(255, 42, 85, 0.5)';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(0, threshY);
      ctx.lineTo(w, threshY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      const step = w / (wave.length - 1);
      wave.forEach((val, i) => {
        const x = i * step;
        const y = h - (val / 5.5) * h;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });

      ctx.strokeStyle = isJammed ? '#FF2A55' : '#00F0FF';
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 10;
      ctx.shadowColor = isJammed ? '#FF2A55' : '#00F0FF';
      ctx.stroke();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(renderOsc);
    };

    renderOsc();
    return () => cancelAnimationFrame(animId);
  }, [currentFrameIndex]);

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    drawFrame(0);

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollPct(Math.round(p * 100));

        const targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(p * (TOTAL_FRAMES - 1))
        );

        setCurrentFrameIndex(targetFrame);
        drawFrame(targetFrame);

        if (targetFrame >= 68 && targetFrame <= 75 && !hasTriggeredAlarmRef.current) {
          sound.playAlarm();
          sound.playRelayClick();
          hasTriggeredAlarmRef.current = true;
          hasTriggeredSuccessRef.current = false;
        } else if (targetFrame >= 180 && !hasTriggeredSuccessRef.current) {
          sound.playSuccess();
          sound.playRelayClick();
          hasTriggeredSuccessRef.current = true;
          hasTriggeredAlarmRef.current = false;
        } else if (targetFrame < 50) {
          hasTriggeredAlarmRef.current = false;
          hasTriggeredSuccessRef.current = false;
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isLoaded]);

  const getPhase = () => {
    const f = currentFrameIndex;

    if (f < 68) {
      return {
        badge: t.augerScroller.phase1Badge,
        badgeColor: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
        title: t.augerScroller.phase1Title,
        desc: t.augerScroller.phase1Desc,
        currentText: '0.85 A (OK)',
        status: 'FWD (PIN 18)',
        statusColor: 'text-emerald-400',
        alert: false
      };
    } else if (f <= 110) {
      return {
        badge: t.augerScroller.phase2Badge,
        badgeColor: 'border-rose-500/50 bg-rose-500/20 text-rose-300 animate-pulse',
        title: t.augerScroller.phase2Title,
        desc: t.augerScroller.phase2Desc,
        currentText: '4.35 A (> 3.5A)',
        status: 'PIN 18 OFF',
        statusColor: 'text-rose-400 font-bold',
        alert: true
      };
    } else if (f <= 178) {
      return {
        badge: t.augerScroller.phase3Badge,
        badgeColor: 'border-amber-500/40 bg-amber-500/15 text-amber-300 animate-pulse',
        title: t.augerScroller.phase3Title,
        desc: t.augerScroller.phase3Desc,
        currentText: '1.20 A (REV)',
        status: 'REV PIN 19 ACTIVE',
        statusColor: 'text-amber-400',
        alert: true
      };
    } else {
      return {
        badge: t.augerScroller.phase4Badge,
        badgeColor: 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300',
        title: t.augerScroller.phase4Title,
        desc: t.augerScroller.phase4Desc,
        currentText: '0.85 A (OK)',
        status: 'FEEDING RESUMED',
        statusColor: 'text-emerald-400',
        alert: false
      };
    }
  };

  const phase = getPhase();

  return (
    <section ref={containerRef} className="relative h-[380vh] bg-obsidian-950">
      
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Main Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover select-none"
        />

        {/* Loading Overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-obsidian-950 flex flex-col items-center justify-center z-50 p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500 flex items-center justify-center text-rose-400 animate-pulse shadow-2xl shadow-rose-500/30">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div className="font-display font-bold text-xl text-white">
              {t.augerScroller.loading}
            </div>
            <div className="w-64 h-2 rounded-full bg-obsidian-800 overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-150"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <div className="font-mono text-xs text-slate-400">
              {loadProgress}% (240 4K WebP)
            </div>
          </div>
        )}

        {/* Top Header Badge */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 bg-obsidian-900/90 backdrop-blur-md text-xs font-mono text-slate-200 shadow-2xl">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>{t.augerScroller.badge}</span>
          </div>
        </div>

        {/* Floating IMAX-Style Subtitle Narrative Card */}
        <div className="absolute bottom-14 left-6 sm:left-14 max-w-xl z-30 pointer-events-none">
          <div className={`p-6 sm:p-8 rounded-3xl glass-panel border shadow-2xl backdrop-blur-2xl transition-all duration-300 ${
            phase.alert ? 'border-rose-500/50 shadow-rose-500/20' : 'border-white/15'
          }`}>
            
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg font-mono text-xs font-bold mb-3 border ${phase.badgeColor}`}>
              {phase.badge}
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
              {phase.title}
            </h3>

            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              {phase.desc}
            </p>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div>
                <span className="text-slate-400 text-[11px]">{t.augerScroller.currentLabel}</span>
                <div className={`text-base font-bold ${phase.alert ? 'text-rose-400' : 'text-plasma-400'}`}>
                  {phase.currentText}
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[11px]">{t.augerScroller.relayLabel}</span>
                <div className={`text-sm font-semibold ${phase.statusColor}`}>
                  {phase.status}
                </div>
              </div>

              <div className="text-slate-500 text-[11px]">
                {currentFrameIndex + 1} / {TOTAL_FRAMES}
              </div>
            </div>

          </div>
        </div>

        {/* Floating Live Oscilloscope HUD in Bottom Right */}
        <div className="hidden lg:block absolute bottom-14 right-14 w-80 z-30 pointer-events-none">
          <div className="glass-panel p-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-2 font-mono text-xs text-plasma-300">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-plasma-400" />
                <span>ACS712 TRUE-RMS</span>
              </span>
              <span className="text-[10px] text-slate-400">PIN 34</span>
            </div>
            <div className="h-24 w-full bg-obsidian-950/80 rounded-xl overflow-hidden border border-white/10 p-2">
              <canvas ref={oscCanvasRef} className="w-full h-full" />
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mt-2">
              <span>Limit: 3.5А</span>
              <span className={phase.alert ? 'text-rose-400 font-bold' : 'text-plasma-400'}>
                {phase.currentText}
              </span>
            </div>
          </div>
        </div>

        {/* Right HUD Progress Line */}
        <div className="hidden lg:flex flex-col items-center gap-3 absolute right-6 top-1/2 -translate-y-1/2 z-30 pointer-events-none font-mono text-[11px] text-slate-400">
          <span className="text-white font-bold">{scrollPct}%</span>
          <div className="w-1.5 h-44 rounded-full bg-obsidian-800 border border-white/10 relative overflow-hidden">
            <div
              className={`w-full absolute top-0 rounded-full transition-all duration-100 ${
                phase.alert ? 'bg-gradient-to-b from-rose-500 to-amber-400' : 'bg-gradient-to-b from-plasma-400 to-emerald-400'
              }`}
              style={{ height: `${scrollPct}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-500 rotate-90 origin-center mt-4">SCROLL</span>
        </div>

      </div>

    </section>
  );
}
