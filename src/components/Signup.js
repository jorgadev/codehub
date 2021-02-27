import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

import ErrorAlert from "./ErrorAlert";

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

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/index");
    } catch {
      setError("Failed to create an account");
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
        <form className="auth-form" onSubmit={handleSubmit}>
          <Heading mb={10}>Sign Up</Heading>
          {error && <ErrorAlert error={error} setError={setError} />}
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input ref={emailRef} required type="email" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input ref={passwordRef} required type="password" />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm password</FormLabel>
            <Input ref={confirmPasswordRef} required type="password" />
          </FormControl>
          <Center mt={10}>
            <Button
              disabled={loading}
              type="submit"
              colorScheme="twitter"
              w="100%"
            >
              Sign Up
            </Button>
          </Center>
        </form>
        <Text textAlign="center" mt={5}>
          Already have an account? <Link to="/login">Login</Link>
        </Text>
      </Container>
    </Flex>
  );
}
