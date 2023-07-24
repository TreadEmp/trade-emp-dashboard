import React, { useEffect, useState } from "react";

// components

import CardStats from "../Cards/CardStats.js";

export default function HeaderStats({ details }) {
  const {
    users,
    JobCategories,
    toolCategories,
    equipments,
    experiences,
    jobs,
    jobRequests,
    bids,
  } = details;
  return (
    <>
      {/* Header */}
      <div className="relative bg-sky-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-3/12 xl:w-3/12 px-4 py-4">
                <CardStats
                  statSubtitle="Users"
                  statTitle={users}
                  statArrow="up"
                  // statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  //statDescripiron="Since last month"
                  statIconName="fa fa-user"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-3/12 xl:w-3/12 px-4 py-4">
                <CardStats
                  statSubtitle="Jobs"
                  statTitle={jobs}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fa fa-shopping-bag"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-3/12 xl:w-3/12 px-4 py-4">
                <CardStats
                  statSubtitle="Job Requests"
                  statTitle={jobRequests}
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fa fa-suitcase"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-3/12 xl:w-3/12 px-4 py-4">
                <CardStats
                  statSubtitle="Bids"
                  statTitle={bids}
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fa fa-tags"
                  statIconColor="bg-sky-500"
                />
              </div>
              <div className="w-full lg:w-3/12 xl:w-3/12 px-4 py-4">
                <CardStats
                  statSubtitle="Job Categories"
                  statTitle={JobCategories}
                  statArrow="up"
                  // statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  //statDescripiron="Since last month"
                  statIconName="fa fa-list"
                  statIconColor="bg-emerald-500"
                />
              </div>
              <div className="w-full lg:w-3/12 xl:w-3/12 px-4 py-4">
                <CardStats
                  statSubtitle="Tool Categories"
                  statTitle={toolCategories}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fa fa-gavel"
                  statIconColor="bg-yellow-500"
                />
              </div>
              <div className="w-full lg:w-3/12 xl:w-3/12 px-4 py-4">
                <CardStats
                  statSubtitle="Eqipments"
                  statTitle={equipments}
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fa fa-tag"
                  statIconColor="bg-slate-600"
                />
              </div>
              <div className="w-full lg:w-3/12 xl:w-3/12 px-4 py-4">
                <CardStats
                  statSubtitle="Experiences"
                  statTitle={experiences}
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fa fa-graduation-cap"
                  statIconColor="bg-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
