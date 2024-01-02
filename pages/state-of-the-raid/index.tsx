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
  useBreakpointValue,
} from '@raidguild/design-system';
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiEdit, FiFilter } from 'react-icons/fi';
import wallSconce from '../../assets/illustrations/wallSconce.svg';
import Link from '../../components/atoms/ChakraNextLink';
import PageEnd from '../../components/page-components/PageEnd';
import PageTitle from '../../components/page-components/PageTitle';
import CMSPageTemplate from '../../components/page-templates/CMSPageTemplate';
import { getBlogsList } from '../../gql';
import useBlogsList from '../../hooks/useBlogsList';
import { checkPermission } from '../../utils';
import tokens from '../../utils/extendedTokens';

const Topics = ['', 'Raid', 'Guild', 'Community'];
interface PostProps {
  post: any;
}

const Post = ({ post }: PostProps) => {
  const link = `/state-of-the-raid/${post.slug}`;
  return (
    <Link href={link} w='100%'>
      <Card py={4} px={2} _hover={{ bg: '#FFFFFF08' }} border='none'>
        <Flex minH='250px' align='center'>
          <Stack
            spacing='2rem'
            flexDir={{ base: 'column', md: 'row' }}
            alignItems={{ base: 'center', md: 'flex-start' }}
            textAlign={{ base: 'center', md: 'left' }}>
            <Image src={_.get(post, 'imageUrl', wallSconce.src)} width='200px' height='250px' />
            <VStack maxWidth='50ch' spacing={6} color='white' align={{ base: 'center', md: 'start' }}>
              <Heading fontSize='2xl' fontFamily='texturina'>
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

  const [hideFilters, setHideFilters] = useState(false);
  const isXL = useBreakpointValue({ base: false, xl: true });
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
            <Button variant='bright' width='max-content' onClick={() => router.push('/state-of-the-raid/publish')}>
              <Flex w='max-content' px={4} gap={2} alignItems='center' justifyContent='center'>
                <FiEdit fontSize='16px' color='white' /> Create new Post
              </Flex>
            </Button>
          </Stack>
        )}
        <Stack
          justify='center'
          align='flex-start'
          flexDir={{ base: 'column-reverse', xl: 'row' }}
          maxW='100vw'
          gap={20}
          p={10}>
          <VStack mt={16} alignItems={{ base: 'center' }} spacing={10}>
            {_.map(filteredblogs, (post) => (
              <Post post={post} key={_.get(post, 'slug')} />
            ))}
          </VStack>
          <VStack
            border={`1px solid ${defaultTheme.colors.primary[500]}`}
            p={{ base: 0, xl: 8 }}
            mt={16}
            gap={4}
            justify='flex-start'
            align='flex-start'
            w={{ base: '100%', xl: '25%' }}>
            <HStack
              spacing={4}
              align='center'
              w='full'
              justify='space-between'
              p={4}
              hideFrom='xl'
              onClick={() => setHideFilters(!hideFilters)}
              _hover={{ cursor: 'pointer' }}>
              <Text color='white' fontSize='md' fontFamily='texturina'>
                Filters
              </Text>
              <FiFilter fontSize={18} color='white' />
            </HStack>

            <Box ml={6} mb={8} px={8} hidden={hideFilters && !isXL}>
              <Heading fontSize='3xl' fontFamily='texturina' mb={6}>
                Topics
              </Heading>
              <ul>
                {Topics.map((topic) =>
                  topic === '' ? (
                    <li key={topic}>
                      <Text
                        mt={3}
                        ml={4}
                        onClick={() => router.push(`/state-of-the-raid`)}
                        color={q ? 'white' : 'primary.500'}
                        w='max-content'
                        _hover={{ cursor: 'pointer', borderBottom: `1px solid white` }}>
                        All Blogs
                      </Text>
                    </li>
                  ) : (
                    <li key={topic}>
                      <Text
                        mt={3}
                        ml={4}
                        w='max-content'
                        onClick={() => router.push(`/state-of-the-raid?q=${topic.toLowerCase()}`)}
                        color={String(q).toLowerCase() !== topic.toLowerCase() ? 'white' : 'primary.500'}
                        _hover={{ cursor: 'pointer', borderBottom: `1px solid white` }}>
                        {topic}
                      </Text>
                    </li>
                  ),
                )}
              </ul>
            </Box>
          </VStack>
        </Stack>
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
