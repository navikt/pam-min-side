/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  default-src 'self';
  img-src 'self' data: arbeidsplassen.nav.no;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.nav.no;
  worker-src 'self' blob:;
  style-src 'self' 'unsafe-inline' nav.no;
  font-src 'self' nav.no;
  frame-src 'self' video.qbrick.com;
  connect-src 'self' amplitude.nav.no umami.nav.no;
`;

const securityHeaders = [
    {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
    },
    {
        key: "Content-Security-Policy",
        value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
    },
];

const nextConfig = {
    basePath: "/min-side",
    async headers() {
        return [
            {
                source: "/:path*",
                headers: securityHeaders,
            },
        ];
    },
};

module.exports = nextConfig;
