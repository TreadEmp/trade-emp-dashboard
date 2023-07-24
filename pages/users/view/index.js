import React, { useState, useEffect } from "react";
import Axios from "../../../utils/axios";
import UsersView from "../../../components/Cards/users/UsersView.js";

const Index = ({ id }) => {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <UsersView id={id} />
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
