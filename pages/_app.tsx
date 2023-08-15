/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import {
  ChakraProvider,
  ColorModeScript,
  Fonts,
  defaultTheme,
  // RGThemeProvider,
  useToast,
} from '@raidguild/design-system';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { WagmiConfig } from 'wagmi';
import { AppContextProvider } from '../context/appState';
import SEO from '../next-seo.config';
import { chains } from '../utils/chains';
import { wagmiClient } from '../utils/wagmiClient';

export default function App({ Component, pageProps }: AppProps) {
  const toast = useToast();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchInterval: 120 * 1000,
        refetchOnWindowFocus: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        toast.success({
          title: 'Something went wrong.',
          description: `Please try again: ${error}`,
        });
      },
    }),
  });

  return (
    <ChakraProvider theme={defaultTheme}>
      <Analytics />
      <ColorModeScript initialColorMode='dark' />
      <Fonts />
      <DefaultSeo {...SEO} />
      <WagmiConfig config={wagmiClient}>
        <SessionProvider refetchInterval={120} session={pageProps.session}>
          <RainbowKitSiweNextAuthProvider>
            <RainbowKitProvider chains={chains} theme={darkTheme()}>
              <QueryClientProvider client={queryClient}>
                <AppContextProvider>
                  <Component {...pageProps} />
                  <ReactQueryDevtools initialIsOpen={false} />
                </AppContextProvider>
              </QueryClientProvider>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </SessionProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}
