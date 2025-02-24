/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true, // Required for static export
        domains: ['www.tasteofhome.com', 'res.cloudinary.com', 'cdn.svgator.com', 'i.pinimg.com', 'supershopping.lk','icon-library.com', 'c.tenor.com', 'github.com'],
    },
};

export default nextConfig;