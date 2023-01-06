import { Box, Heading, Text, VStack, Image, Button, HStack } from '@raidguild/design-system';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import _ from 'lodash';
import { GetServerSidePropsContext } from 'next';

import CMSPageTemplate from '../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../components/page-components/PageTitle';
import ProjectCard from '../../components/page-components/ProjectCard';

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
      <Box sx={{ background: `blackDark`, padding: `2rem 0`, fontFamily: `texturina`, color: `white` }}>
        <VStack>
          {_.get(post, 'heroImage') && (
            <Image src={_.get(post, 'heroImage')} sx={{ maxHeight: `200`, marginBottom: `2rem` }} />
          )}
          <Box sx={{ width: `500px` }}>
            <Heading as='h1' sx={{ fontFamily: `uncial`, color: `white` }}>
              {_.get(post, 'postTitle')}
            </Heading>
            <Text>
              Published by {_.get(post, 'authorName')} | {publishString}
            </Text>
            <Text>{_.get(post, 'description')}</Text>
            <Box height='3rem' />
            <Box width='100%' height='1px' backgroundColor='white' />
            <Box height='3rem' />
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{_.get(post, 'content.body')}</ReactMarkdown>
          </Box>
        </VStack>
        <HStack sx={{ margin: `12rem 2rem`, justifyContent: `space-between` }}>
          <Image src='/assets/illustrations/LeftWing.svg' sx={{ width: `30vw` }} />
          <Image src='/assets/illustrations/Swords.svg' />
          <Image src='/assets/illustrations/RightWing.svg' sx={{ width: `30vw` }} />
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

// This function gets called at build time
export const getStaticProps = async (context: GetServerSidePropsContext) => {
  // const post = params.params.post;
  // // Call an external API endpoint to get posts
  // const res = await supabase.from('BlogContent').select('*').eq('post_title', post);

  return {
    props: {
      post: null,
    },
  };
};

export default PostPage;
