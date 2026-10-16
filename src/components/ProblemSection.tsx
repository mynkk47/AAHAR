import React from 'react';

export const ProblemSection: React.FC = () => {
  return (
    <section
      id="the-problem"
      className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-300/60 relative"
    >
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase font-bold tracking-widest text-amber-800 bg-amber-100/70 px-4 py-1.5 rounded-full inline-block mb-3">
          Operational Friction
        </span>
        <h2 className="hero-title text-3xl md:text-4xl text-[#133E32]">
          Why traditional food outlets bleed profits every month.
        </h2>
        <p className="text-stone-700 mt-3 text-base">
          Running a kitchen shouldn't involve guessing spice inventories or waiting in bottleneck billing queues.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Problem Card 1 */}
        <article className="bg-[#FBF6EE]/90 rounded-2xl p-7 border border-stone-300/60 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-[#E6392E] text-2xl mb-5 font-serif font-bold">
            !
          </div>
          <h3 className="font-serif text-xl font-bold text-[#133E32] mb-2">
            Uncontrolled Food Waste
          </h3>
          <p className="text-stone-600 text-sm leading-relaxed">
            Overstocking perishable ingredients like dairy, paneer, and fresh vegetables leads to spoilage before they can be prepped.
          </p>
        </article>

        {/* Problem Card 2 */}
        <article className="bg-[#FBF6EE]/90 rounded-2xl p-7 border border-stone-300/60 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 text-2xl mb-5">
            ⏱
          </div>
          <h3 className="font-serif text-xl font-bold text-[#133E32] mb-2">
            Slow Checkout Lines
          </h3>
          <p className="text-stone-600 text-sm leading-relaxed">
            Paper receipts, broken POS thermal rolls, and manual calculation cause friction right when diners want a speedy exit.
          </p>
        </article>

        {/* Problem Card 3 */}
        <article className="bg-[#FBF6EE]/90 rounded-2xl p-7 border border-stone-300/60 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 text-2xl mb-5">
            📉
          </div>
          <h3 className="font-serif text-xl font-bold text-[#133E32] mb-2">
            Disjointed Intelligence
          </h3>
          <p className="text-stone-600 text-sm leading-relaxed">
            Orders taken at tables don't reconcile with stockroom shelves, making weekly purchase forecasting a complete shot in the dark.
          </p>
        </article>
      </div>
    </section>
  );
};
