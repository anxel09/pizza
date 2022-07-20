import "./App.css";
import "./scss/app.scss";
import Header from "./components/Header.jsx";

import { Route, Routes } from "react-router-dom";
import React, { createContext, useState,useRef } from "react";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Cart from "./pages/Cart.jsx";
import FullPizza from "./pages/FullPizza/index.jsx";

export const SearchContext = createContext()

function App() {
  
  const [searchValue, setSearchValue] = useState("");
  // const [firstRender, setFirstRender] = useState(true)
  const firstRender = useRef(true)

  return (
    <SearchContext.Provider value={{searchValue,setSearchValue}}>
      <div className="wrapper">
        <Header firstRender={firstRender}/>
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home firstRender={firstRender}/>} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/pizza/:id" element={<FullPizza />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </SearchContext.Provider>

  );
}

export default App;
