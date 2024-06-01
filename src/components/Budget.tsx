import React from 'react';
import { Box, Input, Stack, Text, Button, Heading } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setParentsBudget, setPersonalBudget } from '../store/reducer';

interface BudgetProps {
    onNext: () => void;
}

const Budget: React.FC<BudgetProps> = ({ onNext }) => {
    const dispatch = useDispatch();
    const personalBudget = useSelector((state: RootState) => state.personalBudget);
    const parentsBudget = useSelector((state: RootState) => state.parentsBudget);

    return (
        <Box>
            <Stack spacing={4}>
                <Text mb={5}>
                    Inserisci il tuo budget e quello dei tuoi genitori per calcolare il budget totale disponibile per l'acquisto della casa.
                </Text>

                <Box h={400}>
                    <Box>
                        <Text mb={3}>💸 Il Mio Budget</Text>
                        <Input
                            type="number"
                            value={personalBudget}
                            onChange={(e) => dispatch(setPersonalBudget(Number(e.target.value)))}
                        />
                    </Box>
                    <Box>
                        <Text mb={3} mt={2}>🤫 Budget dei Miei Genitori</Text>
                        <Input
                            type="number"
                            value={parentsBudget}
                            onChange={(e) => dispatch(setParentsBudget(Number(e.target.value)))}
                        />
                    </Box>
                </Box>
                <Button onClick={onNext}>Prossimo</Button>
            </Stack>
        </Box>
    );
};

export default Budget;
