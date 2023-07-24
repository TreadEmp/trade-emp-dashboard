import React, { useState, useEffect } from "react";
import Axios from "../../../utils/axios";
import JobCategoryView from "../../../components/Cards/jobCategories/JobCategoryView.js";

const Index = ({ id }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const url = `/job-category/${id}`;
    const method = "GET";
    Axios.baseInstance({
      url,
      method,
    })
      .then((resp) => {
        setData(resp.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <JobCategoryView category={data} />
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
