import { Box, Heading } from "@chakra-ui/react";

export default function ProtectedRouteWarning(props) {
  return (
    <Box sx={{ minHeight: `100vh`, display: `grid`, placeItems: `center` }}>
      <Heading sx={{color: `white`}}>You must be signed in to view this page.</Heading>
    </Box>
  );
}
