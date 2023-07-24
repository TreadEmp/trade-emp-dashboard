const withCSS = require("@zeit/next-css");
module.exports = withCSS();

const mongoUrl = process.env.PROD_DB;
const mongoDevUrl = process.env.DEV_DB;
const remoteBaseUrl =process.env.REMOTE_BASE_URL;
const localBaseUrl = process.env.LOCAL_BASE_URL;

module.exports = {
  distDir: ".next",
  reactStrictMode: true,
  images: {
    domains: [
      `${process.env.S3_UPLOAD_BUCKET}.s3.amazonaws.com`,
      `${process.env.S3_UPLOAD_BUCKET}.s3.${process.env.S3_UPLOAD_REGION}.amazonaws.com`,
    ],
  },
  env: {
    MONGO_URL: process.env.NODE_ENV === "development" ? mongoDevUrl : mongoUrl,
    NEXT_PUBLIC_SERVER_BASE_URL:
      process.env.NODE_ENV === "development" ? localBaseUrl : remoteBaseUrl,
    AUTH_API_PORT: process.env.AUTH_PORT,
    BASE_API_PORT: process.env.BASE_PORT,
    MAPBOX_TOKEN: process.env.MAPBOX_SECRET_TOKEN
  },

  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};