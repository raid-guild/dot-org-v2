import { Flex, Heading, Text, VStack, Image, Stack } from '@raidguild/design-system';
import _ from 'lodash';
import { GetStaticPropsContext } from 'next';

import CMSPageTemplate from '../../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../../components/page-components/PageTitle';
import Markdown from '../../../components/atoms/Markdown';
import { getBlogDetail, getBlogsList } from '../../../gql';
import { getMonthString } from '../../../utils';

type Props = {
  initialData: any;
};

function PostPage({ initialData }: Props) {
  const publishTime = new Date(_.get(initialData, 'createdAt'));

  const publishString = `${getMonthString(publishTime)} ${publishTime.getDate()} ${publishTime.getFullYear()}`;
  return (
    <CMSPageTemplate>
      <PageTitle title='State of The Raid' />
      <Flex width={['90%', '90%', '60vw', '60vw', '60vw']} mx='auto' direction='column' gap={4}>
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

export async function getStaticPaths() {
  const posts = await getBlogsList();

  const paths = posts.map((post: any) => ({
    params: { post: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  let post = _.get(context, 'params.post');
  if (_.isArray(post)) post = _.first(post);

  if (!post) {
    return {
      props: {
        initialData: null,
      },
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
