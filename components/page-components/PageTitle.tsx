import { VStack, HStack, Image, Heading } from '@raidguild/design-system';

import Swords from '../../assets/illustrations/swords.svg';
import LeftWing from '../../assets/illustrations/LeftWing.svg';
import RightWing from '../../assets/illustrations/RightWing.svg';

interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => (
  <VStack py='2rem'>
    <Image src={Swords.src} />
    <HStack>
      <Image src={LeftWing.src} width={[`25vw`, `30vw`]} />
      <Heading fontFamily='uncial' color='white' maxW='15ch' textAlign='center'>
        {title}
      </Heading>
      <Image src={RightWing.src} width={[`25vw`, `30vw`]} />
    </HStack>
  </VStack>
);

export default PageTitle;
