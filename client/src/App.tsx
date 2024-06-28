import "./App.css";
import { ProductsList } from "./page/productlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/navbar";
import { ChakraProvider } from '@chakra-ui/react'
function App() {
  return (
    <div className="App">
    <ChakraProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ProductsList />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
    </div>
  );
}

export default App;
