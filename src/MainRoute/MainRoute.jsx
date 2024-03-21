import { Route, Routes } from "react-router";
import Cart from "../Pages/Cart";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/SignUp";
import Profile from "../Pages/Profile";
import Order from "../Pages/Order";

function MainRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<Signup />} />
      </Routes>
    </>
  );
}

export default MainRoute;
