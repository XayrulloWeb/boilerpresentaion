import React, { useEffect, useRef, useState } from 'react';
import { Layers, Sparkles } from 'lucide-react';
import { gsap, ScrollTrigger } from '../utils/smoothScroll';
import { useLanguage } from '../context/LanguageContext';

export default function AppleBoilerScroller() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);
  const imagesRef = useRef([]);

  const TOTAL_FRAMES = 240;

  // Preload frames
  useEffect(() => {
    let loadedCount = 0;
    const images = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(4, '0');
      img.src = `/frames/boiler/frame_${numStr}.webp`;
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

    // Vignettes
    const gradTop = ctx.createLinearGradient(0, 0, 0, h * 0.22);
    gradTop.addColorStop(0, 'rgba(8, 9, 12, 0.95)');
    gradTop.addColorStop(1, 'rgba(8, 9, 12, 0)');
    ctx.fillStyle = gradTop;
    ctx.fillRect(0, 0, w, h * 0.22);

    const gradBottom = ctx.createLinearGradient(0, h * 0.78, 0, h);
    gradBottom.addColorStop(0, 'rgba(8, 9, 12, 0)');
    gradBottom.addColorStop(1, 'rgba(8, 9, 12, 0.98)');
    ctx.fillStyle = gradBottom;
    ctx.fillRect(0, h * 0.78, w, h * 0.22);
  };

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    drawFrame(0);

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollPct(Math.round(progress * 100));

        const targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(progress * (TOTAL_FRAMES - 1))
        );

        setCurrentFrameIndex(targetFrame);
        drawFrame(targetFrame);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isLoaded]);

  const getStageContent = () => {
    const p = scrollPct / 100;
    if (p < 0.25) {
      return {
        badge: t.boilerScroller.stage1Badge,
        title: t.boilerScroller.stage1Title,
        desc: t.boilerScroller.stage1Desc
      };
    } else if (p < 0.55) {
      return {
        badge: t.boilerScroller.stage2Badge,
        title: t.boilerScroller.stage2Title,
        desc: t.boilerScroller.stage2Desc
      };
    } else if (p < 0.8) {
      return {
        badge: t.boilerScroller.stage3Badge,
        title: t.boilerScroller.stage3Title,
        desc: t.boilerScroller.stage3Desc
      };
    } else {
      return {
        badge: t.boilerScroller.stage4Badge,
        title: t.boilerScroller.stage4Title,
        desc: t.boilerScroller.stage4Desc
      };
    }
  };

  const stage = getStageContent();

  return (
    <section ref={containerRef} className="relative h-[350vh] bg-obsidian-950">
      
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* The Frame Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover select-none"
        />

        {/* Loading Overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-obsidian-950 flex flex-col items-center justify-center z-50 p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-ember-500/20 border border-ember-500 flex items-center justify-center text-ember-400 animate-pulse shadow-2xl shadow-ember-500/30">
              <Layers className="w-8 h-8" />
            </div>
            <div className="font-display font-bold text-xl text-white">
              {t.boilerScroller.loading}
            </div>
            <div className="w-64 h-2 rounded-full bg-obsidian-800 overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-ember-500 to-amber-400 transition-all duration-150"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <div className="font-mono text-xs text-slate-400">
              {loadProgress}% (240 {t.boilerScroller.framesText})
            </div>
          </div>
        )}

        {/* Top Header Badge */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-obsidian-900/90 backdrop-blur-md text-xs font-mono text-slate-300 shadow-2xl">
            <Sparkles className="w-3.5 h-3.5 text-ember-400 animate-spin-slow" />
            <span>{t.boilerScroller.badge}</span>
          </div>
        </div>

        {/* Floating Dynamic Storytelling Overlay Card */}
        <div ref={cardRef} className="absolute bottom-16 left-6 sm:left-12 max-w-lg z-30 pointer-events-none">
          <div className="p-6 rounded-3xl glass-panel border border-white/15 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-ember-500/20 text-ember-300 font-mono text-xs font-semibold mb-2.5 border border-ember-500/30">
              {stage.badge}
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
              {stage.title}
            </h3>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed font-normal">
              {stage.desc}
            </p>

            {/* Scrub Progress Bar */}
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-ember-400 animate-pulse" />
                <span>3D: {scrollPct}%</span>
              </div>
              <div className="text-slate-500">
                {currentFrameIndex + 1} / {TOTAL_FRAMES}
              </div>
            </div>
          </div>
        </div>

        {/* Right HUD Progress Line */}
        <div className="hidden lg:flex flex-col items-center gap-3 absolute right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none font-mono text-[11px] text-slate-400">
          <span className="text-white font-bold">{scrollPct}%</span>
          <div className="w-1.5 h-44 rounded-full bg-obsidian-800 border border-white/10 relative overflow-hidden">
            <div
              className="w-full bg-gradient-to-b from-ember-500 to-amber-300 absolute top-0 rounded-full transition-all duration-100"
              style={{ height: `${scrollPct}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-500 rotate-90 origin-center mt-4">3D VIEW</span>
        </div>

      </div>

    </section>
  );
}
