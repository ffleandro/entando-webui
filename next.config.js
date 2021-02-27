module.exports = {
  serverRuntimeConfig: {
    PORTALUI_ADDR: process.env.PORTALUI_ADDR || 'http://localhost:8088',
  },
  async rewrites() {
    return [
      {
        source: '/entando-de-app/cmsresources/:path*',
        destination: `${process.env.PORTALUI_ADDR || 'http://localhost:8088'}/entando-de-app/cmsresources/:path*`,
      },
    ];
  },
};
