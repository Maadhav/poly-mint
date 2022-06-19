import "./App.css";
import Navbar from "./components/Navbar";
import { Web3Context } from "./context/Web3Context";
import HomePage from "./pages/HomePage";
import { useState, useEffect, createRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserDetails from "./pages/UserDetails";
import WAVES from "vanta/dist/vanta.waves.min";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";

function App() {
  const { active } = useWeb3React();
  const [vantaEffect, setVantaEffect] = useState(null);
  let vantaRef = createRef();
  useEffect(() => {
    setVantaEffect(
      WAVES({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        color: "#4C47F7",
      })
    );
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  useEffect(() => {
    if (vantaEffect) {
      vantaEffect.resize();
    }
  }, [active]);

  return (
    <Router>
      <div className="App" ref={vantaRef}>
        <Navbar />
        <Routes>
          <Route path="/nfts" element={<UserDetails />}></Route>
          <Route path="/" element={<HomePage /> }></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
