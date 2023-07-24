/*eslint-disable*/
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Axios from "../../../../utils/axios";
import PaginationRounded from "../../../Pagination/Pagination";
import { JobRequestAcceptanceStatus } from "../../../../utils/enums/enums";
import Creatable from "react-select/creatable";

export const BID_STATUS = [
  { value: JobRequestAcceptanceStatus.PENDING, label: JobRequestAcceptanceStatus.PENDING.toUpperCase() },
  { value: JobRequestAcceptanceStatus.ONGOING, label: JobRequestAcceptanceStatus.ONGOING.toUpperCase() },
  { value: JobRequestAcceptanceStatus.COMPLETED, label: JobRequestAcceptanceStatus.COMPLETED.toUpperCase() },
  { value: JobRequestAcceptanceStatus.CANCELED, label: JobRequestAcceptanceStatus.CANCELED.toUpperCase() },
];

export default function JobAcceptanceModal(props) {
  const { handleClose, title, jobRequestId, color, ...other } = props;
  console.log(jobRequestId);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(0);
  const [employer, setEmployer] = useState({
    value: "",
    label: "",
  });
  const [status, setStatus] = useState({
    value: "",
    label: "",
  });
  const [filters, setFilters] = useState({
    employeeId: "",
    status: "",
  });

  const setDetails = (e, key) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value.toString().trim(),
    });
  };

  const handleEmployerChange = (newValue, actionMeta) => {
    if (newValue) setEmployer({ label: newValue.label, value: newValue.value });
    setFilters({
      ...filters,
      employerId: newValue.value,
    });
  };

  const handleStatusChange = (newValue, actionMeta) => {
    if (newValue) setStatus({ label: newValue.label, value: newValue.value });
    setFilters({
      ...filters,
      status: newValue.value,
    });
  };

  const handleClearFilters = () => {
    setStatus({ label: "", value: "" });
    setEmployer({ label: "", value: "" });
    setFilters({
      employerId: "",
      status: "",
    });
  };

  const handlePaginationChange = (e, p) => {
    setCurrentPage(p);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.baseInstance({
          url: `/users/acceptance-by-job-request/admin/${jobRequestId}?page=${currentPage}&pageSize=10&employerId=${filters.employerId}&status=${filters.status}`,
          method: "GET",
        });
        setData(res.data.data.items);
        setPages(res.data.data.pagination.pages);

        const employees = await Axios.baseInstance({
          url: `/user/admin-job-filter`,
          method: "GET",
        });
        const formattedEmployees = employees.data.data.map((item) => {
          return {
            value: item.userId,
            label: item.name,
          };
        });
        setUsers(formattedEmployees);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentPage, filters]);
  return (
    <Dialog
      PaperProps={{
        sx: {
          width: "100%",
          minWidth: "80%",
          maxHeight: 700,
        },
      }}
      onClose={handleClose}
      {...other}
    >
      <DialogTitle>
        <div className="text-center flex justify-between">
          <h6 className="text-slate-700 text-xl font-bold">{title}</h6>

          <IconButton onClick={handleClose} size="small">
            <DeleteIcon fontSize="inherit" color="error" />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        {/* <DialogContent dividers> */}
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
            // +
            // (color === "light" ? "bg-white" : "bg-sky-900 text-white")
          }
        >
          <div className="flex flex-wrap bg-white pb-2 pt-2 justify-between">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Status
                </label>
                <Creatable
                  value={BID_STATUS.filter(function (option) {
                    return option.value === status.value;
                  })}
                  onChange={handleStatusChange}
                  options={BID_STATUS}
                  className="border-0 px-3 py-1 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Accepted By
                </label>
                <Creatable
                  value={users.filter(function (option) {
                    return option.value === employer.value;
                  })}
                  onChange={handleEmployerChange}
                  options={users}
                  className="border-0 px-3 py-1 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4 flex justify-end items-center mt-6">
              <button
                className="bg-sky-500 mb-3 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>
          {/* <div className="flex flex-wrap bg-slate-100 pb-2 pt-2 justify-between">
            <div className="w-full lg:w-3/12 px-4 mb-3">
              <div className="relative w-full mb-3"></div>
            </div>
          </div> */}
          {/* <div className="m-4"></div> */}
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
                    Posted By
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
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-right " +
                      (color === "light"
                        ? "bg-slate-50 text-slate-500 border-slate-100"
                        : "bg-sky-800 text-sky-300 border-sky-700")
                    }
                  >
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((bid, index) => {
                  return (
                    <tr key={index}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                        {bid.employer?.profileImage === null ? (
                          <img
                            src={"/assets/img/no-image-icon-23485.png"}
                            className="h-12 w-12 bg-white rounded-full border"
                            alt="..."
                          ></img>
                        ) : (
                          <img
                            src={bid.employer?.profileImage}
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
                          {bid.employer?.firstName} {bid.employer?.lastName}
                        </span>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {bid.status === JobRequestAcceptanceStatus.PENDING ? (
                          <button
                            className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            style={{ backgroundColor: "indigo" }}
                          >
                            {bid.status}
                          </button>
                        ) : bid.status === JobRequestAcceptanceStatus.ONGOING ? (
                          <button
                            className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            style={{ backgroundColor: "orange" }}
                          >
                            {bid.status}
                          </button>
                        ) : bid.status === JobRequestAcceptanceStatus.COMPLETED ? (
                          <button
                            className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            style={{ backgroundColor: "green" }}
                          >
                            {bid.status}
                          </button>
                        ): (
                          <button
                            className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            style={{ backgroundColor: "red" }}
                          >
                            {bid.status}
                          </button>
                        )}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        {bid.createdAt.substring(0, bid.createdAt.indexOf("T"))}{" "}
                        {Math.round(Number(bid.days)) === 1
                          ? "(" + Math.round(Number(bid.days)) + " Day ago)"
                          : "(" + Math.round(Number(bid.days)) + " Days ago)"}
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
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

JobAcceptanceModal.defaultProps = {
  color: "light",
};

JobAcceptanceModal.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
