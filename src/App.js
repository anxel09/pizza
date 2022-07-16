import "./App.css";
import "./scss/app.scss";
import Header from "./components/Header";

import { Route, Routes } from "react-router-dom";
import { createContext, useState,useRef } from "react";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </SearchContext.Provider>

  );
}

export default App;
