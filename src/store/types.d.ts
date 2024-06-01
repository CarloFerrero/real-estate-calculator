interface FixedExpenses {
    agencyFeeRate: number;
    cadastralTaxRate: number;
    notaryFeePurchase: number;
    notaryFeeMortgage: number;
    cadastralTax: number;
    mortgageTax: number;
    preliminaryRegistration: number;
    VATRate: number;
}

interface Mortgage {
    annualRate: number;
    years: number;
}

interface BudgetState {
    propertyValue: number;
    renovationBudget: number;
    furnitureBudget: number;
    personalBudget: number;
    parentsBudget: number;
    monthlyMortgage: number;
    fixedExpenses: FixedExpenses;
    mortgage: Mortgage;
}

interface BudgetState {
    propertyValue: number;
    renovationBudget: number;
    furnitureBudget: number;
    personalBudget: number;
    parentsBudget: number;
    monthlyMortgage: number;
    fixedExpenses: any;
}
