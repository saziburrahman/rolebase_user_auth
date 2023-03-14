import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import PrivateOutlet from "./components/PrivateOutlet";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <h1>Hello</h1>
      <Router>
        <nav style={{marginBottom:"50px"}}>
          <Link to={"/"}>Home</Link>
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<PrivateOutlet/>}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
