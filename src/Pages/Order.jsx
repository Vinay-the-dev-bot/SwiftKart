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
  const [success, setSuccess] = useState(false);
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
        <Box className="flex   gap-2 flex-col ">
          {/* <Text>Items Ordering</Text> */}

          {state.cart.map((item) => (
            <Box
              border={"1px solid black"}
              // boxShadow={
              //   " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"
              // }
              className="w-3/5 px-10 py-2 m-auto rounded flex"
            >
              <Box className="w-1/3">{item.title} </Box>
              <Box className="w-1/3">
                <Text as={"span"}>Quantity : </Text>
                {item.count}
              </Box>
              <Box className="w-1/3">Price : {item.count * item.price} ₹</Box>
            </Box>
          ))}
          <Box className="w-3/5 text-right px-16 m-auto ">
            Total Order Amount :{state.orderPrice}
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
