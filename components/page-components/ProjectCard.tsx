import _ from 'lodash';
import { Box, Image, Heading, VStack, HStack, Text, Button, Card } from '@raidguild/design-system';
import Link from '../atoms/ChakraNextLink';

interface Props {
  project: any;
}

const ProjectCard = ({ project }: Props) => (
  <Card>
    <Box layerStyle='redToPurpleVerticalGradient' height='96px' />
    <VStack align='center' pb='2rem'>
      <Image
        src={`${_.get(project, 'imageUrl')}`}
        width='96px'
        height='96px'
        border='1px solid black'
        borderColor='red'
        transform='translateY(-48px)'
      />
      <Heading>{_.get(project, 'projectName')}</Heading>
      <Text>{_.get(project, 'description')}</Text>
      <HStack>
        {_.map(_.get(project, 'raiders'), (raider: any) => {
          console.log(raider);
          return (
            <Box as='span' key={raider.raider} data-tip={`${raider?.raider} | ${raider?.role}`}>
              <Image src={`${raider?.role.toLowerCase()}.svg`} width='28px' height='28px' />
            </Box>
          );
        })}
      </HStack>
      <Box minHeight='2rem' />
      <Link href={_.get(project, 'websiteUrl')} isExternal>
        <Button>Visit Website</Button>
      </Link>
    </VStack>
  </Card>
);

export default ProjectCard;
