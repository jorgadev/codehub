import React, { useState, useEffect } from "react";

import {
  Grid,
  Box,
  Heading,
  Divider,
  Container,
  Image,
  Center,
  Spinner,
  Flex,
} from "@chakra-ui/react";

import Sidebar from "./Sidebar";
import Avatar from "./Avatar";
import UpdateProfile from "./UpdateProfile";

export default function Settings() {
  return (
    <Grid
      className="main-wrapper"
      gridTemplateColumns={{ base: "auto", md: "60px auto" }}
      gridTemplateRows={{ base: "auto 60px", md: "none" }}
    >
      <Sidebar />
      <Box
        className="content-wrapper"
        p={2.5}
        height="100%"
        overflowY="scroll"
        position="relative"
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          className="spinner-container"
        ></Flex>
        <Heading as="h1" size="lg">
          Settings
        </Heading>
        <Divider my={3} />
        <Container py={5}>
          <Avatar />
          <UpdateProfile />
        </Container>
      </Box>
    </Grid>
  );
}
