import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ProblemSection } from './components/ProblemSection.tsx';
import { SolutionSection } from './components/SolutionSection.tsx';
import { HowItWorksSection } from './components/HowItWorksSection.tsx';
import { RoadmapSection } from './components/RoadmapSection.tsx';
import { RequestDemoSection } from './components/RequestDemoSection.tsx';
import { Footer } from './components/Footer.tsx';
import { DashboardView } from './components/DashboardView.tsx';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');

  // Listen to URL hash or query params
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const search = new URLSearchParams(window.location.search);
      if (hash === '#dashboard' || search.get('view') === 'dashboard') {
        setCurrentView('dashboard');
      } else {
        setCurrentView('landing');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: 'landing' | 'dashboard') => {
    setCurrentView(view);
    if (view === 'dashboard') {
      window.location.hash = 'dashboard';
    } else {
      if (window.location.hash === '#dashboard') {
        history.pushState(null, '', window.location.pathname);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRequestDemoClick = () => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      if (window.location.hash === '#dashboard') {
        history.pushState(null, '', window.location.pathname);
      }
      setTimeout(() => {
        document.getElementById('request-demo')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('request-demo')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentView === 'dashboard') {
    return (
      <DashboardView onBackToLanding={() => handleNavigate('landing')} />
    );
  }

  return (
    <div className="bg-dotted-pattern text-[#133E32] font-sans antialiased min-h-screen relative overflow-x-hidden selection:bg-[#FFC400] selection:text-[#133E32]">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onRequestDemoClick={handleRequestDemoClick}
      />

      {/* Main Sections */}
      <main>
        <HeroSection
          onRequestDemoClick={handleRequestDemoClick}
          onExploreDashboard={() => handleNavigate('dashboard')}
        />

        <ProblemSection />

        <SolutionSection
          onExploreDashboard={() => handleNavigate('dashboard')}
        />

        <HowItWorksSection />

        <RoadmapSection />

        <RequestDemoSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onRequestDemoClick={handleRequestDemoClick}
      />
    </div>
  );
}
