import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLoginStatus } from "../Store/actions";

function NavBar() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const toast = useToast();

  useEffect(() => {
    setCount(
      state.cart.reduce((count, cartItem) => (count += cartItem.count), 0)
    );
  }, [state.cart]);
  return (
    <>
      <Box
        margin={"20px auto"}
        display={"flex"}
        justifyContent={"space-around"}
      >
        <Link to="/">
          Swift
          <Text fontSize={"1.5rem"} as={"span"} color={"red"}>
            Kart
          </Text>
        </Link>
        <Link to="/cart">Cart ({count})</Link>
        {state.isLoggedIn ? (
          <Link to="/profile">{state.name}</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
        {state.isLoggedIn ? (
          <Button
            onClick={() => {
              dispatch(setLoginStatus(false, ""));
              toast({
                description: "Successfully logged out",
                status: "warning",
                duration: 1000,
              });
            }}
          >
            LOGOUT
          </Button>
        ) : (
          <Link to="/signup">Sign Up</Link>
        )}
      </Box>
    </>
  );
}

export default NavBar;
