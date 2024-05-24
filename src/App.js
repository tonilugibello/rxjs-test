import "./App.css";
import { RxjsProvider } from "./context/RxjsContext";
import Component1 from "./components/component1";
import Component2 from "./components/component2";

function App() {
  return (
    <RxjsProvider>
      <h1>Parent</h1>
      <div className="App" style={{ border: "2px solid blue", padding: "5px" }}>
        <div>
          <Component1></Component1>
        </div>
        <div>
          <Component2></Component2>
        </div>
      </div>
    </RxjsProvider>
  );
}

export default App;
