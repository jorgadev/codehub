import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useDatabase } from "../contexts/DatabaseContext";
import {
  Grid,
  Box,
  Heading,
  Divider,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Button,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Image,
} from "@chakra-ui/react";
import Autosuggest from "react-autosuggest";

import AddIcon from "@material-ui/icons/Add";
import Sidebar from "./Sidebar";

export default function Teams() {
  const [teams, setTeams] = useState(null);
  const [teamMembers, setTeamMembers] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const { currentUser } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { DB_getDocumentById, DB_getDocumentsFromCollection } = useDatabase();

  useEffect(() => {
    fetchUser();
    fetchAllUsers();
    setTeams(testTeams);
  }, []);

  // Fetch current user
  const fetchUser = () => {
    DB_getDocumentById("users", currentUser.uid).then((res) => {
      setUser(res);
      setTeamMembers([res.username]);
    });
  };

  // Fetch all users
  const fetchAllUsers = () => {
    DB_getDocumentsFromCollection("users").then((res) => {
      setAllUsers(res);
    });
  };

  // Teach Autosuggest how to calculate suggestions for any given input value.
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : allUsers
          .filter(
            (oneUser) =>
              oneUser.username !== user.username &&
              !teamMembers.includes(oneUser.username)
          )
          .filter(
            (user) =>
              user.username.toLowerCase().slice(0, inputLength) === inputValue
          );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = (suggestion) => suggestion.username;

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion) => (
    <Grid
      className="suggestion-container"
      templateColumns="50px auto"
      alignItems="center"
    >
      <Image src={suggestion.avatar} />
      <Text>{suggestion.username}</Text>
    </Grid>
  );

  const onChange = (event, { newValue }) => {
    const usernames = allUsers.map((user) => user.username);
    if (
      usernames.includes(newValue) &&
      newValue !== user.username &&
      !teamMembers.includes(newValue)
    ) {
      const newMember = newValue;
      setTeamMembers([...teamMembers, newMember]);
      setValue("");
    } else {
      setValue(newValue);
    }
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: "Start typing username..",
    value,
    onChange,
  };

  const handleRemoveMember = async (idx) => {
    const filteredTeamMembers = teamMembers.filter(
      (member) => teamMembers.indexOf(member) !== idx
    );
    setTeamMembers(filteredTeamMembers);
  };

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
        px={5}
        height="100%"
        overflowY="scroll"
        position="relative"
      >
        <Heading as="h1" size="lg">
          Teams
        </Heading>
        <Divider mt={3} />
        <Flex wrap="wrap">
          {teams &&
            teams.map((team) => {
              return (
                <Box my={5} mr={5} className="team-box" key={team.id}>
                  <Box bg={team.color} className="team-logo">
                    {(team.name[0] + team.name[1]).toUpperCase()}
                  </Box>
                  <Text mt={3} fontSize="lg">
                    {team.name.toUpperCase()}
                  </Text>
                </Box>
              );
            })}
          <Box my={5} bg="gray.100" className="add-team-box" onClick={onOpen}>
            <AddIcon />
          </Box>
        </Flex>
        <Modal isOpen={isOpen} isCentered="true" size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create New Team</ModalHeader>
            <Divider />
            <ModalBody mt={3} pb={6}>
              <FormControl>
                <FormLabel>Team Name</FormLabel>
                <Input placeholder="ex. Teamzy" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Members</FormLabel>
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={onSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  inputProps={inputProps}
                />
              </FormControl>
              <HStack spacing={1} mt={5}>
                {teamMembers &&
                  teamMembers.map((member, idx) => (
                    <Tag
                      borderRadius="full"
                      variant="solid"
                      colorScheme="twitter"
                      key={member}
                    >
                      <TagLabel>{member}</TagLabel>
                      {member !== user.username ? (
                        <TagCloseButton
                          onClick={() => handleRemoveMember(idx)}
                        />
                      ) : null}
                    </Tag>
                  ))}
              </HStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="twitter" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Grid>
  );
}

const testTeams = [
  {
    id: "1",
    name: "Team One",
    color: "#44771d",
    creator: "dtW3GfbB3KTgIyynCJlO3QmHrrF2",
    members: ["dtW3GfbB3KTgIyynCJlO3QmHrrF2", "9ao3Lhyhf4cuIo80V3kF6ng9Gd93"],
  },
  {
    id: "2",
    name: "Team Two",
    color: "#abdabd",
    creator: "dtW3GfbB3KTgIyynCJlO3QmHrrF2",
    members: ["dtW3GfbB3KTgIyynCJlO3QmHrrF2"],
  },
];
