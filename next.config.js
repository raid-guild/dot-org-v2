module.exports = {
  transpilePackages: ['@raidguild/design-system'],
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
