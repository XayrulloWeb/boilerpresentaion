import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { initSmoothScroll } from './utils/smoothScroll';
import Navbar from './components/Navbar';
import ParticleEmberCanvas from './components/ParticleEmberCanvas';
import HeroSection from './components/HeroSection';
import ProblemSolution from './components/ProblemSolution';
import AppleBoilerScroller from './components/AppleBoilerScroller';
import AugerCinemaScroller from './components/AugerCinemaScroller';
import ExplodedScrollytelling from './components/ExplodedScrollytelling';
import TeamSection from './components/TeamSection';
import WhyUsSection from './components/WhyUsSection';
import RoadmapSection from './components/RoadmapSection';
import ImplementationPlan from './components/ImplementationPlan';
import FourScenarios from './components/FourScenarios';
import MobileFlutterPreview from './components/MobileFlutterPreview';
import RoiCalculator from './components/RoiCalculator';
import ComparisonTable from './components/ComparisonTable';
import TechnicalSpecs from './components/TechnicalSpecs';
import ApiSection from './components/ApiSection';
import OrderConfigurator from './components/OrderConfigurator';
import AIChatbot from './components/AIChatbot';
import Footer from './components/Footer';
import DemoPage from './pages/DemoPage';

function MainPage({ onOpenOrder, calculatorData }) {
  return (
    <main className="relative z-20">
      {/* Hero */}
      <HeroSection onOpenOrder={onOpenOrder} />

      {/* Pitch Day 3.0: 1. Проблема → Решение */}
      <ProblemSolution />

      {/* Apple Pro 3D Scrollytelling — 240 Frames Fullscreen Boiler Deconstruction */}
      <AppleBoilerScroller />

      {/* Cinematic Scrollytelling — 240 Frames Auger Jam & Smart Reverse Drama */}
      <AugerCinemaScroller />

      {/* Deep Component Anatomy & Pinouts */}
      <ExplodedScrollytelling />

      {/* Pitch Day 3.0: 2. Команда (роли, навыки, технологии, ссылки) */}
      <TeamSection />

      {/* Pitch Day 3.0: 3. Почему ваша команда может решить эту проблему */}
      <WhyUsSection />

      {/* Pitch Day 3.0: 4. Дорожная карта: Idea / Prototype / MVP / Launched */}
      <RoadmapSection />

      {/* Pitch Day 3.0: 5. План реализации решения (этапы, технологии, инструменты, ИИ-решения) */}
      <ImplementationPlan />

      {/* 4 Operational Scenarios & LCD 1602 Terminal */}
      <FourScenarios />

      {/* Mobile App Interactive Demo */}
      <MobileFlutterPreview />

      {/* Fuel ROI Calculator */}
      <RoiCalculator onOpenOrderWithData={onOpenOrder} />

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Technical Specifications */}
      <TechnicalSpecs />

      {/* Pitch Day 3.0 Bonus 2: Доступ к API (API Access & Sandbox) */}
      <ApiSection />

      {/* Order Configurator & Hardware Kit */}
      <OrderConfigurator initialData={calculatorData} />
    </main>
  );
}

export default function App() {
  const [calculatorData, setCalculatorData] = useState(null);

  // Initialize Lenis Smooth Scroll unified with GSAP ScrollTrigger
  useEffect(() => {
    const smooth = initSmoothScroll();
    return () => {
      if (smooth) smooth.destroy();
    };
  }, []);

  const handleOpenOrder = (data = null) => {
    if (data) {
      setCalculatorData(data);
    }
    const orderSection = document.getElementById('order');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="relative bg-obsidian-950 text-slate-100 min-h-screen selection:bg-ember-500 selection:text-white">
          {/* Ambient Fire Ember Particles */}
          <ParticleEmberCanvas />

          {/* Top Fixed Minimal Header with i18n switcher */}
          <Navbar onOpenOrder={() => handleOpenOrder()} />

          {/* Routes */}
          <Routes>
            <Route
              path="/"
              element={<MainPage onOpenOrder={handleOpenOrder} calculatorData={calculatorData} />}
            />
            {/* Pitch Day 3.0: 6. Страница '/demo' */}
            <Route path="/demo" element={<DemoPage />} />
          </Routes>

          {/* Pitch Day 3.0 Bonus 1: Чат-бот с ИИ (AI Assistant) */}
          <AIChatbot />

          {/* Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
