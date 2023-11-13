import { Box, Card, Flex, HStack, Heading, Image, SimpleGrid, defaultTheme } from '@raidguild/design-system';

import Castle from '../../assets/illustrations/castle.svg';
import tokens from '../../utils/extendedTokens';
import Link from '../atoms/ChakraNextLink';
import GradientBorderButton from '../atoms/GradientBorderButton';
import GradientButton from '../atoms/GradientButton';
import Markdown from '../atoms/Markdown';

const Container = ({
  content,
  bg,
  imageUrl,
  icon,
  imagePosition,
  title,
  bgImage,
  cta = false,
}: {
  content: string;
  bg?: string;
  imageUrl?: string;
  icon: string;
  imagePosition?: 'row' | 'row-reverse';
  title: string;
  bgImage?: string;
  cta?: boolean;
}) => (
  <Box bg={bg ?? tokens.purpleToIndigoGradient} w='full' bgImage={bgImage} height='max-content'>
    <SimpleGrid placeItems='flex-start' p={{ base: '1rem', lg: '4rem' }} maxH='max-content' gap={8}>
      <Flex
        flexDirection={{ base: 'column-reverse', xl: imagePosition ?? 'row' }}
        align='center'
        justify='space-between'
        px={{ base: '1rem', xl: '8rem' }}
        width='full'>
        {/* Column 1 */}
        <Card
          as={Flex}
          direction='column'
          justifyContent='center'
          minW='360px'
          maxW={{ lg: '50%' }}
          border='1px solid'
          borderColor={defaultTheme.colors.primary[500]}
          lineHeight='tall'>
          <HStack gap={6}>
            <Image src={icon} height='48px' alt='raidguild wand' />
            <Heading variant='shadow' fontSize='2xl'>
              {title}
            </Heading>
          </HStack>
          <Markdown>{content}</Markdown>
          {cta && (
            <Flex w='100%' mt={{ base: '2rem' }} justifyContent='center' alignItems='center' gap={2}>
              <Link href='/hire/1'>
                <GradientButton>Hire Us</GradientButton>
              </Link>
              <Link href='/join/1'>
                <GradientBorderButton label='JOIN US' width='120px' />
              </Link>
            </Flex>
          )}
        </Card>

        {/* Column 2 */}
        <Box width={{ md: '500px', lg: '900px' }} hideBelow='xl'>
          <Image src={imageUrl ?? Castle.src} placeholder='blur' alt='raid-banner' />
        </Box>
      </Flex>
    </SimpleGrid>
  </Box>
);

export default Container;
