import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Create from "./pages/Create";
import Navbar from "./Components/Navbar";
import Heading from "./Components/Heading";

function App() {
  return (
    <div className="app">
      <Heading />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/song/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
