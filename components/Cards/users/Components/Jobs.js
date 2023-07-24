/*eslint-disable*/
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { JobStatus, BidStatus } from "../../../../utils/enums/enums";
import SimplePopOver from "../../../PopOver/PopOver";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import ImageViewModal from "../Modals/ImageViewModal";
import BidModal from "../Modals/BidModal";
import EmptyContent from "../../../EmptyContent/EmptyContent";
import Alerts from "../../Alert";
import Axios from "../../../../utils/axios";
import CircularProgress from "@mui/material/CircularProgress";

export default function Jobs({ color, id }) {
  const [titleAnchorEl, setTitleAnchorEl] = React.useState(null);
  const [descriptionAnchorEl, setDescriptionAnchorEl] = React.useState(null);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [isBidModalOpen, setBidModalOpen] = React.useState(false);
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [jobId, setJobId] = React.useState("");
  const [jobs, setJobs] = useState([]);
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
          url: `/user/jobs/admin/${id}`,
          method: "GET",
        });
        setJobs(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setMessage("Error occured while fetching jobs");
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

  const handleImageViewModal = (images) => {
    console.log(images);
    setSelectedImages(images);
    setModalOpen(true);
  };

  const onCloseImageViewModal = () => {
    setModalOpen(false);
  };

  const handleBidModal = (jobId) => {
    setJobId(jobId);
    setBidModalOpen(true);
  };

  const onCloseBidModal = () => {
    setBidModalOpen(false);
  };
  return (
    <>
      <div className="flex-auto px-6 lg:px-6 py-5">
        <h6 className="text-slate-400 text-l mt-2 mb-2 font-bold uppercase">
          Jobs
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
            {jobs?.length > 0 ? (
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
                        Job Image
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
                        Bid Count
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
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
                    {jobs?.map((job, index) => {
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
                            {job?.status === JobStatus.PENDING ? (
                              <button
                                className="cursor-default bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                                style={{ backgroundColor: "indigo" }}
                              >
                                {job?.status}
                              </button>
                            ) : job?.status === JobStatus.HIRED ? (
                              <button
                                className="cursor-default bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                                style={{ backgroundColor: "orange" }}
                              >
                                {job?.status}
                              </button>
                            ) : (
                              <button
                                className="cursor-default bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                                style={{ backgroundColor: "green" }}
                              >
                                {job?.status}
                              </button>
                            )}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {job.createdAt.substring(
                              0,
                              job.createdAt.indexOf("T")
                            )}{" "}
                            {Math.round(Number(job.days)) === 1
                              ? "(" + Math.round(Number(job.days)) + " Day ago)"
                              : "(" +
                                Math.round(Number(job.days)) +
                                " Days ago)"}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {job.bids.length}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {job.bids.length > 0 ? (
                              <button
                                onClick={() => {
                                  handleBidModal(job.id);
                                }}
                                className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                              >
                                View All Bids
                              </button>
                            ) : (
                              <button
                                disabled={true}
                                className="cursor-default bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                              >
                                View All Bids
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
              <EmptyContent text={"No Jobs Posted yet"} />
            )}
          </div>
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
        <BidModal
          open={isBidModalOpen}
          handleClose={onCloseBidModal}
          title={"Bids For the Job"}
          jobId={jobId}
        />
      )}
    </>
  );
}

Jobs.defaultProps = {
  color: "light",
};

Jobs.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
