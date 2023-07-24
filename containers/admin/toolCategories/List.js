import React from "react";
import ToolCategoryList from "../../../components/Cards/toolCategories/ToolCategoryList.js";

export default function ToolCategoryListTable({
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
          <ToolCategoryList
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
