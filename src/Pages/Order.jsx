import { Box, Text, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import Payment from "../Components/Payment";
import OrderSuccess from "../Components/OrderSuccess";

function Order() {
  const state = useSelector((state) => state);
  const [payment, setPayment] = useState(false);
  const [street, setStreet] = useState("");
  const [success, setSuccess] = useState(true);
  const toast = useToast();
  const [city, setCity] = useState("");
  const [addressState, setAddressState] = useState("");
  const [zip, setZip] = useState("");

  const handleAddressDetails = (e) => {
    e.preventDefault();
    if (!street || !city || !addressState || !zip) {
      toast({
        description: "Please Provide Correct Address",
        status: "warning",
        duration: 1000,
      });
    } else {
      setPayment(true);
    }
  };
  return (
    <>
      {success ? (
        <OrderSuccess />
      ) : (
        <Box className="flex flex-col gap-5">
          {/* <Box>Total Order Amount{state.orderPrice}</Box> */}
          <Box>
            {/* <Text>Items Ordering</Text> */}
            <Box>
              {state.cart.map((item) => (
                <Box className="w-3/5 p-2 m-auto flex">
                  <Box className="w-3/5">{item.title} </Box>
                  <Box className="w-1/5">{item.count} </Box>
                  <Box className="w-1/5">{item.count * item.price} </Box>
                </Box>
              ))}
              <Box className="w-3/5 p-2 m-auto flex">
                <Box className="w-4/5 text-right px-10 ">
                  Total Order Amount :{" "}
                </Box>
                <Box className="w-1/5">{state.orderPrice} </Box>
              </Box>
            </Box>
          </Box>
          <Box width={"50%"} margin={"auto"}>
            <form onSubmit={handleAddressDetails}>
              <VStack spacing={4} align="stretch">
                <FormControl id="street">
                  <FormLabel>Street Address</FormLabel>
                  <Input
                    type="text"
                    name="street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </FormControl>
                <FormControl id="city">
                  <FormLabel>City</FormLabel>
                  <Input
                    type="text"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </FormControl>
                <FormControl id="state">
                  <FormLabel>State</FormLabel>
                  <Input
                    type="text"
                    name="state"
                    value={addressState}
                    onChange={(e) => setAddressState(e.target.value)}
                  />
                </FormControl>
                <FormControl id="zip">
                  <FormLabel>ZIP Code</FormLabel>
                  <Input
                    type="text"
                    name="zip"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </FormControl>
              </VStack>
            </form>
          </Box>
          <Box className="w-1/2 p-2 m-auto   px-10 flex">
            <Button
              onClick={handleAddressDetails}
              colorScheme="blue"
              className="w-1/2 flex m-auto  "
            >
              Make Payment
            </Button>
          </Box>
          <Box width={"50%"} className="    m-auto  ">
            {payment && <Payment setSuccess={setSuccess} />}
          </Box>
        </Box>
      )}
    </>
  );
}

export default Order;
