/*eslint-disable*/
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { JobStatus, BidStatus } from "../../../../utils/enums/enums";
import SimplePopOver from "../../../PopOver/PopOver";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Axios from "../../../../utils/axios";
import Alerts from "../../Alert";
import EmptyContent from "../../../EmptyContent/EmptyContent";

export default function Bids({ color, id }) {
  const [titleAnchorEl, setTitleAnchorEl] = React.useState(null);
  const [descriptionAnchorEl, setDescriptionAnchorEl] = React.useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const OnFadeAlert = () => {
    setShowAlert(() => {
      return false;
    });
  };

  useEffect(() => {
    const fetchBids = async () => {
      setLoading(true);
      try {
        const res = await Axios.baseInstance({
          url: `/user/bids/admin/${id}`,
          method: "GET",
        });
        setBids(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setMessage("Error occured while fetching bids");
        setSeverity("error");
        setShowAlert(() => {
          return true;
        });
      }
    };
    fetchBids();
  }, []);

  const handleTitlePopoverOpen = (event) => {
    event.stopPropagation();
    console.log(event.currentTarget);
    setTitleAnchorEl(event.currentTarget);
  };

  const handleTitlePopoverClose = (event) => {
    event.stopPropagation();
    setTitleAnchorEl(null);
    console.log(event.currentTarget);
  };

  const openTitlePopOver = Boolean(titleAnchorEl);

  const handleDescriptionPopoverOpen = (event) => {
    setDescriptionAnchorEl(event.currentTarget);
  };

  const handleDescriptionPopoverClose = () => {
    setDescriptionAnchorEl(null);
  };

  const openDescriptionPopOver = Boolean(descriptionAnchorEl);

  return (
    <>
      <div className="flex-auto px-6 lg:px-6 py-5">
        <h6 className="text-slate-400 text-l mt-2 mb-2 font-bold uppercase">
          Bids
        </h6>
      </div>
      {showAlert && (
        <div className="flex justify-start px-4 lg:px-10 py-5">
          <Alerts
            message={message}
            severity={severity}
            OnFadeAlert={OnFadeAlert}
          />
        </div>
      )}
      {loading ? (
        <div className="flex justify-center px-4 lg:px-10 py-5">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap ">
            {bids?.length > 0 ? (
              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-white border-collapse">
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
                        Job Posted by
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                          (color === "light"
                            ? "bg-slate-50 text-slate-500 border-slate-100"
                            : "bg-sky-800 text-sky-300 border-sky-700")
                        }
                      >
                        Category
                      </th>
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
                        Description
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                          (color === "light"
                            ? "bg-slate-50 text-slate-500 border-slate-100"
                            : "bg-sky-800 text-sky-300 border-sky-700")
                        }
                      >
                        Job Status
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                          (color === "light"
                            ? "bg-slate-50 text-slate-500 border-slate-100"
                            : "bg-sky-800 text-sky-300 border-sky-700")
                        }
                      >
                        Bid Date
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
                        Bid Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bids?.map((bid, index) => {
                      return (
                        <tr key={index}>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                            {bid.job?.employer?.profileImage === null ? (
                              <img
                                src={"/assets/img/no-image-icon-23485.png"}
                                className="h-12 w-12 bg-white rounded-full border"
                                alt="..."
                              ></img>
                            ) : (
                              <img
                                src={bid.job?.employer?.profileImage}
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
                              {bid.job?.employer?.firstName}{" "}
                              {bid.job?.employer?.lastName}
                            </span>
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {bid.job?.category}
                          </td>
                          {bid.job?.title.trim().length > 12 ? (
                            <>
                              <td
                                className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                onMouseEnter={handleTitlePopoverOpen}
                                onMouseLeave={handleTitlePopoverClose}
                              >
                                {bid.job?.title.slice(0, 12) + "..."}
                              </td>
                              {/* <SimplePopOver
                            index={index.toString()}
                            content={bid.job?.title}
                            open={openTitlePopOver}
                            anchorEl={titleAnchorEl}
                            anchorOriginVertical={"bottom"}
                            anchorOriginHorizontal={"left"}
                            transformOriginVertical={"top"}
                            transformOriginHorizontal={"left"}
                            handlePopoverClose={handleTitlePopoverClose}
                          /> */}
                              <Popover
                                id={index}
                                sx={{
                                  pointerEvents: "none",
                                }}
                                open={openTitlePopOver}
                                anchorEl={titleAnchorEl}
                                keepMounted={false}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "left",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "left",
                                }}
                                onClose={handleTitlePopoverClose}
                                disableRestoreFocus={false}
                              >
                                <Typography sx={{ p: 1 }}>
                                  {bid.job?.title}
                                </Typography>
                              </Popover>
                            </>
                          ) : (
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {bid.job?.title}
                            </td>
                          )}
                          {bid.job?.description.trim().length > 12 ? (
                            <>
                              <td
                                className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                onMouseEnter={handleDescriptionPopoverOpen}
                                onMouseLeave={handleDescriptionPopoverClose}
                              >
                                {bid.job?.description.slice(0, 12) + "..."}
                              </td>
                              <SimplePopOver
                                index={index.toString()}
                                content={bid.job?.description}
                                open={openDescriptionPopOver}
                                anchorEl={descriptionAnchorEl}
                                anchorOriginVertical={"bottom"}
                                anchorOriginHorizontal={"left"}
                                transformOriginVertical={"top"}
                                transformOriginHorizontal={"left"}
                                handlePopoverClose={
                                  handleDescriptionPopoverClose
                                }
                              />
                            </>
                          ) : (
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {bid.job?.description}
                            </td>
                          )}

                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {bid?.job?.status === JobStatus.PENDING ? (
                              <button
                                className="cursor-default bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                                style={{ backgroundColor: "indigo" }}
                              >
                                {bid?.job?.status}
                              </button>
                            ) : bid?.job?.status === JobStatus.HIRED ? (
                              <button
                                className="cursor-default bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                                style={{ backgroundColor: "orange" }}
                              >
                                {bid?.job?.status}
                              </button>
                            ) : (
                              <button
                                className="cursor-default bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                                style={{ backgroundColor: "green" }}
                              >
                                {bid?.job?.status}
                              </button>
                            )}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {bid.createdAt.substring(
                              0,
                              bid.createdAt.indexOf("T")
                            )}{" "}
                            {Math.round(Number(bid.days)) === 1
                              ? "(" + Math.round(Number(bid.days)) + " Day ago)"
                              : "(" +
                                Math.round(Number(bid.days)) +
                                " Days ago)"}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {bid?.price}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {bid.status === BidStatus.PENDING ? (
                              <button
                                className="cursor-default bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                                style={{ backgroundColor: "indigo" }}
                              >
                                {bid.status}
                              </button>
                            ) : bid.status === BidStatus.ACCEPTED ? (
                              <button
                                className="cursor-default bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                                style={{ backgroundColor: "green" }}
                              >
                                {bid.status}
                              </button>
                            ) : (
                              <button
                                className="cursor-default bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                                style={{ backgroundColor: "red" }}
                              >
                                {bid.status}
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyContent text={"No bids yet"}/>
            )}
          </div>
        </>
      )}
    </>
  );
}

Bids.defaultProps = {
  color: "light",
};

Bids.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
