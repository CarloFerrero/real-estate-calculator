import React, { useState } from 'react';
import { ChakraProvider, Container, Input, Stack, Text, Heading, Box, Tag, Flex, Divider, Button } from '@chakra-ui/react';
import FixedExpensesModal from './FixedExpensesModal';

const App: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState<number>(160000);
  const [renovationBudget, setRenovationBudget] = useState<number>(20000);
  const [furnitureBudget, setFurnitureBudget] = useState<number>(20000);
  const [personalBudget, setPersonalBudget] = useState<number>(30000);
  const [parentsBudget, setParentsBudget] = useState<number>(50000);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [fixedExpenses, setFixedExpenses] = useState({
    agencyFeeRate: 4,
    cadastralTaxRate: 2,
    notaryFeePurchase: 1600,
    notaryFeeMortgage: 1200,
    cadastralTax: 50,
    mortgageTax: 50,
    preliminaryRegistration: 300,
    VATRate: 22,
  });

  const totalBudget = personalBudget + parentsBudget;
  const fixedExpensesTotal = calculateFixedExpenses(propertyValue, fixedExpenses);
  const variableExpenses = renovationBudget + furnitureBudget;
  const availableForPurchase = totalBudget - variableExpenses - fixedExpensesTotal;
  const mortgageNeeded = propertyValue - availableForPurchase;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(num);
  };

  return (
    <ChakraProvider>
      <Container maxW="container.sm" mt={10} mb={10}>
        <Heading as="h1" size="xl" mb={6}>Calcolami casa 🫠 🏠</Heading>
        <Stack spacing={4}>
          <Box>
            <Text mb={2}>🏦 Valore dell'Immobile</Text>
            <Input
              type="number"
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
            />
          </Box>
          <Box>
            <Text mb={2}>🚧 Budget per Ristrutturazione 🚧</Text>
            <Input
              type="number"
              value={renovationBudget}
              onChange={(e) => setRenovationBudget(Number(e.target.value))}
            />
          </Box>
          <Box>
            <Text mb={2}>🎨 Budget per Arredamento</Text>
            <Input
              type="number"
              value={furnitureBudget}
              onChange={(e) => setFurnitureBudget(Number(e.target.value))}
            />
          </Box>
          <Box>
            <Text mb={2}>💸 💸 Il Mio Budget</Text>
            <Input
              type="number"
              value={personalBudget}
              onChange={(e) => setPersonalBudget(Number(e.target.value))}
            />
          </Box>
          <Box>
            <Text mb={2}>🤫 Budget dei Miei Genitori 🤫</Text>
            <Input
              type="number"
              value={parentsBudget}
              onChange={(e) => setParentsBudget(Number(e.target.value))}
            />
          </Box>
        </Stack>
        <Button mt={6} colorScheme="blue" onClick={() => setIsModalOpen(true)}>Modifica Spese Fisse</Button>
        <Box mt={6} mb={6} />
        <Flex flexDirection={'column'} gap={3}>
          <Divider />
          <Flex justifyContent={'space-between'}>
            <Text>Budget Totale:</Text> <Tag fontWeight="bold" colorScheme='green'>+ {formatNumber(totalBudget)}</Tag>
          </Flex>
          <Divider />
          <Flex justifyContent={'space-between'}>
            <Text>Spese Fisse:</Text> <Tag fontWeight="bold" colorScheme='red'>- {formatNumber(fixedExpensesTotal)}</Tag>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text>Ristrutturazione + Arredo:</Text> <Tag fontWeight="bold" colorScheme='red'>- {formatNumber(variableExpenses)}</Tag>
          </Flex>
          <Divider />
          <Flex justifyContent={'space-between'}>
            <Text>Disponibile per l'Acquisto:</Text> <Tag fontWeight="bold" colorScheme='green'>{formatNumber(availableForPurchase)}</Tag>
          </Flex>
          <Divider />
          <Flex justifyContent={'space-between'}>
            <Text>Mutuo Necessario:</Text>
            <Tag fontWeight="bold" colorScheme={mortgageNeeded > 0 ? 'green' : 'blue'}>
              {mortgageNeeded > 0 ? formatNumber(mortgageNeeded) : "Nessun mutuo necessario"}
            </Tag>
          </Flex>
        </Flex>
        <FixedExpensesModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          fixedExpenses={fixedExpenses}
          setFixedExpenses={setFixedExpenses}
        />
      </Container>
    </ChakraProvider>
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

export default App;
