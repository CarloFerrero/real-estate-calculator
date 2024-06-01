import React, { useState } from 'react';
import { Box, Input, Stack, Text, Button, Flex, Heading } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import FixedExpensesModal from './FixedExpensesModal';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { setFixedExpenses, setFurnitureBudget, setPropertyValue, setRenovationBudget } from '../store/reducer';
import { RootState } from '../store';

interface FixedExpenseProps {
    onNext: () => void;
    onPrevious: () => void;
}

const FixedExpense: React.FC<FixedExpenseProps> = ({ onNext, onPrevious }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();
    const propertyValue = useSelector((state: RootState) => state.propertyValue);
    const renovationBudget = useSelector((state: RootState) => state.renovationBudget);
    const furnitureBudget = useSelector((state: RootState) => state.furnitureBudget);
    const fixedExpenses = useSelector((state: RootState) => state.fixedExpenses);

    return (
        <Box>
            <Stack spacing={4}>
                <Text mb={5}>
                    Inserisci il valore dell'immobile e i budget per la ristrutturazione e l'arredamento.
                    Clicca sul bottone con l'icona <InfoOutlineIcon /> per visuonare/modificare le spese fisse.
                </Text>
                <Box h={400}>

                    <Box>
                        <Text mb={3}>🏦 Valore dell'Immobile</Text>
                        <Input
                            type="number"
                            value={propertyValue}
                            onChange={(e) => dispatch(setPropertyValue(Number(e.target.value)))}
                        />
                    </Box>
                    <Box>
                        <Text mb={3} mt={3}>🚧 Budget per Ristrutturazione</Text>
                        <Input
                            type="number"
                            value={renovationBudget}
                            onChange={(e) => dispatch(setRenovationBudget(Number(e.target.value)))}
                        />
                    </Box>
                    <Box>
                        <Text mb={3} mt={3}>🎨 Budget per Arredamento</Text>
                        <Input
                            type="number"
                            value={furnitureBudget}
                            onChange={(e) => dispatch(setFurnitureBudget(Number(e.target.value)))}
                        />
                    </Box>
                    <Flex alignItems="center" gap="2" mt={3}>
                        <Button size="xs" onClick={() => setIsModalOpen(true)}>
                            <InfoOutlineIcon />
                        </Button>
                        <Text>Spese Fisse</Text>
                    </Flex>
                    <FixedExpensesModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        fixedExpenses={fixedExpenses}
                        setFixedExpenses={(value) => dispatch(setFixedExpenses(value))}
                    />
                </Box>
                <Flex justifyContent="space-between">
                    <Button onClick={onPrevious}>Precedente</Button>
                    <Button onClick={onNext}>Prossimo</Button>
                </Flex>
            </Stack>
        </Box>
    );
};

export default FixedExpense;
