/*eslint-disable*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import Axios from "../../../utils/axios";
import { useRouter } from "next/router";
import PaginationRounded from "../../Pagination/Pagination";
import Alerts from "../Alert";
import Link from "next/link";
import Switch from "@mui/material/Switch";
import {
  JobStatus,
  JobCreatedAtValues,
  JobCreatedAtLables,
} from "../../../utils/enums/enums";
import Creatable from "react-select/creatable";
import AddressAutoComplete from "../../MapBoxSearch/AddressAutoComplete";

export const JOB_STATUS = [
  { value: JobStatus.PENDING, label: JobStatus.PENDING.toUpperCase() },
  { value: JobStatus.HIRED, label: JobStatus.HIRED.toUpperCase() },
  { value: JobStatus.COMPLETED, label: JobStatus.COMPLETED.toUpperCase() },
];

export const DAYS = [
  { value: JobCreatedAtValues.TODAY, label: JobCreatedAtLables.TODAY },
  { value: JobCreatedAtValues.LAST_WEEK, label: JobCreatedAtLables.LAST_WEEK },
  {
    value: JobCreatedAtValues.LAST_MONTH,
    label: JobCreatedAtLables.LAST_MONTH,
  },
  { value: JobCreatedAtValues.LAST_YEAR, label: JobCreatedAtLables.LAST_YEAR },
  {
    value: JobCreatedAtValues.FROM_THE_BIGINING,
    label: JobCreatedAtLables.FROM_THE_BIGINING,
  },
];

export default function JobsList({
  color,
  data,
  categories,
  employees,
  status,
  jobCategory,
  employee,
  days,
  handlePaginationChange,
  currentPage,
  pages,
  handleClearFilters,
  setDetails,
  filters,
  setData,
  handleStatusChange,
  handleJobCategoryChange,
  handleEmployeeChange,
  handleAddressChange,
  handleDaysChange,
}) {
  console.log(employees);
  const router = useRouter();

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const onView = (id) => {
    router.push(`/jobs/view?id=${id}`);
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
                Jobs
              </h3>
              {showAlert && (
                <Alerts
                  message={message}
                  severity={severity}
                  OnFadeAlert={OnFadeAlert}
                />
              )}
            </div>
            {/* <div className="text-center flex justify-between">
              <Link href="/equipments/new" passHref>
                <button
                  className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Create Equipment
                </button>
              </Link>
            </div> */}
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
                Title
              </label>
              <input
                name="title"
                type="text"
                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value={filters.title}
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
                Status
              </label>
              <Creatable
                value={JOB_STATUS.filter(function (option) {
                  return option.value === status.value;
                })}
                onChange={handleStatusChange}
                options={JOB_STATUS}
                className="border-0 px-3 py-1 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-3/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Job Category
              </label>
              <Creatable
                value={categories.filter(function (option) {
                  return option.value === jobCategory.value;
                })}
                onChange={handleJobCategoryChange}
                options={categories}
                className="border-0 px-3 py-1 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-3/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Created By
              </label>
              <Creatable
                value={employees.filter(function (option) {
                  return option.value === employee.value;
                })}
                onChange={handleEmployeeChange}
                options={employees}
                className="border-0 px-3 py-1 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-3/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Address
              </label>
              <AddressAutoComplete
                handleChange={handleAddressChange}
                handleClearFilters={handleClearFilters}
              />
            </div>
          </div>
          <div className="w-full lg:w-3/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Radius(km)
              </label>
              <input
                name="radius"
                type="number"
                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value={filters.radius}
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
                Days
              </label>
              <Creatable
                value={DAYS.filter(function (option) {
                  return option.value === days.value;
                })}
                onChange={handleDaysChange}
                options={DAYS}
                className="border-0 px-3 py-1 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-3/12 px-4 flex justify-end items-center mt-6">
            <button
              className="bg-sky-500 mb-3 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>
        <div className="flex flex-wrap bg-slate-100 pb-2 pt-2 justify-between">
          <div className="w-full lg:w-3/12 px-4 mb-3">
            <div className="relative w-full mb-3"></div>
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
                  Title
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-slate-50 text-slate-500 border-slate-100"
                      : "bg-sky-800 text-sky-300 border-sky-700")
                  }
                >
                  Created By
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-slate-50 text-slate-500 border-slate-100"
                      : "bg-sky-800 text-sky-300 border-sky-700")
                  }
                >
                  Job Category
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
              {data.map((job, index) => {
                return (
                  <tr key={job.id}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      {job.image === null ? (
                        <img
                          src={"/assets/img/no-image-icon-23485.png"}
                          className="h-12 w-12 bg-white rounded-full border"
                          alt="..."
                        ></img>
                      ) : (
                        <img
                          src={job.image}
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
                        {job.title}
                      </span>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left items-center">
                      <div className="flex text-left items-center">
                        {job.employerProfile === null ? (
                          <img
                            src={"/assets/img/no-image-icon-23485.png"}
                            className="h-12 w-12 bg-white rounded-full border"
                            alt="..."
                          ></img>
                        ) : (
                          <img
                            src={job.employerProfile}
                            className="h-12 w-12 bg-white rounded-full border"
                            alt="..."
                          ></img>
                        )}{" "}
                        <span
                          className={
                            "ml-3 font-bold " +
                            +(color === "light"
                              ? "text-slate-600"
                              : "text-white")
                          }
                        >
                          {job.employerFirstName + " " + job.employerLastName}
                        </span>
                      </div>
                    </td>
                    {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {job.employerId}
                    </td> */}
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {job.jobCategory}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {job.status === JobStatus.PENDING ? (
                        <button
                          className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                          type="button"
                          style={{ backgroundColor: "indigo" }}
                        >
                          {job.status}
                        </button>
                      ) : job.status === JobStatus.HIRED ? (
                        <button
                          className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                          type="button"
                          style={{ backgroundColor: "orange" }}
                        >
                          {job.status}
                        </button>
                      ) : (
                        <button
                          className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                          type="button"
                          style={{ backgroundColor: "green" }}
                        >
                          {job.status}
                        </button>
                      )}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                      {/* <button
                        className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        style={{ backgroundColor: "green" }}
                        onClick={() => onEdit(job.id)}
                      >
                        Edit
                      </button> */}
                      <button
                        className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => onView(job.id)}
                      >
                        View
                      </button>
                      {/* <button
                        className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        style={{ backgroundColor: "red" }}
                        onClick={() => onDelete(job.id)}
                      >
                        Delete
                      </button> */}
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

JobsList.defaultProps = {
  color: "light",
};

JobsList.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
