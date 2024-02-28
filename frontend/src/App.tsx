import logo from './logo.svg';
import { CssBaseline } from "@mui/material";
// import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dj from "./Dj"

// export default App;
function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dj:email" element={<Dj />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;