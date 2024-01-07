import { Box, Card, Flex, HStack, Heading, Image, SimpleGrid, VStack, defaultTheme } from '@raidguild/design-system';
import CTABtnGroup from '../atoms/CTABtnGroup';
import Castle from '../../assets/illustrations/castle.svg';
import Decor from '../../assets/illustrations/decor.svg';
import tokens from '../../utils/extendedTokens';

import Markdown from '../atoms/Markdown';

interface ContainerProps {
  content: string;
  bg?: string;
  imageUrl?: string;
  icon: string;
  imagePosition?: 'row' | 'row-reverse';
  title: string;
  bgImage?: string;
  cta?: boolean;
}

const ServiceSectionContainer: React.FC<ContainerProps> = ({
  content,
  bg,
  imageUrl,
  icon,
  imagePosition,
  title,
  bgImage,
  cta = false,
}: ContainerProps) => {
  return (
    <VStack bg={bg ?? tokens.purpleToIndigoGradient} w='100vw' bgImage={bgImage} height='max-content'>
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
            maxW='580px'
            borderTopRightRadius={imagePosition === 'row' ? `none` : '3xl'}
            p={{ base: 6, md: 12 }}
            background={imagePosition === 'row' ? `black` : 'rgba(0, 0, 0, 0.65)'}
            border={imagePosition === 'row' ? `1px solid ${defaultTheme.colors.primary[500]}` : 'none'}
            lineHeight='tall'>
            {imagePosition === 'row-reverse' && (
              <Image src={Decor.src} position='absolute' top='0' right='0' zIndex={0} maxH='full' />
            )}
            <HStack gap={6} zIndex={30}>
              <Image src={icon} height='48px' alt='raidguild wand' />
              <Heading variant='shadow' fontSize='2xl'>
                {title}
              </Heading>
            </HStack>
            <VStack spacing={4} mt={6} zIndex={30}>
              <Markdown>{content}</Markdown>
            </VStack>
            {cta && <CTABtnGroup />}
          </Card>

          {/* Column 2 */}
          <Box width={{ xl: '750px', lg: '900px' }} hideBelow='xl'>
            <Image src={imageUrl ?? Castle.src} placeholder='blur' alt='raid-banner' />
          </Box>
        </Flex>
      </SimpleGrid>
    </VStack>
  );
};

export default ServiceSectionContainer;
