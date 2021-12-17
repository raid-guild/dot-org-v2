import { Flex, SimpleGrid, Heading, Button, Image } from '@chakra-ui/react';
import styled from '@emotion/styled'

import { theme } from '../../themes/theme';
import { Header } from '../../shared/Header';

const StyledAnimationReferenceElement = styled('div')`  
  width: 550px;
  > div {
    width: 100%;
    padding-bottom: 114%;
  }
  @media only screen and (max-width: 600px) {
    width: 80%;
    margin: 0 auto;
  }
`

export const FirstPaint = ({ windowWidth }) => {
  return (
    <SimpleGrid
      rows='1'
      placeItems='center'
      border='2px solid'
      borderColor='red'
      py='2rem'
      px={{ base: '1rem', lg: '4rem' }}
      mx='1rem'
      minHeight='calc(100vh - 2em)'
    >
      <Header windowWidth={windowWidth} />
      <Flex
        direction={{ base: 'column-reverse', lg: 'row' }}
        alignItems='center'
        justifyContent='space-between'
        alignSelf='flex-start'
      >
        <Flex
          direction='column'
          justifyContent='center'
          alignItems='start'
          maxW={{ lg: '50%' }}
        >
          <Heading
            maxW='720px'
            variant='headingOne'
            lineHeight='1.5'
            fontSize={{ lg: '36px' }}
            textShadow='0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.20em red'
          >
            A Decentralized Collective of Mercenaries Ready to Slay Your Web3
            Product Demons.
          </Heading>
          <Flex
            w='100%'
            mt={{ base: '2rem' }}
            direction='row'
            justifyContent={{ base: 'center', lg: 'flex-start' }}
          >
            <Button
              onClick={() =>
                window.open('https://hireus.raidguild.org', '_blank')
              }
              minW={{ base: 'auto' }}
              variant='primary'
              fontSize={{ base: '16px', lg: '18px' }}
              mr='1rem'
            >
              Hire Us
            </Button>
            <Button
              onClick={() => (window.location.href = '/join')}
              minW={{ base: 'auto' }}
              variant='secondary'
              fontSize={{ base: '16px', lg: '18px' }}
            >
              Join Us
            </Button>
          </Flex>
        </Flex>
        <StyledAnimationReferenceElement id="raid-banner"><div></div></StyledAnimationReferenceElement>

        {/* <Image
          src={theme.images.raidBanner}
          fallbackSrc='/assets/raid__banner.png'
          alt='raid-banner'
          width={{ base: '450px', md: '500px', lg: '550px' }}
        /> */}
      </Flex>
    </SimpleGrid>
  );
};
