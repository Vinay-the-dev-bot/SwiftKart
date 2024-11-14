import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { passwordConditions, url } from "../Store/Store.js";
const Signup = () => {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [passwordMatching, setPasswordMatching] = useState([]);
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (password) => {
    var passwordMatch = [];
    const hasLowerCase = /[a-z]/;
    const hasUpperCase = /[A-Z]/;
    const hasDigit = /\d/;
    const hasSpecialChar = /[!@#$%^&*()_+{}:;,.?/~\\|`=<>]/;
    const isValidLength = password.length >= 8;

    if (!hasLowerCase.test(password)) {
      passwordMatch.push("lower");
    }
    if (!hasUpperCase.test(password)) {
      passwordMatch.push("upper");
    }
    if (!hasDigit.test(password)) {
      passwordMatch.push("digit");
    }
    if (!hasSpecialChar.test(password)) {
      passwordMatch.push("special");
    }
    if (!isValidLength) {
      passwordMatch.push("length");
    }
    setPasswordMatching([...passwordMatch]);
    setPassword(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordMatching.length > 0) return;

    try {
      console.log(`${url}/users/register`);
      const response = await axios.post(`${url}/users/register`, {
        name,
        email,
        password: pass,
      });
      console.log(response);
      if (response.data.msg == "Already Registered") {
        setShowModal(true);
        setModalMessage("Already Registrered. Please Login");
      } else {
        setShowModal(true);
        setModalMessage("Registration successful");
      }
    } catch (error) {
      console.log(error);
      setShowModal(true);
      if (error.response && error.response.status === 400) {
        setModalMessage("Email already exists. Please try with another email.");
      } else {
        setModalMessage("Registration failed. Please try again later.");
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (modalMessage === "Registration successful") {
      navigate("/login");
    }
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
    >
      <Box
        p={8}
        width={{ base: "90%", sm: "80%", md: "65%", lg: "45%" }}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        mt={-10}
        backgroundColor="#EDF2F7"
      >
        <form onSubmit={handleSubmit}>
          <Box textAlign="center" mb={4}>
            <h1 style={{ fontSize: "40px", fontWeight: "700" }}>Signup</h1>
          </Box>

          <FormControl id="name" mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              backgroundColor="white"
              placeholder="Enter your username"
              value={name}
              onChange={handleUsername}
            />
          </FormControl>
          <FormControl id="email" mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              backgroundColor="white"
              onChange={handleEmail}
            />
          </FormControl>

          <FormControl id="pass" mb={6}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={pass}
              backgroundColor="white"
              onChange={(e) => handlePassword(e.target.value)}
            />
          </FormControl>
          {passwordMatching && passwordMatching.length > 0 && (
            <ol
              style={{
                backgroundColor: "rgb(242 153 156)",
                border: "1px solid #F2003C",
                padding: "5px",
                borderRadius: "5px",
                marginBottom: "20px",
              }}
            >
              {passwordMatching.map((pass, index) => {
                return (
                  <li>
                    {index + 1}. {passwordConditions[pass]}
                  </li>
                );
              })}
            </ol>
          )}

          <Button
            type="submit"
            disabled={passwordMatching.length > 0}
            width="full"
            backgroundColor="#92C7CF"
          >
            Sign Up
          </Button>
        </form>
      </Box>

      <Modal isOpen={showModal} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registration Status</ModalHeader>
          <ModalBody>{modalMessage}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Signup;
