import { Box, Text, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "../Components/CartCard";
import { useEffect, useState } from "react";
import { orderPrice } from "../Store/actions";
import { useNavigate } from "react-router";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  let dispatch = useDispatch();
  useEffect(() => {
    let amount = cart.reduce((amount, item) => {
      console.log(item);
      return item.count > 0
        ? (amount += (item.count || 1) * item.price)
        : (amount += 0);
    }, 0);
    console.log(amount);
    setTotalAmount(amount);
  }, [cart]);
  return (
    <>
      <>
        <p>{JSON.stringify(state)}</p>
        <Box className="flex flex-col gap-5">
          <Text>Total Amount : {totalAmount}</Text>

          {totalAmount > 0 ? (
            cart.map((product) => {
              return (
                product.count > 0 && (
                  <CartCard key={product.id} product={product} />
                )
              );
            })
          ) : (
            <Text>Add Items to Cart</Text>
          )}

          {state.isLoggedIn ? (
            totalAmount == 0 ? (
              <Button onClick={() => navigate("/")} width={"fit-content"}>
                Add Items
              </Button>
            ) : (
              <Button
                onClick={() => {
                  navigate("/order");
                  dispatch(orderPrice(totalAmount));
                }}
                width={"fit-content"}
              >
                Order Items
              </Button>
            )
          ) : (
            <Button onClick={() => navigate("/login")} width={"fit-content"}>
              Please Login to order
            </Button>
          )}
        </Box>
      </>
    </>
  );
}

export default Cart;
