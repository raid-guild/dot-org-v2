import _ from 'lodash';
import { GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import { getBlogDetail } from '../../../gql';
import BlogForm from '../../../components/forms/BlogForm';
import CMSPageTemplate from '../../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../../components/page-components/PageTitle';
import useBlogsDetail from '../../../hooks/useBlogsDetail';

interface Props {
  slug: string;
  initialData: any;
}

const EditPost = ({ slug, initialData }: Props) => {
  const { data: session } = useSession();
  const token = _.get(session, 'token') ?? '';

  const { data: blogData } = useBlogsDetail({ slug, initialData, token });

  return (
    <CMSPageTemplate>
      <PageTitle title='Edit Published Blog' />
      <BlogForm isEditable slug={slug} initialData={blogData} />
    </CMSPageTemplate>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  let slug = _.get(context, 'params.post');
  if (_.isArray(slug)) slug = _.first(slug);
  if (!slug) {
    return {
      props: {},
    };
  }
  const result = await getBlogDetail(slug);

  return {
    props: {
      slug,
      initialData: result || null,
    },
  };
};

export default EditPost;
