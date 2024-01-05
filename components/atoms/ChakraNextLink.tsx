/* eslint-disable react/jsx-props-no-spreading */
import {
  Link as ChakraLink,
  // ChakraLinkProps
  ChakraLinkProps,
} from '@raidguild/design-system';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

// interface CustomProps {
//   // href: string;
//   // children: React.ReactNode;
// }

type Props = ChakraLinkProps & NextLinkProps;

const ChakraNextLink = ({ href, children, ...props }: Props) => (
  <ChakraLink as={NextLink} href={href} {...props} fontFamily='monospace' fontWeight='medium'>
    {children}
  </ChakraLink>
);

export default ChakraNextLink;
