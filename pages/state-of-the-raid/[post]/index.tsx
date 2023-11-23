import {
  Flex,
  Heading,
  Text,
  VStack,
  Image,
  Stack,
  Link,
  Button,
  Divider,
  defaultTheme,
} from '@raidguild/design-system';
import _ from 'lodash';
import { GetStaticPropsContext } from 'next';
import { NextSeo } from 'next-seo';
import { useSession } from 'next-auth/react';
import { FiEdit } from 'react-icons/fi';
import { useRouter } from 'next/router';
import CMSPageTemplate from '../../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../../components/page-components/PageTitle';
import Markdown from '../../../components/atoms/Markdown';
import { getBlogDetail, getBlogsList } from '../../../gql';
import { getMonthString, checkPermission } from '../../../utils';
import fallBackBanner from '../../../assets/illustrations/fallBackBanner.png';
import GradientBorderButton from '../../../components/atoms/GradientBorderButton';

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
      <Flex
        width={['90%', '90%', '60vw', '60vw', '60vw']}
        mx='auto'
        direction='column'
        gap={4}
        pt={8}
        textColor='white'>
        {canEdit && (
          <Stack alignItems='center' py='6'>
            <GradientBorderButton
              width='max-content'
              label={
                <Flex w='max-content' px={4} gap={2} alignItems='center' justifyContent='center'>
                  <FiEdit fontSize='16px' color={defaultTheme.colors.purple[500]} /> Create new Post
                </Flex>
              }
              onClick={() => router.push(`/state-of-the-raid/${initialData.slug}/edit`)}
            />
          </Stack>
        )}

        {_.get(initialData, 'image') && <Image src={_.get(initialData, 'image')} w='auto' mb={8} />}
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
