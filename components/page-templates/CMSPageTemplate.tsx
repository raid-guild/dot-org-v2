import { Box } from '@raidguild/design-system';
import Nav from '../page-components/Nav';
import Footer from '../page-components/Footer';

type Props = {
  children: React.ReactNode;
};

const CMSPageTemplate = ({ children }: Props) => (
  <>
    <Box bgGradient='linear(to-l, #2B0000 0%, #3D0610 29.17%, #5A1049 61.98%, #461881 100%)' padding='2rem'>
      <Nav />
    </Box>
    <Box background='blackDark'>{children}</Box>
    <Footer />
  </>
);

export default CMSPageTemplate;
