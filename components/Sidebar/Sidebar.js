/*eslint-disable*/
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { sidebarItems } from "./SidebarItems";

import NotificationDropdown from "../Dropdowns/NotificationDropdown.js";
import UserDropdown from "../Dropdowns/UserDropdown.js";

export default function Sidebar({ currentLocation }) {
  console.log(currentLocation);
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            passHref
            className="md:block text-left md:pb-2 text-slate-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            href="/"
          >
            <img
              src={"/assets/img/te.png"}
              alt="..."
              className="w-auto h-13 rounded"
            ></img>
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-slate-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-slate-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    href="/"
                  >
                    Navigation
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid  border-slate-500 placeholder-slate-300 text-slate-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-slate-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Navigation
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {sidebarItems.map((item, index) => {
                return (
                  <li key={index} className=" items-center cursor-pointer">
                    <Link href={item.value}>
                      <div
                        className={
                          "text-xs uppercase py-5 font-bold block flex justify-center" +
                          (currentLocation === `${item.value}`
                            ? "text-sky-500 hover:text-sky-600"
                            : "text-slate-700 hover:text-slate-500")
                        }
                      >
                        <i
                          className={
                            `${item.icon} text-xs h-6` +
                            (currentLocation === `${item.value}`
                              ? "text-sky-500 opacity-75 hover:text-sky-600"
                              : "text-slate-700 hover:text-slate-500")
                          }
                        ></i>{""}
                        <p
                          className={
                            "text-xs ml-4 uppercase font-bold block " +
                            (currentLocation === `${item.value}`
                              ? "text-sky-500 hover:text-sky-600"
                              : "text-slate-700 hover:text-slate-500")
                          }
                        >
                          {item.label}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
              {/* <li className="my-4 items-center cursor-pointer">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (currentLocation === "/dashboard"
                      ? "text-sky-500 hover:text-sky-600"
                      : "text-slate-700 hover:text-slate-500")
                  }
                  href="/dashboard"
                >
                  <>
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (currentLocation === "/dashboard"
                          ? "opacity-75"
                          : "text-slate-300")
                      }
                    ></i>{" "}
                    <Link href="/dashboard">Companies</Link>
                  </>
                </Link>
              </li> */}
              {/* <li className="my-4 items-center cursor-pointer">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (currentLocation === "/contacts"
                      ? "text-sky-500 hover:text-sky-600"
                      : "text-slate-700 hover:text-slate-500")
                  }
                  href="/contacts"
                >
                  <>
                    <i
                      className={
                        "fas fa-address-card mr-2 text-sm " +
                        (currentLocation === "/contacts"
                          ? "opacity-75"
                          : "text-slate-300")
                      }
                    ></i>{" "}
                    <Link href="/contacts">Contacts</Link>
                  </>
                </Link>
              </li> */}
            </ul>
            {/* <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="my-4 items-center cursor-pointer">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (currentLocation === "/vouchers/list"
                      ? "text-sky-500 hover:text-sky-600"
                      : "text-slate-700 hover:text-slate-500")
                  }
                  href="/vouchers"
                >
                  <>
                    <i
                      className={
                        "fas fa-address-card mr-2 text-sm " +
                        (currentLocation === "/vouchers/list"
                          ? "opacity-75"
                          : "text-slate-300")
                      }
                    ></i>{" "}
                    <Link href="/vouchers/list">Vouchers</Link>
                  </>
                </Link>
              </li>
            </ul>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="my-4 items-center cursor-pointer">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (currentLocation === "/categories/list"
                      ? "text-sky-500 hover:text-sky-600"
                      : "text-slate-700 hover:text-slate-500")
                  }
                  href="/categories"
                >
                  <>
                    <i
                      className={
                        "fas fa-address-card mr-2 text-sm " +
                        (currentLocation === "/categories/list"
                          ? "opacity-75"
                          : "text-slate-300")
                      }
                    ></i>{" "}
                    <Link href="/categories/list">Categories</Link>
                  </>
                </Link>
              </li>
            </ul>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="my-4 items-center cursor-pointer">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (currentLocation === "/categoryIcons/list"
                      ? "text-sky-500 hover:text-sky-600"
                      : "text-slate-700 hover:text-slate-500")
                  }
                  href="/categoryIcons"
                >
                  <>
                    <i
                      className={
                        "fas fa-address-card mr-2 text-sm " +
                        (currentLocation === "/categoryIcons/list"
                          ? "opacity-75"
                          : "text-slate-300")
                      }
                    ></i>{" "}
                    <Link href="/categoryIcons/list">Category Icons</Link>
                  </>
                </Link>
              </li>
            </ul>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="my-4 items-center cursor-pointer">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (currentLocation === "/contributors/list"
                      ? "text-sky-500 hover:text-sky-600"
                      : "text-slate-700 hover:text-slate-500")
                  }
                  href="/contributors"
                >
                  <>
                    <i
                      className={
                        "fas fa-address-card mr-2 text-sm " +
                        (currentLocation === "/contributors/list"
                          ? "opacity-75"
                          : "text-slate-300")
                      }
                    ></i>{" "}
                    <Link href="/contributors/list">Contributors</Link>
                  </>
                </Link>
              </li>
            </ul>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="my-4 items-center cursor-pointer">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (currentLocation === "/countries/list"
                      ? "text-sky-500 hover:text-sky-600"
                      : "text-slate-700 hover:text-slate-500")
                  }
                  href="/countries"
                >
                  <>
                    <i
                      className={
                        "fas fa-address-card mr-2 text-sm " +
                        (currentLocation === "/countries/list"
                          ? "opacity-75"
                          : "text-slate-300")
                      }
                    ></i>{" "}
                    <Link href="/countries/list">Countries</Link>
                  </>
                </Link>
              </li>
            </ul>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="my-4 items-center cursor-pointer">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (currentLocation === "/votes/list"
                      ? "text-sky-500 hover:text-sky-600"
                      : "text-slate-700 hover:text-slate-500")
                  }
                  href="/votes"
                >
                  <>
                    <i
                      className={
                        "fas fa-address-card mr-2 text-sm " +
                        (currentLocation === "/votes/list"
                          ? "opacity-75"
                          : "text-slate-300")
                      }
                    ></i>{" "}
                    <Link href="/votes/list">Votes</Link>
                  </>
                </Link>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
    </>
  );
}
