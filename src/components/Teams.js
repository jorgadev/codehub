import React from "react";

import { Grid } from "@chakra-ui/react";

import Sidebar from "./Sidebar";

export default function Teams() {
  return (
    <Grid className="main-wrapper" gridTemplateColumns="60px auto">
      <Sidebar />
      <p>other stuff</p>
    </Grid>
  );
}
