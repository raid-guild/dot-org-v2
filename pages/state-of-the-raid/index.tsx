import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  defaultTheme,
} from '@raidguild/design-system';
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FiEdit } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import wallSconce from '../../assets/illustrations/wallSconce.svg';
import Link from '../../components/atoms/ChakraNextLink';
import GradientBorderButton from '../../components/atoms/GradientBorderButton';
import PageEnd from '../../components/page-components/PageEnd';
import PageTitle from '../../components/page-components/PageTitle';
import CMSPageTemplate from '../../components/page-templates/CMSPageTemplate';
import { getBlogsList } from '../../gql';
import useBlogsList from '../../hooks/useBlogsList';
import { checkPermission } from '../../utils';
import tokens from '../../utils/extendedTokens';

const Topics = ['Raid', 'Guild', 'DAO', 'Community'];
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
              <Heading fontSize='3xl' fontFamily='texturina'>
                {_.get(post, 'title')}
              </Heading>
              <Text noOfLines={3}>{_.get(post, 'description')}</Text>
              <Link href={link} width='full'>
                <Button
                  as='u'
                  variant='link'
                  bg={tokens.purpleToBlueGradient}
                  bgClip='text'
                  pb={1.5}
                  borderRadius='none'
                  borderBottom={`2px solid ${defaultTheme.colors.purple[500]}`}
                  _hover={{
                    opacity: '90%',
                  }}>
                  <Text fontFamily={defaultTheme.fonts.spaceMono} borderBottom={1}>
                    Read More
                  </Text>
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
  const router = useRouter();

  const [filteredblogs, setFilteredblogs] = useState(blogs);
  const { q } = router.query;

  useEffect(() => {
    if (q) {
      const f = _.filter(blogs, (blog) =>
        _.some(blog, (value) => _.includes(String(value).toLowerCase(), String(q).toLowerCase())),
      );
      setFilteredblogs(f);
    }
  }, [q, blogs]);

  return (
    <Box>
      <CMSPageTemplate>
        <PageTitle title='State of The Raid' />
        {canCreate && (
          <Stack alignItems='center' pt='6'>
            <GradientBorderButton
              width='max-content'
              label={
                <Flex w='max-content' px={4} gap={2} alignItems='center' justifyContent='center'>
                  <FiEdit fontSize='16px' color={defaultTheme.colors.purple[500]} /> Create new Post
                </Flex>
              }
              onClick={() => router.push('/state-of-the-raid/publish')}
            />
          </Stack>
        )}
        <HStack placeItems='flex-start'>
          <VStack mt={16} alignItems={{ base: 'center' }} spacing={20}>
            {_.map(filteredblogs, (post) => (
              <Post post={post} key={_.get(post, 'slug')} />
            ))}
          </VStack>
          <VStack border={`1px solid ${defaultTheme.colors.primary[500]}`} p={16} placeItems='flex-start' mt='5%'>
            <Heading fontSize='3xl' fontFamily='texturina'>
              Topics
            </Heading>
            <ul>
              {Topics.map((topic) => (
                <li key={topic}>
                  <Text
                    mt={3}
                    pl={4}
                    onClick={() => router.push(`/state-of-the-raid?q=${topic.toLowerCase()}`)}
                    _hover={{ cursor: 'pointer' }}>
                    {topic}
                  </Text>
                </li>
              ))}
            </ul>
          </VStack>
        </HStack>
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
