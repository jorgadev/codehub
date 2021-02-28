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

export default function UpdateProfile() {
  const DEFAULT_AVATAR =
    "https://firebasestorage.googleapis.com/v0/b/codehub-d9f87.appspot.com/o/default-avatar.png?alt=media&token=fa42c6b4-8b7f-489d-b73b-efb0d0326475";

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, updateEmail, updatePassword, logout } = useAuth();
  const { DB_insertNewData } = useDatabase();
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    // Create array of promises so you can update email and password
    const promises = [];
    setError("");
    setLoading(true);

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/dashboard");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
        handleLogout();
      });
  }

  async function handleLogout() {
    await logout();
    history.push("/login");
  }

  return (
    <Flex justifyContent="center" alignItems="center" my={5}>
      <Container>
        <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
          <Heading mb={10} textAlign="center">
            Update Profile
          </Heading>
          {error && <ErrorAlert error={error} setError={setError} />}
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              ref={emailRef}
              required
              type="email"
              defaultValue={currentUser.email}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              ref={passwordRef}
              type="password"
              placeholder="Leave blank to keep the same"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm password</FormLabel>
            <Input
              ref={confirmPasswordRef}
              type="password"
              placeholder="Leave blank to keep the same"
            />
          </FormControl>
          <Center mt={10}>
            <Button
              disabled={loading}
              type="submit"
              colorScheme="twitter"
              w="100%"
            >
              Update
            </Button>
          </Center>
        </form>
        <Text textAlign="center" mt={5}>
          <Button
            variant="ghost"
            colorScheme="red"
            onClick={() => handleLogout()}
          >
            Log Out
          </Button>
        </Text>
      </Container>
    </Flex>
  );
}
