// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules')(['@raidguild/design-system']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET' },
        ],
      },
      // {
      //   source: '/:path*',
      //   headers: [
      //     { key: 'Access-Control-Allow-Origin', value: 'https://raidguild.org' },
      //     { key: 'Access-Control-Allow-Methods', value: 'GET' },
      //   ],
      // },
    ];
  },
  webpack: (config) => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

module.exports = withTM(nextConfig);
