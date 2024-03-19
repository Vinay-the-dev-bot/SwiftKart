import { Box } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  let fetchData = async () => {
    let res = await fetch("https://fakestoreapi.com/products");
    let data = await res.json();
    setProducts(data);
  };
  useEffect(() => fetchData, []);
  return (
    <>
      <Box className="flex flex-col gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </>
  );
}

export default Home;
