import React from "react";

import { Grid, Box, Heading, Divider } from "@chakra-ui/react";

import Sidebar from "./Sidebar";

export default function Projects() {
  return (
    <Grid
      className="main-wrapper"
      gridTemplateColumns={{ base: "auto", md: "60px auto" }}
      gridTemplateRows={{ base: "auto 60px", md: "none" }}
    >
      <Sidebar />
      <Box className="content-wrapper" p={2.5}>
        <Heading as="h1" size="lg">
          Projects
        </Heading>
        <Divider my={3} />
      </Box>
    </Grid>
  );
}
