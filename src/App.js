import "./App.css";
import Header from "./components/Header";
import RenderRouter from "./routes";
function App() {
  return (
    <div className="App">
      <Header />
      <RenderRouter />
    </div>
  );
}

export default App;
