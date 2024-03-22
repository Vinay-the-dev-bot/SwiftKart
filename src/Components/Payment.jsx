import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { clearCart } from "../Store/actions";

const Payment = ({ setSuccess }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [otp, setOtp] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (cardNumber.length != 16) {
      toast({
        description: "Please Enter Valid Card Number",
        status: "warning",
        duration: 1000,
      });
      return;
    }
    if (cvv.length != 3) {
      toast({
        description: "Please Enter Valid CVV",
        status: "warning",
        duration: 1000,
      });
      return;
    }
    if (!expirationDate.includes("/")) {
      toast({
        description: "Please Enter Valid Expiration Date",
        status: "warning",
        duration: 1000,
      });
      return;
    }

    setSubmitted(true);
  };
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp == "1863") {
      dispatch(clearCart());
      toast({
        description: "Payment SuccessFull",
        status: "success",
        duration: 1000,
      });
      setSuccess(true);
    } else {
      toast({
        description: "Please Enter correct OTP",
        status: "warning",
        duration: 1000,
      });
    }
  };

  return (
    <>
      <Box className=" w-full flex justify-around ">
        <form onSubmit={handlePaymentSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl id="cardNumber">
              <FormLabel>Card Number</FormLabel>
              <Input
                type="text"
                name="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </FormControl>
            <FormControl id="expirationDate">
              <FormLabel>Expiration Date</FormLabel>
              <Input
                type="text"
                name="expirationDate"
                value={expirationDate}
                onChange={(e) => setExpDate(e.target.value)}
              />
            </FormControl>
            <FormControl id="cvv">
              <FormLabel>CVV</FormLabel>
              <Input
                type="password"
                name="cvv"
                value={cvv}
                onChange={(e) => setCVV(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue">
              Submit Payment
            </Button>
          </VStack>
        </form>
        <Box>
          {submitted && (
            <form onSubmit={handleOtpSubmit}>
              <VStack spacing={4} align="stretch">
                <Text fontSize="xl">Enter OTP</Text>
                <FormControl id="otp">
                  <Input
                    type="password"
                    value={otp}
                    onChange={handleOtpChange}
                  />
                </FormControl>
                <Button type="submit" colorScheme="green">
                  Verify OTP
                </Button>
              </VStack>
            </form>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Payment;
