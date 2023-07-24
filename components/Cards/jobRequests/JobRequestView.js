/*eslint-disable*/
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Link from "next/link";
import SimpleAccordion from "../../Accordion/Accordion";
import SimplePopOver from "../../PopOver/PopOver";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { JobRequestAcceptanceStatus } from "../../../utils/enums/enums";
import JobRequestReviewModal from "./JobRequestReviewModal";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

export default function JobRequestView({ color, jobRequest }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [selectedReview, setSelectedReview] = React.useState({});
  const [openedPopover, setOpenedPopover] = useState(false);
  const popoverAnchor = React.useRef(null);
  const popoverEnter = ({ currentTarget }) => {
    setOpenedPopover(true);
  };

  const popoverLeave = ({ currentTarget }) => {
    setOpenedPopover(false);
  };
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleReviewModal = (review) => {
    setSelectedReview(review);
    setModalOpen(true);
  };

  const onCloseReviewModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-slate-700 text-xl font-bold">
              Job Request View
            </h6>
            <Link href="/jobRequests/list" passHref>
              <button
                className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
              >
                Back
              </button>
            </Link>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <div className="mt-3 mb-6">
            <h6 className="text-slate-400 text-l mt-3 mb-6 font-bold uppercase">
              Basic Job Request Information
            </h6>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Title
                </label>
                <input
                  disabled="true"
                  type="text"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={jobRequest.title}
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
                <textarea
                  disabled="true"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  rows="5"
                  placeholder=""
                  id="description"
                  value={jobRequest.description}
                ></textarea>
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
                <input
                  disabled="true"
                  type="text"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={jobRequest.jobCategory}
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Created At
                </label>
                <input
                  disabled="true"
                  type="text"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={
                    Math.round(Number(jobRequest.days)) === 1
                      ? Math.round(Number(jobRequest.days)) + " Day ago"
                      : Math.round(Number(jobRequest.days)) + " Days ago"
                  }
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Images
                </label>
                <ImageList
                  s={{ width: 500, height: 450 }}
                  cols={3}
                  variant="quilted"
                  rowHeight={164}
                >
                  {jobRequest.images?.map((item, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={`${item}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={"image"}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
            </div>
          </div>
          <hr className="mt-6 border-b-1 border-slate-300" />
          <h6 className="text-slate-400 text-l mt-3 mb-6 font-bold uppercase">
            Job Request Created By
          </h6>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                {jobRequest.employeeFirstName +
                  " " +
                  jobRequest.employeeLastName}
              </label>
              <div className="flex flex-row">
                {jobRequest.employeeProfile?.trim().length > 0 ? (
                  <img
                    className="mt-4 mr-2 w-48 h-48 object-center object-fit"
                    src={jobRequest.employeeProfile}
                    alt="..."
                  />
                ) : (
                  <img
                    className="mt-4 mr-2 w-48 h-48 object-center object-fit"
                    src={"/assets/img/blank_profile_2.png"}
                    alt="..."
                  />
                )}
              </div>
            </div>
          </div>
          <hr className="mt-6 border-b-1 border-slate-300" />
          <h6 className="text-slate-400 text-l mt-3 mb-6 font-bold uppercase">
            Job Acceptance
          </h6>
          {jobRequest?.jobRequestAcceptances?.length > 0 ? (
            <div className="block w-full lg:w-6/12 overflow-x-auto">
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
                      Job Request Accepted By
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
                  </tr>
                </thead>
                <tbody>
                  {jobRequest?.jobRequestAcceptances?.map((bid, index) => {
                    return (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                          {bid.employerDetails?.profileImage?.url === null ? (
                            <img
                              src={"/assets/img/no-image-icon-23485.png"}
                              className="h-12 w-12 bg-white rounded-full border"
                              alt="..."
                            ></img>
                          ) : (
                            <img
                              src={bid.employerDetails?.profileImage?.url}
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
                            {bid.employerDetails?.firstName}{" "}
                            {bid.employerDetails?.lastName}
                          </span>
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {bid.status === JobRequestAcceptanceStatus.PENDING ? (
                            <button
                              className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                              type="button"
                              style={{ backgroundColor: "indigo" }}
                            >
                              {bid.status}
                            </button>
                          ) : bid.status ===
                            JobRequestAcceptanceStatus.ONGOING ? (
                            <button
                              className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                              type="button"
                              style={{ backgroundColor: "green" }}
                            >
                              {bid.status}
                            </button>
                          ) : bid.status ===
                            JobRequestAcceptanceStatus.COMPLETED ? (
                            <button
                              className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                              type="button"
                              style={{ backgroundColor: "blue" }}
                            >
                              {bid.status}
                            </button>
                          ) : (
                            <button
                              className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
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
            <div className="w-full lg:w-6/12 px-4">
              <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
                No Acceptance yet
              </label>
            </div>
          )}
          <hr className="mt-6 border-b-1 border-slate-300" />
          <h6 className="text-slate-400 text-l mt-3 mb-6 font-bold uppercase">
            Reviews
          </h6>
          {jobRequest?.reviews?.length > 0 ? (
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
                      Reviewed By
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-slate-50 text-slate-500 border-slate-100"
                          : "bg-sky-800 text-sky-300 border-sky-700")
                      }
                    >
                      Review
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-slate-50 text-slate-500 border-slate-100"
                          : "bg-sky-800 text-sky-300 border-sky-700")
                      }
                    >
                      Rating
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
                  {jobRequest?.reviews?.map((review, index) => {
                    return (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                          {review.reviewer?.profileImage === null ? (
                            <img
                              src={"/assets/img/no-image-icon-23485.png"}
                              className="h-12 w-12 bg-white rounded-full border"
                              alt="..."
                            ></img>
                          ) : (
                            <img
                              src={review.reviewer?.profileImage}
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
                            {review.reviewer?.firstName}{" "}
                            {review.reviewer?.lastName}
                          </span>
                        </th>
                        {review.review.trim().length > 48 ? (
                          <>
                            <td
                              id="review"
                              className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                              onMouseEnter={popoverEnter}
                              onMouseLeave={popoverLeave}
                            >
                              {review.review.slice(0, 48) + "..."}
                            </td>
                            {/* <SimplePopOver
                              className={classes.popover}
                              classes={{
                                paper: classes.popoverContent,
                              }}
                              index={index.toString()}
                              content={review.review}
                              open={openedPopover}
                              anchorEl={popoverAnchor.current}
                              anchorOriginVertical={"bottom"}
                              anchorOriginHorizontal={"left"}
                              transformOriginVertical={"top"}
                              transformOriginHorizontal={"left"}
                              onMouseEnter={popoverEnter}
                              onMouseLeave={popoverLeave}
                            /> */}
                            <ReactTooltip
                              anchorId="review"
                              place="bottom"
                              variant="info"
                              content={review.review}
                            />
                          </>
                        ) : (
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {review.review}
                          </td>
                        )}

                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {review.rating}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                          <button
                            className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => {
                              handleReviewModal(review);
                            }}
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
          ) : (
            <div className="w-full lg:w-6/12 px-4">
              <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
                No Reviews yet
              </label>
            </div>
          )}
          <hr className="mt-6 border-b-1 border-slate-300" />
          <h6 className="text-slate-400 text-l mt-3 mb-6 font-bold uppercase">
            Other Required Information
          </h6>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-slate-400 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Pricing
              </label>
              <div className="flex flex-col">
                {jobRequest.faqs?.length > 0
                  ? jobRequest.prices?.map((price, index) => {
                      const title = index + 1 + ") " + price.unitsOfMeasure;
                      const priceValue = price.price + " LKR";
                      return (
                        <SimpleAccordion
                          key={index}
                          title={title}
                          content={priceValue}
                        />
                      );
                    })
                  : "No pricing provided"}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-slate-400 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Frequently Asked Questions
              </label>
              <div className="flex flex-col">
                {jobRequest.faqs?.length > 0
                  ? jobRequest.faqs?.map((faq, index) => {
                      const title = index + 1 + ") " + faq.question;
                      return (
                        <SimpleAccordion
                          key={index}
                          title={title}
                          content={faq.answer}
                        />
                      );
                    })
                  : "No question provided"}
              </div>
            </div>
          </div>
          <div className="mt-48 mb-24"></div>
        </div>
      </div>
      <JobRequestReviewModal
        data={selectedReview}
        open={isModalOpen}
        handleClose={onCloseReviewModal}
      />
    </>
  );
}

JobRequestView.defaultProps = {
  color: "light",
};

JobRequestView.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
