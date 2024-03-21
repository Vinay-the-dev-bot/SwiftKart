import { Box, Button } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import LoadingToast from "../Components/LoadingToast";
import { useSelector } from "react-redux";
import { url } from "../Store/Store";
import { useNavigate } from "react-router";

function Home() {
  const [products, setProducts] = useState([]);
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  let fetchData = async () => {
    console.log(url);
    let res = await fetch(`${url}/products`);
    let data = await res.json();
    setProducts(data);
    setisLoading(false);
  };
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(
      state.cart.reduce((count, cartItem) => (count += cartItem.count), 0)
    );
  }, [state.cart]);
  useEffect(() => {
    setisLoading(true);
    fetchData();
  }, []);
  return (
    <>
      {isLoading && <LoadingToast message={"Fetching Products..."} />}
      <Box className="flex flex-col gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
      {count && (
        <Box position="fixed" bottom="2rem" right="2rem" zIndex="1000">
          <Button
            onClick={() => navigate("/cart")}
            colorScheme="blue"
            size="lg"
          >
            Go to Cart ({count})
          </Button>
        </Box>
      )}
    </>
  );
}

export default Home;
