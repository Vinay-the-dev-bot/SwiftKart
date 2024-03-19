import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function NavBar() {
  const cart = useSelector((state) => state.cart);
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(cart.reduce((count, cartItem) => (count += cartItem.count), 0));
  }, [cart]);
  return (
    <>
      <Box
        margin={"20px auto"}
        display={"flex"}
        justifyContent={"space-around"}
      >
        <Link to="/">HOME</Link>
        <Link to="/cart">Cart ({count})</Link>
      </Box>
    </>
  );
}

export default NavBar;
