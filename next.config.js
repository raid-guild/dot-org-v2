/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')(['@raidguild/design-system']);

module.exports = withTM({
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
});
