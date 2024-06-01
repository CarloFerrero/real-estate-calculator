function calculateFixedExpenses(propertyValue: number, fixedExpenses: any): number {
    const agencyFee = propertyValue * (fixedExpenses.agencyFeeRate / 100);
    const agencyFeeVAT = agencyFee * (fixedExpenses.VATRate / 100);
    const cadastralTax = propertyValue * (fixedExpenses.cadastralTaxRate / 100);
    const notaryFeePurchaseVAT = fixedExpenses.notaryFeePurchase * (fixedExpenses.VATRate / 100);
    const notaryFeeMortgageVAT = fixedExpenses.notaryFeeMortgage * (fixedExpenses.VATRate / 100);

    const totalFixedExpenses = agencyFee + agencyFeeVAT + cadastralTax + fixedExpenses.cadastralTax + fixedExpenses.mortgageTax + fixedExpenses.notaryFeePurchase + notaryFeePurchaseVAT + fixedExpenses.notaryFeeMortgage + notaryFeeMortgageVAT + fixedExpenses.preliminaryRegistration;

    return totalFixedExpenses;
}

const calculateMonthlyPayment = (principal: number, annualRate: number, years: number) => {
    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = years * 12;
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return monthlyPayment;
};

const calculateMortgage = ({ onMonthlyPaymentChange, principal, annualRate, years }: any) => {
    const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);
    onMonthlyPaymentChange(monthlyPayment);
};

const formatNumber = (num: number) => {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(num);
};

export { calculateFixedExpenses, calculateMonthlyPayment, calculateMortgage, formatNumber }