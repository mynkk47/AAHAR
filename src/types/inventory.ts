export type StockStatus = 'good' | 'low' | 'critical' | 'expiring_soon';

export interface Ingredient {
  id: string;
  name: string;
  category: 'Produce' | 'Dairy' | 'Bakery' | 'Meat & Poultry' | 'Pantry & Spices';
  currentStock: number;
  minLevel: number;
  unit: string;
  status: StockStatus;
  dailyVelocity: number; // typical consumption per day
  costPerUnit: number;
  expiryDate: string; // ISO date string or relative formatted
  daysUntilExpiry: number;
  lastRestocked: string;
}

export interface RecipeIngredient {
  ingredientId: string;
  ingredientName: string;
  amount: number;
  unit: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: 'Mains' | 'Pizza & Breads' | 'Appetizers' | 'Beverages';
  sellingPrice: number;
  estimatedCost: number;
  prepTimeMinutes: number;
  ingredients: RecipeIngredient[];
}

export interface SimulatedOrder {
  id: string;
  timestamp: string;
  recipeName: string;
  tableNumber: string;
  quantity: number;
  totalPrice: number;
  deductedIngredients: {
    name: string;
    amount: number;
    unit: string;
    remainingStock: number;
  }[];
}

export interface DemandForecastItem {
  ingredientId: string;
  ingredientName: string;
  currentStock: number;
  projected7DayUsage: number;
  suggestedReorderAmount: number;
  unit: string;
  urgency: 'high' | 'medium' | 'low';
  estimatedCost: number;
}

export interface DemoRequest {
  restaurantName: string;
  contactEmailOrPhone: string;
  outletCount: string;
  submittedAt: string;
}
