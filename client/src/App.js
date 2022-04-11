import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CreateForm from "./components/CreateForm";
import DetailPoke from "./components/DetailPoke";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/home/:id" element={<DetailPoke />} />

          <Route path="/pokemon" element={<CreateForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
