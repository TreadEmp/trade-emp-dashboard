/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

export default function ImageViewModal(props) {
  const router = useRouter();
  const { handleClose, title, images, color, ...other } = props;
  console.log(images);
  return (
    <Dialog
      PaperProps={{
        sx: {
          width: "80%",
          minWidth: "40%",
          maxHeight: 700,
        },
      }}
      onClose={handleClose}
      {...other}
    >
      <DialogTitle>
        <div className="text-center flex justify-between">
          <h6 className="text-slate-700 text-xl font-bold">{title}</h6>

          <IconButton onClick={handleClose} size="small">
            <DeleteIcon fontSize="inherit" color="error"/>
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        {/* <DialogContent dividers> */}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-auto px-4">
            <ImageList
              l={{ width: 500, height: 550 }}
              cols={3}
              variant="quilted"
              rowHeight={100}
            >
              {images?.map((item, index) => (
                <ImageListItem key={index}>
                  <img
                    src={`${item}?w=500&h=500&fit=crop&auto=format`}
                    srcSet={`${item}?w=500&h=500&fit=crop&auto=format&dpr=2 2x`}
                    alt={"image"}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </div>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

ImageViewModal.defaultProps = {
  color: "light",
};

ImageViewModal.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
