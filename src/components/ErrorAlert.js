import React from "react";

import {
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

export default function ErrorAlert({ error, setError }) {
  function closeAlert() {
    setError("");
  }

  return (
    <Alert status="error" mb={5}>
      <AlertIcon />
      <AlertDescription>{error}</AlertDescription>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={closeAlert}
      />
    </Alert>
  );
}
