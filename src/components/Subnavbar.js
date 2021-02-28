import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

import { Box, Text, Flex } from "@chakra-ui/react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

export default function Subnavbar() {
  const { currentUser } = useAuth();
  const history = useHistory();

  console.log(currentUser);

  return (
    <Box bg="blue.400" color="white" py={1} px={3}>
      {!currentUser ? (
        <Text textAlign="center">
          Improve your team experience with new features.
        </Text>
      ) : (
        <Flex justifyContent="space-between">
          <ArrowBackIosIcon
            onClick={() => history.goBack()}
            className="back-icon"
          />
          <Text color="gray.100">
            Logged in as{" "}
            <span className="subnavbar-username">
              {currentUser.email.split("@")[0]}
            </span>
          </Text>
        </Flex>
      )}
    </Box>
  );
}
