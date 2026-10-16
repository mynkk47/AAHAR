import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  Filter,
  AlertTriangle,
  Clock,
  CheckCircle,
  Plus,
  RefreshCw,
  ShoppingBag,
  ChefHat,
  TrendingUp,
  FileText,
  DollarSign,
  UtensilsCrossed,
  Package,
  Layers,
  Sparkles,
  QrCode,
  Building,
  Check,
} from 'lucide-react';
import type { Ingredient, Recipe, SimulatedOrder, DemandForecastItem } from '../types/inventory.ts';
import {
  INITIAL_INGREDIENTS,
  RECIPES,
  INITIAL_DEMAND_FORECAST,
} from '../data/mockInventory.ts';
import { deductRecipeFromStock } from '../utils/inventory.ts';

interface DashboardViewProps {
  onBackToLanding: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onBackToLanding }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(INITIAL_INGREDIENTS);
  const [demandForecast] = useState<DemandForecastItem[]>(INITIAL_DEMAND_FORECAST);
  const [activeTab, setActiveTab] = useState<'inventory' | 'recipes' | 'orders' | 'forecast' | 'consumer-preview'>('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  // Selected outlet
  const [selectedOutlet, setSelectedOutlet] = useState('Indiranagar Central Kitchen');

  // Simulation state
  const [recentOrders, setRecentOrders] = useState<SimulatedOrder[]>([
    {
      id: 'ORD-9841',
      timestamp: '10 mins ago',
      recipeName: 'Classic Margherita Pizza',
      tableNumber: 'Table 4',
      quantity: 1,
      totalPrice: 385,
      deductedIngredients: [
        { name: 'Artisan Pizza Dough', amount: 1, unit: 'balls', remainingStock: 18 },
        { name: 'Buffalo Mozzarella', amount: 0.16, unit: 'kg', remainingStock: 1.2 },
        { name: 'Fresh Tomatoes', amount: 0.14, unit: 'kg', remainingStock: 2.5 },
      ],
    },
  ]);
  const [selectedRecipeToSimulate, setSelectedRecipeToSimulate] = useState<Recipe>(RECIPES[0]);
  const [simulationToast, setSimulationToast] = useState<string | null>(null);

  // Restock modal state
  const [restockModalItem, setRestockModalItem] = useState<Ingredient | null>(null);
  const [restockAmount, setRestockAmount] = useState<number>(5);

  // Purchase Order generation feedback
  const [poGenerated, setPoGenerated] = useState<string | null>(null);

  // Filtered ingredients
  const filteredIngredients = ingredients.filter((ing) => {
    const matchesSearch = ing.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || ing.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || ing.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // KPI Calculations
  const totalIngredientsCount = ingredients.length;
  const lowStockCount = ingredients.filter((i) => i.status === 'low' || i.status === 'critical').length;
  const expiringSoonCount = ingredients.filter((i) => i.status === 'expiring_soon').length;
  const totalEstimatedValue = ingredients.reduce((sum, item) => sum + item.currentStock * item.costPerUnit, 0);

  // Live order simulation handler
  const handleSimulateOrder = (recipe: Recipe) => {
    const { updatedIngredients, deductions, hadDeficit } = deductRecipeFromStock(ingredients, recipe, 1);
    setIngredients(updatedIngredients);

    const newOrder: SimulatedOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: 'Just now',
      recipeName: recipe.name,
      tableNumber: `Table ${Math.floor(1 + Math.random() * 12)}`,
      quantity: 1,
      totalPrice: recipe.sellingPrice,
      deductedIngredients: deductions,
    };

    setRecentOrders([newOrder, ...recentOrders.slice(0, 9)]);

    if (hadDeficit) {
      setSimulationToast(`⚠️ Order placed for ${recipe.name}! Stock is below required levels.`);
    } else {
      setSimulationToast(`✅ ${recipe.name} cooked! Live stock updated for ${deductions.length} ingredients.`);
    }

    setTimeout(() => {
      setSimulationToast(null);
    }, 4500);
  };

  // Restock confirmation handler
  const handleConfirmRestock = () => {
    if (!restockModalItem) return;
    setIngredients((prev) =>
      prev.map((item) => {
        if (item.id === restockModalItem.id) {
          const newStock = +(item.currentStock + restockAmount).toFixed(2);
          return {
            ...item,
            currentStock: newStock,
            status: newStock > item.minLevel ? 'good' : 'low',
            lastRestocked: 'Today',
          };
        }
        return item;
      })
    );
    setSimulationToast(`Restocked ${restockAmount} ${restockModalItem.unit} of ${restockModalItem.name}!`);
    setRestockModalItem(null);
    setTimeout(() => setSimulationToast(null), 3000);
  };

  const handleGeneratePO = () => {
    setPoGenerated(`PO-AHR-${Math.floor(100000 + Math.random() * 900000)}`);
    setTimeout(() => setPoGenerated(null), 5000);
  };

  return (
    <div className="min-h-screen bg-[#F4EDE2] text-[#133E32] flex flex-col antialiased">
      {/* Top Banner Notice */}
      <div className="bg-[#133E32] text-amber-100 px-4 py-2 text-xs flex flex-wrap items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FFC400] animate-pulse" />
          <span className="font-semibold text-white">Aahar Back of House Operations</span>
          <span className="text-stone-300 hidden sm:inline">• Live prototype with realistic kitchen inventory</span>
        </div>
        <button
          type="button"
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 font-bold text-[#FFC400] hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Landing Page</span>
        </button>
      </div>

      {/* Main Layout Container */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 md:p-6 gap-6">
        {/* Left Operations Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-[#FBF6EE] rounded-2xl border border-stone-300/80 p-4 shadow-sm flex flex-col shrink-0">
          <div className="flex items-center gap-3 pb-4 border-b border-stone-200">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOTdRojWN9qbpaOQVy_FztDvlSE4FiCGxNj9ILSWaW_p2wl_eppzdsz7s8opEtSCyEadDKII5e-VZnz0KZ3ZBf2nR_R8YwbBSSrqIOogrgdqHYEZcNvYZ326z8AfXMHTHLBBnm0TM9lDvDUra-svk6fblX5It9mwxwl6CLmUJCePJqh3GlOrFmCD_bsyDeAUsa1aFGCd6sXUIyNOMoPDZfqNFPJdGqsaIs0oD6mfLlMlb_-uvtXBUq"
              alt="Aahar"
              className="h-7 w-auto object-contain"
            />
          </div>

          {/* Outlet Selector */}
          <div className="mt-4 mb-5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1 flex items-center gap-1">
              <Building className="w-3 h-3 text-stone-400" /> Active Outlet
            </label>
            <select
              value={selectedOutlet}
              onChange={(e) => setSelectedOutlet(e.target.value)}
              className="w-full bg-[#FAF6EE] text-xs font-semibold text-[#133E32] rounded-lg border border-stone-300 p-2 focus:ring-1 focus:ring-[#133E32] outline-none"
            >
              <option value="Indiranagar Central Kitchen">Indiranagar Central Kitchen</option>
              <option value="Koramangala Bistro #2">Koramangala Bistro #2</option>
              <option value="Whitefield Cloud Hub">Whitefield Cloud Hub</option>
            </select>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5 flex-1 text-sm font-medium">
            <button
              type="button"
              onClick={() => setActiveTab('inventory')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'inventory'
                  ? 'bg-[#133E32] text-white font-semibold shadow-sm'
                  : 'text-stone-700 hover:bg-stone-200/60'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Package className="w-4 h-4" /> Live Stock Levels
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/20 text-stone-800">
                {ingredients.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('recipes')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'recipes'
                  ? 'bg-[#133E32] text-white font-semibold shadow-sm'
                  : 'text-stone-700 hover:bg-stone-200/60'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <ChefHat className="w-4 h-4" /> Recipe Engineering
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-stone-200 text-stone-700">
                {RECIPES.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#133E32] text-white font-semibold shadow-sm'
                  : 'text-stone-700 hover:bg-stone-200/60'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <UtensilsCrossed className="w-4 h-4" /> Kitchen Order Simulator
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('forecast')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'forecast'
                  ? 'bg-[#133E32] text-white font-semibold shadow-sm'
                  : 'text-stone-700 hover:bg-stone-200/60'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4" /> Demand & 7-Day POs
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold">
                {demandForecast.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('consumer-preview')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'consumer-preview'
                  ? 'bg-[#133E32] text-white font-semibold shadow-sm'
                  : 'text-stone-700 hover:bg-stone-200/60'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <QrCode className="w-4 h-4" /> Diner QR & Bill Preview
              </span>
              <span className="text-[10px] uppercase font-bold text-amber-800 bg-[#FFC400]/40 px-1.5 py-0.5 rounded">
                Side B
              </span>
            </button>
          </nav>

          {/* Quick Simulation Action */}
          <div className="mt-6 pt-4 border-t border-stone-200 bg-[#FFF7E5] p-3.5 rounded-xl border border-amber-200">
            <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block mb-1">
              ⚡ Test Auto-Depletion
            </span>
            <p className="text-xs text-stone-600 mb-3">
              Trigger an order to see live ingredient inventory automatically decrease.
            </p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleSimulateOrder(RECIPES[0])}
                className="w-full text-xs font-semibold py-2 px-3 rounded-lg bg-[#133E32] text-white hover:bg-[#0E2E25] transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Cook Margherita Pizza</span>
                <span className="text-[10px] text-amber-300">₹385</span>
              </button>
              <button
                type="button"
                onClick={() => handleSimulateOrder(RECIPES[1])}
                className="w-full text-xs font-semibold py-2 px-3 rounded-lg bg-[#FFC400] text-[#133E32] hover:bg-amber-400 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Cook Paneer Butter</span>
                <span className="text-[10px] text-stone-900 font-bold">₹340</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col space-y-6">
          {/* Toast Notification */}
          {simulationToast && (
            <div className="bg-[#133E32] text-white text-xs sm:text-sm font-semibold p-3.5 rounded-xl shadow-lg border border-amber-400/40 flex items-center justify-between animate-fade-in">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFC400]" />
                <span>{simulationToast}</span>
              </div>
              <button
                type="button"
                onClick={() => setSimulationToast(null)}
                className="text-stone-300 hover:text-white text-xs cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* PO Generated Banner */}
          {poGenerated && (
            <div className="bg-emerald-900 text-white text-xs sm:text-sm p-3.5 rounded-xl shadow-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-300" />
                <span>
                  Wholesale Purchase Order <strong>{poGenerated}</strong> generated and dispatched to verified suppliers!
                </span>
              </div>
            </div>
          )}

          {/* KPI Stat Cards matching screenshot style */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#FBF6EE] p-5 rounded-2xl border border-stone-300/80 shadow-sm">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1">
                Total Ingredients
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-serif font-bold text-[#133E32]">
                  {totalIngredientsCount}
                </span>
                <span className="text-xs text-stone-500 font-medium">items tracked</span>
              </div>
            </div>

            <div className="bg-[#FBF6EE] p-5 rounded-2xl border border-stone-300/80 shadow-sm">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Low Stock Items
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-serif font-bold text-amber-700">
                  {lowStockCount}
                </span>
                <span className="text-xs text-amber-700 font-medium">below safety level</span>
              </div>
            </div>

            <div className="bg-[#FBF6EE] p-5 rounded-2xl border border-stone-300/80 shadow-sm">
              <span className="text-xs font-bold text-red-800 uppercase tracking-wider block mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#E6392E]" /> Expiring Soon
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-serif font-bold text-[#E6392E]">
                  {expiringSoonCount}
                </span>
                <span className="text-xs text-stone-500 font-medium">within 48 hrs</span>
              </div>
            </div>

            <div className="bg-[#FBF6EE] p-5 rounded-2xl border border-stone-300/80 shadow-sm">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-700" /> Inventory Value
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-emerald-800 flex items-center">
                  <span className="font-sans mr-0.5 font-semibold">₹</span>
                  <span className="font-serif">{Math.round(totalEstimatedValue).toLocaleString('en-IN')}</span>
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-100 px-1.5 py-0.5 rounded">
                  94.2% yield
                </span>
              </div>
            </div>
          </div>

          {/* TAB 1: INVENTORY STOCK LEVELS */}
          {activeTab === 'inventory' && (
            <div className="bg-[#FBF6EE] rounded-2xl border border-stone-300/80 p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#133E32]">
                    Active Pantry Inventory
                  </h3>
                  <p className="text-xs text-stone-500">
                    Live gram-level stock auto-reconciled against orders and recipes.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIngredients(INITIAL_INGREDIENTS);
                      setSimulationToast('Reset stock inventory to initial baseline levels.');
                      setTimeout(() => setSimulationToast(null), 3000);
                    }}
                    className="text-xs flex items-center gap-1 font-semibold px-3 py-2 bg-stone-200/70 hover:bg-stone-300 rounded-lg text-stone-700 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Reset Stock
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('forecast')}
                    className="text-xs flex items-center gap-1 font-bold px-3 py-2 bg-[#FFC400] hover:bg-amber-400 rounded-lg text-[#133E32] transition-colors cursor-pointer shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Order Restock PO
                  </button>
                </div>
              </div>

              {/* Search & Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search ingredient (e.g. Tomato, Paneer)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF6EE] text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#133E32]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-stone-400 shrink-0" />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full bg-[#FAF6EE] text-xs rounded-xl border border-stone-300 py-2 px-3 focus:outline-none"
                  >
                    <option value="All">All Categories</option>
                    <option value="Produce">Produce</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Meat & Poultry">Meat & Poultry</option>
                    <option value="Pantry & Spices">Pantry & Spices</option>
                  </select>
                </div>

                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full bg-[#FAF6EE] text-xs rounded-xl border border-stone-300 py-2 px-3 focus:outline-none"
                  >
                    <option value="All">All Stock Statuses</option>
                    <option value="critical">Critical (&lt;40% Min)</option>
                    <option value="low">Low Stock</option>
                    <option value="expiring_soon">Expiring Soon (48h)</option>
                    <option value="good">Adequate Stock</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-xl border border-stone-300/80">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF6EE] text-stone-600 font-bold uppercase tracking-wider text-[11px] border-b border-stone-300">
                    <tr>
                      <th className="py-3 px-4">Ingredient</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Current Stock</th>
                      <th className="py-3 px-3">Safety Min</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Expiry</th>
                      <th className="py-3 px-4 text-right">Quick Restock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 bg-white">
                    {filteredIngredients.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-stone-500">
                          No ingredients matching current search and filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredIngredients.map((item) => (
                        <tr key={item.id} className="hover:bg-amber-50/50 transition-colors">
                          <td className="py-3 px-4 font-semibold text-stone-900">
                            {item.name}
                            <span className="block text-[10px] text-stone-500 font-normal">
                              Daily usage: ~{item.dailyVelocity} {item.unit}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-stone-600">{item.category}</td>
                          <td className="py-3 px-3 font-bold text-stone-900">
                            {item.currentStock} {item.unit}
                          </td>
                          <td className="py-3 px-3 text-stone-500">
                            {item.minLevel} {item.unit}
                          </td>
                          <td className="py-3 px-3">
                            {item.status === 'critical' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-800">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                                Critical
                              </span>
                            )}
                            {item.status === 'low' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                                Low Stock
                              </span>
                            )}
                            {item.status === 'expiring_soon' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-100 text-orange-800">
                                <Clock className="w-3 h-3 text-orange-600" />
                                Expiring Soon
                              </span>
                            )}
                            {item.status === 'good' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                <Check className="w-3 h-3 text-emerald-600" />
                                In Stock
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-stone-600">
                            {item.daysUntilExpiry <= 3 ? (
                              <span className="font-semibold text-red-700">
                                In {item.daysUntilExpiry} days
                              </span>
                            ) : (
                              <span>In {item.daysUntilExpiry} days</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setRestockModalItem(item);
                                setRestockAmount(Math.max(2, Math.ceil(item.minLevel * 1.5)));
                              }}
                              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-[#FFC400] text-[#133E32] transition-colors cursor-pointer"
                            >
                              + Add Stock
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: RECIPE ENGINEERING */}
          {activeTab === 'recipes' && (
            <div className="bg-[#FBF6EE] rounded-2xl border border-stone-300/80 p-5 shadow-sm space-y-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#133E32]">
                  Recipe Engineering & Ingredient Yields
                </h3>
                <p className="text-xs text-stone-500">
                  Portion costs, dish margins, and live stock deduction mapping for every menu item.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {RECIPES.map((recipe) => {
                  const margin = Math.round(
                    ((recipe.sellingPrice - recipe.estimatedCost) / recipe.sellingPrice) * 100
                  );
                  return (
                    <div
                      key={recipe.id}
                      className="bg-white rounded-xl border border-stone-300 p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                            {recipe.category}
                          </span>
                          <h4 className="font-serif font-bold text-base text-[#133E32] mt-1">
                            {recipe.name}
                          </h4>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-bold text-[#133E32]">
                            ₹{recipe.sellingPrice}
                          </span>
                          <span className="block text-[10px] text-emerald-700 font-semibold">
                            {margin}% Gross Margin
                          </span>
                        </div>
                      </div>

                      <div className="bg-[#FAF6EE] p-3 rounded-lg border border-stone-200 my-3">
                        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
                          Ingredients Deducted per Portion:
                        </span>
                        <ul className="space-y-1">
                          {recipe.ingredients.map((ing) => (
                            <li
                              key={ing.ingredientId}
                              className="text-xs flex justify-between text-stone-700"
                            >
                              <span>{ing.ingredientName}</span>
                              <span className="font-semibold">
                                {ing.amount} {ing.unit}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-stone-500">
                          Est. Food Cost: ₹{recipe.estimatedCost}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleSimulateOrder(recipe)}
                          className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[#133E32] text-white hover:bg-[#0E2E25] transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <UtensilsCrossed className="w-3.5 h-3.5" />
                          <span>Simulate Prep & Deduct</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS & LIVE DEPLETION */}
          {activeTab === 'orders' && (
            <div className="bg-[#FBF6EE] rounded-2xl border border-stone-300/80 p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#133E32]">
                    Kitchen Order Simulator & Auto-Depletion Feed
                  </h3>
                  <p className="text-xs text-stone-500">
                    Real-time log of customer orders deducting precise inventory amounts from the kitchen pantry.
                  </p>
                </div>
              </div>

              {/* Order Simulator Box */}
              <div className="bg-amber-100/40 p-4 rounded-xl border border-amber-200">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block mb-2">
                  Select a Dish to Fire to Kitchen:
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  {RECIPES.map((rec) => (
                    <button
                      key={rec.id}
                      type="button"
                      onClick={() => handleSimulateOrder(rec)}
                      className="px-4 py-2.5 rounded-xl bg-white border border-stone-300 hover:border-[#133E32] text-xs font-semibold text-stone-800 hover:bg-[#133E32] hover:text-white transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                    >
                      <span>{rec.name}</span>
                      <span className="text-amber-700 font-bold">₹{rec.sellingPrice}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Order History */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Recent Kitchen Depletion Transactions
                </span>
                {recentOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 bg-white rounded-xl border border-stone-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#133E32]">{ord.id}</span>
                        <span className="text-[11px] text-stone-500">• {ord.tableNumber}</span>
                        <span className="text-[11px] text-stone-400">• {ord.timestamp}</span>
                      </div>
                      <h4 className="font-serif font-bold text-stone-900 text-sm mt-0.5">
                        {ord.recipeName}
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {ord.deductedIngredients.map((ing, i) => (
                          <span
                            key={i}
                            className="text-[11px] bg-[#FAF6EE] border border-stone-200 text-stone-700 px-2 py-0.5 rounded"
                          >
                            - {ing.amount} {ing.unit} {ing.name} (Now: {ing.remainingStock} {ing.unit})
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-right sm:self-center shrink-0">
                      <span className="text-sm font-bold text-[#133E32]">₹{ord.totalPrice}</span>
                      <span className="block text-[10px] text-emerald-700 font-semibold">
                        Instant Stock Depleted ✓
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DEMAND FORECAST & PURCHASE ORDERS */}
          {activeTab === 'forecast' && (
            <div className="bg-[#FBF6EE] rounded-2xl border border-stone-300/80 p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#133E32]">
                    7-Day AI Demand Forecast & Automated POs
                  </h3>
                  <p className="text-xs text-stone-500">
                    Predictive purchase suggestions based on sales velocity, upcoming weekend footfall, and safety buffers.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleGeneratePO}
                  className="bg-[#133E32] hover:bg-[#0E2E25] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow cursor-pointer flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Generate Wholesale PO for All ({demandForecast.length} items)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {demandForecast.map((item) => (
                  <div
                    key={item.ingredientId}
                    className="p-4 bg-white rounded-xl border border-stone-300 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                            item.urgency === 'high'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.urgency} Urgency
                        </span>
                        <span className="text-xs font-bold text-stone-900">
                          ₹{item.estimatedCost.toLocaleString()}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-stone-900 text-base mb-1">
                        {item.ingredientName}
                      </h4>
                      <p className="text-xs text-stone-600 mb-3">
                        Current: <strong>{item.currentStock} {item.unit}</strong> | Projected 7-day run-rate:{' '}
                        <strong>{item.projected7DayUsage} {item.unit}</strong>
                      </p>
                    </div>

                    <div className="bg-[#FAF6EE] p-3 rounded-lg border border-stone-200 mt-2 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-stone-500 block">
                          Suggested Reorder
                        </span>
                        <span className="text-base font-bold text-[#133E32]">
                          +{item.suggestedReorderAmount} {item.unit}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setRestockModalItem({
                            id: item.ingredientId,
                            name: item.ingredientName,
                            category: 'Produce',
                            currentStock: item.currentStock,
                            minLevel: 5,
                            unit: item.unit,
                            status: 'good',
                            dailyVelocity: 2,
                            costPerUnit: 100,
                            expiryDate: '2026-10-30',
                            daysUntilExpiry: 14,
                            lastRestocked: 'Today',
                          });
                          setRestockAmount(item.suggestedReorderAmount);
                        }}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[#FFC400] text-[#133E32] hover:bg-amber-400 transition-colors cursor-pointer"
                      >
                        1-Click Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CONSUMER QR & BILL PREVIEW (SIDE B) */}
          {activeTab === 'consumer-preview' && (
            <div className="bg-[#FBF6EE] rounded-2xl border border-stone-300/80 p-5 shadow-sm space-y-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#133E32]">
                  Side B: Diner Scan & WhatsApp Receipt Experience
                </h3>
                <p className="text-xs text-stone-500">
                  How guests experience instant QR checkout at their table without downloading any apps.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-2">
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-xl border border-stone-300">
                    <span className="text-[10px] font-bold uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      Step 1 • Table QR Scan
                    </span>
                    <h4 className="font-serif font-bold text-stone-900 text-base mt-2 mb-1">
                      Zero wait times, 100% itemized transparency
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Diners scan the table QR code with camera, GPay, PhonePe, or Paytm. The browser opens the live digital invoice instantly.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-stone-300">
                    <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Step 2 • Instant Green WhatsApp Receipt
                    </span>
                    <h4 className="font-serif font-bold text-stone-900 text-base mt-2 mb-1">
                      Zero thermal paper rolls
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Upon UPI completion, the digital GST invoice is delivered directly to WhatsApp with restaurant loyalty points.
                    </p>
                  </div>

                  <div className="p-4 bg-[#FFF7E5] rounded-xl border border-amber-200">
                    <h4 className="font-bold text-xs uppercase text-amber-900 mb-1">
                      Ready to roll this out in your restaurant?
                    </h4>
                    <p className="text-xs text-stone-600 mb-3">
                      Start your 14-day free pilot with full POS compatibility.
                    </p>
                    <button
                      type="button"
                      onClick={onBackToLanding}
                      className="text-xs font-bold px-4 py-2 bg-[#133E32] text-white rounded-lg hover:bg-[#0E2E25] cursor-pointer"
                    >
                      Request a Demo on Landing Page →
                    </button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-full max-w-sm rounded-2xl p-1 bg-[#F9F5EC] shadow-floating-phone border border-stone-300/80">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzgx8kTQ0dQQdLHajn2ch277C3ZKwm2n0-LoEra2G2SquV5sRgoczq3_aHZfFiJApEBv4TFYvZqzeQpiLjY1rujbbEV5zRbRDAgL_cVe3vEuBzAzuQm0_iuU-NRaOMu-na2X1yCKq_MjbTAzulopfhZQQOJtJp__31tPsTvkyiClCP70gY8SlQuEsu24oqBZohpvtBNYOve_iqlxoJtrnQq1wfAwLe-ClHbu64UK0g-xx11FzirnFo"
                      alt="Aahar Consumer bill interface preview"
                      className="w-full h-auto rounded-xl object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Restock Modal */}
      {restockModalItem && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-300">
            <h3 className="font-serif text-xl font-bold text-[#133E32] mb-1">
              Restock {restockModalItem.name}
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Current stock: <strong>{restockModalItem.currentStock} {restockModalItem.unit}</strong> | Min safety level: <strong>{restockModalItem.minLevel} {restockModalItem.unit}</strong>
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Quantity to Add ({restockModalItem.unit})
                </label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={restockAmount}
                  onChange={(e) => setRestockAmount(parseFloat(e.target.value) || 0)}
                  className="w-full text-base px-3 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#133E32] outline-none"
                />
              </div>

              <div className="bg-[#FAF6EE] p-3 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1">
                <div className="flex justify-between">
                  <span>New Stock Total:</span>
                  <span className="font-bold text-[#133E32]">
                    {(restockModalItem.currentStock + restockAmount).toFixed(2)} {restockModalItem.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Batch Cost:</span>
                  <span className="font-bold text-stone-900">
                    ₹{Math.round(restockAmount * restockModalItem.costPerUnit).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRestockModalItem(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmRestock}
                  className="px-5 py-2 text-xs font-bold bg-[#133E32] text-white hover:bg-[#0E2E25] rounded-xl shadow cursor-pointer"
                >
                  Confirm & Update Stock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
