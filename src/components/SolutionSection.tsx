import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface SolutionSectionProps {
  onExploreDashboard: () => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({ onExploreDashboard }) => {
  return (
    <section
      id="solution"
      className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-300/60"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase font-bold tracking-widest text-emerald-900 bg-emerald-100/70 px-4 py-1.5 rounded-full inline-block mb-3">
          The Two-Sided Platform
        </span>
        <h2 className="hero-title text-3xl md:text-5xl text-[#133E32]">
          Synchronized kitchen intelligence meets lightning checkout.
        </h2>
      </div>

      {/* Feature Split 1: Business Platform */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-24">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#FFC400]" /> Side A: Back of House
          </div>
          <h3 className="hero-title text-3xl font-bold text-[#133E32] mb-4">
            Live ingredient depletion linked to actual customer plates.
          </h3>
          <p className="text-stone-700 mb-6 leading-relaxed">
            Every Margherita Pizza ordered automatically deducts dough, mozzarella, and
            tomato concassé from your active inventory. Keep managers notified well
            before critical stockouts occur.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3 text-stone-700 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Smart Reorder Triggers:</strong> Minimum safety thresholds generate vendor POs with 1-click.
              </span>
            </li>
            <li className="flex items-start gap-3 text-stone-700 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Waste Reduction AI:</strong> Predictive 7-day volume forecasting adapts to local footfall & weekends.
              </span>
            </li>
            <li className="flex items-start gap-3 text-stone-700 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Recipe Engineering:</strong> Standardize portion costs and yield percentages seamlessly.
              </span>
            </li>
          </ul>

          <button
            type="button"
            onClick={onExploreDashboard}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#133E32] bg-[#FFC400]/70 hover:bg-[#FFC400] px-5 py-2.5 rounded-full transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Try Back-of-House Live Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2 bg-[#FBF6EE]/70 p-4 rounded-3xl border border-stone-300/60 shadow-md">
          <div
            onClick={onExploreDashboard}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onExploreDashboard();
            }}
            className="cursor-pointer group relative overflow-hidden rounded-2xl"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB41ZKOJZiOtrNWCRkyLVDJdV9aflyaAUlFafqij7fJqAoW0QIJtseyh7RkhTdArlVwdINyYAlrGCYxit_HLAFL_OFmZyoDL04p0pyyjdjsqEHZnQrLSw650zyTiEn8qP3yc_ZNi9ix09A4gyfOLzMdBWOqDiUZwjYz0zfLEnbhw-ZQIMx66yEpb3yu97eElgVFqTzI0JI0d_bUE7LX4nYmNsYzB__wHTdksJ13sy_svPvt90bO1nac"
              alt="Aahar Business Platform UI Detail"
              className="w-full h-auto rounded-2xl shadow-sm object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-[#133E32]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="bg-[#133E32] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                Click to Open Interactive Dashboard <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Split 2: Consumer Platform */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 bg-[#FBF6EE]/70 p-4 rounded-3xl border border-stone-300/60 shadow-md flex justify-center">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzgx8kTQ0dQQdLHajn2ch277C3ZKwm2n0-LoEra2G2SquV5sRgoczq3_aHZfFiJApEBv4TFYvZqzeQpiLjY1rujbbEV5zRbRDAgL_cVe3vEuBzAzuQm0_iuU-NRaOMu-na2X1yCKq_MjbTAzulopfhZQQOJtJp__31tPsTvkyiClCP70gY8SlQuEsu24oqBZohpvtBNYOve_iqlxoJtrnQq1wfAwLe-ClHbu64UK0g-xx11FzirnFo"
            alt="Aahar Mobile Consumer Interface"
            className="max-w-md w-full h-auto rounded-2xl shadow-sm object-contain"
          />
        </div>

        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#133E32]" /> Side B: Front of House
          </div>
          <h3 className="hero-title text-3xl font-bold text-[#133E32] mb-4">
            Zero app install, transparent bill presentation.
          </h3>
          <p className="text-stone-700 mb-6 leading-relaxed">
            Diners simply scan the table QR or open an SMS link. They view itemized taxes,
            choose their favorite UPI application, pay in seconds, and receive an instant green
            receipt on WhatsApp.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#FFF7E5] rounded-xl border border-stone-200">
              <div className="text-amber-800 font-bold mb-1 text-sm">3x Faster Turnover</div>
              <p className="text-xs text-stone-600">
                Guests pay when ready without waving down busy waitstaff.
              </p>
            </div>
            <div className="p-4 bg-[#FFF7E5] rounded-xl border border-stone-200">
              <div className="text-amber-800 font-bold mb-1 text-sm">100% Paperless</div>
              <p className="text-xs text-stone-600">
                Zero thermal printing costs; eco-friendly WhatsApp tax invoices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
