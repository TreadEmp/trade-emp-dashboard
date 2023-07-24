import React, { useState, useEffect } from "react";
import Users from "../../../containers/admin/users";
import Axios from "../../../utils/axios";

const Index = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(0);
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [locationName, setLocationName] = useState("");

  const handleClearFilters = () => {
    setFilters({ lastName: "", firstName: "", email: "" });
    setLocationName("");
  };

  const setDetails = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value.toString().trim(),
    });
    setLocationName(e.target.value.toString().trim());
  };

  useEffect(() => {
    if (activeTabIndex === 0) {
      Axios.authInstance({
        url: `/users?page=${currentPage}&pageSize=10&firstName=${filters.firstName}&lastName=${filters.lastName}&email=${filters.email}`,
        method: "GET",
      })
        .then((resp) => {
          setData(resp.data.data.users);
          setPages(resp.data.data.pagination.pages);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      Axios.authInstance({
        url: `/users?page=${currentPage}&pageSize=10&firstName=${filters.firstName}&lastName=${filters.lastName}&email=${filters.email}`,
        method: "GET",
      })
        .then((resp) => {
          setData(resp.data.data.users);
          setPages(resp.data.data.pagination.pages);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [currentPage, filters, activeTabIndex]);

  const handlePaginationChange = (e, p) => {
    setCurrentPage(p);
  };

  return (
    <>
      <Users
        users={data}
        handlePaginationChange={handlePaginationChange}
        currentPage={currentPage}
        pages={pages}
        handleClearFilters={handleClearFilters}
        setDetails={setDetails}
        filters={filters}
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
        setData={setData}
      />
    </>
  );
};

Index.layout = "Admin";
Index.auth = true;
export default Index;
