import React from "react";
import Axios from "../../../utils/axios"

// components

import Category from "../../../components/Cards/Category.js";

const Index = ({category}) => {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <Category category={category}/>
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