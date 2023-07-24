/*eslint-disable*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import Axios from "../../../utils/axios";
import { useRouter } from "next/router";
import PaginationRounded from "../../Pagination/Pagination";
import Alerts from "../Alert";
import Link from "next/link";
import Switch from "@mui/material/Switch";

export default function ToolCategoryList({
  color,
  data,
  handlePaginationChange,
  currentPage,
  pages,
  handleClearFilters,
  setDetails,
  filters,
  setData,
  onToggle,
}) {
  const router = useRouter();

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const onDelete = (id) => {
    Axios.baseInstance({
      method: "DELETE",
      url: `/tool-categories?toolCategoryId=${id}`,
    })
      .then((res) => {
        setMessage("Requested tool category was deleted successfully");
        setSeverity("success");
        setShowAlert(() => {
          return true;
        });
        const jobCategories = data;
        const formatedList = jobCategories.filter((item) => {
          return item.id !== id;
        });
        setData((prev) => [...formatedList]);
      })
      .catch((e) => {
        setMessage("Requested tool category could not be deleted");
        setSeverity("error");
        setShowAlert(() => {
          return true;
        });
        router.push("/toolCategories/list");
      });
  };

  const onView = (id) => {
    router.push(`/toolCategories/view?id=${id}`);
  };

  const onEdit = (id) => {
    router.push(`/toolCategories/${id}`);
  };

  const OnFadeAlert = () => {
    setShowAlert(() => {
      return false;
    });
  };

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
                Tool Categories
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
              <Link href="/toolCategories/new" passHref>
                <button
                  className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Create Tool Category
                </button>
              </Link>
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
        <div className="flex flex-wrap bg-slate-100 pb-2 pt-2 justify-between">
          <div className="w-full lg:w-3/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Category Name
              </label>
              <input
                name="category"
                type="text"
                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value={filters.category}
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
        <div className="m-4"></div>
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
                  Category Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-slate-50 text-slate-500 border-slate-100"
                      : "bg-sky-800 text-sky-300 border-sky-700")
                  }
                >
                  Display In App
                </th>
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
              {data.map((category, index) => {
                return (
                  <tr key={category.id}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      {category.category}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <Switch
                        checked={category.isDisplayInApp}
                        onChange={() => onToggle(category.id, index)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                      <button
                        className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        style={{ backgroundColor: "green" }}
                        onClick={() => onEdit(category.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => onView(category.id)}
                      >
                        View
                      </button>
                      <button
                        className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        style={{ backgroundColor: "red" }}
                        onClick={() => onDelete(category.id)}
                      >
                        Delete
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

ToolCategoryList.defaultProps = {
  color: "light",
};

ToolCategoryList.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
