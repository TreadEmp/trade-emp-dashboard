import React from "react";
import JobRequestListTable from "./List.js";
import Auth from "../../Auth.js";

export default function Equipments({
  jobs,
  categories,
  employees,
  status,
  jobCategory,
  employee,
  days,
  handlePaginationChange,
  currentPage,
  pages,
  handleClearFilters,
  setDetails,
  filters,
  setData,
  handleStatusChange,
  handleJobCategoryChange,
  handleEmployeeChange,
  handleAddressChange,
  handleDaysChange
}) {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <JobRequestListTable
            data={jobs}
            categories={categories}
            employees={employees}
            status={status}
            jobCategory={jobCategory}
            employee={employee}
            days={days}
            handleChange={handlePaginationChange}
            currentPage={currentPage}
            pages={pages}
            handleClearFilters={handleClearFilters}
            setDetails={setDetails}
            filters={filters}
            setData={setData}
            handleStatusChange={handleStatusChange}
            handleJobCategoryChange={handleJobCategoryChange}
            handleEmployeeChange={handleEmployeeChange}
            handleAddressChange={handleAddressChange}
            handleDaysChange={handleDaysChange}
          />
        </div>
      </div>
    </>
  );
}
