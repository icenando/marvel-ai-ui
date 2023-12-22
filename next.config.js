/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dall-e-images-bucket.s3.eu-west-2.amazonaws.com",
        port: "",
        pathname: "/events/**",
      },
    ],
  },
};

module.exports = nextConfig;
