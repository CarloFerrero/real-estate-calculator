import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: BudgetState = {
    propertyValue: 130000,
    renovationBudget: 20000,
    furnitureBudget: 20000,
    personalBudget: 30000,
    parentsBudget: 0,
    monthlyMortgage: 0,
    mortgage: {
        annualRate: 1.5,
        years: 30,
    },
    fixedExpenses: {
        agencyFeeRate: 4,
        cadastralTaxRate: 2,
        notaryFeePurchase: 1600,
        notaryFeeMortgage: 1200,
        cadastralTax: 50,
        mortgageTax: 50,
        preliminaryRegistration: 300,
        VATRate: 22,
    },
};

const budgetSlice = createSlice({
    name: 'budget',
    initialState: initialState,
    reducers: {
        setPropertyValue(state, action: PayloadAction<number>) {
            state.propertyValue = action.payload;
        },
        setRenovationBudget(state, action: PayloadAction<number>) {
            state.renovationBudget = action.payload;
        },
        setFurnitureBudget(state, action: PayloadAction<number>) {
            state.furnitureBudget = action.payload;
        },
        setPersonalBudget(state, action: PayloadAction<number>) {
            state.personalBudget = action.payload;
        },
        setParentsBudget(state, action: PayloadAction<number>) {
            state.parentsBudget = action.payload;
        },
        setMonthlyMortgage(state, action: PayloadAction<number>) {
            state.monthlyMortgage = action.payload;
        },
        setFixedExpenses(state, action: PayloadAction<FixedExpenses>) {
            state.fixedExpenses = action.payload;
        },
        setMortgageYears(state, action: PayloadAction<number>) {
            state.mortgage.years = action.payload;
        },
        setMortgageAnnualRate(state, action: PayloadAction<number>) {
            state.mortgage.annualRate = action.payload;
        },
    },
});

export const {
    setPropertyValue,
    setRenovationBudget,
    setFurnitureBudget,
    setPersonalBudget,
    setParentsBudget,
    setMonthlyMortgage,
    setFixedExpenses,
    setMortgageYears,
    setMortgageAnnualRate,
} = budgetSlice.actions;

export default budgetSlice.reducer;
