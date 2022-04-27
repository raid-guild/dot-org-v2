import Script from 'next/script';
import { Layout } from '../shared/Layout';

import Router from 'next/router';
import nProgress from 'nprogress';

import '../globals.css';
import '../nprogress.css';

Router.events.on('routeChangeStart', () => nProgress.start());
Router.events.on('routeChangeComplete', () => nProgress.done());
Router.events.on('routeChangeError', () => nProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script src='/sw.js' strategy='beforeInteractive' />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
