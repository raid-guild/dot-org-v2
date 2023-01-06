import { Box } from '@raidguild/design-system';
import _ from 'lodash';
import { GetServerSideProps } from 'next';

import ServicePageTemplate from '../../components/page-templates/ServicePageTemplate';
import ProjectCard from '../../components/page-components/ProjectCard';
import services from '../../utils/services';

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
      <Box sx={{ display: `flex`, flexDirection: `column` }}>
        {data?.length > 0 && (
          <Box sx={{ display: `grid`, gridTemplateColumns: `1fr 1fr 1fr` }}>
            {data.map((item: any) => {
              return <ProjectCard project={item} key={item.id} />;
            })}
          </Box>
        )}
      </Box>
    </ServicePageTemplate>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { params } = context;
  const service = _.isArray(_.get(params, 'service')) ? _.first(_.get(params, 'service')) : _.get(params, 'service');
  // TODO get mapping for where statement
  // TODO query API for service lookup
  // TODO return data
  let copy = null;
  if (service && !_.includes(_.keys(services), service)) {
    copy = _.get(services, service);
  }

  // let response = await supabase
  //   .from('PortfolioContent')
  //   .select('*')
  //   .in('relevant_services', [{ tag: 'Back End' }])
  //   .range(0, 2);

  // if (response.data == null) {
  //   response = await supabase.from('PortfolioContent').select('*').range(0, 2);
  // }

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
