import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProgressBar from "@badrap/bar-of-progress";
import { useRouter } from "next/router";

// components

import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import HeaderStats from "../components/Headers/HeaderStats.js";
import FooterAdmin from "../components/Footers/FooterAdmin.js";
import Axios from "../utils/axios";
import {
  getProfileImage,
  getUserData,
  setProfileImage,
  setDashboardDetails,
  getDashboardDetails,
} from "../utils/auth";


export default function Admin({ children, currentLocation }) {
  console.log(children);
  const [profile, setProfile] = useState("");
  const [dashboardStats, setDashboardStats] = useState({
    users: 0,
    JobCategories: 0,
    toolCategories: 0,
    equipments: 0,
    experiences: 0,
    jobs: 0,
    jobRequests: 0,
    bids: 0,
  });
  const router = useRouter();
  const [loading, handleLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    role: "",
  });

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

    const userData = getUserData();
    if (userData) {
      setCurrentUser({
        ...currentUser,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      });
    }

    const profileData = getProfileImage();
    if (!profileData) {
      Axios.authInstance({
        url: `/user?email=${userData.email}`,
        method: "GET",
      })
        .then((res) => {
          setProfileImage(res.data.data?.profileImage?.url);
          setProfile(res.data.data?.profileImage?.url);
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      setProfile(profileData);
    }

    const dashboardDetails = getDashboardDetails();
    if (!dashboardDetails) {
      Axios.baseInstance({ url: `/admin/dashboard`, method: "GET" })
        .then((res) => {
          setDashboardDetails(res.data.data);
          setDashboardStats({
            users: res.data.data.users,
            JobCategories: res.data.data.JobCategories,
            toolCategories: res.data.data.toolCategories,
            equipments: res.data.data.equipments,
            experiences: res.data.data.experiences,
            jobs: res.data.data.jobs,
            jobRequests: res.data.data.jobRequests,
            bids: res.data.data.bids,
          });
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      setDashboardStats({
        ...dashboardDetails
      });
    }
  }, []);

  return (
    <>
      <Sidebar currentLocation={currentLocation} />
      <div className="relative md:ml-64 bg-slate-100">
        <AdminNavbar user={currentUser} profile={profile} />
        {/* Header */}
        <HeaderStats details={dashboardStats} />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
