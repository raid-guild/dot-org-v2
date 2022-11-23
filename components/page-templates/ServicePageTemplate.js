import Nav from "../page-components/Nav";
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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Footer } from "../../shared/Footer";

import ButtonHireUs from "../atoms/ButtonHireUs";

export default function ServicePageTemplate(props) {
  const router = useRouter();
  const path = router.asPath;

  return (
    <>
      <Box
        sx={{
          background: `linear-gradient(102.93deg, #2B0000 0%, #3D0610 29.17%, #5A1049 61.98%, #461881 100%)`,
        }}
      >
        <Box sx={{ minHeight: `3rem` }}></Box>
        <Nav />
        <Box sx={{ minHeight: `6rem` }}></Box>

        <Box
          sx={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `space-between`,
            width: `80vw`,
            maxWidth: `1140px`,
            margin: `0 auto`,
            gap: `3rem`,
          }}
        >
          {/* Breadcrumbs & Main Content */}
          <Box
            sx={{
              display: `flex`,
              flexDir: `column`,
              gap: `1rem`,
              width: `100%`,
            }}
          >
            <Breadcrumb sx={{ color: `red` }}>
              <BreadcrumbItem>
                <BreadcrumbLink href="/services">Services</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="path">{props?.pageTitle}</BreadcrumbLink>
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
              }}
            >
              <HStack>
                <Image
                  src="/assets/illustrations/wallSconce.svg"
                  sx={{ height: `50px` }}
                />
                <Heading
                  sx={{
                    color: `#fffffe`,
                    fontFamily: `uncial`,
                    textShadow: `0px 0px 8px #FF3864`,
                    fontSize: `1.5rem`,
                  }}
                >
                  {props?.pageTitle}
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
                }}
              >
                <ReactMarkdown
                  children={props?.pageDescription}
                  remarkPlugins={[remarkGfm]}
                ></ReactMarkdown>
              </Text>
            </Box>
            <Image
              src={props?.roleImage}
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
              src="/assets/illustrations/castle.svg"
              sx={{
                width: `80vw`,
                position: `absolute`,
                transform: `translateY(-35%) translateX(-40%)`,
                zIndex: `1`,
              }}
            ></Image>
          </Box>
        </Box>
        <Box sx={{ minHeight: `6rem` }}></Box>
        {/* Our Approach */}
        <Box
          sx={{
            backgroundImage: `url(/assets/illustrations/clouds.webp)`,
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
          }}
        >
          <HStack
            sx={{ width: `80vw`, maxWidth: `1140px`, margin: `4rem auto` }}
          >
            <Box sx={{ width: `100%` }}>
              <Image
                src="/assets/illustrations/valhalla.svg"
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
              }}
            >
              <HStack>
                <Image
                  src="/assets/illustrations/wand.svg"
                  sx={{ height: `50px` }}
                />
                <Heading
                  sx={{
                    color: `#fffffe`,
                    fontFamily: `uncial`,
                    textShadow: `0px 0px 8px #FF3864`,
                    fontSize: `1.5rem`,
                  }}
                >
                  Our Approach
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
                }}
              >
                <ReactMarkdown
                  children={props?.salesContent}
                  remarkPlugins={[remarkGfm]}
                ></ReactMarkdown>
              </Text>
              <ButtonHireUs></ButtonHireUs>
            </Box>
          </HStack>
        </Box>
        <Box
          sx={{
            minHeight: `100vh`,
            width: `100vw`,
            position: `relative`,
            zIndex: `4`,
<<<<<<< HEAD
          }}
        ></Box>
=======
            backgroundColor: `black`,
          }}
        >
          {props.children}
        </Box>
>>>>>>> 49f67044963ec46f15ad8eb793a9a31d72cc22c2
        <Footer />
      </Box>
    </>
  );
}
