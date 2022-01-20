import React from "react";
import { Box, Button } from "@mui/material";

function Buttons({ start, wait, stop, reset }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        p: "1rem  0",
        m: "0 auto",
        width: "50%",
      }}
    >
      <Button
        color={"success"}
        size={"small"}
        variant={"contained"}
        ref={start}
      >
        start
      </Button>

      <Button color={"error"} size={"small"} variant={"contained"} ref={stop}>
        stop
      </Button>

      <Button color={"warning"} size={"small"} variant={"contained"} ref={wait}>
        wait
      </Button>

      <Button color={"error"} size={"small"} variant={"contained"} ref={reset}>
        reset
      </Button>
    </Box>
  );
}

export { Buttons };
