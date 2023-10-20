/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { Analytics } from '@vercel/analytics/react';
import * as Fathom from 'fathom-client';
import { WagmiConfig } from 'wagmi';
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import {
  // RGThemeProvider,
  useToast,
  ChakraProvider,
  defaultTheme,
  ColorModeScript,
  Fonts,
} from '@raidguild/design-system';
import { useEffect } from 'react';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import SEO from '../next-seo.config';
import { chains } from '../utils/chains';
import { wagmiClient } from '../utils/wagmiClient';
import { AppContextProvider } from '../context/appState';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
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

  useEffect(() => {
    Fathom.load('ASGWDEGI', {
      includedDomains: ['www.raidguild.org', 'raidguild.org'],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);

  return (
    <ChakraProvider theme={defaultTheme}>
      <Analytics />
      <ColorModeScript initialColorMode='dark' />
      <Fonts />
      <DefaultSeo {...SEO} />
      <WagmiConfig client={wagmiClient}>
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
