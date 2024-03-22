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
  const [selected, setSelected] = useState("");
  const [isLoading, setisLoading] = useState(false);
  let fetchData = async (category) => {
    console.log(category);
    setSelected(category);
    let res = await fetch(`${url}/products?category=${category}`);
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
      <Box className="w-4/5 flex justify-between px-5 py-2 m-auto">
        <Button
          onClick={() => fetchData()}
          colorScheme={`${selected == undefined ? "red" : "gray"}`}
        >
          All Products
        </Button>
        <Button
          onClick={() => fetchData("jewelery")}
          colorScheme={`${selected === "jewelery" ? "red" : "gray"}`}
        >
          Jewelery
        </Button>
        <Button
          onClick={() => fetchData("electronics")}
          colorScheme={`${selected === "electronics" ? "red" : "gray"}`}
        >
          Electronics
        </Button>
        <Button
          onClick={() => fetchData("men's clothing")}
          colorScheme={`${selected === "men's clothing" ? "red" : "gray"}`}
        >
          Men's Clothing
        </Button>
        <Button
          onClick={() => fetchData("women's clothing")}
          colorScheme={`${selected === "women's clothing" ? "red" : "gray"}`}
        >
          Women's Clothing
        </Button>
      </Box>
      <Box className="flex  flex-wrap gap-5 p-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>

      {count > 0 && (
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
