// next.config.ts

import { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'export',
    distDir: './dist',
    images: { unoptimized: true },
};

export default nextConfig;
