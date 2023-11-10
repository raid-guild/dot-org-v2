import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { Text } from '@raidguild/design-system';

const newTheme = {
  p: (props:any) => {
    const { children } = props;
    return <Text color='white'>{children}</Text>;
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
