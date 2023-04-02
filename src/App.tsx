import "milligram/dist/milligram.min.css";
import EmitEvent from "./components/EmitEvent";
import Header from "./components/Header";
import Log from "./components/Log";
import SocketProvider from "./logic/SocketProvider";

function App() {
  return (
    <SocketProvider>
      <div className="container">
        <Header />
        <hr />
        <div className="row">
          <div className="column">
            <EmitEvent />
          </div>
          <div className="column">
            <Log />
          </div>
        </div>
      </div>
    </SocketProvider>
  );
}

export default App;
