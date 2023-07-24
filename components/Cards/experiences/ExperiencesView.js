/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ExperiencesView({ experience, categories }) {
  const router = useRouter();
  const [experienceDetails, setExperienceDetails] = useState({
    category: "",
    name: "",
    description: "",
    isDisplayInApp: true,
  });
  const [category, setCategory] = useState({
    value: "",
    label: "",
  });

  useEffect(() => {
    if (experience) {
      setExperienceDetails({ ...experience });
      categories.map((cat) => {
        if (experienceDetails.category === cat.value) {
          setCategory({
            value: cat.value,
            label: cat.label,
          });
        }
      });
    }
  }, [experience, categories]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-slate-700 text-xl font-bold">Experience View</h6>
            <Link href="/experiences/list" passHref>
              <button
                className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
              >
                Back
              </button>
            </Link>
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
                  Name
                </label>
                <input
                  disabled="true"
                  type="text"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={experienceDetails.name}
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
                  value={experienceDetails.description}
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Category
                </label>
                <input
                  disabled="true"
                  type="text"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={category.label}
                />
              </div>
            </div>
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
                  value={experienceDetails.isDisplayInApp ? "Yes" : "No"}
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
