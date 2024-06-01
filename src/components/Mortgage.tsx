import React, { useEffect } from 'react';
import { Box, Text, Stack, Button, Flex, Heading, Tag } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import MortgageCalculator from './MortgageCalculator';
import { RootState } from '../store';
import { setMonthlyMortgage, setMortgageAnnualRate, setMortgageYears } from '../store/reducer';
import { formatNumber } from '../utils';

interface MortgageProps {
    onNext: () => void;
    onPrevious: () => void;
}

const Mortgage: React.FC<MortgageProps> = ({ onNext, onPrevious }) => {
    const dispatch = useDispatch();
    const mortgageNeeded = useSelector((state: RootState) => state.propertyValue - (state.personalBudget + state.parentsBudget + state.renovationBudget + state.furnitureBudget));
    const monthlyMortgage = useSelector((state: RootState) => state.monthlyMortgage);
    const annualRate = useSelector((state: RootState) => state.mortgage.annualRate);
    const years = useSelector((state: RootState) => state.mortgage.years);


    useEffect(() => {
        if (mortgageNeeded <= 0) {
            dispatch(setMonthlyMortgage(0));
        }
    }, [mortgageNeeded, dispatch]);

    return (
        <Box>
            <Stack spacing={4}>
                <Text mb={5}>
                    Il mutuo da richiedere è calcolato sottraendo il budget totale disponibile dal valore dell'immobile e le spese fisse, di ristrutturazione e di arredamento.
                    Inserisci i parametri del mutuo per calcolare la rata mensile.
                </Text>

                <Box h={400}>
                    <Flex justifyContent="space-between" mb={1}>
                        <Text>Mutuo da richiedere:</Text>
                        <Tag fontWeight="bold" colorScheme={mortgageNeeded > 0 ? 'green' : 'blue'}>
                            {mortgageNeeded > 0 ? `${formatNumber(mortgageNeeded)}` : "Nessun mutuo necessario"}
                        </Tag>
                    </Flex>
                    {mortgageNeeded > 0 && (
                        <MortgageCalculator
                            principal={mortgageNeeded}
                            onMonthlyPaymentChange={(value) => dispatch(setMonthlyMortgage(value))}
                            monthlyMortgage={monthlyMortgage}
                            annualRate={annualRate}
                            years={years}
                            setAnnualRate={(value) => dispatch(setMortgageAnnualRate(value))}
                            setYears={(value) => dispatch(setMortgageYears(value))}
                        />
                    )}
                </Box>

                <Flex justifyContent="space-between">
                    <Button onClick={onPrevious}>Precedente</Button>
                    <Button onClick={onNext}>Calcolami Casa</Button>
                </Flex>
            </Stack>
        </Box>
    );
};

export default Mortgage;
