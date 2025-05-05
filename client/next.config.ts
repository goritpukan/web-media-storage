import type { NextConfig } from "next";

const imageUrl = process.env.IMAGE_URL;
if(!imageUrl) throw new Error("Image URL is missing");
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: imageUrl,
    }],
  }
};

export default nextConfig;
