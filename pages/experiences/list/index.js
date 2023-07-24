import React, { useState, useEffect } from "react";
import Experiences from "../../../containers/admin/experiences";
import Axios from "../../../utils/axios";

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(0);
  const [filters, setFilters] = useState({
    name: "",
  });
  const [categories, setCategory] = useState([]);

  const handleClearFilters = () => {
    setFilters({ name: "" });
  };

  const setDetails = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value.toString().trim(),
    });
  };

  const onToggle = (id, index) => {
    var equipmentArray = data;
    equipmentArray[index].isDisplayInApp = !data[index].isDisplayInApp;
    setData(() => [...equipmentArray]);

    Axios.baseInstance({
      method: "PUT",
      url: `/equipments`,
      data: { ...equipmentArray[index] },
    })
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.baseInstance({
          url: `/experiences?page=${currentPage}&pageSize=10&name=${filters.name}`,
          method: "GET",
        });
        setData(res.data.data.items);
        setPages(res.data.data.pagination.pages);

        const cat = await Axios.baseInstance({
          url: `/job-categories?page=1&pageSize=1000`,
          method: "GET",
        });
        const formattedCategories = cat.data.data.items.map((item) => {
          return {
            value: item.id,
            label: item.category,
          };
        });
        setCategory(formattedCategories);
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
      <Experiences
        equipments={data}
        categories={categories}
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
