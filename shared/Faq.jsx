import React, { useContext } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@chakra-ui/react';

import { AppContext } from '../context/AppContext';

const faq_items = [
  {
    q: 'What happens after I pay and submit?',
    a: 'After you pay and submit, we’ll receive a notification of your submission and a Raider will get in touch with you within 48 hours (business days) to schedule a consultation.'
  },
  {
    q: 'What is the consultation?',
    a: 'The consultation is an online call, usually through Discord or Google Meet, with one of our project managers and possibly some extra Raiders. The consultation itself lasts around 45 minutes and in it we will assess the challenges and discuss possible solution paths for your project.'
  },
  {
    q: 'What are the deliverables?',
    a:
      'In most cases, our clients know exactly what they need. In this case, the time of the consultation is used to understand requirements and gather information to create a project proposal. This usually includes a quote, list of work required, and a project timeline.' +
      '\nHowever, the huge variety of projects we review means we can’t promise a fixed deliverable to everyone that goes through this process. For some projects, the consultation serves as the initial discussion on the viability of an idea, with clear next steps defined. For others, consultation itself might become a round of troubleshooting or tech support.' +
      '\nWhat we can promise is that we’ll use every resource we have available to help you, your product, and your vision.'
  },
  {
    q: 'What happens after the consultation?',
    a: 'You will hear back from RaidGuild within 3-5 days with either a project proposal with quote, or recommendations for how to move forward with your idea. If we decide Raid Guild is not a good fit for your needs, we will offer you alternative paths forward.'
  },
  {
    q: 'Why should I pay?',
    a:
      'We believe in fairly compensating everyone at the Guild for their time. Payment ensures that our project managers are incentivized to marshall our best Raiders quickly, so you get the best consultation possible.' +
      '\nYou may submit this form without paying, but we can’t guarantee that you will receive a response. Submissions without payment usually are non-profit, open source, or otherwise directly for the good of the Ethereum community and ecosystem.'
  },
  {
    q: 'Can I get a refund?',
    a:
      'If raiders determine that your project is not a good fit for the Guild, or that there are no Raiders with the right skillset to help you, a cleric will contact you letting you know that we will not proceed with the consultation and will refund the fee.' +
      '\nNo refunds will be given once a consultation has been completed. The fee compensates our members for the time dedicated to providing recommendations for your project.'
  }
];

export const FAQ = () => {
  const context = useContext(AppContext);
  return (
    <Modal
      onClose={() => context.updateFaqModalStatus(false)}
      isOpen={context.faqModalStatus}
      isCentered
      scrollBehavior='inside'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>FAQs</ModalHeader>
        <ModalBody>
          <Accordion defaultIndex={[0]}>
            {faq_items.map((item, index) => {
              return (
                <AccordionItem key={index}>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      {item.q}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>{item.a}</AccordionPanel>
                </AccordionItem>
              );
            })}
            <AccordionItem>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  How do I get DAI?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <p>
                  DAI is a stablecoin pegged to the US Dollar. First, you'll
                  need a wallet like{' '}
                  <a
                    href='https://metamask.io/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Metamask
                  </a>{' '}
                  to manage your funds.
                </p>
                <br />
                <p>
                  Second, you'll need funds. To go from fiat currencies to the
                  Ethereum ecosystem you can use a onramp like{' '}
                  <a
                    href='https://www.sendwyre.com/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Wyre
                  </a>{' '}
                  or{' '}
                  <a
                    href='https://ramp.network/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Ramp
                  </a>
                  .
                </p>
                <br />
                <p>
                  {' '}
                  Lastly, you can use a decentralized exchange like{' '}
                  <a
                    href='https://app.uniswap.org/#/swap'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Uniswap
                  </a>{' '}
                  to swap your ETH for DAI.
                </p>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  How can I get in touch with RaidGuild?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <p>
                  If you have questions about RaidGuild, the submission form or
                  our consultation process, hop into our{' '}
                  <a
                    href='https://discord.gg/Sv5avwyNPX'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    #client-arena
                  </a>{' '}
                  channel in Discord.
                </p>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              context.updateFaqModalStatus(false);
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
