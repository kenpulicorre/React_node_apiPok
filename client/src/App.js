import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CreateForm from "./components/CreateForm";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/home" element={<Home />}></Route>
          {/* <Route path="/pokemon" element={<CreateForm />} /> */}
        </Routes>
        <h1>Henry Pokemon kenneth</h1>
      </div>
    </BrowserRouter>
  );
}

export default App;
