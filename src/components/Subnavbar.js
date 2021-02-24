import { Center } from "@chakra-ui/react";
import React from "react";

export default function Subnavbar() {
  return (
    <Center
      bg="blue.400"
      color="white"
      py={1}
      textAlign="center"
      fontSize={{ base: "md", md: "lg" }}
    >
      Improve your team experience with new features.
    </Center>
  );
}
