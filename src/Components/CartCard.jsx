import { Box, Img, Text, Button } from "@chakra-ui/react";

import { decrement, increment, removeFromCart } from "../Store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function CartCard({ product }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  useEffect(() => {
    let ct = cart.find((item) => item.id == product.id);
    setCount(ct && ct.count);
  }, [cart]);
  return (
    <>
      <Box
        className=" w-4/5 m-auto flex justify-around p-5  rounded-lg "
        key={product.id}
        shadow={
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
        }
      >
        <Box className="w-3/5 flex flex-col justify-around gap-2">
          <Text>
            <Text as="span">Product Name :</Text>
            {product.title}
          </Text>
          <Text>
            <Text as="span">Product Price :</Text>
            {product.price} Inr
          </Text>

          <Box className="w-3/5 flex justify-between">
            {count > 0 && (
              <Box className="flex items-center gap-5 ">
                <Button onClick={() => dispatch(decrement(product))}>-</Button>
                <Text>{count}</Text>
                <Button onClick={() => dispatch(increment(product))}>+</Button>
              </Box>
            )}
            <Button onClick={() => dispatch(removeFromCart(product))}>
              Remove From Cart
            </Button>
          </Box>
        </Box>
        <Img
          width={"15%"}
          height={"fit-content"}
          src={`${product.image}`}
          alt={`${product.title} asdas`}
        />
      </Box>
    </>
  );
}
