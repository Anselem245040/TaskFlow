import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthContextProvider>
        <Router>{children}</Router>
      </AuthContextProvider>
    </>
  );
}

export default App;
