import React from "react";
import { createPopper } from "@popperjs/core";
import { useRouter } from "next/router";
import { removeToken } from "../../utils/auth";
import Image from "next/image";

const UserDropdown = ({ user, profile }) => {
  console.log(user);
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const router = useRouter();
  const url = "https://res.cloudinary.com/dyz58jq9o/image/upload/v1680261355/TE-Images/te_dev/user_images/cjihyzhgztfyzjohttlj.jpg";

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const logout = () => {
    removeToken("token");
    router.push("/login");
  };
  return (
    <>
      <a
        className="text-slate-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span
            className="text-white text-sm hidden lg:inline-block font-semibold pr-4"
            // className="w-12 h-12 text-sm text-white pr-8 inline-flex items-center justify-center"
          >
            {user?.role}
            {/* {user?.name + "(" + user?.role + ")"} */}
          </span>
          <span className="w-12 h-12 text-sm text-white bg-slate-200 inline-flex items-center justify-center rounded-full">
            {/* <Image
              alt="..."
              height={48}
              width={48}
              className="w-full rounded-full align-middle border-none shadow-lg"
              // src={profile ? profile : "/assets/img/team-1-800x800.jpg"}
              src={url}
            /> */}
            <img
              src={profile}
              className="h-12 w-12 bg-white rounded-full border"
              alt="..."
              height={48}
              width={48}
            ></img>
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <span className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700">
          {user?.name}
        </span>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
          }
          onClick={(e) => logout()}
        >
          Logout
        </a>
        {/* <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Another action
        </a> */}
        {/* <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Something else here
        </a> */}
        {/* <div className="h-0 my-2 border border-solid border-slate-100" /> */}
        {/* <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Seprated link
        </a> */}
      </div>
    </>
  );
};

export default UserDropdown;
