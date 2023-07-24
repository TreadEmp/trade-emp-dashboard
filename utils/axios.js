import Axios from "axios";
import { setAccessToken } from "./auth";

import { getToken } from "./cookie";
Axios.defaults.headers.common["Authorization"] = `${getToken("token")}`;

const authDefaultOptions = {
  baseURL:
    process.env.NEXT_PUBLIC_SERVER_BASE_URL +
    process.env.AUTH_API_PORT +
    "/v1/auth",
  headers: {
    "Content-Type": "application/json",
  },
};

const baseDefaultOptions = {
  baseURL:
    process.env.NEXT_PUBLIC_SERVER_BASE_URL +
    process.env.BASE_API_PORT +
    "/v1/trade-emp",
  headers: {
    "Content-Type": "application/json",
  },
};

let authInstance = Axios.create(authDefaultOptions);
let baseInstance = Axios.create(baseDefaultOptions);
const index = 0;
authInstance.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("access-token");
  const refreshToken = localStorage.getItem("refresh-token");
  config.headers["refresh-token"] = refreshToken ? `${refreshToken}` : "";
  config.headers["access-token"] = accessToken ? `${accessToken}` : "";
  return config;
});

baseInstance.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("access-token");
  const refreshToken = localStorage.getItem("refresh-token");
  config.headers["refresh-token"] = refreshToken ? `${refreshToken}` : "";
  config.headers["access-token"] = accessToken ? `${accessToken}` : "";
  return config;
});

authInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/auth/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 403 && !originalConfig._retry) {
        console.log("index : " + index);
        if (index <= 3) {
          originalConfig._retry = true;
          index++;
        } else {
          originalConfig._retry = false;
        }

        try {
          const refreshToken = localStorage.getItem("refresh-token");
          if (refreshToken) {
            const rs = await authInstance.post("/auth/refresh-token", {
              refreshToken: refreshToken,
            });
            const { accessToken } = rs.data;
            setAccessToken(accessToken);
          }

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

baseInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/auth/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 403 && !originalConfig._retry) {
        console.log("index : " + index);
        if (index <= 3) {
          originalConfig._retry = true;
          index++;
        } else {
          originalConfig._retry = false;
        }

        try {
          const refreshToken = localStorage.getItem("refresh-token");
          if (refreshToken) {
            const rs = await authInstance.post("/auth/refresh-token", {
              refreshToken: refreshToken,
            });
            const { accessToken } = rs.data;
            setAccessToken(accessToken);
          }

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default { authInstance, baseInstance };
