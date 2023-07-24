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
import { BidStatus } from "../../../../utils/enums/enums";
import Creatable from "react-select/creatable";

export const BID_STATUS = [
  { value: BidStatus.PENDING, label: BidStatus.PENDING.toUpperCase() },
  { value: BidStatus.ACCEPTED, label: BidStatus.ACCEPTED.toUpperCase() },
  { value: BidStatus.REJECTED, label: BidStatus.REJECTED.toUpperCase() },
];

export default function BidModal(props) {
  const { handleClose, title, jobId, color, ...other } = props;
  console.log(jobId);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(0);
  const [employee, setEmployee] = useState({
    value: "",
    label: "",
  });
  const [status, setStatus] = useState({
    value: "",
    label: "",
  });
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [filters, setFilters] = useState({
    employeeId: "",
    status: "",
    maxPrice: "",
    minPrice: "",
  });

  const setDetails = (e, key) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value.toString().trim(),
    });
  };

  const handleEmployeeChange = (newValue, actionMeta) => {
    if (newValue) setEmployee({ label: newValue.label, value: newValue.value });
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
    setMaxPrice(0);
    setMinPrice(0);
    setStatus({ label: "", value: "" });
    setEmployee({ label: "", value: "" });
    setFilters({
      employeeId: "",
      status: "",
      maxPrice: "",
      minPrice: "",
    });
  };

  const handlePaginationChange = (e, p) => {
    setCurrentPage(p);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.baseInstance({
          url: `/users/bids-by-job/admin/${jobId}?page=${currentPage}&pageSize=10&employeeId=${filters.employeeId}&status=${filters.status}&maxPrice=${filters.maxPrice}&minPrice=${filters.minPrice}`,
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
            <div className="w-full lg:w-3/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Max Price
                </label>
                <input
                  name="maxPrice"
                  type="number"
                  min="0"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={Number(filters.maxPrice)}
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
                  Min Price
                </label>
                <input
                  name="minPrice"
                  type="number"
                  min="0"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={Number(filters.minPrice)}
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
                  value={BID_STATUS.filter(function (option) {
                    return option.value === status.value;
                  })}
                  onChange={handleStatusChange}
                  options={BID_STATUS}
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
                  Bid Posted By
                </label>
                <Creatable
                  value={users.filter(function (option) {
                    return option.value === employee.value;
                  })}
                  onChange={handleEmployeeChange}
                  options={users}
                  className="border-0 px-3 py-1 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap bg-white pb-2 pt-2 justify-end">
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
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-slate-50 text-slate-500 border-slate-100"
                        : "bg-sky-800 text-sky-300 border-sky-700")
                    }
                  >
                    Bid Value
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
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
                        {bid.employee?.profileImage === null ? (
                          <img
                            src={"/assets/img/no-image-icon-23485.png"}
                            className="h-12 w-12 bg-white rounded-full border"
                            alt="..."
                          ></img>
                        ) : (
                          <img
                            src={bid.employee?.profileImage}
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
                          {bid.employee?.firstName} {bid.employee?.lastName}
                        </span>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {bid.status === BidStatus.PENDING ? (
                          <button
                            className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            style={{ backgroundColor: "indigo" }}
                          >
                            {bid.status}
                          </button>
                        ) : bid.status === BidStatus.REJECTED ? (
                          <button
                            className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            style={{ backgroundColor: "red" }}
                          >
                            {bid.status}
                          </button>
                        ) : (
                          <button
                            className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            style={{ backgroundColor: "green" }}
                          >
                            {bid.status}
                          </button>
                        )}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {bid.price}
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

BidModal.defaultProps = {
  color: "light",
};

BidModal.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
