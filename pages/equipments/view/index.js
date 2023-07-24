import React, { useState, useEffect } from "react";
import Axios from "../../../utils/axios";
import EquipmentsView from "../../../components/Cards/equipments/EquipmentsView.js";

const Index = ({ id }) => {
  const [data, setData] = useState([]);
  const [categories, setCategory] = useState([]);
  useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await Axios.baseInstance({
            url: `/equipment/${id}`,
            method: "GET",
          });
          setData(res.data.data);
  
          const cat = await Axios.baseInstance({
            url: `/tool-categories?page=1&pageSize=1000`,
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
          <EquipmentsView equipment={data} categories={categories} />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const id = ctx.query.id;
  return {
    props: {
      id: id,
    },
  };
}

Index.layout = "Admin";
Index.auth = true;
export default Index;
