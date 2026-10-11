/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http",  hostname: "localhost",                    port: "8000" },
      { protocol: "https", hostname: "bnmemorials.pythonanywhere.com" },
      { protocol: "https", hostname: "kidbawp.codebasket.xyz" },
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  experimental: {
    optimizePackageImports: ["antd", "react-icons", "swiper"],
  },
};

export default nextConfig;
