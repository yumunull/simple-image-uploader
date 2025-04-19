import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "simple-image-uploader-8f918b7dc2bcadffcb44222be7ea7da0.s3.ap-southeast-2.amazonaws.com",
                pathname: "/**"
            }
        ]
    }
};

export default nextConfig;
