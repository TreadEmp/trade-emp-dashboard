import React from "react";
import JobRequestList from "../../../components/Cards/jobRequests/JobRequestList.js";

export default function JobRequestListTable({
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
          <JobRequestList
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
