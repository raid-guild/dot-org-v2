import CMSPageTemplate from "../../components/page-templates/CMSPageTemplate";
import PageTitle from "../../components/page-components/PageTitle";
import supabase from "../../shared/Supabase";
import { Box, Heading, VStack, Image, Button, HStack } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../../styles/markdown.module.scss";
import ProjectCard from "../../components/page-components/ProjectCard";

export default function PortfolioPage({ project }) {
  const thisProject = project?.data[0];
  return (
    <CMSPageTemplate>
      <PageTitle title={thisProject["project_name"]} />
      <Box sx={{ background: `blackDark`, padding: `2rem 0` }}>
        <VStack
          sx={{
            color: `white`,
            background: `linear-gradient(102.93deg, #2B0000 0%, #3D0610 29.17%, #5A1049 61.98%, #461881 100%)`,
            margin: `2rem 0`,
            padding: `4rem 0`,
          }}
        >
          <Box
            sx={{
              display: `flex`,
              alignItems: `center`,
              gap: `1rem`,
              fontFamily: `uncial`,
            }}
          >
            <Image
              src="/assets/illustrations/smallCastle.svg"
              sx={{ height: `32px`, width: `32px` }}
            />
            <Heading sx={{ fontFamily: `uncial` }}>The Challenge</Heading>
          </Box>
          <Box className={styles.markdownWrapper}>
            <ReactMarkdown
              children={thisProject["challenge"].body}
              remarkPlugins={[remarkGfm]}
            ></ReactMarkdown>
          </Box>
        </VStack>
        <Box
          sx={{
            padding: `4rem`,
            display: `grid`,
            gridTemplateColumns: `5fr 7fr`,
          }}
        >
          <Box>
            <ProjectCard project={thisProject} />
          </Box>
          <Box
            sx={{ display: `flex`, flexDirection: `column`, color: `white` }}
          >
            {/* Other Markdown */}
            <VStack sx={{ maxWidth: `50ch`, alignSelf: `center` }}>
              <VStack>
                <Box
                  sx={{
                    display: `flex`,
                    alignItems: `center`,
                    gap: `1rem`,
                    fontFamily: `uncial`,
                  }}
                >
                  <Image
                    src="/assets/illustrations/swords.svg"
                    sx={{ height: `32px`, width: `32px` }}
                  />
                  <Heading sx={{ fontFamily: `uncial` }}>Our Approach</Heading>
                </Box>
                <Box className={styles.markdownWrapper}>
                  <ReactMarkdown
                    children={thisProject["approach"].body}
                    remarkPlugins={[remarkGfm]}
                  ></ReactMarkdown>
                </Box>
              </VStack>
              <VStack>
                <Box
                  sx={{
                    display: `flex`,
                    alignItems: `center`,
                    gap: `1rem`,
                    fontFamily: `uncial`,
                  }}
                >
                  <Image
                    src="/assets/illustrations/wand.svg"
                    sx={{ height: `32px`, width: `32px` }}
                  />
                  <Heading sx={{ fontFamily: `uncial` }}>The Result</Heading>
                </Box>

                <Box className={styles.markdownWrapper}>
                  <ReactMarkdown
                    children={thisProject["result"].body}
                    remarkPlugins={[remarkGfm]}
                  ></ReactMarkdown>
                </Box>
              </VStack>
              <Box sx={{ minHeight: `2rem` }}></Box>
              <HStack sx={{ alignSelf: `flex-start` }}>
                <a href={thisProject["website_url"]} target="_blank" rel="noreferrer">
                  <Button
                    sx={{
                      background: `linear-gradient(94.89deg, #FF5A00 0%, #D62789 70.2%, #AD17AD 100%)`,
                    }}
                    _hover={{
                      background: `linear-gradient(-90deg, #FF5A00 0%, #D62789 70.2%, #AD17AD 100%)`,
                    }}
                  >
                    Visit Website
                  </Button>
                </a>
                <a href={thisProject["github_url"]} target="_blank" rel="noreferrer">
                  <Button
                    sx={{
                      border: `2px solid black`,
                      borderColor: `red`,
                      color: `red`,
                      backgroundColor: `transparent`,
                    }}
                  >
                    View Code
                  </Button>
                </a>
              </HStack>
            </VStack>
          </Box>
        </Box>
      </Box>
    </CMSPageTemplate>
  );
}

export async function getStaticPaths() {
  try {
    const { data } = await supabase
      .from("PortfolioContent")
      .select("project_name");
    const paths = data.map((project) => {
      return { params: { project: project?.project_name } };
    });
    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.log(error);
  }
}

// This function gets called at build time
export async function getStaticProps(params) {
  const project = params.params.project;
  // Call an external API endpoint to get posts
  const res = await supabase
    .from("PortfolioContent")
    .select("*")
    .eq("project_name", project);

  return {
    props: {
      project: res,
    },
  };
}
