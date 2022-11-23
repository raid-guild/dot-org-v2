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

export default function AllPosts(props) {

    

  return (
    <CMSPageTemplate>
      <PageTitle title={"State of The Raid"} />
      <Box sx={{ background: `blackDark`, padding: `2rem 0`, fontFamily: `texturina`, color: `white` }}>
      </Box>
    </CMSPageTemplate>
  );
}