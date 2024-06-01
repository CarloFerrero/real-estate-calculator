import React, { useState } from 'react';
import { ChakraProvider, Container, Heading, Divider, Text, Box } from '@chakra-ui/react';
import Budget from './components/Budget';
import FixedExpense from './components/FixedExpense';
import Mortgage from './components/Mortgage';
import Summary from './components/Summary';
import { Provider } from 'react-redux';
import store from './store';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <ChakraProvider>
      <Provider store={store}>
        <Container maxW="container.md" height="100%" display="flex" flexDirection="column" justifyContent="center">
          <Heading as="h1" size="xl" mb={6}>Calcolami casa 🫠 🏠</Heading>

          {currentStep === 1 && <Budget onNext={handleNextStep} />}
          {currentStep === 2 && <FixedExpense onNext={handleNextStep} onPrevious={handlePreviousStep} />}
          {currentStep === 3 && <Mortgage onNext={handleNextStep} onPrevious={handlePreviousStep} />}
          {currentStep === 4 && <Summary onPrevious={handlePreviousStep} formatNumber={(num) => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(num)} />}
        </Container>
        <footer style={{ textAlign: 'center', marginTop: '10px', marginBottom: '20px', paddingTop: '0px' }}>
          <Divider mb='20px' />
          <Text>© 2024 Carlo Quello Alto - All Rights Reserved</Text>
        </footer>
      </Provider>
    </ChakraProvider>
  );
};

export default App;
