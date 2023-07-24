/*eslint-disable*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import Axios from "../../../utils/axios";
import { useRouter } from "next/router";
import PaginationRounded from "../../Pagination/Pagination";
import Alerts from "../Alert";

export default function UserList({
  color,
  data,
  handlePaginationChange,
  currentPage,
  pages,
  handleClearFilters,
  setDetails,
  filters,
  activeTabIndex,
  setActiveTabIndex,
  setData,
}) {
  const router = useRouter();

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const onEdit = (id) => {
    Axios({ method: "PUT", url: `/admin/contributors?id=${id}` })
      .then((res) => {
        setShowAlert(true);
        setMessage("Contributor completed successfully!");
        setSeverity("success");

        const contributers = data;
        const formatedList = contributers.filter((item) => {
          return item._id !== id;
        });
        setData((prev) => [...formatedList]);
      })
      .catch((e) => {
        console.log(e);
        setShowAlert(true);
        setMessage("Contributor could not be completed");
        setSeverity("error");
      });
  };

  const OnFadeAlert = () => {
    setShowAlert(() => {
      return false;
    });
  };

  const onView = (id) => {
    router.push(`/users/view?id=${id}`);
  };

  const tabsData = [
    {
      label: "Active Users",
    },
    {
      label: "Diactivated Users",
    },
  ];

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-sky-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-slate-700" : "text-white")
                }
              >
                Users
              </h3>
              {showAlert && (
                <Alerts
                  message={message}
                  severity={severity}
                  OnFadeAlert={OnFadeAlert}
                />
              )}
            </div>
          </div>
        </div>
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-slate-700" : "text-white")
                }
              ></h3>
            </div>
            <div className="text-center flex justify-between"></div>
          </div>
        </div>
        <div className="flex flex-wrap bg-slate-100 pb-2 pt-2">
          <div className="w-full lg:w-3/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value={filters.firstName}
                onChange={(e) => {
                  setDetails(e);
                }}
              />
            </div>
          </div>
          <div className="w-full lg:w-3/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value={filters.lastName}
                onChange={(e) => {
                  setDetails(e);
                }}
              />
            </div>
          </div>
          <div className="w-full lg:w-3/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Email
              </label>
              <input
                name="email"
                type="text"
                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value={filters.email}
                onChange={(e) => {
                  setDetails(e);
                }}
              />
            </div>
          </div>

          <div className="w-full lg:w-3/12 px-4 flex justify-end items-center">
            <button
              className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>
        <div className="m-4">
          <div className="flex space-x-3 border-b">
            {/* Loop through tab data and render button for each. */}
            {tabsData.map((tab, idx) => {
              return (
                <button
                  key={idx}
                  className={`active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ${
                    idx === activeTabIndex
                      ? "bg-sky-500 text-white "
                      : "border-transparent"
                  } ${idx !== activeTabIndex ? "text-slate-700" : ""}`}
                  // Change the active tab on click.
                  onClick={() => setActiveTabIndex(idx)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          {/* Show active tab content. */}
          {/* <div className="py-4">
            <p>{tabsData[activeTabIndex].content}</p>
          </div> */}
        </div>
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-slate-700" : "text-white")
                }
              ></h3>
            </div>
            <div className="text-center flex justify-between"></div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-slate-50 text-slate-500 border-slate-100"
                      : "bg-sky-800 text-sky-300 border-sky-700")
                  }
                >
                  Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-slate-50 text-slate-500 border-slate-100"
                      : "bg-sky-800 text-sky-300 border-sky-700")
                  }
                >
                  Email
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-slate-50 text-slate-500 border-slate-100"
                      : "bg-sky-800 text-sky-300 border-sky-700")
                  }
                >
                  Status
                </th>
                {/* <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-slate-50 text-slate-500 border-slate-100"
                      : "bg-sky-800 text-sky-300 border-sky-700")
                  }
                >
                  Color
                </th> */}

                <th
                  className={
                    "px-6 align-right border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-right " +
                    (color === "light"
                      ? "bg-slate-50 text-slate-500 border-slate-100"
                      : "bg-sky-800 text-sky-300 border-sky-700")
                  }
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => {
                return (
                  <tr key={user._id}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      {user.profileImage?.url === null ? (
                        <img
                          src={"/assets/img/no-image-icon-23485.png"}
                          className="h-12 w-12 bg-white rounded-full border"
                          alt="..."
                        ></img>
                      ) : (
                        <img
                          src={user.profileImage?.url}
                          className="h-12 w-12 bg-white rounded-full border"
                          alt="..."
                        ></img>
                      )}{" "}
                      <span
                        className={
                          "ml-3 font-bold " +
                          +(color === "light" ? "text-slate-600" : "text-white")
                        }
                      >
                        {user.firstName + " " + user.lastName}
                      </span>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {user.email}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {user.disabled === 0 ? (
                        <button
                          className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                          type="button"
                          style={{ backgroundColor: "green" }}
                        >
                          Enabled
                        </button>
                      ) : (
                        <button
                          className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                          type="button"
                          style={{ backgroundColor: "red" }}
                        >
                          Disabled
                        </button>
                      )}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                      {activeTabIndex === 0 && (
                        <button
                          className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                          type="button"
                          style={{ backgroundColor: "green" }}
                          onClick={() => onEdit(user.userId)}
                        >
                          Complete
                        </button>
                      )}
                      <button
                        className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => onView(user.userId)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <PaginationRounded
        handleChange={handlePaginationChange}
        count={pages}
        page={currentPage}
      />
    </>
  );
}

UserList.defaultProps = {
  color: "light",
};

UserList.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
