import React from 'react';

interface FooterProps {
  onNavigate: (view: 'landing' | 'dashboard') => void;
  onRequestDemoClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onRequestDemoClick }) => {
  const scrollTo = (id: string) => {
    onNavigate('landing');
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="border-t border-stone-300/80 pt-12 pb-10 px-6 md:px-12 max-w-7xl mx-auto text-sm text-stone-600">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOTdRojWN9qbpaOQVy_FztDvlSE4FiCGxNj9ILSWaW_p2wl_eppzdsz7s8opEtSCyEadDKII5e-VZnz0KZ3ZBf2nR_R8YwbBSSrqIOogrgdqHYEZcNvYZ326z8AfXMHTHLBBnm0TM9lDvDUra-svk6fblX5It9mwxwl6CLmUJCePJqh3GlOrFmCD_bsyDeAUsa1aFGCd6sXUIyNOMoPDZfqNFPJdGqsaIs0oD6mfLlMlb_-uvtXBUq"
            alt="Aahar Logo"
            className="h-7 w-auto object-contain"
          />
          <span className="text-xs text-stone-500 font-medium sm:border-l sm:border-stone-400 sm:pl-3 text-center sm:text-left">
            Less waste, more taste © 2024 Aahar Technologies. All rights reserved.
          </span>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-medium text-stone-600">
          <button
            type="button"
            onClick={() => scrollTo('the-problem')}
            className="hover:text-[#133E32] transition-colors cursor-pointer"
          >
            The Problem
          </button>
          <button
            type="button"
            onClick={() => scrollTo('solution')}
            className="hover:text-[#133E32] transition-colors cursor-pointer"
          >
            Solution
          </button>
          <button
            type="button"
            onClick={() => scrollTo('how-it-works')}
            className="hover:text-[#133E32] transition-colors cursor-pointer"
          >
            How it works
          </button>
          <button
            type="button"
            onClick={() => scrollTo('roadmap')}
            className="hover:text-[#133E32] transition-colors cursor-pointer"
          >
            Roadmap
          </button>
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="text-amber-800 font-bold hover:underline cursor-pointer"
          >
            Business Dashboard
          </button>
          <button
            type="button"
            onClick={onRequestDemoClick}
            className="hover:text-[#133E32] transition-colors font-bold text-[#133E32] cursor-pointer"
          >
            Request Demo
          </button>
        </div>
      </div>
    </footer>
  );
};
