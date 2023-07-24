import React, { useState, useEffect } from "react";
import Axios from "../../../utils/axios";
import JobRequestView from "../../../components/Cards/jobRequests/JobRequestView.js";

const Index = ({ id }) => {
  const [data, setData] = useState({});
  useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await Axios.baseInstance({
            url: `/job-requests/admin/${id}`,
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
          <JobRequestView jobRequest={data} />
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
