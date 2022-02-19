import Navigation from "navigation/navigate"
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div className="home">
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
    </div>
  );
}

export default App;
