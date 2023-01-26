// import { useState } from 'react';
import _ from 'lodash';
import { Box, Heading, Text, VStack, Image, HStack } from '@raidguild/design-system';

import Link from '../../components/atoms/ChakraNextLink';
import CMSPageTemplate from '../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../components/page-components/PageTitle';
// import ProjectCard from '../../components/page-components/ProjectCard';
import useBlogsList from '../../hooks/useBlogsList';
import { getBlogsList } from '../../gql';

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

interface Props {
  initialData: any;
}

const AllPosts = ({ initialData }: Props) => {
  const { data: blogs } = useBlogsList({ initialData });

  return (
    <CMSPageTemplate>
      <PageTitle title='State of The Raid' />
      <Box background='blackAlpha.800' px='2rem'>
        <VStack>
          {_.map(blogs, (post: any) => (
            <Post post={post} />
          ))}
        </VStack>
      </Box>
    </CMSPageTemplate>
  );
};

export const getServerSideProps = async () => {
  const result = await getBlogsList();

  return {
    props: {
      initialData: _.get(result, 'blogs', null),
    },
  };
};

export default AllPosts;
