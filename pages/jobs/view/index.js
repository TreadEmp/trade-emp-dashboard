import React, { useState, useEffect } from "react";
import Axios from "../../../utils/axios";
import JobsView from "../../../components/Cards/jobs/JobsView.js";

const Index = ({ id }) => {
  const [data, setData] = useState({});
  const [categories, setCategory] = useState([]);
  useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await Axios.baseInstance({
            url: `/jobs/admin/${id}`,
            method: "GET",
          });
          setData(res.data.data);
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
          <JobsView job={data} />
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
