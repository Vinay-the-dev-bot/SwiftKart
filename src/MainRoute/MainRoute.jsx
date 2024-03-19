import { Route, Routes } from "react-router";
import Cart from "../Pages/Cart";
import Home from "../Pages/Home";

function MainRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default MainRoute;
