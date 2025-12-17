import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/products/financing',
                destination: '/finance',
                permanent: true,
            },
            {
                source: '/products/cards',
                destination: '/cards',
                permanent: true,
            },
        ]
    },
    experimental: {
        turbopack: {
            root: path.join(__dirname, '..'),
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
            },
        ],
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
    },
    // Performance optimizations
    compress: true,
    poweredByHeader: false,
    reactStrictMode: true,
};

export default nextConfig;
