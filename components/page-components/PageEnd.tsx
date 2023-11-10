import { Center, HStack, Image, VStack } from '@raidguild/design-system';

import LeftWing from '../../assets/illustrations/LeftWing.svg';
import RightWing from '../../assets/illustrations/RightWing.svg';
import Swords from '../../assets/illustrations/swords.svg';

const PageEnd = () => (
  <Center py='2rem'>
    <VStack gap={8}>
      <HStack justifyContent='center'>
        <Image src={LeftWing.src} width={[`25vw`, `30vw`]} />
        <Image src={Swords.src} w='48px' h='48px' />
        <Image src={RightWing.src} width={[`25vw`, `30vw`]} />
      </HStack>
    </VStack>
  </Center>
);

export default PageEnd;
