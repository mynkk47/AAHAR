import React from 'react';

export const HowItWorksSection: React.FC = () => {
  return (
    <section
      id="how-it-works"
      className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-300/60"
    >
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase font-bold tracking-widest text-amber-800 bg-amber-100/70 px-4 py-1.5 rounded-full inline-block mb-3">
          Simple Workflow
        </span>
        <h2 className="hero-title text-3xl md:text-4xl text-[#133E32]">
          How Aahar operates across every shift.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Step 1 */}
        <div className="relative bg-[#FBF6EE] rounded-2xl p-6 border border-stone-300/60 shadow-sm hover:shadow-md transition-shadow">
          <span className="text-3xl font-serif text-amber-700/40 font-bold block mb-2">
            01
          </span>
          <h4 className="font-serif font-bold text-lg text-[#133E32] mb-1">
            Diner Places Order
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Orders are created at POS or scanned through the digital menu directly at the table.
          </p>
        </div>

        {/* Step 2 */}
        <div className="relative bg-[#FBF6EE] rounded-2xl p-6 border border-stone-300/60 shadow-sm hover:shadow-md transition-shadow">
          <span className="text-3xl font-serif text-amber-700/40 font-bold block mb-2">
            02
          </span>
          <h4 className="font-serif font-bold text-lg text-[#133E32] mb-1">
            Pantry Auto-Deducts
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Gram-level inventory updates in real-time with recipe linkage in the kitchen station.
          </p>
        </div>

        {/* Step 3 */}
        <div className="relative bg-[#FBF6EE] rounded-2xl p-6 border border-stone-300/60 shadow-sm hover:shadow-md transition-shadow">
          <span className="text-3xl font-serif text-amber-700/40 font-bold block mb-2">
            03
          </span>
          <h4 className="font-serif font-bold text-lg text-[#133E32] mb-1">
            Instant Scan & Pay
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Customers review transparent itemized bills and settle via UPI or card securely.
          </p>
        </div>

        {/* Step 4 */}
        <div className="relative bg-[#FBF6EE] rounded-2xl p-6 border border-stone-300/60 shadow-sm hover:shadow-md transition-shadow">
          <span className="text-3xl font-serif text-amber-700/40 font-bold block mb-2">
            04
          </span>
          <h4 className="font-serif font-bold text-lg text-[#133E32] mb-1">
            Predictive Restock
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            The system synthesizes sales trends and suggests optimal purchase batches for tomorrow.
          </p>
        </div>
      </div>
    </section>
  );
};
