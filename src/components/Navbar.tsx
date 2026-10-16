import React, { useState } from 'react';
import { LayoutDashboard, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'dashboard';
  onNavigate: (view: 'landing' | 'dashboard') => void;
  onRequestDemoClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onRequestDemoClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (anchorId: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'landing') {
      onNavigate('landing');
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(anchorId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative z-20 w-full pt-6 pb-4 px-6 md:px-12 max-w-7xl mx-auto flex items-center justify-between">
      {/* Brand Logo and Tagline */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        aria-label="Aahar Home"
        className="flex flex-col items-start group"
      >
        <div className="h-12 flex items-center">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOTdRojWN9qbpaOQVy_FztDvlSE4FiCGxNj9ILSWaW_p2wl_eppzdsz7s8opEtSCyEadDKII5e-VZnz0KZ3ZBf2nR_R8YwbBSSrqIOogrgdqHYEZcNvYZ326z8AfXMHTHLBBnm0TM9lDvDUra-svk6fblX5It9mwxwl6CLmUJCePJqh3GlOrFmCD_bsyDeAUsa1aFGCd6sXUIyNOMoPDZfqNFPJdGqsaIs0oD6mfLlMlb_-uvtXBUq"
            alt="Aahar Logo"
            className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </div>
        <span className="text-xs tracking-wider font-semibold text-[#133E32] mt-0.5 opacity-90">
          Less waste, more taste
        </span>
      </a>

      {/* Top decorative blob behind middle nav (matching original design) */}
      <div aria-hidden="true" className="organic-blob-nav hidden lg:block" />

      {/* Center Navigation Links */}
      <nav
        aria-label="Main Navigation"
        className="hidden md:flex items-center space-x-7 text-[#133E32] font-medium text-[15px] relative z-10"
      >
        <button
          type="button"
          onClick={() => handleNavClick('the-problem')}
          className="hover:text-amber-800 transition-colors font-medium text-left cursor-pointer"
        >
          The problem
        </button>
        <button
          type="button"
          onClick={() => handleNavClick('solution')}
          className="hover:text-amber-800 transition-colors font-semibold text-left cursor-pointer"
        >
          Solution
        </button>
        <button
          type="button"
          onClick={() => handleNavClick('how-it-works')}
          className="hover:text-amber-800 transition-colors font-medium text-left cursor-pointer"
        >
          How it works
        </button>
        <button
          type="button"
          onClick={() => handleNavClick('roadmap')}
          className="hover:text-amber-800 transition-colors font-medium text-left cursor-pointer"
        >
          Roadmap
        </button>
        <button
          type="button"
          onClick={() => onNavigate(currentView === 'dashboard' ? 'landing' : 'dashboard')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            currentView === 'dashboard'
              ? 'bg-[#133E32] text-white shadow-sm'
              : 'bg-[#FFC400]/40 text-[#133E32] hover:bg-[#FFC400]'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          {currentView === 'dashboard' ? 'Back to Landing' : 'Live Dashboard'}
        </button>
      </nav>

      {/* Header Action Button */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onRequestDemoClick}
          className="hidden sm:inline-flex bg-[#133E32] text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-md hover:bg-[#0E2E25] transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
        >
          Request a demo
        </button>

        {/* Mobile menu toggle button */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#133E32] hover:bg-stone-200/60 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile navigation dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-4 right-4 bg-[#FFF7E5] border border-stone-300 shadow-xl rounded-2xl p-6 mt-2 md:hidden flex flex-col space-y-4 z-50">
          <button
            type="button"
            onClick={() => handleNavClick('the-problem')}
            className="text-left font-medium text-stone-800 py-1"
          >
            The problem
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('solution')}
            className="text-left font-semibold text-stone-800 py-1"
          >
            Solution
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('how-it-works')}
            className="text-left font-medium text-stone-800 py-1"
          >
            How it works
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('roadmap')}
            className="text-left font-medium text-stone-800 py-1"
          >
            Roadmap
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate(currentView === 'dashboard' ? 'landing' : 'dashboard');
            }}
            className="flex items-center justify-between w-full py-2 px-3 bg-[#FFC400]/40 rounded-xl font-bold text-sm text-[#133E32]"
          >
            <span className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              {currentView === 'dashboard' ? 'Back to Landing Page' : 'Open Business Dashboard'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onRequestDemoClick();
            }}
            className="w-full bg-[#133E32] text-white text-sm font-semibold py-3 rounded-full text-center"
          >
            Request a demo
          </button>
        </div>
      )}
    </header>
  );
};
