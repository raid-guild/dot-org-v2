import { Box } from "@chakra-ui/react";

import CMSPageTemplate from "../components/page-templates/CMSPageTemplate";
import PageTitle from "../components/page-components/PageTitle";
import supabase from "../shared/Supabase";

export default function Admin(props) {
  return (
    <CMSPageTemplate>
      <Box>
        <PageTitle title="Admin Panel" />
        <Box
          sx={{
            color: `white`,
            display: `flex`,
            flexDirection: `column`,
            alignItems: `center`,
          }}
        >
          <Box
            sx={{
              display: `flex`,
              justifyContent: `space-between`,
              width: `400px`,
              margin: `3rem auto`,
            }}
          >
            <Box
              sx={{
                backgroundColor: `white`,
                color: `red`,
                padding: `.5rem`,
                borderRadius: `0.25rem`,
                fontWeight: `700`,
              }}
            >
              Add Portfolio Project
            </Box>
            <Box
              sx={{
                backgroundColor: `white`,
                color: `red`,
                padding: `.5rem`,
                borderRadius: `0.25rem`,
                fontWeight: `700`,
              }}
            >
              Add Blog Post
            </Box>
          </Box>
          <Box
            sx={{
              display: `grid`,
              gridTemplateColumns: `1fr 1fr`,
              placeItems: `center`,
              minWidth: `400px`,
            }}
          >
            <Box sx={{ display: `flex`, flexDirection: `column` }}>Meow</Box>
            <Box sx={{ display: `flex`, flexDirection: `column` }}>Meow</Box>
          </Box>
        </Box>
      </Box>
    </CMSPageTemplate>
  );
}
