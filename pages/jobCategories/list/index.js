import React, { useState, useEffect } from "react";
import JobCategories from "../../../containers/admin/jobCategories";
import Axios from "../../../utils/axios";

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(0);
  const [filters, setFilters] = useState({
    category: "",
  });

  const handleClearFilters = () => {
    setFilters({ category: "" });
  };

  const setDetails = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value.toString().trim(),
    });
  };

  const onToggle = (id, index) => {
    var categoryArray = data;
    // console.log(
    //   "companyArray[index].isEnabled : " + companyArray[index].isEnabledid
    // );
    // console.log(
    //   "!companyArray[index].isEnabled : " + !companyArray[index].isEnabled
    // );
    categoryArray[index].isDisplayInApp = !data[index].isDisplayInApp;
    setData(() => [...categoryArray]);
    Axios.baseInstance({
      method: "PUT",
      url: `/job-categories`,
      data: { ...categoryArray[index] },
    })
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    Axios.baseInstance({
      url: `/job-categories?page=${currentPage}&pageSize=10&category=${filters.category}`,
      method: "GET",
    })
      .then((resp) => {
        setData(resp.data.data.items);
        setPages(resp.data.data.pagination.pages);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [currentPage, filters]);

  const handlePaginationChange = (e, p) => {
    setCurrentPage(p);
  };

  return (
    <>
      <JobCategories
        categories={data}
        handlePaginationChange={handlePaginationChange}
        currentPage={currentPage}
        pages={pages}
        handleClearFilters={handleClearFilters}
        setDetails={setDetails}
        filters={filters}
        setData={setData}
        onToggle={onToggle}
      />
    </>
  );
};

Index.layout = "Admin";
Index.auth = true;
export default Index;
