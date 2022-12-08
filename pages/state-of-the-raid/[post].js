import CMSPageTemplate from "../../components/page-templates/CMSPageTemplate";
import PageTitle from "../../components/page-components/PageTitle";
import supabase from "../../shared/Supabase";
import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  Button,
  HStack,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../../styles/markdown.module.scss";
import ProjectCard from "../../components/page-components/ProjectCard";

export default function PostPage({ post }) {
  const thisPost = post?.data[0];
  const publishTime = new Date(thisPost["created_at"]);
  let publishMonth = publishTime.getMonth();
  let publishMonthString;
  switch (publishMonth) {
    case 0:
      publishMonthString = "Jan";
      break;
    case 1:
      publishMonthString = "Feb";
      break;
    case 2:
      publishMonthString = "Mar";
      break;
    case 3:
      publishMonthString = "Apr";
      break;
    case 4:
      publishMonthString = "May";
      break;
    case 5:
      publishMonthString = "Jun";
      break;
    case 6:
      publishMonthString = "Jul";
      break;
    case 7:
      publishMonthString = "Aug";
      break;
    case 8:
      publishMonthString = "Sep";
      break;
    case 9:
      publishMonthString = "Oct";
      break;
    case 10:
      publishMonthString = "Nov";
      break;
    case 11:
      publishMonthString = "Dec";
      break;
    default:
      break;
  }
  const publishString = `${publishMonthString} ${publishTime.getDate()} ${publishTime.getFullYear()}`;
  return (
    <CMSPageTemplate>
      <PageTitle title={"State of The Raid"} />
      <Box sx={{ background: `blackDark`, padding: `2rem 0`, fontFamily: `texturina`, color: `white` }}>
        <VStack>
        {thisPost?.["hero_image"] && <Image src={thisPost["hero_image"]} sx={{maxHeight: `200`, marginBottom: `2rem`}}/>}
        <Box sx={{width: `500px`}}>
        <Heading as="h1" sx={{fontFamily: `uncial`, color: `white`}}>{thisPost["post_title"]}</Heading>
        <Text>
          Published by {thisPost["author_name"]} | {publishString}
        </Text>
        <Text>
          {thisPost["description"]}
        </Text>
        <Box sx={{height: `3rem`}}></Box>
        <Box sx={{width: `100%`, height: `1px`, backgroundColor: `white`}}></Box>
        <Box sx={{height: `3rem`}}></Box>
        <Box className={styles.markdownWrapper}>
            <ReactMarkdown
              children={thisPost["content"].body}
              remarkPlugins={[remarkGfm]}
            ></ReactMarkdown>
          </Box>
        </Box>
        </VStack>
        <HStack sx={{margin: `12rem 2rem`, justifyContent: `space-between`}}>
            <Image src="/assets/illustrations/LeftWing.svg" sx={{width: `30vw`}} />
            <Image src="/assets/illustrations/Swords.svg" />
            <Image src="/assets/illustrations/RightWing.svg" sx={{width: `30vw`}}/>
        </HStack>
      </Box>
    </CMSPageTemplate>
  );
}

export async function getStaticPaths() {
  try {
    const { data } = await supabase.from("BlogContent").select("post_title");
    const paths = data.map((post) => {
      return { params: { post: post?.post_title } };
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
  const post = params.params.post;
  // Call an external API endpoint to get posts
  const res = await supabase
    .from("BlogContent")
    .select("*")
    .eq("post_title", post);

  return {
    props: {
      post: res,
    },
  };
}
