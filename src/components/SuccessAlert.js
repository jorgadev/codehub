import React from "react";

import {
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

export default function SuccessAlert({ success, setSuccess }) {
  function closeAlert() {
    setSuccess("");
  }

  return (
    <Alert status="success" mb={5}>
      <AlertIcon />
      <AlertDescription>{success}</AlertDescription>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={() => closeAlert()}
      />
    </Alert>
  );
}
