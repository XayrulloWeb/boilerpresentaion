import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export function initSmoothScroll() {
  if (typeof window === 'undefined') return null;

  if (lenisInstance) {
    lenisInstance.destroy();
  }

  // Create Lenis smooth scrolling instance
  lenisInstance = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential luxury deceleration
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.8,
    infinite: false,
  });

  // Synchronize Lenis with GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Drive Lenis RAF from GSAP ticker for perfect 120Hz/60Hz monitor sync
  const updateTicker = (time) => {
    lenisInstance.raf(time * 1000);
  };

  gsap.ticker.add(updateTicker);
  gsap.ticker.lagSmoothing(0);

  return {
    lenis: lenisInstance,
    destroy: () => {
      gsap.ticker.remove(updateTicker);
      lenisInstance.destroy();
      lenisInstance = null;
    }
  };
}

export { gsap, ScrollTrigger };
