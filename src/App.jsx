import { BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar";
import MainRoute from "./MainRoute/MainRoute";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import store from "./Store/Store";
function App() {
  return (
    <>
      <ChakraProvider>
        <Provider store={store}>
          <BrowserRouter>
            <NavBar />
            <MainRoute />
          </BrowserRouter>
        </Provider>
      </ChakraProvider>
    </>
  );
}

export default App;
