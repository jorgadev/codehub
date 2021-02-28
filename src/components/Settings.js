import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

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
import UpdateProfile from "./UpdateProfile";
import { useDatabase } from "../contexts/DatabaseContext";

export default function Settings() {
  const { currentUser } = useAuth();
  const { DB_getDocumentById } = useDatabase();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    DB_getDocumentById("users", currentUser.uid).then((res) => {
      setUser(res);
      setIsLoading(false);
    });
  }, []);

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
        {isLoading ? (
          <Flex
            justifyContent="center"
            alignItems="center"
            className="spinner-container"
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Flex>
        ) : (
          <>
            <Heading as="h1" size="lg">
              Settings
            </Heading>
            <Divider my={3} />
            <Container>
              <Center mt={10}>
                <Image
                  borderRadius="full"
                  boxSize="128px"
                  src={user.avatar}
                  alt="Avatar"
                />
              </Center>
              <UpdateProfile />
            </Container>
          </>
        )}
      </Box>
    </Grid>
  );
}
