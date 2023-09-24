/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')();

module.exports = withTM({
  experimental: {
    modern: true,
    asset: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
