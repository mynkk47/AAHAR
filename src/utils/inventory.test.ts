import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateStockStatus,
  deductRecipeFromStock,
  calculateSuggestedReorder,
  validateDemoRequest,
} from './inventory.ts';
import type { Ingredient, Recipe } from '../types/inventory.ts';

test('calculateStockStatus detects critical, low, expiring_soon and good stocks', () => {
  // expiring soon within 2 days takes precedence if stock > 0
  assert.equal(calculateStockStatus(10, 5, 1), 'expiring_soon');

  // critical if stock <= 40% of min level
  assert.equal(calculateStockStatus(1.5, 5, 10), 'critical');

  // low if stock <= min level
  assert.equal(calculateStockStatus(4.0, 5, 10), 'low');

  // good if stock > min level
  assert.equal(calculateStockStatus(8.0, 5, 10), 'good');
});

test('deductRecipeFromStock correctly subtracts ingredients from inventory', () => {
  const ingredients: Ingredient[] = [
    {
      id: 'ing-1',
      name: 'Mozzarella Cheese',
      category: 'Dairy',
      currentStock: 5.0,
      minLevel: 2.0,
      unit: 'kg',
      status: 'good',
      dailyVelocity: 1.5,
      costPerUnit: 450,
      expiryDate: '2026-10-25',
      daysUntilExpiry: 9,
      lastRestocked: '2026-10-14',
    },
    {
      id: 'ing-2',
      name: 'Tomatoes',
      category: 'Produce',
      currentStock: 4.0,
      minLevel: 5.0,
      unit: 'kg',
      status: 'low',
      dailyVelocity: 3.0,
      costPerUnit: 40,
      expiryDate: '2026-10-20',
      daysUntilExpiry: 4,
      lastRestocked: '2026-10-15',
    },
  ];

  const pizzaRecipe: Recipe = {
    id: 'rec-1',
    name: 'Margherita Pizza',
    category: 'Pizza & Breads',
    sellingPrice: 380,
    estimatedCost: 110,
    prepTimeMinutes: 12,
    ingredients: [
      { ingredientId: 'ing-1', ingredientName: 'Mozzarella Cheese', amount: 0.25, unit: 'kg' },
      { ingredientId: 'ing-2', ingredientName: 'Tomatoes', amount: 0.15, unit: 'kg' },
    ],
  };

  const result = deductRecipeFromStock(ingredients, pizzaRecipe, 2); // 2 pizzas
  assert.equal(result.hadDeficit, false);
  assert.equal(result.deductions.length, 2);

  const updatedMozzarella = result.updatedIngredients.find((i) => i.id === 'ing-1');
  const updatedTomatoes = result.updatedIngredients.find((i) => i.id === 'ing-2');

  // 5.0 - (0.25 * 2) = 4.5
  assert.equal(updatedMozzarella?.currentStock, 4.5);
  // 4.0 - (0.15 * 2) = 3.7
  assert.equal(updatedTomatoes?.currentStock, 3.7);
});

test('calculateSuggestedReorder calculates buffer needed', () => {
  // currentStock = 3, projected 7 day usage = 20, minLevel = 5 -> safety buffer = 6 -> needed = 20 + 6 - 3 = 23
  const reorder = calculateSuggestedReorder(3, 20, 5);
  assert.equal(reorder, 23);

  // plenty in stock
  const noReorder = calculateSuggestedReorder(30, 10, 5);
  assert.equal(noReorder, 0);
});

test('validateDemoRequest properly validates form entries', () => {
  const invalidName = validateDemoRequest({
    restaurantName: ' ',
    contactEmailOrPhone: 'chef@kitchen.com',
    outletCount: '1',
  });
  assert.equal(invalidName.isValid, false);

  const invalidContact = validateDemoRequest({
    restaurantName: 'Spice Junction',
    contactEmailOrPhone: 'notanemailorphone',
    outletCount: '1',
  });
  assert.equal(invalidContact.isValid, false);

  const validEmail = validateDemoRequest({
    restaurantName: 'Spice Junction',
    contactEmailOrPhone: 'contact@spicejunction.in',
    outletCount: '2-5',
  });
  assert.equal(validEmail.isValid, true);

  const validPhone = validateDemoRequest({
    restaurantName: 'Spice Junction',
    contactEmailOrPhone: '+919876543210',
    outletCount: '1',
  });
  assert.equal(validPhone.isValid, true);
});
