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
    setTotalAmount(amount);
  }, [cart]);
  return (
    <>
      <>
        <Box className="flex flex-col gap-5">
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

          <Box className="w-3/5 p-5 m-auto flex justify-around ">
            <Button>Total Price : {totalAmount} ₹</Button>
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
                  colorScheme="blue"
                  width={"fit-content"}
                >
                  Place Order
                </Button>
              )
            ) : (
              <Button onClick={() => navigate("/login")} width={"fit-content"}>
                Please Login to order
              </Button>
            )}
          </Box>
        </Box>
      </>
    </>
  );
}

export default Cart;
