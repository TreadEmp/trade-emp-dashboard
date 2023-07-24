/*eslint-disable*/
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Link from "next/link";
import SimpleAccordion from "../../Accordion/Accordion";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import {
  BidStatus,
  JobRequestAcceptanceStatus,
} from "../../../utils/enums/enums";

import BasicInformation from "./Components/BasicInformation.js";
import Ratings from "./Components/Ratings.js";
import Bids from "./Components/Bids.js";
import JobAcceptance from "./Components/JobAcceptance.js";
import Jobs from "./Components/Jobs.js";
import JobRequests from "./Components/JobRequests.js";
export default function UsersView({
  color,
  id,
  user,
}) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const router = useRouter();
  const tabsData = [
    {
      label: "Basic Information",
    },
    {
      label: "Ratings & Reviews",
    },
    {
      label:
        "Bids by " + (user?.firstName !== undefined ? user?.firstName : "User"),
    },
    {
      label:
        "Jobs Accepted by " +
        (user?.firstName !== undefined ? user?.firstName : "User"),
    },
    {
      label:
        "Jobs by " + (user?.firstName !== undefined ? user?.firstName : "User"),
    },
    {
      label:
        "Job Requests by " +
        (user?.firstName !== undefined ? user?.firstName : "User"),
    },
  ];

  const renderSwitch = (param) => {
    switch (param) {
      case 0:
        return <BasicInformation id={id} />;
      case 1:
        return <Ratings />;
      case 2:
        return <Bids id={id} />;
      case 3:
        return <JobAcceptance id={id} />;
      case 4:
        return <Jobs id={id} />;
      case 5:
        return <JobRequests id={id} />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-slate-700 text-xl font-bold">User View</h6>
            <Link href="/users/list" passHref>
              <button
                className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
              >
                Back
              </button>
            </Link>
          </div>
        </div>
        <div className="m-4">
          <div className="flex space-x-3 border-b">
            {tabsData.map((tab, idx) => {
              return (
                <button
                  key={idx}
                  className={`active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ${
                    idx === activeTabIndex
                      ? "bg-sky-500 text-white "
                      : "border-transparent"
                  } ${idx !== activeTabIndex ? "text-slate-700" : ""}`}
                  onClick={() => setActiveTabIndex(idx)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
        {renderSwitch(activeTabIndex)}
      </div>
    </>
  );
}

UsersView.defaultProps = {
  color: "light",
};

UsersView.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
