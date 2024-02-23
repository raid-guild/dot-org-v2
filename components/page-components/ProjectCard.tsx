import { Box, Button, Card, HStack, Heading, Image, Link, Stack, Text, defaultTheme } from '@raidguild/design-system';

interface ProjectCardProps {
  name: string;
  logo: string;
  website: string;
  roles?: string[];
}

const ProjectCard = ({ name, logo, website, roles }: ProjectCardProps) => {
  return (
    <Card maxW='600px' border={`1px solid ${defaultTheme.colors.red[500]}`} align='center' gap={4} pb={6}>
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
        {roles && (
          <HStack gap={2}>
            {roles.map((role: string) => (
              <Image key={role} src={role} alt='role' />
            ))}
          </HStack>
        )}

        {website && (
          <Link href={website} isExternal>
            <Button variant='gradientOutline' width='max' fontFamily='monospace' fontWeight={500}>
              Visit Website
            </Button>
          </Link>
        )}
      </Stack>
    </Card>
  );
};

export default ProjectCard;
