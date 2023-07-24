import React, { useState, useEffect } from "react";
import Axios from "../../../utils/axios";

// components

import Experiences from "../../../components/Cards/experiences/Experiences.js";

const Index = ({ experience }) => {
  const [categories, setCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
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
  }, []);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <Experiences experience={experience} categories={categories} />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  return {
    props: {
      experience: [],
    },
  };
}

Index.layout = "Admin";
Index.auth = true;
export default Index;
