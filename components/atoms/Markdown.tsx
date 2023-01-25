import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { defaultTheme } from '@raidguild/design-system';

type MarkdownProps = {
  children: string;
};

const Markdown = ({ children }: MarkdownProps) => (
  <ReactMarkdown components={ChakraUIRenderer(defaultTheme)} remarkPlugins={[remarkGfm]}>
    {children}
  </ReactMarkdown>
);

export default Markdown;
