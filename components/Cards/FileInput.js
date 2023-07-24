import React from "react";
import Button from "@mui/material/Button";

export default function FileInput({ text, handleChange, type }) {
  return (
    <>
      <input
        id="contained-button-file"
        onChange={(e) => {
          handleChange(e, type);
        }}
        type="file"
        name="video"
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
          {text}
        </Button>
      </label>
    </>
  );
}
