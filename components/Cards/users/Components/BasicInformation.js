/*eslint-disable*/
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Axios from "../../../../utils/axios";
import Alerts from "../../Alert";

export default function BasicInformation({ color, id }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const OnFadeAlert = () => {
    setShowAlert(() => {
      return false;
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await Axios.baseInstance({
          url: `/users/admin/${id}`,
          method: "GET",
        });
        setUser(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setMessage("Error occured while fetching basic user information");
        setSeverity("error");
        setShowAlert(() => {
          return true;
        });
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <div className="flex-auto px-4 lg:px-10 py-5">
        <h6 className="text-slate-400 text-l mt-2 mb-2 font-bold uppercase">
          Basic User Information
        </h6>
      </div>
      {showAlert && (
        <div className="flex justify-start px-4 lg:px-10 py-5">
          <Alerts
            message={message}
            severity={severity}
            OnFadeAlert={OnFadeAlert}
          />
        </div>
      )}
      {loading ? (
        <div className="flex justify-center px-4 lg:px-10 py-5">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap ">
            <div className="w-full lg:w-6/12">
              <div className="relative w-full mb-3 lg:px-10">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  {user.firstName + " " + user.lastName}
                </label>
                <div className="flex flex-row">
                  {user.profileImage?.trim().length > 0 ? (
                    <img
                      className="mt-4 w-48 h-48 object-center object-fit"
                      src={user.profileImage}
                      alt="..."
                    />
                  ) : (
                    <img
                      className="mt-4 w-48 h-48 object-center object-fit"
                      src={"/assets/img/blank_profile_2.png"}
                      alt="..."
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3 lg:px-10">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <div className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                  {user.email}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-6/12">
              <div className="relative w-full mb-3 lg:px-10">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Registered on
                </label>
                <div className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                  {user.createdAt?.slice(0, 10)}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3 lg:px-10">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Availability For Job Requests
                </label>
                <div className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                  {user.isAvailable ? "Available" : "Not available"}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-6/12">
              <div className="relative w-full mb-3 lg:px-10">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Is Disabled
                </label>
                <div className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                  {user.disabled === 0 ? "Not disabled" : "Disabled"}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-5">
            <hr className=" border-b-1 border-slate-300" />
            <h6 className="text-slate-400 text-l mt-4 mb-2 font-bold uppercase">
              Contact Information
            </h6>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-5">
            <hr className=" border-b-1 border-slate-300" />
            <h6 className="text-slate-400 text-l mt-4 mb-2 font-bold uppercase">
              Equipments
            </h6>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-5">
            <hr className=" border-b-1 border-slate-300" />
            <h6 className="text-slate-400 text-l mt-4 mb-2 font-bold uppercase">
              Experiences
            </h6>
          </div>
        </>
      )}
    </>
  );
}

BasicInformation.defaultProps = {
  color: "light",
};

BasicInformation.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
