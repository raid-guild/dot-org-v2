import {
  Box,
  Image,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Heading,
  Text,
  HStack,
  Button,
  defaultTheme,
} from '@raidguild/design-system';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

import Nav from '../page-components/Nav';
import Footer from '../page-components/Footer';
import PageTitle from '../page-components/PageTitle';

import Castle from '../../assets/illustrations/castle.svg';
import Clouds from '../../assets/illustrations/clouds.webp';
import WallSconce from '../../assets/illustrations/wallSconce.svg';
import Valhalla from '../../assets/illustrations/valhalla.svg';
import Wand from '../../assets/illustrations/wand.svg';

type Props = {
  pageTitle: string;
  pageDescription: string;
  salesContent: string;
  roleImage: string;
  children: React.ReactNode;
};

const ServicePageTemplate = ({ pageTitle, pageDescription, salesContent, roleImage, children, ...props }: Props) => {
  return (
    <Box background='linear-gradient(102.93deg, #2B0000 0%, #3D0610 29.17%, #5A1049 61.98%, #461881 100%)'>
      <Box minHeight='3rem' />
      <Nav />
      <Box minHeight='6rem' />

      <Box
        sx={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: `space-between`,
          maxWidth: `1440px`,
          width: `80vw`,
          margin: `0 auto`,
          gap: `3rem`,
        }}>
        {/* Breadcrumbs & Main Content */}
        <Box
          sx={{
            display: `flex`,
            flexDir: `column`,
            gap: `1rem`,
            width: `100%`,
          }}>
          <Breadcrumb sx={{ color: `red` }}>
            <BreadcrumbItem>
              <BreadcrumbLink href='/services'>Services</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href='path'>{pageTitle}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Box
            sx={{
              backgroundColor: `blackDark`,
              width: `100%`,
              minHeight: `20px`,
              border: `1px solid red`,
              borderColor: `red`,
              display: `flex`,
              flexDir: `column`,
              alignItems: `center`,
              padding: `4rem`,
              gap: `2rem`,
              zIndex: `2`,
              borderRadius: `2px`,
            }}>
            <HStack>
              <Image src={WallSconce.src} sx={{ height: `50px` }} />
              <Heading
                sx={{
                  color: `#fffffe`,
                  fontFamily: `uncial`,
                  textShadow: `0px 0px 8px #FF3864`,
                  fontSize: `1.5rem`,
                }}>
                {pageTitle}
              </Heading>
            </HStack>
            <Text
              sx={{
                color: `white`,
                fontFamily: `texturina`,
                textAlign: `justify`,
                maxWidth: `50ch`,
                margin: `0 auto`,
                fontSize: `1rem`,
                lineHeight: `206%`,
              }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{pageDescription}</ReactMarkdown>
            </Text>
          </Box>
          <Image
            src={roleImage}
            sx={{
              height: `48px`,
              width: `48px`,
              position: `relative`,
              left: `50%`,
              transform: `translateX(-50%) translateY(-80%)`,
              zIndex: `2`,
            }}
          />
        </Box>
        {/* Castle Image */}
        <Box sx={{ width: `100%` }}>
          <Image
            src={Castle.src}
            sx={{
              width: `80vw`,
              position: `absolute`,
              transform: `translateY(-35%) translateX(-40%)`,
              zIndex: `1`,
            }}
          />
        </Box>
      </Box>
      <Box minHeight='6rem' />
      {/* Our Approach */}
      <Box
        sx={{
          overflow: `hidden`,
          backgroundImage: Clouds.src,
          backgroundColor: `#0A0303`,
          backgroundPosition: `center`,
          backgroundSize: `cover`,
          backgroundRepeat: `no-repeat`,
          width: `100vw`,
          position: `relative`,
          display: `flex`,
          flexDir: `column`,
          justifyContent: `center`,
          zIndex: `3`,
        }}>
        <HStack sx={{ width: `80vw`, maxWidth: `1140px`, margin: `4rem auto` }}>
          <Box sx={{ width: `100%` }}>
            <Image
              src={Valhalla.src}
              sx={{
                width: `50vw`,
                position: `absolute`,
                transform: `translateY(-50%) translateX(-50%)`,
                zIndex: `1`,
              }}
            />
          </Box>
          <Box
            sx={{
              backgroundColor: `blackDark`,
              width: `100%`,
              minHeight: `20px`,
              border: `1px solid red`,
              borderColor: `red`,
              display: `flex`,
              flexDir: `column`,
              alignItems: `center`,
              padding: `4rem`,
              gap: `2rem`,
              zIndex: `2`,
              borderRadius: `2px`,
            }}>
            <HStack>
              <Image src={Wand.src} sx={{ height: `50px` }} />
              <Heading
                sx={{
                  color: `#fffffe`,
                  fontFamily: `uncial`,
                  textShadow: `0px 0px 8px #FF3864`,
                  fontSize: `1.5rem`,
                }}>
                Our Approach
              </Heading>
            </HStack>
            <Text
              sx={{
                color: `white`,
                fontFamily: `texturina`,
                textAlign: `justify`,
                maxWidth: `75ch`,
                margin: `0 auto`,
                fontSize: `1rem`,
                lineHeight: `206%`,
              }}>
              <ReactMarkdown components={ChakraUIRenderer(defaultTheme)} remarkPlugins={[remarkGfm]}>
                {salesContent}
              </ReactMarkdown>
            </Text>
            <Box sx={{ display: `flex`, flexDirection: `row`, gap: `20px` }}>
              <Button>Hire Us</Button>
              <Button variant='outline'>Join Us</Button>
            </Box>
          </Box>
        </HStack>
      </Box>
      <Box
        sx={{
          minHeight: `100vh`,
          width: `100vw`,
          position: `relative`,
          zIndex: `4`,
          backgroundColor: `black`,
        }}>
        <PageTitle title='Shipped Products' />
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default ServicePageTemplate;
