import { VStack, Button, Text, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router";

function OrderSuccess() {
  const navigate = useNavigate();
  return (
    <>
      <Box
        alignItems={"center"}
        padding={"50px"}
        className="flex flex-col gap-10"
      >
        <Text fontSize="2xl">Thank You for Your Order!</Text>
        <Text>Your order will be delivered within 5 Days.</Text>
        <Button colorScheme="blue" onClick={() => navigate("/")}>
          Continue Shopping
        </Button>
      </Box>
    </>
  );
}

export default OrderSuccess;
