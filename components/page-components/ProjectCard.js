import {
  Box,
  Image,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
} from "@chakra-ui/react";
import ReactTooltip from "react-tooltip";

export default function ProjectCard(props) {
  const thisProject = props.project;
  return (
    <Box
      sx={{
        border: `1px solid black`,
        borderColor: `red`,
        background: `darkBlack`,
        width: `350px`,
        maxWidth: `350px`,
        margin: `0 auto`,
      }}
    >
      <Box
        sx={{
          height: `96px`,
          background: `linear-gradient(102.93deg, #2B0000 0%, #3D0610 29.17%, #5A1049 61.98%, #461881 100%)`,
        }}
      ></Box>
      <VStack sx={{ alignItems: `center`, paddingBottom: `2rem` }}>
        <Image
          src={`${thisProject["image_url"]}`}
          sx={{
            width: `96px`,
            height: `96px`,
            border: `1px solid black`,
            borderColor: `red`,
            transform: `translateY(-48px)`,
          }}
        />
        <Heading sx={{ color: `white`, fontFamily: `uncial` }}>
          {thisProject["project_name"]}
        </Heading>
        <HStack>
          {thisProject["raiders"].map((raider, index) => {
            console.log(raider);
            return (
              <div key={index} data-tip={`${raider?.raider} | ${raider?.role}`}>
                <Image
                  src={`/assets/characters/${raider?.role.toLowerCase()}.svg`}
                  sx={{ width: `28px`, height: `28px` }}
                />
                <ReactTooltip />
              </div>
            );
          })}
        </HStack>
        <Box sx={{ minHeight: `2rem` }}></Box>
        <a href={thisProject["website_url"]}>
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
            }}
          >
            Visit Website
          </Button>
        </a>
      </VStack>
    </Box>
  );
}
