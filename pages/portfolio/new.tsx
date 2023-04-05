import CMSPageTemplate from '../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../components/page-components/PageTitle';
import PortfolioForm from '../../components/forms/PortfolioForm';

const ShippingStation = () => {
  return (
    <CMSPageTemplate>
      <PageTitle title='Create Shipped Product' />
      <PortfolioForm />
    </CMSPageTemplate>
  );
};

export default ShippingStation;
