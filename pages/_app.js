import "tailwindcss/tailwind.css";
import "../styles/index.css";
import "../styles/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ProgressBar from "@badrap/bar-of-progress";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { setAccessToken, getToken } from "../utils/auth";

import Admin from "../layouts/Admin";
import Login from "../pages/login";

const layouts = {
  Login: Login,
  Admin: Admin,
};

// export function chnValidity() {
//   const router = useRouter();
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await Axios({
//           //
//           url: `/auth/token-validity`,
//           method: "POST",
//         });
//         if (!res.data.isValid) {
//           const res2 = await Axios({
//             url: `/auth/refresh-token`,
//             method: "POST",
//           });
//           if (res2.data.error) {
//             router.push(`/login`);
//           } else {
//             setAccessToken(es2.data.accessToken);
//           }
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);
// }

// export function checkTokenValidity() {
//   const router = useRouter();
//   useEffect(() => {
//     Axios({ url: `/auth/token-validity`, method: "POST" })
//       .then((res) => {
//         if (!res.data.isValid) {
//           Axios({
//             url: `/auth/refresh-token`,
//             method: "POST",
//           })
//             .then((res) => {
//               if (res.data.error) {
//                 router.push(`/login`);
//               } else {
//                 setAccessToken(res.data.accessToken);
//               }
//             })
//             .catch((e) => {
//               console.error(e);
//               alert(e.message);
//               router.push(`/login`);
//             });
//         }
//       })
//       .catch((e) => {
//         console.error(e);
//         alert(e.message);
//         Axios({
//           url: `/auth/refresh-token`,
//           method: "POST",
//         })
//           .then((res) => {
//             if (res.data.error) {
//               router.push(`/login`);
//             } else {
//               setAccessToken(res.data.accessToken);
//             }
//           })
//           .catch((e) => {});
//       });
//   }, []);
// }

function MyApp({ Component, pageProps }) {
  const accessToken = getToken("access-token");
  const router = useRouter();
  const [loading, handleLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const PageLayout = accessToken ? layouts[Component?.layout] || Admin : Login;
  // checkTokenValidity();
  useEffect(() => {
    const progress = new ProgressBar({
      size: 3,
      color: "#6a7dca",
      className: "bar-of-progress",
      delay: 10,
    });

    router.events.on("routeChangeStart", () => {
      progress.start, handleLoading(true);
    });
    router.events.on("routeChangeComplete", () => {
      progress.finish, handleLoading(false);
    });
  }, [PageLayout]);

  return (
    <PageLayout currentLocation={router.pathname}>
      <Component history={history} {...pageProps} />
    </PageLayout>
  );
}

export default MyApp;
