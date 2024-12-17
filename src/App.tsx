import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import PlayVideoPage from "./pages/PlayVideoPage";

// 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/watch/:id" element={<PlayVideoPage />} />
         <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
