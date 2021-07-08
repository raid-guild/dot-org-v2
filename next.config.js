module.exports = {
  async redirects() {
    return [
      {
        source: '/portfolio',
        destination: 'https://portfolio.raidguild.org',
        permanent: true
      }
    ];
  }
};
