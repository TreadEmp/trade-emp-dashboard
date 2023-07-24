/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import _ from "lodash";
import Axios from "../../../utils/axios";
import Creatable from "react-select/creatable";
import Button from "@mui/material/Button";
import Alerts from "../Alert";
import Link from "next/link";
import PropTypes from "prop-types";

export const displayInApp = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];

export default function Experiences({ experience, categories, color }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [experienceDetails, setExperienceDetails] = useState({
    id: "",
    category: "",
    isDisplayInApp: true,
    name: "",
    description: "",
  });
  const [category, setCategory] = useState({
    value: "",
    label: "",
  });

  const [isDisplayInApp, setIsDisplayInApp] = useState({
    value: "",
    label: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  useEffect(() => {
    if (experience) {
      const lable = experience.isDisplayInApp === true ? "Yes" : "No";
      const categoryLable = categories.map((cat) => {
        if (experienceDetails.category === cat.value) {
          return cat.label;
        }
      });
      setExperienceDetails({ ...experience });
      setIsDisplayInApp({
        value: experience.isDisplayInApp,
        label: lable,
      });
      setCategory({
        value: experience.category,
        label: categoryLable,
      });
    }
  }, [experience]);

  const handleDisplayInAppChange = (newValue, actionMeta) => {
    if (newValue)
      setIsDisplayInApp({ label: newValue.label, value: newValue.value });
  };

  const handleCategoryChange = (newValue, actionMeta) => {
    if (newValue) setCategory({ label: newValue.label, value: newValue.value });
  };

  const setDetails = (e, key) => {
    setExperienceDetails((details) => {
      return { ...details, [key]: e.target.value };
    });
  };

  const onSave = () => {
    setLoading(true);

    const url = "/experiences";
    const method = experienceDetails.id ? `PUT` : "POST";
    experienceDetails.isDisplayInApp = isDisplayInApp.value;
    experienceDetails.category = category.value;
    Axios.baseInstance({
      url,
      data: { ...experienceDetails },
      method,
    })
      .then((resp) => {
        setMessage("New experience created successfully");
        setSeverity("success");
        setShowAlert(() => {
          return true;
        });
        setLoading(false);
        router.push("/experiences/list");
      })
      .catch((e) => {
        setMessage("Error occured while creating an experience");
        setSeverity("error");
        setShowAlert(() => {
          return true;
        });
        console.log(e);
        setLoading(false);
      });
  };

  const OnFadeAlert = () => {
    setShowAlert(() => {
      return false;
    });
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-xl " +
                  (color === "light" ? "text-slate-700" : "text-white")
                }
              >
                {experienceDetails.id ? "Experience Edit" : "New Experience"}
              </h3>
              {showAlert && (
                <Alerts
                  message={message}
                  severity={severity}
                  OnFadeAlert={OnFadeAlert}
                />
              )}
            </div>
            <div className="text-center flex justify-between">
              <Link href="/experiences/list" passHref>
                <button
                  className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Cancel
                </button>
              </Link>
              <button
                className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onSave}
              >
                {loading && <i className="fas fa-spinner"></i>}{" "}
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
          {showAlert && (
            <Alerts
              message={message}
              severity={severity}
              OnFadeAlert={OnFadeAlert}
            />
          )}
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <div className="mt-3 mb-6"></div>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={experienceDetails.name}
                  onChange={(e) => {
                    setDetails(e, "name");
                  }}
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Description
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={experienceDetails.description}
                  onChange={(e) => {
                    setDetails(e, "description");
                  }}
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Category
                </label>
                <Creatable
                  value={categories.filter(function (option) {
                    return option.value === category.value;
                  })}
                  onChange={handleCategoryChange}
                  options={categories}
                  className="border-0 px-3 py-1 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Display in APP
                </label>
                <Creatable
                  value={displayInApp.filter(function (option) {
                    return option.value === isDisplayInApp.value;
                  })}
                  onChange={handleDisplayInAppChange}
                  options={displayInApp}
                  className="border-0 px-3 py-1 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
          </div>
          <div className="mt-48 mb-24"></div>
        </div>
      </div>
    </>
  );
}

Experiences.defaultProps = {
  color: "light",
};

Experiences.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
