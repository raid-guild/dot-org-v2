import { useState, useEffect } from 'react';
import { Container, Flex } from '@chakra-ui/react';

import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';

const Join = () => {
  const [windowWidth, setWindowWidth] = useState('');
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.removeEventListener('resize', () => {});
    window.addEventListener('resize', (e) => {
      setWindowWidth(window.innerWidth);
    });
  }, []);
  return (
    <Flex
      width='100vw'
      minHeight='100vh'
      direction='column'
      justifyContent='center'
      alignItems='center'
    >
      <Flex
        width='100%'
        direction='column'
        px={{ base: '1rem', lg: '4rem' }}
        mb='2rem'
      >
        <Header windowWidth={windowWidth} />
        <script src='https://static.airtable.com/js/embed/embed_snippet_v1.js'></script>
        <Container mt='4rem'>
          <iframe
            title='join form'
            class='airtable-embed airtable-dynamic-height'
            src='https://airtable.com/embed/shrXzU17CaPJIPeXl?backgroundColor=red'
            frameborder='0'
            onmousewheel=''
            width='100%'
            height='2046'
          ></iframe>
        </Container>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Join;
