import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

const SimplePopOver = ({
  index,
  content,
  open,
  anchorEl,
  anchorOriginVertical,
  anchorOriginHorizontal,
  transformOriginVertical,
  transformOriginHorizontal,
  popoverEnter,
  popoverLeave,
  className,
  classes,
}) => {
  console.log(content);
  return (
    <Popover
      id={index}
      sx={{
        pointerEvents: "none",
      }}
      className={className}
      classes={classes}
      open={open}
      anchorEl={() => anchorEl}
      keepMounted={false}
      anchorOrigin={{
        vertical: anchorOriginVertical,
        horizontal: anchorOriginHorizontal,
      }}
      transformOrigin={{
        vertical: transformOriginVertical,
        horizontal: transformOriginHorizontal,
      }}
      disableRestoreFocus={false}
      PaperProps={{ onMouseEnter: popoverEnter, onMouseLeave: popoverLeave }}
    >
      <Typography sx={{ p: 1 }}>{content}</Typography>
    </Popover>
  );
};

export default SimplePopOver;
