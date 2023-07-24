/*eslint-disable*/
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function Ratings({
  color,
  user,
  activeTabIndex,
  setActiveTabIndex,
}) {
  return (
    <>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <div className="mt-3 mb-6">
          <h6 className="text-slate-400 text-l mt-3 mb-6 font-bold uppercase">
            User Ratings
          </h6>
        </div>
      </div>
    </>
  );
}

Ratings.defaultProps = {
  color: "light",
};

Ratings.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
