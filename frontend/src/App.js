import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateOutlet from "./components/PrivateOutlet";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/*" element={<PrivateOutlet/>}>
            <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
            
            <Route path="/dashboard" element={<Dashboard/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
