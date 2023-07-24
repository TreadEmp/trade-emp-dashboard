/*eslint-disable*/
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Link from "next/link";
import SimpleAccordion from "../../Accordion/Accordion";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { JobRequestAcceptanceStatus } from "../../../utils/enums/enums";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import { bottom } from "@popperjs/core";
import DeleteIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Rating from "@mui/material/Rating";

const options = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
  "Oberon",
  "Phobos",
  "Pyxis",
  "Sedna",
  "Titania",
  "Triton",
  "Umbriel",
];

export default function JobRequestReviewModal(props) {
  const router = useRouter();
  const { handleClose, data, color, ...other } = props;
  return (
    <Dialog
      PaperProps={{
        sx: {
          width: "80%",
          minWidth: "60%",
          maxHeight: 700,
        },
      }}
      onClose={handleClose}
      {...other}
    >
      <DialogTitle>
        <div className="text-center flex justify-between">
          <h6 className="text-slate-700 text-xl font-bold">
            Job Request Review
          </h6>

          <IconButton onClick={handleClose}>
            <DeleteIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        {/* <DialogContent dividers> */}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Reviewer
              </label>
              <div className="text-left flex items-center">
                {data.reviewer?.profileImage === null ? (
                  <img
                    src={"/assets/img/no-image-icon-23485.png"}
                    className="h-24 w-24 bg-white rounded-full border"
                    alt="..."
                  ></img>
                ) : (
                  <img
                    src={data.reviewer?.profileImage}
                    className="h-24 w-24 bg-white rounded-full border"
                    alt="..."
                  ></img>
                )}{" "}
                <span
                  className={
                    "ml-3 font-bold " +
                    +(color === "light" ? "text-slate-600" : "text-white")
                  }
                >
                  {data.reviewer?.firstName + " " + data.reviewer?.lastName}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Review
              </label>
              <textarea
                disabled="true"
                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                rows="5"
                placeholder=""
                id="description"
                value={data.review}
              ></textarea>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-col mb-3">
            <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Ratings
              </label>
              <div className="text-center flex justify-between text-center content-center">
                <label
                  className="block text-slate-600 text-sm mt-1"
                  htmlFor="grid-password"
                >
                  Overall Rating
                </label>
                <Rating
                  name="text-feedback"
                  value={data.rating}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </div>
              <div className="text-center flex justify-between text-center content-center">
                <label
                  className="block text-slate-600 text-sm mt-1"
                  htmlFor="grid-password"
                >
                  Communication
                </label>

                <Rating
                  name="text-feedback"
                  value={data.communication}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </div>
              <div className="text-center flex justify-between text-center content-center">
                <label
                  className="block text-slate-600 text-sm mt-1"
                  htmlFor="grid-password"
                >
                  Completion on Time
                </label>

                <Rating
                  name="text-feedback"
                  value={data.completionOnTime}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </div>
              <div className="text-center flex justify-between text-center content-center">
                <label
                  className="block text-slate-600 text-sm mt-1"
                  htmlFor="grid-password"
                >
                  Recommended
                </label>

                <Rating
                  name="text-feedback"
                  value={data.recommend}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </div>
              <div className="text-center flex justify-between text-center content-center">
                <label
                  className="block text-slate-600 text-sm mt-1"
                  htmlFor="grid-password"
                >
                  Service as Described
                </label>

                <Rating
                  name="text-feedback"
                  value={data.rating}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Created At
              </label>
              <input
                disabled="true"
                type="text"
                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value={data.createdAt?.slice(0, 10)}
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Images
              </label>
              <ImageList
                l={{ width: 500, height: 550 }}
                cols={5}
                variant="quilted"
                rowHeight={100}
              >
                {data.images?.map((item, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={"image"}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

JobRequestReviewModal.defaultProps = {
  color: "light",
};

JobRequestReviewModal.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
