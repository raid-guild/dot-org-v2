import { Heading, Text } from '@raidguild/design-system';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const newTheme = {
  p: (props: any) => {
    const { children } = props;
    return (
      <Text color='white' mb={3} lineHeight={1.4}>
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
  h1: ({ children }: any) => <Heading size='lg'>{children}</Heading>,
  h2: ({ children }: any) => <Heading size='md'>{children}</Heading>,
  h3: ({ children }: any) => <Heading size='md'>{children}</Heading>,
  h4: ({ children }: any) => <Heading size='sm'>{children}</Heading>,
  h5: ({ children }: any) => <Heading size='sm'>{children}</Heading>,
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
