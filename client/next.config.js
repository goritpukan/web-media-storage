const imageUrl = process.env.IMAGE_URL;

if (!imageUrl) {
  throw new Error('Image URL is missing');
}

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media-storage-kpi.s3.amazonaws.com',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
