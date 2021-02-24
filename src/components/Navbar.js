import React from "react";

import fullLogo from "../assets/images/full-logo.png";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Container,
  Image,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Box p={2.5}>
      <Container maxWidth="80%">
        <Flex
          justifyContent={{ base: "center", md: "space-between" }}
          alignItems="center"
        >
          <Link to="/">
            <Image width="256px" src={fullLogo} alt="CodeHub Logo" />
          </Link>
          <ButtonGroup
            size="lg"
            colorScheme="twitter"
            display={{ base: "none", md: "flex" }}
          >
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline">Sign Up</Button>
            </Link>
          </ButtonGroup>
        </Flex>
      </Container>
    </Box>
  );
}
