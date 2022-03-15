import Head from 'next/head';

export const Meta = () => {
  return (
    <Head>
      <title>RaidGuild</title>
      <meta
        name='description'
        content='A Decentralized Collective of Mercenaries Ready to Slay Your Web3
            Product Demons'
      />
      <link rel='icon' href='/favicon.ico' />
      <link
        rel='stylesheet'
        href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css'
        integrity='sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=='
        crossorigin='anonymous'
      />
      <script
        src='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/js/all.min.js'
        integrity='sha512-YSdqvJoZr83hj76AIVdOcvLWYMWzy6sJyIMic2aQz5kh2bPTd9dzY3NtdeEAzPp/PhgZqr4aJObB3ym/vsItMg=='
        crossorigin='anonymous'
      ></script>
    </Head>
  );
};
