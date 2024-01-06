import { Flex, Grid } from '@raidguild/design-system';
import _ from 'lodash';
import { GetServerSidePropsContext } from 'next';

import Head from 'next/head';
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
      <Head>
        <title>{meta?.title}</title>
        <meta name='description' content={meta?.description} />
        <meta name='og:title' content={meta?.title} />
        <meta name='og:description' content={meta?.description} />
      </Head>
      <Flex direction='column'>
        {data?.length > 0 && (
          <Grid gridTemplateColumns='1fr 1fr 1fr'>
            {data.map((item: any) => {
              return <ProjectCard name={item.name} logo={item.logo} website={item.website} key={item.id} />;
            })}
          </Grid>
        )}
      </Flex>
    </ServicePageTemplate>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { params } = context;
  const service = _.isArray(_.get(params, 'service')) ? _.first(_.get(params, 'service')) : _.get(params, 'service');
  console.log(service);
  let copy = null;

  if (service && !_.isEmpty(service)) {
    copy = _.find(_.flatMapDeep(services, (value) => (value.slug === service ? value : [])));
  }

  return {
    props: {
      title: _.get(copy, 'title', ''),
      description: _.get(copy, 'description', ''),
      roleImage: _.get(copy, 'roleImage', ''),
      salesContent: _.get(copy, 'salesContent', ''),
      meta: _.get(copy, 'meta'),
      data: null,
    },
  };
};

export default Service;
