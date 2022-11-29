import { Box, Link, useProps } from "@chakra-ui/react";

export default function ButtonJoinUs(props) {
  return (
    <>
      <Link href="/join-us" _hover={{ textDecoration: `none` }}>
        <Box
          sx={{
            border: `1px solid #8B1DBA`,
            color: `#8B1DBA`,
            borderRadius: `2px`,
            padding: `10px 50px`,
            fontFamily: `Source Code Pro`,
            textTransform: `uppercase`,
          }}
        >
          {props.children}
        </Box>
      </Link>
    </>
  );
}
