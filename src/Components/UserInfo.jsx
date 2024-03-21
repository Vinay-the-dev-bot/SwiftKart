import { Box, Text } from "@chakra-ui/react";

const UserInfo = () => {
  const userData = {
    name: "John Doe",
    phoneNumber: "123-456-7890",
    email: "john@example.com",
  };

  return (
    <Box>
      <Text>Name: {userData.name}</Text>
      <Text>Phone Number: {userData.phoneNumber}</Text>
      <Text>Email: {userData.email}</Text>
    </Box>
  );
};

export default UserInfo;
