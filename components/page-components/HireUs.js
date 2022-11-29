import ButtonHireUs from "../atoms/ButtonHireUs";
import ButtonJoinUs from "../atoms/ButtonJoinUs";

import { Box, Heading } from "@chakra-ui/react";
import { containerWidth } from "../../themes/variables";

export default function hireUs() {
  return (
    <>
      <Box
        sx={{
          width: containerWidth,
          margin: `0 auto`,
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          background: `linear-gradient(-30deg, #2B0000 0%, #3D0610 29.17%, #5A1049 61.98%, #461881 100%)`,
          padding: `40px`,
          borderRadius: `2px`,
        }}
      >
        <Heading
          sx={{
            color: `#fffffe`,
            fontFamily: `uncial`,
            textShadow: `0px 0px 8px #FF3864`,
            fontSize: `1.5rem`,
            marginBottom: `25px`,
          }}
        >
          Hire RaidGuild
        </Heading>
        <Box
          sx={{
            display: `flex`,
            flexDirection: `row`,
            gap: `20px`,
          }}
        >
          <ButtonHireUs>Hire Us</ButtonHireUs>
          <ButtonJoinUs>Join Us</ButtonJoinUs>
        </Box>
      </Box>
    </>
  );
}
