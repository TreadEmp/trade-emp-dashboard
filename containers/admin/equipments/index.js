import React from "react";
import EquipmentsListTable from "./List.js";
import Auth from "../../Auth.js";

export default function Equipments({
  equipments,
  categories,
  handlePaginationChange,
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
      <div className="flex flex-wrap">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <EquipmentsListTable
            data={equipments}
            categories={categories}
            handleChange={handlePaginationChange}
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
