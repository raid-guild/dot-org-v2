import { Box } from '@raidguild/design-system';
import SiteLayout from '../page-components/SiteLayout';

type Props = {
  children: React.ReactNode;
};

const CMSPageTemplate = ({ children }: Props) => (
  <SiteLayout>
    <Box background='blackDark' textColor='white'>
      {children}
    </Box>
  </SiteLayout>
);

export default CMSPageTemplate;
