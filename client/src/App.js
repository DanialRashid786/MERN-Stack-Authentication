import { Navigate, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Signup from "./pages/Signup";
import Login from "./pages/Signin";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Products from "./pages/Products";
import { useState } from "react";
import RefreshHandler from "./Components/RefreshHandler";

function App() {
  // Corrected state initialization
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // PrivateRoute to handle authenticated routes
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <>
      <div className="App">

        <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path='/products' element={
            <PrivateRoute element={<Products />} />
            } />

        </Routes>

        <ToastContainer />
      </div>
    </>
  );
}

export default App;
