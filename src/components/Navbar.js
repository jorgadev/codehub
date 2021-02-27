import React from "react";
import { useAuth } from "../contexts/AuthContext";

import fullLogo from "../assets/images/full-logo.png";
import { Link, useHistory } from "react-router-dom";

import {
  Box,
  Flex,
  Container,
  Image,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    await logout();
    history.push("/login");
  }

  return (
    <Box p={2.5}>
      <Container maxWidth="80%">
        <Flex
          justifyContent={{ base: "center", md: "space-between" }}
          alignItems="center"
        >
          <Link to="/">
            <Image width="200px" src={fullLogo} alt="CodeHub Logo" />
          </Link>
          <ButtonGroup
            colorScheme="twitter"
            display={{ base: "none", md: "flex" }}
          >
            {!currentUser ? (
              <>
                <Link to="/login">
                  <Button>Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline">Sign Up</Button>
                </Link>
              </>
            ) : (
              <Button variant="outline" onClick={handleLogout}>
                Log Out
              </Button>
            )}
          </ButtonGroup>
        </Flex>
      </Container>
    </Box>
  );
}
