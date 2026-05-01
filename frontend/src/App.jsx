import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        
        <Route path="/" element={<Home />} />

       
        <Route path="/admin-login" element={<Login type="admin" />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        
        <Route path="/user-login" element={<Login type="user" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;