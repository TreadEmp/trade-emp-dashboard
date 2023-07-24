/*eslint-disable*/
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Link from "next/link";
import SimpleAccordion from "../../Accordion/Accordion";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { BidStatus } from "../../../utils/enums/enums";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

export default function JobsView({ color, job }) {
  const router = useRouter();

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-slate-700 text-xl font-bold">Job View</h6>
            <Link href="/jobs/list" passHref>
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
              Basic Job Information
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
                  disabled={true}
                  type="text"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={job.title}
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
                  disabled={true}
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  rows="5"
                  placeholder=""
                  id="description"
                  value={job.description}
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
                  disabled={true}
                  type="text"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={job.jobCategory}
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
                  disabled={true}
                  type="text"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={
                    Math.round(Number(job.days)) === 1
                      ? Math.round(Number(job.days)) + " Day ago"
                      : Math.round(Number(job.days)) + " days ago"
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
                {/* <div className="flex flex-row">
                  {job.images?.map((image) => {
                    return (
                      <img
                        src={image}
                        alt="..."
                        style={{ marginTop: 20, marginRight: 10, width: "30%" }}
                      />
                    );
                  })}
                </div> */}
                <ImageList
                  s={{ width: 500, height: 450 }}
                  cols={5}
                  rowHeight={164}
                >
                  {job.images?.map((item, index) => (
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
            Job Created By
          </h6>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                {job.employerFirstName + " " + job.employerLastName}
              </label>
              <div className="flex flex-row">
                {job.employerProfile?.trim().length > 0 ? (
                  <img
                    className="mt-4 mr-2 w-48 h-48 object-center object-fit"
                    src={job.employerProfile}
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
            Bids
          </h6>
          {job?.bids?.length > 0 ? (
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
                      Bid Made By
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-slate-50 text-slate-500 border-slate-100"
                          : "bg-sky-800 text-sky-300 border-sky-700")
                      }
                    >
                      Value
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
                  {job?.bids?.map((bid, index) => {
                    return (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                          {bid.employeeDetails?.profileImage?.url === null ? (
                            <img
                              src={"/assets/img/no-image-icon-23485.png"}
                              className="h-12 w-12 bg-white rounded-full border"
                              alt="..."
                            ></img>
                          ) : (
                            <img
                              src={bid.employeeDetails?.profileImage?.url}
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
                            {bid.employeeDetails?.firstName}{" "}
                            {bid.employeeDetails?.lastName}
                          </span>
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {bid.price} LKR
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {bid.status === BidStatus.PENDING ? (
                            <button
                              className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                              type="button"
                              style={{ backgroundColor: "indigo" }}
                            >
                              {bid.status}
                            </button>
                          ) : bid.status === BidStatus.REJECTED ? (
                            <button
                              className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                              type="button"
                              style={{ backgroundColor: "red" }}
                            >
                              {bid.status}
                            </button>
                          ) : (
                            <button
                              className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                              type="button"
                              style={{ backgroundColor: "green" }}
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
                No bids yet
              </label>
            </div>
          )}
          <hr className="mt-6 border-b-1 border-slate-300" />
          <h6 className="text-slate-400 text-l mt-3 mb-6 font-bold uppercase">
            Reviews
          </h6>
          {job?.reviews?.length > 0 ? (
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Reviewer
                  </label>
                  <div className="text-left flex items-center">
                    {job.reviews[0]?.reviewer?.profileImage === null ? (
                      <img
                        src={"/assets/img/no-image-icon-23485.png"}
                        className="h-24 w-24 bg-white rounded-full border"
                        alt="..."
                      ></img>
                    ) : (
                      <img
                        src={job.reviews[0]?.reviewer?.profileImage}
                        className="h-24 w-24 bg-white rounded-full border"
                        alt="..."
                      ></img>
                    )}{" "}
                    <span
                      className={
                        "ml-3 font-bold " +
                        +(color === "light" ? "text-slate-600" : "text-white")
                      }
                    >
                      {job.reviews[0]?.reviewer?.firstName +
                        " " +
                        job.reviews[0]?.reviewer?.lastName}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Review
                  </label>
                  <textarea
                    disabled={true}
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    rows="5"
                    placeholder=""
                    id="description"
                    value={job.reviews[0]?.review}
                  ></textarea>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="flex flex-col mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Ratings
                  </label>
                  <div className="text-center flex justify-between text-center content-center">
                    <label
                      className="block text-slate-600 text-sm mt-1"
                      htmlFor="grid-password"
                    >
                      Overall Rating
                    </label>
                    <Rating
                      name="text-feedback"
                      value={job.reviews[0]?.rating}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                  </div>
                  <div className="text-center flex justify-between text-center content-center">
                    <label
                      className="block text-slate-600 text-sm mt-1"
                      htmlFor="grid-password"
                    >
                      Communication
                    </label>

                    <Rating
                      name="text-feedback"
                      value={job.reviews[0]?.communication}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                  </div>
                  <div className="text-center flex justify-between text-center content-center">
                    <label
                      className="block text-slate-600 text-sm mt-1"
                      htmlFor="grid-password"
                    >
                      Completion on Time
                    </label>

                    <Rating
                      name="text-feedback"
                      value={job.reviews[0]?.completionOnTime}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                  </div>
                  <div className="text-center flex justify-between text-center content-center">
                    <label
                      className="block text-slate-600 text-sm mt-1"
                      htmlFor="grid-password"
                    >
                      Recommended
                    </label>

                    <Rating
                      name="text-feedback"
                      value={job.reviews[0]?.recommend}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                  </div>
                  <div className="text-center flex justify-between text-center content-center">
                    <label
                      className="block text-slate-600 text-sm mt-1"
                      htmlFor="grid-password"
                    >
                      Service as Described
                    </label>

                    <Rating
                      name="text-feedback"
                      value={job.reviews[0]?.serviceAsDescribed}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                  </div>
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
                    disabled={true}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={job.reviews[0]?.createdAt?.slice(0, 10)}
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
                    l={{ width: 500, height: 550 }}
                    cols={5}
                    variant="quilted"
                    rowHeight={100}
                  >
                    {job.reviews[0]?.images?.map((item, index) => (
                      <ImageListItem key={index}>
                        <img
                          src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                          srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                          alt={"image"}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full lg:w-6/12 px-4">
              <label className="block text-slate-600 text-xs font-bold mb-2">
                No reviews yet
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
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Frequently Asked Questions
              </label>
              <div className="flex flex-col">
                {/* {job.faqs?.length > 0
                  ? job.faqs?.map((faq, index) => {
                      return (
                        <>
                          <h6 className="text-slate-600 text-sm mt-3 mb-6 font-bold">
                            Question {index + 1}: {faq.question}
                          </h6>
                          <h6 className="text-slate-500 text-sm mt-3 mb-6 font-bold">
                            Answer: {faq.answer}
                          </h6>
                        </>
                      );
                    })
                  : "No question provided"} */}
                {job.faqs?.length > 0 ? (
                  job.faqs?.map((faq, index) => {
                    const title = index + 1 + ") " + faq.question;
                    return (
                      <SimpleAccordion
                        key={index}
                        title={title}
                        content={faq.answer}
                      />
                    );
                  })
                ) : (
                  <div className="w-full lg:w-6/12 px-4">
                    <label className="block uppercase text-slate-500 text-xs font-bold mb-2">
                      No Question provided
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-48 mb-24"></div>
        </div>
      </div>
    </>
  );
}

JobsView.defaultProps = {
  color: "light",
};

JobsView.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
