import { RootState } from './index';

export const selectPropertyValue = (state: RootState) => state.propertyValue
export const selectRenovationBudget = (state: RootState) => state.renovationBudget;
export const selectFurnitureBudget = (state: RootState) => state.furnitureBudget;
export const selectPersonalBudget = (state: RootState) => state.personalBudget;
export const selectParentsBudget = (state: RootState) => state.parentsBudget;
export const selectMonthlyMortgage = (state: RootState) => state.monthlyMortgage;
export const selectFixedExpenses = (state: RootState) => state.fixedExpenses;
