import { Flex, Button } from '@raidguild/design-system';
import Link from 'next/link';
import ShimmerButton from './ShimmerButton';

const CTABtnGroup = () => {
  return (
    <Flex
      w='max-content'
      mt={{ base: '2rem' }}
      direction={{ base: 'column', lg: 'row' }}
      alignItems='center'
      justifyContent='center'
      gap={2}>
      <Link href='/hire/1'>
        <Button variant='bright' w='150px' fontWeight={500} fontFamily='spaceMono'>
          Hire Us
        </Button>
      </Link>
      <Link href='/join/1'>
        <ShimmerButton w='150px'>Join Us</ShimmerButton>
      </Link>
    </Flex>
  );
};

export default CTABtnGroup;
