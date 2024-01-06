import { Button, Divider, Flex, Heading, Image, Stack, Text, VStack } from '@raidguild/design-system';
import _ from 'lodash';
import { GetStaticPropsContext } from 'next';
import { useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { FiEdit } from 'react-icons/fi';
import fallBackBanner from '../../../assets/illustrations/fallBackBanner.png';
import Markdown from '../../../components/atoms/Markdown';
import PageTitle from '../../../components/page-components/PageTitle';
import CMSPageTemplate from '../../../components/page-templates/CMSPageTemplate';
import { getBlogDetail, getBlogsList } from '../../../gql';
import { checkPermission, getMonthString } from '../../../utils';

type Props = {
  initialData: any;
};

function PostPage({ initialData }: Props) {
  const { data: session } = useSession();

  const canEdit = checkPermission(session);

  const publishTime = new Date(_.get(initialData, 'createdAt'));

  const publishString = `${getMonthString(publishTime)} ${publishTime.getDate()} ${publishTime.getFullYear()}`;

  const router = useRouter();

  if (!initialData?.slug) {
    return (
      <CMSPageTemplate>
        <PageTitle title='Page not found' />
      </CMSPageTemplate>
    );
  }

  return (
    <CMSPageTemplate>
      <PageTitle title='State of the Raid' />

      <NextSeo
        title={_.get(initialData, 'title')}
        description={_.get(initialData, 'description')}
        canonical={`https://www.raidguild.org/state-of-the-raid/${initialData.slug}`}
        openGraph={{
          url: `${`https://www.raidguild.org/state-of-the-raid/${initialData.slug}`}`,
          title: `${_.get(initialData, 'title')}`,
          description: `${_.get(initialData, 'description')}`,
          images: [
            {
              url: `${_.get(initialData, 'image')}` || fallBackBanner.src,
              alt: `${_.get(initialData, 'title')}`,
            },
          ],
        }}
      />

      <Flex maxW='1000px' mx='auto' direction='column' gap={4} py={4} textColor='white'>
        {canEdit && (
          <Stack alignItems='center' py='6'>
            <Button
              variant='bright'
              width='max-content'
              onClick={() => router.push(`/state-of-the-raid/${initialData.slug}/edit`)}>
              <Flex
                w='max-content'
                px={4}
                gap={2}
                alignItems='center'
                justifyContent='center'
                fontFamily='monospace'
                fontWeight={500}>
                <FiEdit fontSize='16px' color='white' /> Edit Post
              </Flex>
            </Button>
          </Stack>
        )}

        {_.get(initialData, 'image') && <Image src={_.get(initialData, 'image')} mb={8} />}
        <VStack direction='column' alignItems='flex-start'>
          <Image src={_.get(initialData, 'image') || fallBackBanner.src} w='max' mb={8} />
          <Heading variant='shadow' color='white' fontFamily='uncial' textAlign='left'>
            {_.get(initialData, 'title')}
          </Heading>

          <Flex direction='row' textColor='white' fontFamily='texturina'>
            <Text as='span' casing='capitalize'>
              Published By {` ${_.get(initialData, 'author')}`}
              {` | ${publishString}`}
            </Text>
          </Flex>
        </VStack>
        <Stack background='blackAlpha.800' fontFamily='texturina' mt='6' alignItems='flex-start' p='50px'>
          <Text>{_.get(initialData, 'description')}</Text>
          <Divider my={4} />
          <Markdown>{_.get(initialData, 'content')}</Markdown>
        </Stack>
      </Flex>
    </CMSPageTemplate>
  );
}

export const getStaticPaths = async () => {
  const blogs = (await getBlogsList()) as { slug: string }[];

  return {
    paths: blogs.map((b) => ({ params: { post: b.slug } })),
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  let post = _.get(context, 'params.post');
  if (_.isArray(post)) post = _.first(post);

  if (!post) {
    return {
      props: {},
    };
  }

  const result = await getBlogDetail(post);

  return {
    props: {
      initialData: result,
    },
    revalidate: 10,
  };
};

export default PostPage;
