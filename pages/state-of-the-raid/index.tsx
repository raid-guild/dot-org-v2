import { Box, Button, Card, Flex, Heading, Image, Stack, Text, VStack, defaultTheme } from '@raidguild/design-system';
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import { FaEdit } from 'react-icons/fa';
import PageEnd from '../../components/page-components/PageEnd';
import wallSconce from '../../assets/illustrations/wallSconce.svg';
import Link from '../../components/atoms/ChakraNextLink';
import PageTitle from '../../components/page-components/PageTitle';
import CMSPageTemplate from '../../components/page-templates/CMSPageTemplate';
import { getBlogsList } from '../../gql';
import useBlogsList from '../../hooks/useBlogsList';
import { checkPermission } from '../../utils';
import tokens from '../../utils/extendedTokens';
import fallBackBanner from '../../assets/illustrations/fallBackBanner.png';

interface PostProps {
  post: any;
}

const Post = ({ post }: PostProps) => {
  const link = `/state-of-the-raid/${post.slug}`;
  return (
    <Link href={link}>
      <Card border='none' w={{ base: '100%', md: '70rem' }} mx='auto' py={4} px={2}>
        <Flex minH='250px' align='center'>
          <Stack
            spacing='2rem'
            flexDir={{ base: 'column', md: 'row' }}
            alignItems={{ base: 'center', md: 'flex-start' }}
            textAlign={{ base: 'center', md: 'left' }}>
            <Image src={_.get(post, 'imageUrl', wallSconce.src)} width='200px' height='250px' />
            <VStack maxWidth='50ch' spacing={6} color='white' align={{ base: 'center', md: 'start' }}>
              <Heading fontSize='3xl' fontFamily={defaultTheme.fonts.texturina}>
                {_.get(post, 'title')}
              </Heading>
              <Text noOfLines={3}>{_.get(post, 'description')}</Text>
              <Link href={link} width='full'>
                <Button variant='link' bg={tokens.purpleToBlueGradient} bgClip='text' _hover={{ opacity: '80%' }}>
                  <Text fontFamily={defaultTheme.fonts.spaceMono}>Read More</Text>
                </Button>
              </Link>
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

  const canCreate = checkPermission(session);

  return (
    <Box>
      <CMSPageTemplate>
        <PageTitle title='State of The Raid' />
        {canCreate && (
          <Stack alignItems='center' pt='6'>
            <Link href='/state-of-the-raid/publish'>
              <Button variant='link' leftIcon={<FaEdit />}>
                Create new Post
              </Button>
            </Link>
          </Stack>
        )}
        <VStack mt={16} alignItems={{ base: 'center' }} spacing={20}>
          {_.map(blogs, (post) => (
            <Post post={post} key={_.get(post, 'slug')} />
          ))}
        </VStack>
        <PageEnd />
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
