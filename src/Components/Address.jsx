import { Box, Text } from "@chakra-ui/react";

const Address = () => {
  const addresses = [
    {
      addressLine1: "123 Main St",
      addressLine2: "",
      city: "Anytown",
      state: "State",
      zipCode: "12345",
    },
    {
      addressLine1: "456 Elm St",
      addressLine2: "Apt 2B",
      city: "Othertown",
      state: "State",
      zipCode: "54321",
    },
  ];

  return (
    <Box>
      {addresses.map((address, index) => (
        <Box key={index} mb={4}>
          <Text>{address.addressLine1}</Text>
          {address.addressLine2 && <Text>{address.addressLine2}</Text>}
          <Text>
            {address.city}, {address.state} {address.zipCode}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default Address;
