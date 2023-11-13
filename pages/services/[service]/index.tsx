import { Grid, Flex } from '@raidguild/design-system';
import _ from 'lodash';
import { GetServerSidePropsContext } from 'next';
import tokens from '../../../utils/extendedTokens';
import ServicePageTemplate from '../../../components/page-templates/ServicePageTemplate';
import ProjectCard from '../../../components/page-components/ProjectCard';
import services from '../../../utils/services';

type Props = {
  title: string;
  description: string;
  roleImage: string;
  salesContent: string;
  data?: any;
};

const Service = ({ title, description, roleImage, salesContent, data }: Props) => {
  return (
    <ServicePageTemplate
      pageTitle={title}
      pageDescription={description}
      roleImage={roleImage}
      salesContent={salesContent}>
      <Flex direction='column'>
        {data?.length > 0 && (
          <Grid gridTemplateColumns='1fr 1fr 1fr'>
            {data.map((item: any) => {
              return <ProjectCard project={item} key={item.id} />;
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
  let copy = null;
  if (service && _.includes(_.keys(services), service)) {
    copy = _.get(services, service);
  }

  return {
    props: {
      title: _.get(copy, 'title', ''),
      description: _.get(copy, 'description', ''),
      roleImage: _.get(copy, 'roleImage', ''),
      salesContent: _.get(copy, 'salesContent', ''),

      data: null,
    },
  };
};

export default Service;
