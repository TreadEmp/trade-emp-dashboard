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

export default function Equipments({ equipment, categories, color }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [equipmentDetails, setEquipmentDetails] = useState({
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
    if (equipment) {
      const lable = equipment.isDisplayInApp === true ? "Yes" : "No";
      const categoryLable = categories.map((cat) => {
        if (equipmentDetails.category === cat.value) {
          return cat.label;
        }
      });
      setEquipmentDetails({ ...equipment });
      setIsDisplayInApp({
        value: equipment.isDisplayInApp,
        label: lable,
      });
      setCategory({
        value: equipment.category,
        label: categoryLable,
      });
    }
  }, [equipment]);

  const handleDisplayInAppChange = (newValue, actionMeta) => {
    if (newValue)
      setIsDisplayInApp({ label: newValue.label, value: newValue.value });
  };

  const handleCategoryChange = (newValue, actionMeta) => {
    if (newValue) setCategory({ label: newValue.label, value: newValue.value });
  };

  const setDetails = (e, key) => {
    setEquipmentDetails((details) => {
      return { ...details, [key]: e.target.value };
    });
  };

  const onSave = () => {
    setLoading(true);

    const url = "/equipments";
    const method = equipmentDetails.id ? `PUT` : "POST";
    equipmentDetails.isDisplayInApp = isDisplayInApp.value;
    equipmentDetails.category = category.value;
    Axios.baseInstance({
      url,
      data: { ...equipmentDetails },
      method,
    })
      .then((resp) => {
        setMessage("New equipment created successfully");
        setSeverity("success");
        setShowAlert(() => {
          return true;
        });
        setLoading(false);
        router.push("/equipments/list");
      })
      .catch((e) => {
        setMessage("Error occured while creating an equipment");
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
                {equipmentDetails.id ? "Equipment Edit" : "New Equipment"}
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
              <Link href="/equipments/list" passHref>
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
                  value={equipmentDetails.name}
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
                  value={equipmentDetails.description}
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

Equipments.defaultProps = {
  color: "light",
};

Equipments.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
