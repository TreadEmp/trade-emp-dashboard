/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ToolCategoryView({ category }) {
  const router = useRouter();
  const [categoryDetails, setCategoryDetails] = useState({
    category: "",
    image: {
      url: "",
    },
    isDisplayInApp: true,
  });

  useEffect(() => {
    if (category) {
      setCategoryDetails({ ...category });
    }
  }, [category]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-slate-700 text-xl font-bold">
              Job Category View
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <div className="mt-3 mb-6"></div>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Category Name
                </label>
                <input
                  disabled="true"
                  type="text"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={categoryDetails.category}
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Description
                </label>
                <input
                  disabled="true"
                  type="text"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={categoryDetails.description}
                />
              </div>
            </div>
            {/* <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  image
                </label>
                <img
                  src={categoryDetails.image?.url}
                  alt="..."
                  style={{ marginTop: 20, width: "30%" }}
                />
              </div>
            </div> */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Display In APP
                </label>
                <input
                  disabled="true"
                  type="text"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={categoryDetails.isDisplayInApp ? "Yes" : "No"}
                />
              </div>
            </div>
          </div>
          <div className="mt-48 mb-24"></div>
        </div>
      </div>
    </>
  );
}
