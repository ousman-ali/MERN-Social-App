import Home from "./pages/home/Home";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import  Login from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {

  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ user ? <Home /> : <Register /> } />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/register" element={user ? <Navigate to="/"/> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/"/> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
