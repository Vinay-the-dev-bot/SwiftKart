import { Box, Text } from "@chakra-ui/react";

function Profile() {
  return (
    <>
      <Box>
        <Box>
          <Text>VINAY</Text>
          <Text>PH NO</Text>
        </Box>
        <Box>
          <Text>My Address</Text>
          <Box>
            <Text>Address Line 1</Text>
            <Text>Address Line 2</Text>
            <Text>Address Line 3</Text>
            <Text>Zip Code</Text>
          </Box>
        </Box>
        <Box>
          <Text>Order1</Text>
          <Text>Order2</Text>
          <Text>Order3</Text>
          <Text>Order4</Text>
        </Box>
      </Box>
    </>
  );
}

export default Profile;
