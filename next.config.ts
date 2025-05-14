import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    domains: ["static.weg.net", "www.atlascopco.com"], // adicione aqui os domínios permitidos
  },
};

export default nextConfig;
