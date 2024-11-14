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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { passwordConditions, url } from "../Store/Store.js";
import { setLoginStatus } from "../Store/actions.js";
import LoadingToast from "../Components/LoadingToast.jsx";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setisLoading] = useState(false);
  const [passwordMatching, setPasswordMatching] = useState([]);

  function validatePassword(password) {
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
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !pass) {
      toast({
        description: "Please Provide Credentials",
        status: "warning",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    setisLoading(true);

    try {
      const response = await axios.post(`${url}/users/login`, {
        email,
        password: pass,
      });
      if (response.status === 200) {
        setisLoading(false);
        console.log(response.data.name);
        const token = response.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch(setLoginStatus(true, response.data.name));
        toast({
          description: "Successfully logged in",
          status: "success",
          duration: 1000,
        });
        navigate("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      setModalMessage("Please register yourself");
      setShowModal(true);
      setisLoading(false);
      console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {isLoading && <LoadingToast message={"Logging In"} />}
      <Flex
        color="black"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        marginTop="-70px"
      >
        <Box
          p={8}
          width={{ base: "80%", sm: "80%", md: "60%", lg: "45%" }}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          backgroundColor="#EDF2F7"
        >
          <Box textAlign="center" mb={4}>
            <h1 style={{ fontSize: "40px", fontWeight: "700" }}>Login</h1>
          </Box>
          <form onSubmit={handleSubmit}>
            <FormControl id="email" mb={4}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                backgroundColor="white"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" mb={6}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                backgroundColor="white"
                placeholder="Enter your password"
                value={pass}
                onChange={(e) => validatePassword(e.target.value)}
              />
              {passwordMatching && passwordMatching.length > 0 && (
                <ol
                  style={{
                    backgroundColor: "rgb(242 153 156)",
                    border: "1px solid #F2003C",
                    padding: "5px",
                    borderRadius: "5px",
                    marginBottom: "20px 0",
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
            </FormControl>

            <Button width="full" type="submit" backgroundColor="#92C7CF">
              Log In
            </Button>
          </form>
        </Box>

        {/* Modal */}
        <Modal isOpen={showModal} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login Status</ModalHeader>
            <ModalBody>{modalMessage}</ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={closeModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
};

export default Login;
