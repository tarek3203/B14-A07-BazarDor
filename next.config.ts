import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // the mongodb driver has to load from node_modules, not through the bundler.
  // bundled it breaks the tls handshake and the topology closes on first use.
  serverExternalPackages: ["mongodb"],
  images: {
    remotePatterns: [
      // avatars that come back from the google and github sign in
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
