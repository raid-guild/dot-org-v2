import { Flex, Grid } from '@raidguild/design-system';
import _ from 'lodash';
import { GetStaticPropsContext } from 'next';
import { NextSeo } from 'next-seo';
import ProjectCard from '../../../components/page-components/ProjectCard';
import ServicePageTemplate from '../../../components/page-templates/ServicePageTemplate';
import services from '../../../utils/services';

type Props = {
  title: string;
  description: string;
  roleImage: string;
  salesContent: string;
  data?: any;
  meta: {
    title: string;
    description: string;
  };
};

const Service = ({ title, description, roleImage, salesContent, data, meta }: Props) => {
  return (
    <ServicePageTemplate
      pageTitle={title}
      pageDescription={description}
      roleImage={roleImage}
      salesContent={salesContent}>
      <NextSeo
        title={meta?.title}
        description={meta?.description}
        openGraph={{
          title: meta?.title,
          description: meta?.description,
        }}
      />
      <Flex direction='column'>
        {!_.isEmpty(data) && (
          <Grid gridTemplateColumns='1fr 1fr 1fr'>
            {_.map(data, (item) => (
              <ProjectCard name={item.name} logo={item.logo} website={item.website} key={item.id} />
            ))}
          </Grid>
        )}
      </Flex>
    </ServicePageTemplate>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const serviceSlug = _.get(context, 'params.service', '') as string;
  const copy = _.find(services, { slug: serviceSlug }) || {};

  return {
    props: {
      title: _.get(copy, 'title', ''),
      description: _.get(copy, 'description', ''),
      roleImage: _.get(copy, 'roleImage', ''),
      salesContent: _.get(copy, 'salesContent', ''),
      meta: _.get(copy, 'meta', {}),
      data: null,
    },
    // revalidate: 60,
  };
};

export default Service;

// If using dynamic routes, add getStaticPaths here
export const getStaticPaths = async () => {
  const paths = _.map(services, (service) => ({
    params: { service: service.slug },
  }));

  return { paths, fallback: 'blocking' };
};
