import React from 'react';
import { Box, Flex, Text, Tag, Button, Heading } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface SummaryProps {
    formatNumber: (num: number) => string;
    onPrevious: () => void;
}

const Summary: React.FC<SummaryProps> = ({ formatNumber, onPrevious }) => {
    const personalBudget = useSelector((state: RootState) => state.personalBudget);
    const parentsBudget = useSelector((state: RootState) => state.parentsBudget);
    const propertyValue = useSelector((state: RootState) => state.propertyValue);
    const renovationBudget = useSelector((state: RootState) => state.renovationBudget);
    const furnitureBudget = useSelector((state: RootState) => state.furnitureBudget);
    const fixedExpensesTotal = useSelector((state: RootState) => calculateFixedExpenses(state.propertyValue, state.fixedExpenses));
    const mortgageNeeded = useSelector((state: RootState) => state.propertyValue - (state.personalBudget + state.parentsBudget + state.renovationBudget + state.furnitureBudget));
    const monthlyMortgage = useSelector((state: RootState) => state.monthlyMortgage);

    const totalBudget = personalBudget + parentsBudget;
    const variableExpenses = renovationBudget + furnitureBudget;
    const availableForPurchase = totalBudget - variableExpenses - fixedExpensesTotal;

    return (
        <Box>
            <Text mb={5}>
                Riepilogo dei dati inseriti e calcoli effettuati.
            </Text>
            <Flex flexDirection={'column'} gap={3} h={400}>
                <Flex justifyContent={'space-between'}>
                    <Text>Budget Totale:</Text>
                    <Tag fontWeight="bold" colorScheme='green'>+ {formatNumber(totalBudget)}</Tag>
                </Flex>
                <Flex justifyContent={'space-between'}>
                    <Text>Spese Fisse:</Text>
                    <Tag fontWeight="bold" colorScheme='red'>- {formatNumber(fixedExpensesTotal)}</Tag>
                </Flex>
                <Flex justifyContent={'space-between'}>
                    <Text>Ristrutturazione + Arredo:</Text>
                    <Tag fontWeight="bold" colorScheme='red'>- {formatNumber(variableExpenses)}</Tag>
                </Flex>
                <Flex justifyContent={'space-between'}>
                    <Text>Disponibile per l'Acquisto:</Text>
                    <Tag fontWeight="bold" colorScheme={availableForPurchase < 0 ? 'none' : 'green'}>{availableForPurchase < 0 ? 'Non sufficiente' : formatNumber(availableForPurchase)}</Tag>
                </Flex>
                <Flex justifyContent={'space-between'}>
                    <Text>Mutuo da richiedere:</Text>
                    <Tag fontWeight="bold" colorScheme={mortgageNeeded > 0 ? 'green' : 'blue'}>
                        {mortgageNeeded > 0 ? formatNumber(mortgageNeeded) : "Nessun mutuo necessario"}
                    </Tag>
                </Flex>
                <Flex justifyContent={'space-between'} alignItems='center'>
                    <Text>Rata mensile stimata:</Text>
                    <Tag fontWeight="bold" colorScheme={monthlyMortgage > 0 ? 'green' : 'blue'}>
                        {monthlyMortgage > 0 ? formatNumber(monthlyMortgage) : "Nessun mutuo necessario"}
                    </Tag>
                </Flex>
            </Flex>
            <Button mt={4} onClick={onPrevious}>Modifica Dati</Button>
        </Box>
    );
};

function calculateFixedExpenses(propertyValue: number, fixedExpenses: any): number {
    const agencyFee = propertyValue * (fixedExpenses.agencyFeeRate / 100);
    const agencyFeeVAT = agencyFee * (fixedExpenses.VATRate / 100);
    const cadastralTax = propertyValue * (fixedExpenses.cadastralTaxRate / 100);
    const notaryFeePurchaseVAT = fixedExpenses.notaryFeePurchase * (fixedExpenses.VATRate / 100);
    const notaryFeeMortgageVAT = fixedExpenses.notaryFeeMortgage * (fixedExpenses.VATRate / 100);

    const totalFixedExpenses = agencyFee + agencyFeeVAT + cadastralTax + fixedExpenses.cadastralTax + fixedExpenses.mortgageTax + fixedExpenses.notaryFeePurchase + notaryFeePurchaseVAT + fixedExpenses.notaryFeeMortgage + notaryFeeMortgageVAT + fixedExpenses.preliminaryRegistration;

    return totalFixedExpenses;
}

export default Summary;
