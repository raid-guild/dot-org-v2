import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { Heading, Text } from '@raidguild/design-system';

const newTheme = {
  p: (props: any) => {
    const { children } = props;
    return (
      <Text color='white' mb={12} lineHeight={1.8}>
        {children}
      </Text>
    );
  },
  em: (props: any) => {
    const { children } = props;
    return (
      <Text as='em' color='white'>
        {children}
      </Text>
    );
  },
  strong: (props: any) => {
    const { children } = props;
    return (
      <Text as='b' color='white'>
        {children}
      </Text>
    );
  },
  h2: (props: any) => {
    const { children } = props;
    return <Heading size='md'>{children}</Heading>;
  },
  blockquote: (props: any) => {
    const { children } = props;
    return (
      <Text color='white' bg='whiteAlpha.100' as='i' p={3}>
        {children}
      </Text>
    );
  },
};

type MarkdownProps = {
  children: string;
};

const Markdown = ({ children }: MarkdownProps) => (
  <ReactMarkdown components={ChakraUIRenderer(newTheme)} remarkPlugins={[remarkGfm]} skipHtml>
    {children}
  </ReactMarkdown>
);

export default Markdown;
