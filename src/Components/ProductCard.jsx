import { Box, Img, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increment, decrement } from "../Store/actions";
// const { addToCart, removeFromCart } = require("../Store/actions");
// import { addToCart, removeFromCart } from "../Store/actions";
// const { addToCart } = require("../Store/actions");

export default function ProductCard({ product }) {
  const cart = useSelector((state) => state.cart);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    let ct = cart.find((item) => item.id == product.id);
    setCount(ct && ct.count);
  }, [cart]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  const handleDecrement = () => {
    dispatch(decrement(product));
  };
  const handleIncrement = () => {
    dispatch(increment(product));
  };

  return (
    <>
      {/* <p>{JSON.stringify(cart)}</p> */}
      <Box
        className=" w-4/5 m-auto flex items-center justify-around p-5  rounded-lg "
        key={product.id}
        shadow={
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
        }
      >
        <Box className="w-3/5 flex flex-col gap-2 ">
          <Text>
            <Text as="span">Product Name :</Text>
            {product.title}
          </Text>
          <Text>
            <Text as="span">Product Price :</Text>
            {product.price} Inr
          </Text>
          <Text>
            <Text as="span">Description :</Text> {product.description}
          </Text>
          <Text>
            <Text as="span">Category :</Text>
            {product.category}
          </Text>
          <Text className="font-bold">Ratings</Text>
          <Text>
            {product.rating.rate} Stars | {product.rating.count} Ratings
          </Text>
          {/* {cart[0] && cart[0].id == product.id && cart[0].count > 0 ? (
            <Box className="flex items-center gap-5 ">
              <Button onClick={handleDecrement}>-</Button>
              <Text>{ count}</Text>
              <Button onClick={handleIncrement}>+</Button>
            </Box>
          ) : (
            <Button onClick={handleAddToCart}>Add To Cart</Button>
          )} */}
          {count > 0 ? (
            <Box className="flex items-center gap-5 ">
              <Button onClick={handleDecrement}>-</Button>
              <Text>{count}</Text>
              <Button onClick={handleIncrement}>+</Button>
            </Box>
          ) : (
            <Button width={"fit-content"} onClick={handleAddToCart}>
              Add To Cart
            </Button>
          )}
        </Box>
        <Img
          width={"15%"}
          height={"fit-content"}
          // bg={"transparent"}
          src={`${product.image}`}
          alt={`${product.title} asdas`}
        />
      </Box>
    </>
  );
}
