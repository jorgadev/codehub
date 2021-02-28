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

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, currentUser } = useAuth();
  const history = useHistory();

  // User can't reach login page if he is already logged in
  if (currentUser) {
    history.push("/dashboard");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/dashboard");
    } catch {
      setError("Failed to log in");
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
          <Heading size="lg" mb={10}>
            Log In
          </Heading>
          {error && <ErrorAlert error={error} setError={setError} />}
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input ref={emailRef} required type="email" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input ref={passwordRef} required type="password" />
          </FormControl>
          <Center mt={10}>
            <Button
              disabled={loading}
              type="submit"
              colorScheme="twitter"
              w="100%"
            >
              Login
            </Button>
          </Center>
          <Text textAlign="center" mt={5}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </Text>
        </form>
        <Text textAlign="center" mt={5}>
          Need an account? <Link to="/signup">Sign Up</Link>
        </Text>
      </Container>
    </Flex>
  );
}
