import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@raidguild/design-system';

import { joinFaqItems, hireFaqItems } from '../../utils/constants';

export const FaqTypes = {
  join: 'JOIN',
  hire: 'HIRE',
};

type Props = {
  type: typeof FaqTypes;
};

const FAQ = ({ type }: Props) => {
  const faqItems = type === FaqTypes ? joinFaqItems : hireFaqItems;

  return (
    <ChakraModal onClose={() => null} isOpen={false} isCentered scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>FAQs</ModalHeader>
        <ModalBody>
          <Accordion defaultIndex={[0]}>
            {faqItems.map((item) => {
              return (
                <AccordionItem key={item.a} fontFamily='spaceMono'>
                  <AccordionButton color='purple' textTransform='uppercase'>
                    <Box flex='1' textAlign='left'>
                      {item.q}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>{item.a}</AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              // context.updateFaqModalStatus(false);
            }}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default FAQ;
