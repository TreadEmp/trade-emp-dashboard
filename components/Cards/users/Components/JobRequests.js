/*eslint-disable*/
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SimplePopOver from "../../../PopOver/PopOver";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import ImageViewModal from "../Modals/ImageViewModal";
import JobAcceptanceModal from "../Modals/JobAcceptanceModal";
import EmptyContent from "../../../EmptyContent/EmptyContent";
import Alerts from "../../Alert";
import Axios from "../../../../utils/axios";
import CircularProgress from "@mui/material/CircularProgress";

export default function JobRequests({ color, id }) {
  const [titleAnchorEl, setTitleAnchorEl] = React.useState(null);
  const [descriptionAnchorEl, setDescriptionAnchorEl] = React.useState(null);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [isBidModalOpen, setBidModalOpen] = React.useState(false);
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [jobRequestId, setJobRequestId] = React.useState("");
  const [jobRequests, setJobRequests] = useState([]);
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
    const fetchJobRequests = async () => {
      setLoading(true);
      try {
        const res = await Axios.baseInstance({
          url: `/user/job-requests/admin/${id}`,
          method: "GET",
        });
        setJobRequests(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setMessage("Error occured while fetching job requests");
        setSeverity("error");
        setShowAlert(() => {
          return true;
        });
      }
    };
    fetchJobRequests();
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

  const handleImageViewModal = (images) => {
    console.log(images);
    setSelectedImages(images);
    setModalOpen(true);
  };

  const onCloseImageViewModal = () => {
    setModalOpen(false);
  };

  const handleBidModal = (jobRequestId) => {
    setJobRequestId(jobRequestId);
    setBidModalOpen(true);
  };

  const onCloseBidModal = () => {
    setBidModalOpen(false);
  };

  return (
    <>
      <div className="flex-auto px-6 lg:px-6 py-5">
        <h6 className="text-slate-400 text-l mt-2 mb-2 font-bold uppercase">
          Job Requests
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
          <>
            <div className="flex flex-wrap ">
              {jobRequests?.length > 0 ? (
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
                          Image
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
                          Job Request Status
                        </th>
                        <th
                          className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                            (color === "light"
                              ? "bg-slate-50 text-slate-500 border-slate-100"
                              : "bg-sky-800 text-sky-300 border-sky-700")
                          }
                        >
                          Posted Date
                        </th>
                        <th
                          className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                            (color === "light"
                              ? "bg-slate-50 text-slate-500 border-slate-100"
                              : "bg-sky-800 text-sky-300 border-sky-700")
                          }
                        >
                          Job Acceptance Count
                        </th>
                        <th
                          className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-right " +
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
                      {jobRequests?.map((job, index) => {
                        return (
                          <tr key={index}>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                              {job.images?.length > 0 ? (
                                <img
                                  onClick={() => {
                                    handleImageViewModal(job.images);
                                  }}
                                  src={job.images[0]}
                                  className="h-12 w-12 bg-white rounded-full border"
                                  alt="..."
                                ></img>
                              ) : (
                                <img
                                  src={"/assets/img/no-image-icon-23485.png"}
                                  className="h-12 w-12 bg-white rounded-full border"
                                  alt="..."
                                ></img>
                              )}
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {job.jobCategory}
                            </td>
                            {job?.title.trim().length > 12 ? (
                              <>
                                <td
                                  className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                  onMouseEnter={handleTitlePopoverOpen}
                                  onMouseLeave={handleTitlePopoverClose}
                                >
                                  {job?.title.slice(0, 12) + "..."}
                                </td>
                                {/* <SimplePopOver
                            index={index.toString()}
                            content={job?.title}
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
                                    {job?.title}
                                  </Typography>
                                </Popover>
                              </>
                            ) : (
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {job?.title}
                              </td>
                            )}
                            {job?.description.trim().length > 12 ? (
                              <>
                                <td
                                  className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                  onMouseEnter={handleDescriptionPopoverOpen}
                                  onMouseLeave={handleDescriptionPopoverClose}
                                >
                                  {job?.description.slice(0, 12) + "..."}
                                </td>
                                <SimplePopOver
                                  index={index.toString()}
                                  content={job?.description}
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
                                {job?.description}
                              </td>
                            )}

                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {job.isActive ? (
                                <button
                                  className="cursor-default bg-sky-500 text-white active:bg-sky-600 font-bold rounded-full uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                  type="button"
                                  style={{ backgroundColor: "green" }}
                                >
                                  ACTIVE
                                </button>
                              ) : (
                                <button
                                  className="cursor-default bg-sky-500 text-white active:bg-sky-600 font-bold rounded-full uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                  type="button"
                                  style={{ backgroundColor: "red" }}
                                >
                                  INACTIVE
                                </button>
                              )}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {job.createdAt.substring(
                                0,
                                job.createdAt.indexOf("T")
                              )}{" "}
                              {Math.round(Number(job.days)) === 1
                                ? "(" +
                                  Math.round(Number(job.days)) +
                                  " Day ago)"
                                : "(" +
                                  Math.round(Number(job.days)) +
                                  " Days ago)"}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                              {job.JobRequestAcceptance.length}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                              {job.JobRequestAcceptance.length > 0 ? (
                                <button
                                  onClick={() => {
                                    handleBidModal(job.id);
                                  }}
                                  className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                  type="button"
                                >
                                  View All Acceptance
                                </button>
                              ) : (
                                <button
                                  disabled={true}
                                  className="cursor-default bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                  type="button"
                                >
                                  View All Acceptance
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
                <EmptyContent text={"No Job Requests Posted yet"} />
              )}
            </div>
          </>
        </>
      )}
      {isModalOpen && (
        <ImageViewModal
          images={selectedImages}
          open={isModalOpen}
          handleClose={onCloseImageViewModal}
          title={"Job Images"}
        />
      )}
      {isBidModalOpen && (
        <JobAcceptanceModal
          open={isBidModalOpen}
          handleClose={onCloseBidModal}
          title={"Job Acceptances For the Job Request"}
          jobRequestId={jobRequestId}
        />
      )}
    </>
  );
}

JobRequests.defaultProps = {
  color: "light",
};

JobRequests.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
