import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, FormControl, FormLabel, Stack, Flex } from '@chakra-ui/react';

interface FixedExpensesModalProps {
    isOpen: boolean;
    onClose: () => void;
    fixedExpenses: FixedExpenses;
    setFixedExpenses: (expenses: FixedExpenses) => void;
}

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

const FixedExpensesModal: React.FC<FixedExpensesModalProps> = ({ isOpen, onClose, fixedExpenses, setFixedExpenses }) => {

    const handleChange = (field: keyof FixedExpenses, value: number) => {
        setFixedExpenses({
            ...fixedExpenses,
            [field]: value,
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='2xl' >
            <ModalOverlay />
            <ModalContent mr={3} ml={3}>
                <ModalHeader>Modifica Spese Fisse</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4}>
                        <Flex justifyContent="space-between" alignItems="center" gap={2} flexDirection={{
                            base: 'column',
                            md: 'row',
                        }}>
                            <FormControl>
                                <FormLabel>Commissione Agenzia (%)</FormLabel>
                                <Input
                                    type="number"
                                    value={fixedExpenses.agencyFeeRate}
                                    onChange={(e) => handleChange('agencyFeeRate', parseFloat(e.target.value))}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Imposta Catastale (%)</FormLabel>
                                <Input
                                    type="number"
                                    value={fixedExpenses.cadastralTaxRate}
                                    onChange={(e) => handleChange('cadastralTaxRate', parseFloat(e.target.value))}
                                />
                            </FormControl>
                        </Flex>
                        <Flex justifyContent="space-between" alignItems="center" gap={2} flexDirection={{
                            base: 'column',
                            md: 'row',
                        }}>
                            <FormControl>
                                <FormLabel>Onorario Notaio per Compravendita (€)</FormLabel>
                                <Input
                                    type="number"
                                    value={fixedExpenses.notaryFeePurchase}
                                    onChange={(e) => handleChange('notaryFeePurchase', parseFloat(e.target.value))}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Onorario Notaio per Mutuo (€)</FormLabel>
                                <Input
                                    type="number"
                                    value={fixedExpenses.notaryFeeMortgage}
                                    onChange={(e) => handleChange('notaryFeeMortgage', parseFloat(e.target.value))}
                                />
                            </FormControl>
                        </Flex>
                        <Flex justifyContent="space-between" alignItems="center" gap={2} flexDirection={{
                            base: 'column',
                            md: 'row',
                        }}>
                            <FormControl>
                                <FormLabel>Imposta Catastale (€)</FormLabel>
                                <Input
                                    type="number"
                                    value={fixedExpenses.cadastralTax}
                                    onChange={(e) => handleChange('cadastralTax', parseFloat(e.target.value))}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Imposta Ipotecaria (€)</FormLabel>
                                <Input
                                    type="number"
                                    value={fixedExpenses.mortgageTax}
                                    onChange={(e) => handleChange('mortgageTax', parseFloat(e.target.value))}
                                />
                            </FormControl>
                        </Flex>
                        <Flex justifyContent="space-between" alignItems="center" gap={2} flexDirection={{
                            base: 'column',
                            md: 'row',
                        }}>
                            <FormControl>
                                <FormLabel>Registrazione Preliminare (€)</FormLabel>
                                <Input
                                    type="number"
                                    value={fixedExpenses.preliminaryRegistration}
                                    onChange={(e) => handleChange('preliminaryRegistration', parseFloat(e.target.value))}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>IVA (%)</FormLabel>
                                <Input
                                    type="number"
                                    value={fixedExpenses.VATRate}
                                    onChange={(e) => handleChange('VATRate', parseFloat(e.target.value))}
                                />
                            </FormControl>
                        </Flex>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Chiudi
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Salva</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default FixedExpensesModal;
