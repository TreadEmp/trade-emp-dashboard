import React from "react";
import UserListTable from "./List.js";
import Auth from "../../Auth";

export default function Users({
  users,
  handlePaginationChange,
  currentPage,
  pages,
  handleClearFilters,
  setDetails,
  filters,
  activeTabIndex,
  setActiveTabIndex,
  setData,
}) {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <UserListTable
            data={users}
            handleChange={handlePaginationChange}
            currentPage={currentPage}
            pages={pages}
            handleClearFilters={handleClearFilters}
            setDetails={setDetails}
            filters={filters}
            activeTabIndex={activeTabIndex}
            setActiveTabIndex={setActiveTabIndex}
            setData={setData}
          />
        </div>
      </div>
    </>
  );
}
