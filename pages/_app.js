import Script from 'next/script';
import { Layout } from '../shared/Layout';

import '../globals.css';

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
