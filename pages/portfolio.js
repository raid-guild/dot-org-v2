import { Button, Flex, Heading, Text } from '@chakra-ui/react';

import { Header } from '../shared/Header';
import { Projects } from '../components/Projects';

const Portfolio = () => {
  return (
    <Flex
      minHeight='100vh'
      justify='center'
      align='center'
      direction='column'
      pt='2rem'
      background='linear-gradient(328deg, rgba(10,10,10,1) 30%, rgba(173,36,66,1) 48%, rgba(10,10,10,1) 70%)'
    >
      <Header />
      <Flex
        justify='center'
        align='center'
        direction='column'
        minHeight='500px'
      >
        <Heading variant='uncial' fontSize='2.5rem' mb='1rem'>
          Portfolio
        </Heading>
        <Text variant='texturina' fontSize='2rem' mb='2rem'>
          Our Trophy Hall of Achievements from Past Raids
        </Text>
        <Button variant='spaceMono' fontSize='1.5rem'>
          Hire Us
        </Button>
      </Flex>
      <Projects />
    </Flex>
  );
};

export default Portfolio;
