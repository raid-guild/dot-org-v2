import { Box, Flex, Heading, Text, VStack, Image, Stack } from '@raidguild/design-system';
import _ from 'lodash';
import { GetServerSidePropsContext } from 'next';

import CMSPageTemplate from '../../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../../components/page-components/PageTitle';
import Markdown from '../../../components/atoms/Markdown';
import { getBlogDetail } from '../../../gql';

type Props = {
  initialData: any;
};

const getMonthString = (date: Date) => {
  const publishMonth = date.getMonth();
  let publishMonthString;
  switch (publishMonth) {
    case 0:
      publishMonthString = 'Jan';
      break;
    case 1:
      publishMonthString = 'Feb';
      break;
    case 2:
      publishMonthString = 'Mar';
      break;
    case 3:
      publishMonthString = 'Apr';
      break;
    case 4:
      publishMonthString = 'May';
      break;
    case 5:
      publishMonthString = 'Jun';
      break;
    case 6:
      publishMonthString = 'Jul';
      break;
    case 7:
      publishMonthString = 'Aug';
      break;
    case 8:
      publishMonthString = 'Sep';
      break;
    case 9:
      publishMonthString = 'Oct';
      break;
    case 10:
      publishMonthString = 'Nov';
      break;
    case 11:
      publishMonthString = 'Dec';
      break;
    default:
      break;
  }
  return publishMonthString;
};

function PostPage({ initialData }: Props) {
  const publishTime = new Date(_.get(initialData, 'createdAt'));

  const publishString = `${getMonthString(publishTime)} ${publishTime.getDate()} ${publishTime.getFullYear()}`;
  return (
    <CMSPageTemplate>
      <PageTitle title='State of The Raid' />
      <Flex width={['90%', '90%', '60vw', '60vw', '60vw']} mx='auto' direction='column'>
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
//   try {
//     const { data } = await supabase.from('BlogContent').select('post_title');
//     const paths = data.map((post: any) => {
//       return { params: { post: post?.post_title } };
//     });
//     return {
//       paths,
//       fallback: true,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// }

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
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
