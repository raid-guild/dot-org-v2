import { Box, Link, useProps } from "@chakra-ui/react";

export default function ButtonHireUs(props) {
  return (
    <>
      <Link
        href="/hire-us"
        _hover={{
          textDecoration: `none`,
        }}
      >
        <Box
          sx={{
            background: ` linear-gradient(94.89deg, #FF5A00 0%, #D62789 70.2%, #AD17AD 100%)`,
            color: `white`,
            borderRadius: `2px`,
            padding: `10px 50px`,
            fontFamily: `Source Code Pro`,
            textTransform: `uppercase`,
          }}
          _hover={{
            background: `linear-gradient(94.18deg, #AE17AC -1.77%, #FE5903 101.54%)`,
          }}
        >
          {props.children}
        </Box>
      </Link>
    </>
  );
}
