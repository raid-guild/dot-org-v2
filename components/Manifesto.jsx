import { Grid, Heading, Text, VStack } from '@chakra-ui/react';
import { theme } from '../theme';

export const Manifesto = () => {
  return (
    <Grid templateColumns='repeat(2, 1fr)' padding='5rem' paddingBottom={0}>
      <img src='/assets/raid__fantasy.png' alt='raid fantasy' width='500px' />
      <VStack spacing={5} justifyContent='center'>
        <Heading
          color={`${theme.colors.red}`}
          fontFamily={`${theme.font.uncial}`}
          fontSize='2.4rem'
        >
          Manifesto
        </Heading>
        <Text
          color={`${theme.colors.white}`}
          fontFamily={`${theme.font.jetbrains}`}
          fontSize='1.3rem'
        >
          We believe that DAOs will power the future of work. Through the
          MetaCartel network, we assembled a fellowship of the best builders,
          designers and hustlers in the space in order to make this future a
          reality. By sharing resources, branding and collaboration tools, we
          can create positive-sum value for the Ethereum ecosystem in a way that
          has never been possible before the advent of DAOs.
        </Text>
        <Text
          color={`${theme.colors.white}`}
          fontFamily={`${theme.font.jetbrains}`}
          fontSize='1.3rem'
        >
          We believe in Web3 and are here to build it, use it, and propogate it.
          The profits from our work will be used to fund development of open
          source tooling and public goods. We will share the learnings from our
          experiments and open source our processes for the community to learn
          and build from.
        </Text>
        <Text
          color={`${theme.colors.white}`}
          fontFamily={`${theme.font.jetbrains}`}
          fontSize='1.3rem'
        >
          "If you want to go fast, go alone. If you want to go far, go
          together."
        </Text>
      </VStack>
    </Grid>
  );
};
