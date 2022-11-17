import {
  Box,
  HStack,
  VStack,
  Image,
  Link,
  Button,
  Text,
} from "@chakra-ui/react";
import { theme } from "../../themes/theme";
import { useRouter } from "next/router";

export default function Nav(props) {
  const router = useRouter();
  const path = router.asPath.substring(0, 9);
  let currentPage;
  switch (path) {
    case path.includes("services"):
      currentPage = "services";
      break;
    case path.includes("portfolio"):
      currentPage = "portfolio";
      break;
    default:
      break;
  }

  return (
    <>
        <HStack
          sx={{
            width: `80vw`,
            maxWidth: `1140px`,
            margin: `0 auto`,
            justifyContent: `space-between`,
            fontFamily: `spaceMono`,
            
          }}
        >
          <Image
            src="/assets/logos/raidguild.webp"
            sx={{ maxHeight: `32px` }}
          />
          <HStack sx={{ fontSize: "1rem", color: "red", gap: `3rem` }}>
            <CustomLink isCurrentPage={path.includes("services")}>
              Services
            </CustomLink>
            <CustomLink isCurrentPage={path.includes("portfolio")}>
              Portfolio
            </CustomLink>
            <CustomLink>Join</CustomLink>
            <Button>Hire Us</Button>
          </HStack>
        </HStack>
    </>
  );
}

const CustomLink = (props) => {
  const isCurrentPage = props?.isCurrentPage;
  const target = props?.href;
  const style = {
    background: isCurrentPage
      ? `linear-gradient(96.18deg, #FF3864 -44.29%, #8B1DBA 53.18%, #4353DF 150.65%)`
      : `none`,
    backgroundClip: isCurrentPage ? `text` : `none`,
  };
  return (
    <Link href={target} _hover={{ textDecoration: `none` }}>
      <Text sx={style}>{props.children}</Text>
      {isCurrentPage && (
        <Box
          sx={{
            width: `100%`,
            background: `linear-gradient(96.18deg, #FF3864 -44.29%, #8B1DBA 53.18%, #4353DF 150.65%)`,
            height: `2px`,
          }}
        ></Box>
      )}
    </Link>
  );
};
