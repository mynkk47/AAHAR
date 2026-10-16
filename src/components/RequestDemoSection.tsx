import React, { useState } from 'react';
import { Check, CheckCircle2, AlertCircle } from 'lucide-react';
import { validateDemoRequest } from '../utils/inventory.ts';

export const RequestDemoSection: React.FC = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [contact, setContact] = useState('');
  const [outletCount, setOutletCount] = useState('1');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    restaurantName: string;
    contact: string;
    outletCount: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const validation = validateDemoRequest({
      restaurantName,
      contactEmailOrPhone: contact,
      outletCount,
    });

    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Please fill in all required fields.');
      return;
    }

    setSubmittedData({
      restaurantName: restaurantName.trim(),
      contact: contact.trim(),
      outletCount,
    });
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setRestaurantName('');
    setContact('');
    setOutletCount('1');
    setIsSubmitted(false);
    setSubmittedData(null);
    setErrorMessage(null);
  };

  return (
    <section id="request-demo" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="bg-[#133E32] text-[#FFF7E5] rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl">
        {/* Subtle background styling inside banner */}
        <div
          aria-hidden="true"
          className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#FFC400]/10 pointer-events-none"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-7">
            <span className="text-[#FFC400] font-bold text-xs uppercase tracking-widest block mb-2">
              Get Started
            </span>
            <h2 className="hero-title text-3xl sm:text-4xl md:text-5xl text-white mb-4">
              Bring smarter operations to your restaurant today.
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-lg mb-6">
              Join leading cloud kitchens, bistros, and franchise restaurants cutting
              food spoilage by 24% in their first 60 days.
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-amber-200/90 font-medium">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#FFC400]" /> Free 14-day kitchen pilot
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#FFC400]" /> POS hardware compatible
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#FFC400]" /> Zero upfront fee
              </span>
            </div>
          </div>

          {/* Contact / Lead Form */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 text-[#133E32] shadow-xl">
            {isSubmitted && submittedData ? (
              <div className="py-4 text-center">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#133E32] mb-2">
                  Demo Request Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mb-4 leading-relaxed">
                  Thank you! Our kitchen solutions specialist will connect with{' '}
                  <strong className="text-stone-900">{submittedData.restaurantName}</strong> at{' '}
                  <strong className="text-stone-900">{submittedData.contact}</strong> within 24 hours.
                </p>
                <div className="bg-[#FAF6EE] p-3 rounded-xl border border-stone-200 text-xs text-stone-700 mb-6 text-left space-y-1">
                  <div>
                    <span className="text-stone-500 font-medium">Outlet Scope: </span>
                    <span className="font-semibold">{submittedData.outletCount} Location(s)</span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium">Priority Pilot: </span>
                    <span className="font-semibold text-emerald-800">14-Day Free Pilot Included</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-semibold text-[#133E32] hover:text-amber-800 underline cursor-pointer"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="restaurant-name"
                    className="block text-xs font-bold text-[#133E32] uppercase tracking-wider mb-1"
                  >
                    Restaurant or Brand Name
                  </label>
                  <input
                    id="restaurant-name"
                    name="restaurant-name"
                    type="text"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    placeholder="e.g. Bombay Spice Bistro"
                    required
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#133E32] focus:border-[#133E32] bg-[#FAF6EE] text-stone-900 placeholder:text-stone-400 outline-none transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-bold text-[#133E32] uppercase tracking-wider mb-1"
                  >
                    Work Email / WhatsApp
                  </label>
                  <input
                    id="contact-email"
                    name="contact-email"
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="name@restaurant.com or +91 98765..."
                    required
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#133E32] focus:border-[#133E32] bg-[#FAF6EE] text-stone-900 placeholder:text-stone-400 outline-none transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="outlet-count"
                    className="block text-xs font-bold text-[#133E32] uppercase tracking-wider mb-1"
                  >
                    Number of Outlets
                  </label>
                  <select
                    id="outlet-count"
                    name="outlet-count"
                    value={outletCount}
                    onChange={(e) => setOutletCount(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#133E32] focus:border-[#133E32] bg-[#FAF6EE] text-stone-900 outline-none transition-all"
                  >
                    <option value="1">1 Location (Single Store)</option>
                    <option value="2-5">2 to 5 Outlets</option>
                    <option value="5+">6+ Outlets (Chain / Cloud Kitchens)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FFC400] hover:bg-amber-400 text-[#133E32] font-bold py-3.5 rounded-xl shadow-md transition-all text-sm uppercase tracking-wider mt-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  Schedule My Live Demo
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
