import { Box, Heading, Text, VStack, Image, HStack } from '@raidguild/design-system';
import _ from 'lodash';
import { GetServerSidePropsContext } from 'next';

import CMSPageTemplate from '../../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../../components/page-components/PageTitle';
import Markdown from '../../../components/atoms/Markdown';
// import useBlogsDetail from '../../hooks/useBlogsDetail';
// import ProjectCard from '../../components/page-components/ProjectCard';
import { getBlogDetail } from '../../../gql';

type Props = {
  post: any;
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

function PostPage({ post }: Props) {
  const publishTime = new Date(_.get(post, 'created_at'));

  const publishString = `${getMonthString(publishTime)} ${publishTime.getDate()} ${publishTime.getFullYear()}`;
  return (
    <CMSPageTemplate>
      <PageTitle title='State of The Raid' />
      <Box background='blackAlpha.800' padding='2rem 0'>
        <VStack>
          {_.get(post, 'heroImage') && <Image src={_.get(post, 'heroImage')} maxHeight='200' mb='2rem' />}
          <Box width='500px'>
            <Heading as='h1'>{_.get(post, 'postTitle')}</Heading>
            <Text>
              Published by {_.get(post, 'authorName')} | {publishString}
            </Text>
            <Text>{_.get(post, 'description')}</Text>
            <Box height='3rem' />
            <Box width='100%' height='1px' backgroundColor='white' />
            <Box height='3rem' />
            <Markdown>{_.get(post, 'content.body')}</Markdown>
          </Box>
        </VStack>
        <HStack m='12rem 2rem' justify='space-between'>
          <Image src='/assets/illustrations/LeftWing.svg' width='30vw' />
          <Image src='/assets/illustrations/Swords.svg' />
          <Image src='/assets/illustrations/RightWing.svg' width='30vw' />
        </HStack>
      </Box>
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
      initialData: _.get(result, 'blogs[0]'),
    },
  };
};

export default PostPage;
