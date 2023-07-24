import { getToken } from "../utils/auth";
import { useRouter } from "next/router";
import Axios from "../utils/axios";

const Auth = () => {
  const router = useRouter();
  const token = getToken("accessToken");
  if (!token) {
    router.push("/login");
  } else {
    const url = `/auth/token-validity`;
    const method = "POST";
    Axios({
      url,
      method,
    })
      .then((resp) => {
        if (resp.error) {
          let refreshToken = getToken("refreshToken");
          if (!refreshToken) {
            router.push("/login");
          } else {
            const url = `/auth/refresh-token`;
            const method = "POST";
            Axios({
              url,
              method,
            })
              .then((resp) => {
                localStorage.setItem("accessToken", resp.accessToken);
              })
              .catch((e) => {
                console.error(e);
              });
          }
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }
};

export default Auth;

