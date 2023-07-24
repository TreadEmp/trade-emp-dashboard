import React from "react";
import JobsList from "../../../components/Cards/jobs/JobsList.js";

export default function JobsListTable({
  data,
  categories,
  employees,
  status,
  jobCategory,
  employee,
  days,
  handleChange,
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
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <JobsList
            data={data}
            categories={categories}
            employees={employees}
            status={status}
            jobCategory={jobCategory}
            employee={employee}
            days={days}
            handlePaginationChange={handleChange}
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
