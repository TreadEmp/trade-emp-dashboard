import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";

export default function Alerts({ severity, message, OnFadeAlert }) {
  const [alertVisibility, setAlertVisibility] = useState(true);

  return (
    <Fade
      in={alertVisibility} //Write the needed condition here to make it appear
      timeout={{ enter: 1000, exit: 1000 }} //Edit these two values to change the duration of transition when the element is getting appeared and disappeard
      addEndListener={() => {
        setTimeout(() => {
          setAlertVisibility(false);
          OnFadeAlert();
        }, 4000);
      }}
    >
      <Alert severity={severity} variant="standard" className="alert">
        {message}
      </Alert>
    </Fade>
  );
}
