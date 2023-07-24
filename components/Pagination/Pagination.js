import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationRounded({handleChange, count, page}) {
  return (
    <div
      className="grid justify-items-center"
      //   display="flex"
      //   bgcolor="lightgreen"
      //   alignItems="center"
      //   justifyContent="center"
    >
      <Stack spacing={1}>
        <Pagination 
        count={count}
        onChange={handleChange}
        page={page}
        shape="rounded" 
        color="primary" />
      </Stack>
    </div>
  );
}
