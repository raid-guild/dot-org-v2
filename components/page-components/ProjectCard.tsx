import { Box, Heading, Image, Link, Stack, Text, defaultTheme } from '@raidguild/design-system';
import GradientButton from '../atoms/GradientButton';

interface ProjectCardProps {
  name: string;
  logo: string;
  website: string;
}

const ProjectCard = ({ name, logo, website }: ProjectCardProps) => {
  return (
    <Stack maxW='600px' border={`1px solid ${defaultTheme.colors.red[500]}`} align='center' spacing={4} pb={6}>
      <Box layerStyle='redToPurpleVerticalGradient' w='full' height='90px' position='relative'>
        <Box
          bg='black'
          w='100px'
          h='100px'
          position='absolute'
          top='50%'
          left='50%'
          transform='translate(-50%, -5%)'
          border={`1px solid ${defaultTheme.colors.red[500]}`}>
          <Image
            src={logo}
            width='60px'
            height='auto'
            position='absolute'
            top='50%'
            left='50%'
            transform='translate(-50%, -50%)'
          />
        </Box>
      </Box>
      <Stack align='center' spacing={4} px={10} mt={16}>
        <Heading textAlign='center' size='lg' variant='shadow'>
          {name}
        </Heading>
        <Text p={4}>{website}</Text>
        {website && (
          <Link href={website} isExternal>
            <GradientButton width='max'>Visit Website</GradientButton>
          </Link>
        )}
      </Stack>
    </Stack>
  );
};

export default ProjectCard;
