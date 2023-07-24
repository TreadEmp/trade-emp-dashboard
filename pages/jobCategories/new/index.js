import React from "react";
import Axios from "../../../utils/axios"

// components

import JobCategory from "../../../components/Cards/jobCategories/JobCategory.js";

const Index = ({category}) => {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <JobCategory category={category}/>
        </div>
       
      </div>
    </>
  );
}


export async function getServerSideProps(ctx) {
  return {
    props: {
      category: [],
    },
  };
}

Index.layout = "Admin";
Index.auth = true;
export default Index;