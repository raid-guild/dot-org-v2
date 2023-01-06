import _ from 'lodash';
import { Box, Image, Heading, VStack, HStack, Text, Button } from '@raidguild/design-system';

interface Props {
  project: any;
}

const ProjectCard = ({ project }: Props) => (
  <Box
    sx={{
      border: `1px solid black`,
      borderColor: `red`,
      background: `darkBlack`,
      width: `350px`,
      maxWidth: `350px`,
      margin: `0 auto`,
    }}>
    <Box
      sx={{
        height: `96px`,
        background: `linear-gradient(102.93deg, #2B0000 0%, #3D0610 29.17%, #5A1049 61.98%, #461881 100%)`,
      }}
    />
    <VStack sx={{ alignItems: `center`, paddingBottom: `2rem` }}>
      <Image
        src={`${_.get(project, 'imageUrl')}`}
        sx={{
          width: `96px`,
          height: `96px`,
          border: `1px solid black`,
          borderColor: `red`,
          transform: `translateY(-48px)`,
        }}
      />
      <Heading sx={{ color: `white`, fontFamily: `uncial` }}>{_.get(project, 'projectName')}</Heading>
      <Text sx={{ color: `white`, padding: `1rem`, fontFamily: `texturina` }}>{_.get(project, 'description')}</Text>
      <HStack>
        {_.map(_.get(project, 'raiders'), (raider: any) => {
          console.log(raider);
          return (
            <div key={raider.raider} data-tip={`${raider?.raider} | ${raider?.role}`}>
              <Image
                src={`/assets/characters/${raider?.role.toLowerCase()}.svg`}
                sx={{ width: `28px`, height: `28px` }}
              />
            </div>
          );
        })}
      </HStack>
      <Box sx={{ minHeight: `2rem` }} />
      <a href={_.get(project, 'websiteUrl')}>
        <Button
          sx={{
            background: `linear-gradient(96.18deg, #FF3864 -44.29%, #8B1DBA 53.18%, #4353DF 150.65%)`,
            color: `white`,
            fontFamily: `Source Code Pro`,
            textTransform: `uppercase`,
            borderRadius: `2px`,
            padding: `10px 30px`,
          }}
          _hover={{
            background: `linear-gradient(-83.82deg, #FF3864 -44.29%, #8B1DBA 53.18%, #4353DF 150.65%)`,
          }}>
          Visit Website
        </Button>
      </a>
    </VStack>
  </Box>
);

export default ProjectCard;
