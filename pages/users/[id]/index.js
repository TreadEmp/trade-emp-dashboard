import React, { useState, useEffect } from "react";
import Axios from "../../../utils/axios";
import Category from "../../../components/Cards/Category.js";

const Index = ({ id }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const url = `/admin/categories?id=${id}`;
    const method = "GET";
    Axios({
      url,
      method,
    })
      .then((resp) => {
        setData(resp.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <Category category={data} />
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
