import type { Ingredient, Recipe, StockStatus } from '../types/inventory.ts';

/**
 * Calculates stock status based on current stock, minimum threshold, and expiry timeline
 */
export function calculateStockStatus(
  currentStock: number,
  minLevel: number,
  daysUntilExpiry: number
): StockStatus {
  if (daysUntilExpiry <= 2 && currentStock > 0) {
    return 'expiring_soon';
  }
  if (currentStock <= minLevel * 0.4) {
    return 'critical';
  }
  if (currentStock <= minLevel) {
    return 'low';
  }
  return 'good';
}

/**
 * Deducts ingredients specified in a recipe from current ingredient list
 */
export function deductRecipeFromStock(
  ingredients: Ingredient[],
  recipe: Recipe,
  multiplier = 1
): {
  updatedIngredients: Ingredient[];
  deductions: { name: string; amount: number; unit: string; remainingStock: number }[];
  hadDeficit: boolean;
} {
  const deductions: { name: string; amount: number; unit: string; remainingStock: number }[] = [];
  let hadDeficit = false;

  const ingredientMap = new Map(ingredients.map((ing) => [ing.id, { ...ing }]));

  for (const item of recipe.ingredients) {
    const target = ingredientMap.get(item.ingredientId);
    if (target) {
      const deductionAmount = +(item.amount * multiplier).toFixed(2);
      const newStock = +(Math.max(0, target.currentStock - deductionAmount)).toFixed(2);
      if (target.currentStock < deductionAmount) {
        hadDeficit = true;
      }
      target.currentStock = newStock;
      target.status = calculateStockStatus(target.currentStock, target.minLevel, target.daysUntilExpiry);
      
      deductions.push({
        name: target.name,
        amount: deductionAmount,
        unit: target.unit,
        remainingStock: newStock,
      });
    }
  }

  const updatedIngredients = Array.from(ingredientMap.values());
  return { updatedIngredients, deductions, hadDeficit };
}

/**
 * Calculates recommended reorder amount for an ingredient based on projected 7-day usage and buffer
 */
export function calculateSuggestedReorder(
  currentStock: number,
  projected7DayUsage: number,
  minLevel: number
): number {
  const safetyBuffer = minLevel * 1.2;
  const needed = projected7DayUsage + safetyBuffer - currentStock;
  return needed > 0 ? Math.ceil(needed) : 0;
}

/**
 * Validates a demo request form submission
 */
export function validateDemoRequest(data: {
  restaurantName: string;
  contactEmailOrPhone: string;
  outletCount: string;
}): { isValid: boolean; error?: string } {
  if (!data.restaurantName || data.restaurantName.trim().length < 2) {
    return { isValid: false, error: 'Please enter a valid restaurant or brand name.' };
  }

  const contact = data.contactEmailOrPhone.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[+]?[\d\s-]{8,15}$/;

  if (!contact || (!emailRegex.test(contact) && !phoneRegex.test(contact))) {
    return {
      isValid: false,
      error: 'Please enter a valid email address or phone/WhatsApp number.',
    };
  }

  if (!data.outletCount) {
    return { isValid: false, error: 'Please select the number of outlets.' };
  }

  return { isValid: true };
}
