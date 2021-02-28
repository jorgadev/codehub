import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";

import {
  Flex,
  Container,
  FormControl,
  FormLabel,
  Input,
  Center,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";

export default function Login() {
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, resetPassword } = useAuth();
  const history = useHistory();

  // User can't reach forgot password page if he is already logged in
  if (currentUser) {
    history.push("/dashboard");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setSuccess("Check your inbox for further informations");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 135px)"
    >
      <Container>
        <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
          <Heading mb={10}>Password Reset</Heading>
          {error && <ErrorAlert error={error} setError={setError} />}
          {success && (
            <SuccessAlert success={success} setSuccess={setSuccess} />
          )}
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input ref={emailRef} required type="email" />
          </FormControl>
          <Center mt={10}>
            <Button
              disabled={loading}
              type="submit"
              colorScheme="twitter"
              w="100%"
            >
              Send Link
            </Button>
          </Center>
          <Text textAlign="center" mt={5}>
            <Link to="/login">Login</Link>
          </Text>
        </form>
      </Container>
    </Flex>
  );
}
