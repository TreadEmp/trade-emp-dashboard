import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Axios from "../utils/axios";

export const setToken = (data) => {
  console.log(data);
  const { accessToken, refreshToken, roles, userId, name, email } = data;

  localStorage.setItem("access-token", accessToken);
  localStorage.setItem("refresh-token", refreshToken);
  localStorage.setItem("user-role", roles);
  localStorage.setItem("user-name", name);
  localStorage.setItem("user-email", email);
  localStorage.setItem("user-id", userId);
};

export const setAccessToken = (accessToken) => {
  localStorage.setItem("access-token", accessToken);
};

// remove Token
export const removeToken = () => {
  localStorage.clear();
};

// get Token
export const getToken = (key) => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    return data;
  }
};

export const getUserData = () => {
  if (typeof window !== "undefined") {
    const role = localStorage.getItem("user-role");
    const name = localStorage.getItem("user-name");
    const email = localStorage.getItem("user-email");
    const userData = {
      role,
      name,
      email,
    };
    return userData;
  }
};

export const setProfileImage = (url) => {
  localStorage.setItem("profile-image", url);
};

export const getProfileImage = () => {
  return localStorage.getItem("profile-image");
};

export const setDashboardDetails = (object) => {
  localStorage.setItem("dashboard-stat", JSON.stringify(object));
};

export const getDashboardDetails = () => {
  const data = localStorage.getItem("dashboard-stat");
  return JSON.parse(data);
};
