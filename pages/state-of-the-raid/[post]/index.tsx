import { Flex, Heading, Text, VStack, Image, Stack, Link, Button } from '@raidguild/design-system';
import _ from 'lodash';
import { GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';

import { FaEdit } from 'react-icons/fa';
import CMSPageTemplate from '../../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../../components/page-components/PageTitle';
import Markdown from '../../../components/atoms/Markdown';
import { getBlogDetail } from '../../../gql';
import { getMonthString, checkPermission } from '../../../utils';

type Props = {
  initialData: any;
};

function PostPage({ initialData }: Props) {
  const { data: session } = useSession();

  const canEdit = checkPermission(session);

  const publishTime = new Date(_.get(initialData, 'createdAt'));

  const publishString = `${getMonthString(publishTime)} ${publishTime.getDate()} ${publishTime.getFullYear()}`;
  return (
    <CMSPageTemplate>
      <PageTitle title='State of The Raid' />
      <Flex width={['90%', '90%', '60vw', '60vw', '60vw']} mx='auto' direction='column' gap={4} pt={8}>
        {canEdit && (
          <Stack alignItems='center' pb={8}>
            <Link href={`/state-of-the-raid/${initialData.slug}/edit`}>
              <Button variant='link' leftIcon={<FaEdit />}>
                Edit Post
              </Button>
            </Link>
          </Stack>
        )}

        {_.get(initialData, 'image') && <Image src={_.get(initialData, 'image')} w='auto' mb='2rem' />}
        <VStack direction='column' alignItems='flex-start'>
          <Heading textAlign='left' as='h1'>
            {_.get(initialData, 'title')}
          </Heading>
          <Flex direction='row'>
            Published by{' '}
            <Text as='span' fontWeight='bold' px='12px'>
              {_.get(initialData, 'author')}
            </Text>{' '}
            | {publishString}
          </Flex>
        </VStack>
        <Stack background='blackAlpha.800' mt='6' alignItems='flex-start' py='50px'>
          <Heading textAlign='left' as='h1'>
            Abstract
          </Heading>
          <Text>{_.get(initialData, 'description')}</Text>
          <Markdown>{_.get(initialData, 'content')}</Markdown>
        </Stack>
      </Flex>
    </CMSPageTemplate>
  );
}

// export async function getStaticPaths() {
//   const posts = await getBlogsList();

//   const paths = posts.map((post: any) => ({
//     params: { post: post.slug },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
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
  };
};

export default PostPage;
