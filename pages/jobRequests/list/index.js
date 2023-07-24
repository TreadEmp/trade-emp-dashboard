import React, { useState, useEffect } from "react";
import JobRequest from "../../../containers/admin/jobRequests";
import Axios from "../../../utils/axios";

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(0);
  const [filters, setFilters] = useState({
    title: "",
    status: "",
    category: "",
    employerId: "",
    longitude: "",
    latitude: "",
    radius: "",
    days: "",
  });
  const [categories, setCategory] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState({
    value: "",
    label: "",
  });
  const [jobCategory, setJobCategory] = useState({
    value: "",
    label: "",
  });

  const [employee, setEmployee] = useState({
    value: "",
    label: "",
  });

  const [days, setDays] = useState({
    value: "",
    label: "",
  });

  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const setDetails = (e, key) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value.toString().trim(),
    });
  };

  const handleStatusChange = (newValue, actionMeta) => {
    if (newValue) setStatus({ label: newValue.label, value: newValue.value });
    setFilters({
      ...filters,
      status: newValue.value,
    });
  };

  const handleJobCategoryChange = (newValue, actionMeta) => {
    if (newValue)
      setJobCategory({ label: newValue.label, value: newValue.value });
    setFilters({
      ...filters,
      category: newValue.value,
    });
  };

  const handleEmployeeChange = (newValue, actionMeta) => {
    if (newValue) setEmployee({ label: newValue.label, value: newValue.value });
    setFilters({
      ...filters,
      employerId: newValue.value,
    });
  };

  const handleAddressChange = (coordinates, actionMeta) => {
    console.log(coordinates);
    if (coordinates) {
      setLongitude(coordinates[0]);
      setLatitude(coordinates[1]);
    }
    setFilters({
      ...filters,
      longitude: coordinates[0],
      latitude: coordinates[1],
    });
  };

  const handleDaysChange = (newValue, actionMeta) => {
    if (newValue) setDays({ label: newValue.label, value: newValue.value });
    setFilters({
      ...filters,
      days: newValue.value,
    });
  };

  const handleClearFilters = () => {
    setTitle("");
    setStatus({ label: "", value: "" });
    setJobCategory({ label: "", value: "" });
    setEmployee({ label: "", value: "" });
    setDays({ label: "", value: "" });
    setFilters({
      title: "",
      status: "",
      category: "",
      employerId: "",
      longitude: "",
      latitude: "",
      radius: "",
      days: "",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.baseInstance({
          // url: `/jobs?page=${currentPage}&pageSize=10&title=${filters.title}&status=${filters.status}&category=${filters.category}&location=${filters.location}&employerId=${filters.employerId}`,
          url: `/job-requests/admin?page=${currentPage}&pageSize=10&title=${filters.title}&status=${filters.status}&category=${filters.category}&longitude=${filters.longitude}&latitude=${filters.latitude}&radius=${filters.radius}&employerId=${filters.employerId}&days=${filters.days}`,
          method: "GET",
        });
        setData(res.data.data.items);
        setPages(res.data.data.pagination.pages);

        const cat = await Axios.baseInstance({
          url: `/job-categories?page=1&pageSize=1000`,
          method: "GET",
        });
        const employees = await Axios.baseInstance({
          url: `/user/admin-job-filter`,
          method: "GET",
        });
        const formattedCategories = cat.data.data.items.map((item) => {
          return {
            value: item.id,
            label: item.category,
          };
        });
        setCategory(formattedCategories);
        const formattedEmployees = employees.data.data.map((item) => {
          return {
            value: item.userId,
            label: item.name,
          };
        });
        setEmployees(formattedEmployees);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentPage, filters]);

  const handlePaginationChange = (e, p) => {
    setCurrentPage(p);
  };

  return (
    <>
      <JobRequest
        jobs={data}
        categories={categories}
        employees={employees}
        status={status}
        jobCategory={jobCategory}
        employee={employee}
        days={days}
        handlePaginationChange={handlePaginationChange}
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
    </>
  );
};

Index.layout = "Admin";
Index.auth = true;
export default Index;
