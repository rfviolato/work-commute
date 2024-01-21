/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => {
    return [
      {
        source: "/",
        destination: "/today",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
