import React from "react";
import JobCategoryList from "../../../components/Cards/jobCategories/JobCategoryList.js";

export default function JobCategoryListTable({
  data,
  handleChange,
  currentPage,
  pages,
  handleClearFilters,
  setDetails,
  filters,
  activeTabIndex,
  setActiveTabIndex,
  setData,
  onToggle
}) {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <JobCategoryList
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
            onToggle={onToggle}
          />
        </div>
      </div>
    </>
  );
}
