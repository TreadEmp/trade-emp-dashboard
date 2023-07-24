/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import _ from "lodash";
import Axios from "../../../utils/axios";
import Creatable from "react-select/creatable";
import Button from "@mui/material/Button";
import Alerts from "../Alert";

export const displayInApp = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];

export default function JobCategory({ category }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  let [image, setImage] = useState({
    id: "",
    name: "",
    type: "",
    url: "",
    size: "",
    uploadedAt: "",
  });
  const [categoryDetails, setCategoryDetails] = useState({
    id: "",
    category: "",
    isDisplayInApp: true,
    image: "",
    description: "",
  });

  const [isDisplayInApp, setIsDisplayInApp] = useState({
    value: "",
    label: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  useEffect(() => {
    if (category) {
      const lable = category.isDisplayInApp === true ? "Yes" : "No";
      setCategoryDetails({ ...category });
      setImage(category.image);
      setIsDisplayInApp({
        value: category.isDisplayInApp,
        label: lable,
      });
    }
  }, [category]);

  const handleDisplayInAppChange = (newValue, actionMeta) => {
    if (newValue)
      setIsDisplayInApp({ label: newValue.label, value: newValue.value });
  };

  let handleFileChange = async (event) => {
    // let { url } = await uploadToS3(file);
    // setImageUrl(url);
    const file = event.target.files;
    const formData = new FormData();
    formData.append("uploadedFiles", file[0]);

    Axios.baseInstance({
      method: "POST",
      url: `/job-categories/uploads`,
      data: formData,
    })
      .then((res) => {
        setMessage("Image was uploaded successfully");
        setSeverity("success");
        setShowAlert(() => {
          return true;
        });
        setImage(res.data.data[0]);
      })
      .catch((e) => {
        setMessage("Image uploaded failed");
        setSeverity("error");
        setShowAlert(() => {
          return true;
        });
        console.log(e);
      });
  };

  const setDetails = (e, key) => {
    setCategoryDetails((details) => {
      return { ...details, [key]: e.target.value };
    });
  };

  const onSave = () => {
    setLoading(true);

    const url = "/job-categories";
    const method = categoryDetails.id ? `PUT` : "POST";
    // const stringValue = categoryDetails.category
    //   .trim()
    //   .toLowerCase()
    //   .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "_");
    categoryDetails.isDisplayInApp = isDisplayInApp.value;
    // categoryDetails.value = stringValue;
    Axios.baseInstance({
      url,
      data: { ...categoryDetails, image: image },
      method,
    })
      .then((resp) => {
        setMessage("New job category created successfully");
        setSeverity("success");
        setShowAlert(() => {
          return true;
        });
        setLoading(false);
        router.push("/jobCategories/list");
      })
      .catch((e) => {
        setMessage("Error occured while creating new job category");
        setSeverity("error");
        setShowAlert(() => {
          return true;
        });
        console.log(e);
        setLoading(false);
      });
  };

  const OnFadeAlert = () => {
    setShowAlert(() => {
      return false;
    });
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-slate-700 text-xl font-bold">
              {categoryDetails._id ? "Job Category Edit" : "New Job Category"}
            </h6>

            <button
              className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={onSave}
            >
              {loading && <i className="fas fa-spinner"></i>}{" "}
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
          {showAlert && (
            <Alerts
              message={message}
              severity={severity}
              OnFadeAlert={OnFadeAlert}
            />
          )}
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
                  type="text"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={categoryDetails.category}
                  onChange={(e) => {
                    setDetails(e, "category");
                  }}
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
                  type="text"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={categoryDetails.description}
                  onChange={(e) => {
                    setDetails(e, "description");
                  }}
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Image
                </label>
                {/* <div>
                  <FileInput onChange={handleFileChange} />

                  <button
                    onClick={openFileDialog}
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    Select image
                  </button>

                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="image"
                      style={{ marginTop: 20, width: "30%" }}
                    />
                  )}
                </div> */}
                <div>
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    onChange={(e) => {
                      handleFileChange(e);
                    }}
                    type="file"
                    name="images"
                    multiple={false}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      component="span"
                      size="large"
                      style={{
                        color: "#71717a",
                        backgroundColor: "#FFFFFF",
                        width: "698px",
                      }}
                    >
                      Select Image
                    </Button>
                  </label>

                  <div style={{ display: "flex" }}>
                    <img
                      src={image?.url}
                      alt="image"
                      style={{ marginTop: 20, width: "30%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Display in APP
                </label>
                <Creatable
                  value={displayInApp.filter(function (option) {
                    return option.value === isDisplayInApp.value;
                  })}
                  onChange={handleDisplayInAppChange}
                  options={displayInApp}
                  className="border-0 px-3 py-1 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
          </div>
          {/* <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Icon
                </label>
                <div>
                  <FileInput onChange={handleIconChange} />

                  <button
                    onClick={openFileDialog}
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    Select icon
                  </button>

                  {iconUrl && (
                    <img
                      src={iconUrl}
                      alt="icon"
                      style={{ marginTop: 20, width: "47px" }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div> */}
          <div className="mt-48 mb-24"></div>
        </div>
      </div>
    </>
  );
}
