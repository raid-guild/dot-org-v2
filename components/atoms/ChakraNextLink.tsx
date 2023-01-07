/* eslint-disable react/jsx-props-no-spreading */
import { Link as ChakraLink } from '@raidguild/design-system';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

interface Props {
  href: string;
  isExternal?: boolean; // TODO remove with props
  w?: string; // TODO remove with props
  children: React.ReactNode;
} // & ChakraLinkProps & NextLinkProps;

const ChakraNextLink = ({ href, children, ...props }: Props) => (
  <NextLink href={href} passHref>
    <ChakraLink {...props}>{children}</ChakraLink>
  </NextLink>
);

export default ChakraNextLink;
