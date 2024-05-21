module.exports = {
  trailingSlash: true,
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://cl.imagineapi.dev/assets/:path*',
      },
      {
        source: '/api/proxy/newImage/:path*',
        destination: 'https://oaidalleapiprodscus.blob.core.windows.net/private/:path*',
      },
    ];
  },
};
