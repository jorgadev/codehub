import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useDatabase } from "../contexts/DatabaseContext";
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
  const DEFAULT_AVATAR =
    "https://firebasestorage.googleapis.com/v0/b/codehub-d9f87.appspot.com/o/default-avatar.png?alt=media&token=fa42c6b4-8b7f-489d-b73b-efb0d0326475";

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, signup } = useAuth();
  const { DB_insertNewData } = useDatabase();
  const history = useHistory();

  // User can't reach register page if he is already logged in
  if (currentUser) {
    history.push("/dashboard");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      // Get currentUser instance and save in newUser
      const newUserData = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      // Create new user for firestore
      const newUser = {
        id: newUserData.user.uid,
        avatar: DEFAULT_AVATAR,
        username: newUserData.user.email.split("@")[0],
      };
      // Add new user to firestore
      await DB_insertNewData("users", newUser);
      history.push("/dashboard");
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
        <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
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
