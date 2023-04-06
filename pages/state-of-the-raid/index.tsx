import _ from 'lodash';
import { Box, Card, Flex, Heading, Text, VStack, Image, Stack } from '@raidguild/design-system';

import { useSession } from 'next-auth/react';
import Link from '../../components/atoms/ChakraNextLink';
import CMSPageTemplate from '../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../components/page-components/PageTitle';
import useBlogsList from '../../hooks/useBlogsList';
import { getBlogsList } from '../../gql';

interface PostProps {
  post: any;
}

const Post = ({ post }: PostProps) => {
  const link = `/state-of-the-raid/${post.slug}`;
  return (
    <Link href={link}>
      <Card border='1px solid #FF3864' w={['90%', '90%', '90%', '100%', '100%']} mx='auto' p={4}>
        <Flex minH='250px' align='center'>
          <Stack
            spacing='2rem'
            direction={['column', 'column', 'column', 'row', 'row']}
            alignItems={['flex-start', 'flex-start', 'flex-start', 'center', 'center']}>
            <Image src={_.get(post, 'imageUrl')} width='200px' />
            <VStack maxWidth='50ch' spacing={6} color='white' align='flex-start'>
              <Heading as='h4'>{_.get(post, 'title')}</Heading>
              <Text noOfLines={3}>{_.get(post, 'description')}</Text>
            </VStack>
          </Stack>
        </Flex>
      </Card>
    </Link>
  );
};

interface Props {
  initialData: any;
}

const AllPosts = ({ initialData }: Props) => {
  const { data: session } = useSession();
  const token = _.get(session, 'token');
  const { data: blogs } = useBlogsList({ initialData, token });

  return (
    <Box>
      <CMSPageTemplate>
        <PageTitle title='State of The Raid' />
        <VStack mt={16} alignItems='center' spacing={20}>
          {_.map(blogs, (post) => (
            <Post post={post} key={_.get(post, 'slug')} />
          ))}
        </VStack>
      </CMSPageTemplate>
    </Box>
  );
};

export const getStaticProps = async () => {
  const result = await getBlogsList();

  return {
    props: {
      initialData: result,
    },
  };
};

export default AllPosts;
