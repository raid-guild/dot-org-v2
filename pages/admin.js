import { Box, Image, HStack, VStack, Link } from "@chakra-ui/react";

import CMSPageTemplate from "../components/page-templates/CMSPageTemplate";
import PageTitle from "../components/page-components/PageTitle";
import supabase from "../shared/Supabase";
import RouteProtector from "../components/page-components/RouteProtector";
import { useEffect, useState } from "react";

export default function Admin(props) {

  const [blogContent, setBlogContent] = useState(null);
  const [portfolioContent, setPortfolioContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function setData() {
    let portfolioContentTemp = await supabase
    .from("PortfolioContent")
    .select("*")
    .range(0, 9);

    let blogContentTemp = await supabase.from("BlogContent").select("*").range(0, 9);
    setPortfolioContent(portfolioContentTemp);
    setBlogContent(blogContentTemp);
    setIsLoading(false);
  }

  useEffect(() => {
    setData();
  },[]);


  return (
    <CMSPageTemplate>
      <RouteProtector />
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
            <Link href="/portfolio/shipping-station">
              <Box
                sx={{
                  backgroundColor: `white`,
                  color: `red`,
                  padding: `.5rem`,
                  borderRadius: `0.25rem`,
                  fontWeight: `700`,
                }}
                _hover={{
                  color: `white`,
                  backgroundColor: `purple`,
                  cursor: `pointer`,
                }}
              >
                Add Portfolio Project
              </Box>
            </Link>
            <Link href="/state-of-the-raid/publish">
              <Box
                sx={{
                  backgroundColor: `white`,
                  color: `red`,
                  padding: `.5rem`,
                  borderRadius: `0.25rem`,
                  fontWeight: `700`,
                }}
                _hover={{
                  color: `white`,
                  backgroundColor: `purple`,
                  cursor: `pointer`,
                }}
              >
                Add Blog Post
              </Box>
            </Link>
          </Box>
          <Box
            sx={{
              display: `grid`,
              gridTemplateColumns: `1fr 1fr`,
              placeItems: `center`,
              minWidth: `400px`,
            }}
          >
            <Box sx={{ display: `flex`, flexDirection: `column` }}>
              {portfolioContent?.data.map((content, index) => {
                let date = new Date(content.created_at);
                let dateString = date.toDateString();
                return (
                  <Box
                    sx={{
                      backgroundColor: `blackLight`,
                      padding: `1rem`,
                      margin: `1rem`,
                      borderRadius: `0.5rem`,
                    }}
                    key={`p-${index}`}
                  >
                    <HStack>
                      <Image src={content?.image_url} sx={{ width: `48px` }} />
                      <VStack align="flex-start">
                        <h2 style={{ fontSize: `1.66rem`, fontWeight: `600` }}>
                          {content.project_name}
                        </h2>
                        <h3>{dateString}</h3>
                        <HStack>
                          <Link
                            href={`/portfolio/${content.project_name}/edit`}
                          >
                            <Box
                              sx={{
                                backgroundColor: `red`,
                                padding: `0.25rem 1rem`,
                                borderRadius: `0.5rem`,
                              }}
                              _hover={{
                                backgroundColor: `purple`,
                                color: `white`,
                                cursor: `pointer`,
                              }}
                            >
                              Edit
                            </Box>
                          </Link>
                          <Link href={`/portfolio/${content.project_name}`}>
                            <Box
                              sx={{
                                backgroundColor: `white`,
                                color: `red`,
                                padding: `0.25rem 1rem`,
                                borderRadius: `0.5rem`,
                              }}
                              _hover={{
                                backgroundColor: `purple`,
                                color: `white`,
                                cursor: `pointer`,
                              }}
                            >
                              View
                            </Box>
                          </Link>
                        </HStack>
                      </VStack>
                    </HStack>
                  </Box>
                );
              })}
            </Box>
            <Box sx={{ display: `flex`, flexDirection: `column` }}>
              {blogContent?.data.map((content, index) => {
                let date = new Date(content.created_at);
                let dateString = date.toDateString();
                console.log(content);
                return (
                  <Box
                    sx={{
                      backgroundColor: `blackLight`,
                      padding: `1rem`,
                      margin: `1rem`,
                      borderRadius: `0.5rem`,
                    }}
                    key={`p-${index}`}
                  >
                    <HStack>
                      <VStack align="flex-start">
                        <h2 style={{ fontSize: `1.66rem`, fontWeight: `600` }}>
                          {content.post_title}
                        </h2>
                        <h3>{dateString}</h3>
                        <HStack>
                          <Link
                            href={`/state-of-the-raid/${content.post_title}/edit`}
                          >
                            <Box
                              sx={{
                                backgroundColor: `red`,
                                padding: `0.25rem 1rem`,
                                borderRadius: `0.5rem`,
                              }}
                              _hover={{
                                backgroundColor: `purple`,
                                color: `white`,
                                cursor: `pointer`,
                              }}
                            >
                              Edit
                            </Box>
                          </Link>
                          <Link
                            href={`/state-of-the-raid/${content.post_title}`}
                          >
                            <Box
                              sx={{
                                backgroundColor: `white`,
                                color: `red`,
                                padding: `0.25rem 1rem`,
                                borderRadius: `0.5rem`,
                              }}
                              _hover={{
                                backgroundColor: `purple`,
                                color: `white`,
                                cursor: `pointer`,
                              }}
                            >
                              View
                            </Box>
                          </Link>
                        </HStack>
                      </VStack>
                    </HStack>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </CMSPageTemplate>
  );
}