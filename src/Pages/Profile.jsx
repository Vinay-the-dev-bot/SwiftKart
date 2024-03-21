import { Box, Divider, Heading } from "@chakra-ui/react";
import UserInfo from "../Components/UserInfo";
import Address from "../Components/Address";
import OrdersComp from "../Components/OrdersComp";

function Profile() {
  return (
    //   box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    <>
      <Box
        className="w-4/5 p-5 m-auto "
        shadow={
          "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;"
        }
      >
        <Heading as="h1" size="xl" mb={4}>
          My Profile
        </Heading>

        <Box mb={8}>
          <Heading as="h2" size="lg" mb={4}>
            User Information
          </Heading>
          <UserInfo />
        </Box>

        <Divider mb={8} />

        <Box mb={8}>
          <Heading as="h2" size="lg" mb={4}>
            Saved Addresses
          </Heading>
          <Address />
        </Box>

        <Divider mb={8} />

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Previous Orders
          </Heading>
          <OrdersComp />
        </Box>
      </Box>
    </>
  );
}

export default Profile;
