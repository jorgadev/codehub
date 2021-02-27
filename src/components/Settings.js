import React from "react";

import { Grid } from "@chakra-ui/react";

import Sidebar from "./Sidebar";

export default function Settings() {
  return (
    <Grid
      className="main-wrapper"
      gridTemplateColumns={{ base: "auto", md: "60px auto" }}
      gridTemplateRows={{ base: "auto 60px", md: "none" }}
    >
      <Sidebar />
      <p>other stuff</p>
    </Grid>
  );
}
