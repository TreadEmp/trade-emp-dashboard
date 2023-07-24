import React from "react";
import UserList from "../../../components/Cards/users/UserList.js";

export default function UserListTable({
  data,
  handleChange,
  currentPage,
  pages,
  handleClearFilters,
  setDetails,
  filters,
  activeTabIndex,
  setActiveTabIndex,
  setData
}) {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <UserList
            data={data}
            handlePaginationChange={handleChange}
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
