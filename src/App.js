import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MyCityPage from "./pages/MyCityPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/mycity" element={<MyCityPage />} />
      </Routes>
    </div>
  );
}

export default App;
