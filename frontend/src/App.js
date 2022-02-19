import Navigation from "navigation/navigate"
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Theme from "./style/theme"
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
