import Head from 'next/head';
import Script from 'next/script';

export const Meta = () => {
  return (
    <Head>
      <title>RaidGuild</title>
      <meta
        name='description'
        content='A Decentralized Collective of Mercenaries Ready to Slay Your Web3
            Product Demons'
      />

      <meta property='og:title' content='RaidGuild' />
      <meta
        property='og:description'
        content='A Decentralized Collective of Mercenaries Ready to Slay Your Web3
        Product Demons'
      />
      <meta
        property='og:image'
        content='https://res.cloudinary.com/saimano/image/upload/v1625726563/RaidGuild/illustrations/raid__cloud__castle_j8pe6f.png'
      />
      <meta property='og:url' content='https://raidguild.org' />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content='RaidGuild' />
      <meta
        name='twitter:description'
        content='A Decentralized Collective of Mercenaries Ready to Slay Your Web3
          Product Demons'
      />
      <meta
        name='twitter:image'
        content='https://res.cloudinary.com/saimano/image/upload/v1625726563/RaidGuild/illustrations/raid__cloud__castle_j8pe6f.png'
      />
      <meta property='og:type' content='website' />

      <link rel='icon' href='/favicon.ico' />

      <Script
        src='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/js/all.min.js'
        integrity='sha512-YSdqvJoZr83hj76AIVdOcvLWYMWzy6sJyIMic2aQz5kh2bPTd9dzY3NtdeEAzPp/PhgZqr4aJObB3ym/vsItMg=='
        crossorigin='anonymous'
        referrerpolicy='no-referrer'
        strategy='afterInteractive'
      ></Script>
    </Head>
  );
};
