import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onRequestDemoClick: () => void;
  onExploreDashboard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRequestDemoClick,
  onExploreDashboard,
}) => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative pt-8 pb-16 md:pt-14 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto overflow-visible"
    >
      {/* Big Yellow Fluid Blob Shape in background matching Google Stitch layout */}
      <div aria-hidden="true" className="organic-blob-hero" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Hero Text Left Column */}
        <div className="lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-4">
          <h1
            id="hero-heading"
            className="hero-title text-5xl md:text-6xl xl:text-7xl font-normal text-[#133E32] mb-6 tracking-tight leading-[1.08]"
          >
            One connected system for smarter food operations.
          </h1>
          <p className="text-base md:text-lg text-[#133E32]/85 leading-relaxed mb-9 max-w-xl font-normal">
            Aahar connects business operations with a smoother customer payment
            experience, from the stockroom to the receipt on your customer's phone.
          </p>

          {/* Action CTA Group */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onRequestDemoClick}
              className="bg-[#133E32] text-white font-medium text-base px-8 py-3.5 rounded-full shadow-lg hover:bg-[#0E2E25] hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Request a demo
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('how-it-works')}
              className="bg-[#FFF7E5]/90 border border-[#133E32]/20 text-[#133E32] font-medium text-base px-7 py-3.5 rounded-full hover:bg-white shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
            >
              See how it works
            </button>
            <button
              type="button"
              onClick={onExploreDashboard}
              className="inline-flex items-center gap-2 bg-[#FFC400] text-[#133E32] font-semibold text-sm px-5 py-3 rounded-full shadow hover:bg-amber-400 transition-all duration-200 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#133E32]" />
              <span>Explore Live Dashboard</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Graphic Right Column (Layered Overlapping Mockup) */}
        <div className="lg:col-span-7 relative flex justify-center items-center mt-6 lg:mt-0">
          {/* Autumn Leaf Accent placed top right of preview as in Reference screenshot */}
          <div
            aria-hidden="true"
            className="absolute -top-6 right-2 sm:right-6 w-14 h-14 z-20 pointer-events-none transform rotate-12 drop-shadow-sm select-none"
          >
            <svg
              className="w-full h-full text-amber-600 opacity-90"
              fill="none"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M56 12C42 12 28 20 20 32C14 41 12 50 10 58C18 56 27 54 36 48C48 40 56 26 56 12Z"
                fill="#D97724"
              />
              <path
                d="M10 58C22 46 36 34 56 12"
                stroke="#B45309"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Composite Container for Both Platforms */}
          <div className="relative w-full max-w-2xl group">
            {/* Business Platform Card */}
            <div
              onClick={onExploreDashboard}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onExploreDashboard();
                }
              }}
              aria-label="Open Business Dashboard view"
              className="w-full rounded-2xl overflow-hidden shadow-custom-card border border-stone-300/60 bg-[#F9F5EC] transition-transform duration-300 hover:scale-[1.01] cursor-pointer relative"
            >
              <div className="p-1 sm:p-2">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB41ZKOJZiOtrNWCRkyLVDJdV9aflyaAUlFafqij7fJqAoW0QIJtseyh7RkhTdArlVwdINyYAlrGCYxit_HLAFL_OFmZyoDL04p0pyyjdjsqEHZnQrLSw650zyTiEn8qP3yc_ZNi9ix09A4gyfOLzMdBWOqDiUZwjYz0zfLEnbhw-ZQIMx66yEpb3yu97eElgVFqTzI0JI0d_bUE7LX4nYmNsYzB__wHTdksJ13sy_svPvt90bO1nac"
                  alt="Aahar Business-Facing Platform showing inventory overview, stock levels, demand forecast, and quick actions"
                  className="w-full h-auto rounded-xl object-contain block"
                />
              </div>

              {/* Interactive Hover Badge */}
              <div className="absolute top-4 right-4 bg-[#133E32]/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transition-opacity opacity-90 group-hover:opacity-100">
                <span className="w-2 h-2 rounded-full bg-[#FFC400] animate-pulse" />
                <span>Interactive Preview • Click to Open</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Overlapping Consumer Experience Mobile Phone */}
            <div
              onClick={onExploreDashboard}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onExploreDashboard();
                }
              }}
              aria-label="Aahar Consumer Experience Preview"
              className="absolute -bottom-8 sm:-bottom-12 -right-2 sm:-right-6 w-[56%] sm:w-[50%] z-30 transition-transform duration-300 hover:scale-[1.03] hover:-rotate-1 cursor-pointer"
            >
              <div className="rounded-2xl p-1 bg-[#F9F5EC] shadow-floating-phone border border-stone-300/70">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzgx8kTQ0dQQdLHajn2ch277C3ZKwm2n0-LoEra2G2SquV5sRgoczq3_aHZfFiJApEBv4TFYvZqzeQpiLjY1rujbbEV5zRbRDAgL_cVe3vEuBzAzuQm0_iuU-NRaOMu-na2X1yCKq_MjbTAzulopfhZQQOJtJp__31tPsTvkyiClCP70gY8SlQuEsu24oqBZohpvtBNYOve_iqlxoJtrnQq1wfAwLe-ClHbu64UK0g-xx11FzirnFo"
                  alt="Aahar Consumer-Facing Experience: itemized digital bill with instant QR payment and WhatsApp receipt"
                  className="w-full h-auto rounded-xl object-contain block"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
