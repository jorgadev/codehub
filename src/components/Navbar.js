import React from "react";

import fullLogo from "../assets/images/full-logo.png";
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
          <Image width="256px" src={fullLogo} alt="CodeHub Logo" />
          <ButtonGroup
            size="lg"
            colorScheme="twitter"
            display={{ base: "none", md: "flex" }}
          >
            <Button>Log In</Button>
            <Button variant="outline">Sign Up</Button>
          </ButtonGroup>
        </Flex>
      </Container>
    </Box>
  );
}
