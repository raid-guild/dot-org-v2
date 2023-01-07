import { useState } from 'react';
import _ from 'lodash';
import { Box, Heading, Text, VStack, Image, HStack } from '@raidguild/design-system';

import Link from '../../components/atoms/ChakraNextLink';
import CMSPageTemplate from '../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../components/page-components/PageTitle';
import ProjectCard from '../../components/page-components/ProjectCard';

interface PostProps {
  post: any;
}

const Post = ({ post }: PostProps) => (
  <Box key={post.description}>
    <HStack spacing={3}>
      <Image src={post.heroImage} maxWidth='200px' />
      <VStack alignItems='flex-start'>
        <Heading>{post.postTitle}</Heading>
        <Text>{post.description}</Text>
        <Link href={`/state-of-the-raid/${post.postTitle}`}>Read More</Link>
      </VStack>
    </HStack>
  </Box>
);

const AllPosts = () => {
  const [blogData, setBlogData] = useState(null);
  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data, error } = await supabase
  //       .from('BlogContent')
  //       .select('*')
  //       .range(0, 10)
  //       .order('id', { ascending: true });
  //     setBlogData(data);
  //   };
  //   fetchData();
  // }, []);

  // async function fetchNewData() {
  //   const { data, error } = await supabase
  //     .from('BlogContent')
  //     .select('*')
  //     .range((page - 1) * 10, (page - 1) * 10 + 10)
  //     .order('id', { ascending: true });
  //   console.log(data);
  //   console.log(error);
  //   setBlogData([...data]);
  // }

  // // call fetchNewData when the page number changes
  // useEffect(() => {
  //   fetchNewData();
  // }, [page]);

  return (
    <CMSPageTemplate>
      <PageTitle title='State of The Raid' />
      <Box background='blackAlpha.800' px='2rem'>
        <VStack>
          {_.map(blogData, (post: any) => (
            <Post post={post} />
          ))}
        </VStack>
      </Box>
    </CMSPageTemplate>
  );
};

export default AllPosts;
