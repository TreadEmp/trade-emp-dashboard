import React from "react";
import ExperiencesList from "../../../components/Cards/experiences/ExperiencesList.js";

export default function ExperiencesListTable({
  data,
  categories,
  handleChange,
  currentPage,
  pages,
  handleClearFilters,
  setDetails,
  filters,
  setData,
  onToggle
}) {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <ExperiencesList
            data={data}
            categories={categories}
            handlePaginationChange={handleChange}
            currentPage={currentPage}
            pages={pages}
            handleClearFilters={handleClearFilters}
            setDetails={setDetails}
            filters={filters}
            setData={setData}
            onToggle={onToggle}
          />
        </div>
      </div>
    </>
  );
}
