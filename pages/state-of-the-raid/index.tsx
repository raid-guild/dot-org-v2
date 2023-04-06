import _ from 'lodash';
import { format } from 'date-fns';
import { Box, Card, Flex, Heading, Text, VStack, Image, HStack } from '@raidguild/design-system';

import { useSession } from 'next-auth/react';
import Link from '../../components/atoms/ChakraNextLink';
import CMSPageTemplate from '../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../components/page-components/PageTitle';
import useBlogsList from '../../hooks/useBlogsList';
import { getBlogsList } from '../../gql';
import wallSconce from '../../assets/illustrations/wallSconce.svg';

interface PostProps {
  post: any;
}

const Post = ({ post }: PostProps) => {
  const link = `/state-of-the-raid/${post.slug}`;
  return (
    <Link href={link} w='70%'>
      <Card border='1px solid #FF3864' w='100%'>
        <Flex minH='200px' align='center' justify='center' w='100%'>
          <Flex justify='space-between' w='100%'>
            <Flex justify='center' w='40%'>
              <Image src={_.get(post, 'image') || wallSconce.src} height='auto' width='150px' marginRight='1rem' />
            </Flex>

            <VStack spacing={6} color='white' align='flex-start' w='full'>
              <Heading as='h4' size='lg'>
                {_.get(post, 'title')}
              </Heading>
              <Box maxWidth='50ch'>
                <Text noOfLines={3}>{_.get(post, 'description')}</Text>
              </Box>
              <HStack>
                <Text>by: {_.get(post, 'author')}</Text>
                <Text>|</Text>
                <Text>{format(new Date(_.get(post, 'createdAt')), 'yyyy-MM-dd')}</Text>
              </HStack>
            </VStack>
          </Flex>
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
