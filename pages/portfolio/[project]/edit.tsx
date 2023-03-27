import _ from 'lodash';
import { GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import { getPortfolioDetail, getPortfolioList } from '../../../gql';
import PortfolioForm from '../../../components/forms/PortfolioForm';
import CMSPageTemplate from '../../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../../components/page-components/PageTitle';
import usePortfolioDetail from '../../../hooks/usePortfolioDetail';

interface Props {
  slug: string;
  initialData: any;
}

const PortfolioPage = ({ slug, initialData }: Props) => {
  const { data: session } = useSession();
  const token = _.get(session, 'token') || '';

  const { data: projectData } = usePortfolioDetail({ slug, initialData, token });

  return (
    <CMSPageTemplate>
      <PageTitle title='Edit Shipped Project' />
      <PortfolioForm isEditable slug={slug} initialData={projectData} />
    </CMSPageTemplate>
  );
};

// export async function getStaticPaths() {
//   const portfolios = await getPortfolioList();

//   const paths = portfolios.map((portfolio: any) => ({
//     params: { project: portfolio.slug },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  let slug = _.get(context, 'params.project');
  if (_.isArray(slug)) slug = _.first(slug);
  if (!slug) {
    return {
      props: {},
    };
  }
  const result = await getPortfolioDetail(slug);

  return {
    props: {
      slug,
      initialData: result || null,
    },
  };
};

export default PortfolioPage;
