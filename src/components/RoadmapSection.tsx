import React from 'react';

export const RoadmapSection: React.FC = () => {
  return (
    <section
      id="roadmap"
      className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-300/60"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-800 bg-emerald-100/70 px-4 py-1.5 rounded-full inline-block mb-3">
            Product Evolution
          </span>
          <h2 className="hero-title text-3xl md:text-4xl text-[#133E32]">
            Our Roadmap to zero food waste.
          </h2>
        </div>
        <p className="text-sm text-stone-600 max-w-sm mt-3 md:mt-0">
          From core restaurant inventory to an intelligent regional food procurement network.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Milestone 1 */}
        <div className="p-6 rounded-2xl bg-white/70 border-2 border-emerald-700/40 relative shadow-sm">
          <span className="px-2.5 py-1 text-[11px] font-bold bg-emerald-700 text-white rounded-md uppercase tracking-wider inline-block mb-3">
            Live Now
          </span>
          <h4 className="font-serif text-xl font-bold text-[#133E32] mb-2">
            Connected POS & Inventory
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed mb-4">
            Real-time stock dashboard, UPI instant pay, digital WhatsApp receipts, and staff roles.
          </p>
          <div className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            Active in Partner Cafes
          </div>
        </div>

        {/* Milestone 2 */}
        <div className="p-6 rounded-2xl bg-[#FBF6EE]/90 border border-stone-300/60 relative">
          <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-200 text-amber-900 rounded-md uppercase tracking-wider inline-block mb-3">
            Q3 2024
          </span>
          <h4 className="font-serif text-xl font-bold text-[#133E32] mb-2">
            Automated Vendor Procurement
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed mb-4">
            Direct integration with wholesale suppliers to dispatch orders automatically when levels trigger red alert.
          </p>
          <div className="text-[11px] font-semibold text-amber-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full border border-amber-600" />
            Pilot Testing
          </div>
        </div>

        {/* Milestone 3 */}
        <div className="p-6 rounded-2xl bg-[#FBF6EE]/90 border border-stone-300/60 relative">
          <span className="px-2.5 py-1 text-[11px] font-bold bg-stone-200 text-stone-700 rounded-md uppercase tracking-wider inline-block mb-3">
            Q4 2024
          </span>
          <h4 className="font-serif text-xl font-bold text-[#133E32] mb-2">
            Regional Dynamic Pricing
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed mb-4">
            Algorithms offer smart happy-hour discounts on items with ingredients nearing expiry date to eliminate scrap.
          </p>
          <div className="text-[11px] font-semibold text-stone-600 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full border border-stone-500" />
            R&D Phase
          </div>
        </div>
      </div>
    </section>
  );
};
