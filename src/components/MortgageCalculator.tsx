import React, { useState } from 'react';
import { Box, Input, Stack, Text, Button, Flex, Tag } from '@chakra-ui/react';
import { formatNumber, calculateMortgage } from '../utils';

interface MortgageCalculatorProps {
    principal: number;
    onMonthlyPaymentChange: (payment: number) => void;
    monthlyMortgage: number;
    annualRate: number;
    years: number;
    setAnnualRate: (value: number) => void;
    setYears: (value: number) => void;
}

const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({
    principal,
    onMonthlyPaymentChange,
    monthlyMortgage,
    annualRate,
    years,
    setAnnualRate,
    setYears
}) => {
    return (
        <Box h={500}>
            <Stack spacing={4}>
                <Box>
                    <Text mb={2} mt={2}>Tasso di interesse annuale TAN (%)</Text>
                    <Input
                        type="number"
                        value={annualRate}
                        onChange={(e) => setAnnualRate(Number(e.target.value))}
                    />
                </Box>
                <Box>
                    <Text mb={2}>Durata del mutuo (anni)</Text>
                    <Input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(Number(e.target.value))}
                    />
                </Box>
                <Box>
                    <Flex justifyContent={'space-between'} alignItems='center'>
                        <Text>Rata mensile stimata:</Text>
                        <Tag fontWeight="bold" colorScheme={monthlyMortgage > 0 ? 'green' : 'blue'}>
                            {monthlyMortgage > 0 ? formatNumber(monthlyMortgage) : "Nessun mutuo necessario"}
                        </Tag>
                    </Flex>
                </Box>
                <Button onClick={() => calculateMortgage({ onMonthlyPaymentChange, principal, annualRate, years })}>Calcola Rata Mensile</Button>
            </Stack>
        </Box>
    );
};

export default MortgageCalculator;
