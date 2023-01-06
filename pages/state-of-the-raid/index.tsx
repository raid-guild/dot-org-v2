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
  Link,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../../styles/markdown.module.scss";
import ProjectCard from "../../components/page-components/ProjectCard";
import { useEffect, useState } from "react";

export default function AllPosts(props) {
  const [blogData, setBlogData] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("BlogContent")
        .select("*")
        .range(0, 10)
        .order("id", { ascending: true });
      setBlogData(data);
    };
    fetchData();
  }, []);
  async function fetchNewData() {
    const { data, error } = await supabase
      .from("BlogContent")
      .select("*")
      .range((page - 1) * 10, (page - 1) * 10 + 10)
      .order("id", { ascending: true });
    console.log(data);
    console.log(error);
    setBlogData([...data]);
  }

  // call fetchNewData when the page number changes
  useEffect(() => {
    fetchNewData();
  }, [page]);

  return (
    <CMSPageTemplate>
      <PageTitle title={"State of The Raid"} />
      <Box
        sx={{
          background: `blackDark`,
          padding: `2rem 0`,
          fontFamily: `texturina`,
          color: `white`,
        }}
      >
        <VStack>
          {blogData &&
            blogData.map((post, index) => {
              console.log({ post });
              return (
                <Box key={`${post}-${index}`}>
                  <HStack sx={{gap: `1rem`}}>
                    <Image src={post.hero_image} sx={{maxWidth: `200px`}} />
                    <VStack alignItems="flex-start">
                      <Heading>{post.post_title}</Heading>
                      <Text>{post.description}</Text>
                      <Link href={`/state-of-the-raid/${post.post_title}`}>Read More</Link>
                    </VStack>
                  </HStack>
                </Box>
              );
            })}
        </VStack>
      </Box>
    </CMSPageTemplate>
  );
}
