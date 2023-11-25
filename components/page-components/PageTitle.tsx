import { VStack, HStack, Image, Heading, Center } from '@raidguild/design-system';

import Swords from '../../assets/illustrations/swords.svg';
import LeftWing from '../../assets/illustrations/LeftWing.svg';
import RightWing from '../../assets/illustrations/RightWing.svg';

interface PageTitleProps {
  title: string;
  hideIcon?: boolean;
}

const PageTitle = ({ title, hideIcon=false }: PageTitleProps) => (
  <Center py='2rem'>
    <VStack gap={8}>
      <Image src={Swords.src} w='48px' h='48px' hidden={hideIcon} />
      <HStack justifyContent='center'>
        <Image src={LeftWing.src} width={[`25vw`, `30vw`]} />
        <Heading variant='shadow' color='white' fontFamily='uncial' minW='200px' textAlign='center'>
          {title}
        </Heading>
        <Image src={RightWing.src} width={[`25vw`, `30vw`]} />
      </HStack>
    </VStack>
  </Center>
);

export default PageTitle;
